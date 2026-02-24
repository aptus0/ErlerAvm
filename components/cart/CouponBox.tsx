"use client";

import { useState } from "react";

interface CouponBoxProps {
  onApply: (code: string) => { ok: boolean; message: string };
  appliedCode?: string;
}

export function CouponBox({ onApply, appliedCode }: CouponBoxProps) {
  const [code, setCode] = useState(appliedCode ?? "");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
      <p className="text-sm font-semibold">Kupon Kodu</p>
      <div className="mt-3 flex gap-2">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="SEPET10"
          className="h-10 flex-1 rounded-xl border border-[color:var(--color-border)] bg-white px-3 text-sm outline-none focus:border-[color:var(--color-primary)]"
        />
        <button
          type="button"
          onClick={() => {
            const result = onApply(code);
            setSuccess(result.ok);
            setMessage(result.message);
          }}
          className="rounded-xl border border-[color:var(--color-primary)] px-3 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-primary)] hover:text-white"
        >
          Uygula
        </button>
      </div>

      {message ? (
        <p className={["mt-2 text-xs", success ? "text-emerald-700" : "text-red-600"].join(" ")}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
