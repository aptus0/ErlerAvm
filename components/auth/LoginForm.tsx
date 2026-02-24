"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        setError(payload?.message ?? "Giris basarisiz. Bilgileri kontrol edin.");
        return;
      }

      const nextPath = searchParams.get("next");
      if (nextPath && nextPath.startsWith("/admin")) {
        router.replace(nextPath);
      } else {
        router.replace("/admin");
      }
      router.refresh();
    } catch {
      setError("Beklenmeyen bir hata olustu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card w-full max-w-md p-6">
      <h1 className="text-2xl font-bold">Admin Girisi</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Varsayilan: admin / admin123
      </p>

      <div className="mt-6 grid gap-4">
        <Input
          id="username"
          label="Kullanici adi"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
        />
        <Input
          id="password"
          label="Sifre"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <Button type="submit" className="mt-6 h-11 w-full" disabled={loading}>
        {loading ? "Giris yapiliyor..." : "Panele Gir"}
      </Button>
    </form>
  );
}
