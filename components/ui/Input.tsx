import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", id, ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[color:var(--color-foreground)]" htmlFor={id}>
      {label ? <span>{label}</span> : null}
      <input
        id={id}
        className={[
          "h-11 rounded-xl border border-[color:var(--color-border)] bg-white px-3 text-sm outline-none transition focus:border-[color:var(--color-primary)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </label>
  );
}
