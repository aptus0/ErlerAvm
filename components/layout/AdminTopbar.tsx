"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";

export function AdminTopbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/auth", { method: "DELETE" });
      router.replace("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="border-b border-[color:var(--color-border)] bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Yonetim Paneli</p>
          <p className="text-sm font-semibold">ERLER AVM V1</p>
        </div>
        <Button type="button" variant="secondary" onClick={handleLogout} disabled={loading}>
          {loading ? "Cikis yapiliyor..." : "Cikis yap"}
        </Button>
      </div>
    </header>
  );
}
