import Image from "next/image";
import Link from "next/link";

const paymentBadges = ["Türkiye", "VISA", "Mastercard", "Maestro", "TROY", "ETBİS Kayıtlı"];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--color-border)] bg-white">
      <div className="container py-10">
        <div className="grid gap-8 rounded-3xl border border-[color:var(--color-border)] bg-[#fffafb] p-6 shadow-[0_18px_34px_rgba(15,23,42,0.08)] lg:grid-cols-[1.15fr_1fr_1fr_0.9fr]">
          <section>
            <div className="flex items-center gap-3">
              <Image src="/logo/erler-logo.svg" alt="Erler AVM logo" width={44} height={44} className="rounded-md" />
              <div>
                <p className="text-lg font-bold text-[color:var(--color-primary)]">Erkur AVM</p>
                <p className="text-xs text-[color:var(--color-muted)]">Kırmızı-Beyaz Güvenli Alışveriş</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              Teknoloji, ev ve yaşam kategorilerinde güvenli alışveriş altyapısı. 7/24 destek, hızlı kargo ve
              resmi satıcı ağı ile hizmet verir.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {paymentBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-1 text-[11px] font-semibold text-[color:var(--color-muted)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-foreground)]">
              Kurumsal
            </p>
            <div className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <Link href="/corporate/hakkimizda" className="hover:text-[color:var(--color-primary)]">
                Hakkımızda
              </Link>
              <Link href="/corporate/kvkk" className="hover:text-[color:var(--color-primary)]">
                KVKK
              </Link>
              <Link href="/corporate/iade-politikasi" className="hover:text-[color:var(--color-primary)]">
                İade Politikası
              </Link>
              <Link href="/corporate/kargo-ve-teslimat" className="hover:text-[color:var(--color-primary)]">
                Kargo ve Teslimat
              </Link>
            </div>
          </section>

          <section>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-foreground)]">
              Müşteri Hizmetleri
            </p>
            <div className="grid gap-2 text-sm text-[color:var(--color-muted)]">
              <p>destek@erkuravm.com</p>
              <p>0850 000 00 00</p>
              <p>Pzt-Cmt: 09:00 - 18:00</p>
              <Link href="/account/orders" className="hover:text-[color:var(--color-primary)]">
                Sipariş Takibi
              </Link>
              <Link href="/account/returns" className="hover:text-[color:var(--color-primary)]">
                İade ve Talepler
              </Link>
            </div>
          </section>

          <section>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-foreground)]">
              ETBİS Kaydı
            </p>
            <Link
              href="https://etbis.ticaret.gov.tr/tr/Anasayfa/SiteAraSonuc?siteId=f3ce457b-0bac-4da2-9e7f-e803761bc37b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-white p-2"
            >
              <Image src="/etbis-qr.svg" alt="ETBİS QR" width={140} height={140} className="h-[140px] w-[140px]" />
            </Link>
            <p className="mt-2 text-xs text-[color:var(--color-muted)]">Resmi ETBİS kayıt sorgusu için QR kodu okutun.</p>
          </section>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)] bg-[#fff5f6] py-4">
        <div className="container flex flex-wrap items-center justify-between gap-2 text-xs text-[color:var(--color-muted)]">
          <p>© 2026 Erkur AVM. Tüm hakları saklıdır.</p>
          <p className="text-lg font-bold tracking-[0.24em] text-[color:var(--color-primary)]">ERLER VM</p>
        </div>
      </div>
    </footer>
  );
}
