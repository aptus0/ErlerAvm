import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[color:var(--color-border)] bg-white/95 backdrop-blur">
      <div className="container flex min-h-12 items-center justify-between gap-4 text-xs text-[color:var(--color-muted)] sm:text-sm">
        <p>7/24 Musteri Destegi: 0850 000 00 00</p>
        <div className="flex items-center gap-4">
          <Link href="/corporate/kargo-ve-teslimat" className="hover:text-[color:var(--color-primary)]">
            Ayni Gun Kargo
          </Link>
          <Link href="/login" className="hover:text-[color:var(--color-primary)]">
            Admin Girisi
          </Link>
        </div>
      </div>
    </header>
  );
}
