import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--color-primary)] !text-white hover:bg-[color:var(--color-primary-strong)]",
  secondary:
    "border border-[color:var(--color-border)] bg-white text-[color:var(--color-foreground)] hover:border-[color:var(--color-primary)]",
  ghost: "bg-transparent text-[color:var(--color-foreground)] hover:bg-white/60",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...props} />;
}
