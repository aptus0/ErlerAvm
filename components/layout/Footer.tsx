import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--color-border)] bg-white">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-[color:var(--color-primary)]">Erkur AVM</p>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">
            Teknoloji, ev ve yasam kategorilerinde guvenli alisveris altyapisi.
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Kurumsal</p>
          <div className="grid gap-1 text-sm text-[color:var(--color-muted)]">
            <Link href="/corporate/hakkimizda">Hakkimizda</Link>
            <Link href="/corporate/kvkk">KVKK</Link>
            <Link href="/corporate/iade-politikasi">Iade Politikasi</Link>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Iletisim</p>
          <div className="grid gap-1 text-sm text-[color:var(--color-muted)]">
            <p>destek@erkuravm.com</p>
            <p>0850 000 00 00</p>
            <p>Pzt-Cmt: 09:00 - 18:00</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
