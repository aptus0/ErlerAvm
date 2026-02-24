import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[color:var(--color-border)] bg-white">
      <div className="container flex min-h-10 flex-wrap items-center justify-between gap-2 text-xs text-[color:var(--color-muted)] sm:text-sm">
        <p className="font-medium">7/24 Musteri Destegi: 0850 000 00 00</p>
        <div className="flex items-center gap-3">
          <Link href="/corporate/kargo-ve-teslimat" className="font-semibold hover:text-[color:var(--color-primary)]">
            Ayni Gun Kargo
          </Link>
          <Link href="/corporate/iade-politikasi" className="hidden font-semibold hover:text-[color:var(--color-primary)] sm:inline-flex">
            14 Gun Iade
          </Link>
        </div>
      </div>
    </header>
  );
}
