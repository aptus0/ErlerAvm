import {
  ChevronDownIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const footerGroups: Array<{
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkimizda", href: "/corporate/hakkimizda" },
      { label: "Magazalarimiz", href: "/corporate/magazalarimiz" },
      { label: "Iletisim", href: "/corporate/iletisim" },
      { label: "Kariyer", href: "/corporate/kariyer" },
    ],
  },
  {
    title: "Musteri Hizmetleri",
    links: [
      { label: "Siparis Takibi", href: "/account/orders" },
      { label: "Iade ve Degisim", href: "/account/returns" },
      { label: "Kargo ve Teslimat", href: "/corporate/kargo-ve-teslimat" },
      { label: "SSS", href: "/corporate/sss" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { label: "KVKK", href: "/corporate/kvkk" },
      { label: "Gizlilik Politikasi", href: "/corporate/gizlilik-politikasi" },
      { label: "Mesafeli Satis Sozlesmesi", href: "/corporate/mesafeli-satis-sozlesmesi" },
      { label: "Cerez Politikasi", href: "/corporate/cerez-politikasi" },
    ],
  },
  {
    title: "Kategoriler",
    links: [
      { label: "Elektronik", href: "/products?category=Elektronik" },
      { label: "Ev", href: "/products?category=Ev" },
      { label: "Yasam", href: "/products?category=Yasam" },
      { label: "Kampanyalar", href: "/campaigns" },
      { label: "Yeni Gelenler", href: "/products?sort=new" },
    ],
  },
];

const cardBadges = ["VISA", "Mastercard", "Maestro", "TROY"] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--color-border)] bg-[#fafafa]">
      <div className="container py-8 md:py-10">
        <section className="rounded-3xl border border-[color:var(--color-border)] bg-white p-4 shadow-[0_18px_34px_rgba(15,23,42,0.06)] md:p-6">
          <div className="grid gap-3 md:hidden">
            {footerGroups.map((group) => (
              <details
                key={`mobile-footer-${group.title}`}
                className="group rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa]"
              >
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold">
                  <span>{group.title}</span>
                  <ChevronDownIcon className="size-4 text-[color:var(--color-muted)] transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid gap-1 px-4 pb-4 text-sm text-[color:var(--color-muted)]">
                  {group.links.map((link) => (
                    <Link
                      key={`mobile-${group.title}-${link.label}-${link.href}`}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="rounded-lg px-1 py-1.5 hover:text-[color:var(--color-primary)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="hidden gap-8 md:grid md:grid-cols-4">
            {footerGroups.map((group) => (
              <section key={`desktop-footer-${group.title}`}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-foreground)]">
                  {group.title}
                </p>
                <div className="grid gap-2 text-sm text-[color:var(--color-muted)]">
                  {group.links.map((link) => (
                    <Link
                      key={`desktop-${group.title}-${link.label}-${link.href}`}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="hover:text-[color:var(--color-primary)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>

      <div className="border-y border-[color:var(--color-border)] bg-white">
        <div className="container py-8">
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <section>
              <div className="flex items-center gap-3">
                <Image src="/logo/erler-logo.png" alt="ERLER AVM logo" width={50} height={50} className="h-12 w-12 object-contain" />
                <div>
                  <p className="text-lg font-bold text-[color:var(--color-primary)]">ERLER AVM</p>
                  <p className="text-xs text-[color:var(--color-muted)]">Kirmizi-beyaz guvenli alisveris altyapisi</p>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--color-muted)]">
                ERLER AVM, teknoloji, ev ve yasam kategorilerinde guvenli odeme, hizli teslimat ve satici dogrulama
                standartlari ile hizmet verir. Musteri deneyimini mobil odakli arayuz ve seffaf siparis sureci ile
                destekler.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-lg border border-[color:var(--color-border)] bg-[#fffafa] px-2 py-1 text-xs font-semibold text-[color:var(--color-muted)]">
                  7/24 Musteri Destegi
                </span>
                <span className="rounded-lg border border-[color:var(--color-border)] bg-[#fffafa] px-2 py-1 text-xs font-semibold text-[color:var(--color-muted)]">
                  Ayni Gun Kargo
                </span>
                <span className="rounded-lg border border-[color:var(--color-border)] bg-[#fffafa] px-2 py-1 text-xs font-semibold text-[color:var(--color-muted)]">
                  Kolay Iade
                </span>
              </div>
            </section>

            <section className="rounded-2xl border border-[color:var(--color-border)] bg-[#fffafa] p-4">
              <p className="text-sm font-semibold uppercase tracking-wide">Iletisim</p>

              <div className="mt-3 grid gap-2 text-sm text-[color:var(--color-muted)]">
                <p className="inline-flex items-center gap-2">
                  <PhoneIcon className="size-4 text-[color:var(--color-primary)]" /> 0850 000 00 00
                </p>
                <p className="inline-flex items-center gap-2">
                  <EnvelopeIcon className="size-4 text-[color:var(--color-primary)]" /> destek@erkuravm.com
                </p>
                <p className="inline-flex items-center gap-2">
                  <ClockIcon className="size-4 text-[color:var(--color-primary)]" /> Pzt-Cmt: 09:00 - 18:00
                </p>
                <p className="inline-flex items-center gap-2">
                  <MapPinIcon className="size-4 text-[color:var(--color-primary)]" /> Istanbul / Turkiye
                </p>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">ETBIS Kaydi</p>
                <Link
                  href="https://etbis.ticaret.gov.tr/tr/Anasayfa/SiteAraSonuc?siteId=f3ce457b-0bac-4da2-9e7f-e803761bc37b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-white p-2"
                >
                  <Image src="/etbis-qr.svg" alt="ETBIS QR" width={120} height={120} className="h-[120px] w-[120px]" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)] bg-[#fff2f3]">
        <div className="container py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xl font-black tracking-[0.26em] text-[color:var(--color-primary)] md:text-2xl">ERLER AVM</p>
              <p className="mt-1 text-xs text-[color:var(--color-muted)]">© 2026 ERLER AVM. Tum haklari saklidir.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-1 text-[11px] font-semibold text-[color:var(--color-muted)]">
                Guvenli Odeme Altyapisi
              </span>
              <div className="inline-flex items-center rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-1">
                <Image
                  src="/payments/iyzico-logo.jpg"
                  alt="iyzico"
                  width={88}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
              </div>
              <div className="inline-flex items-center rounded-lg border border-[color:var(--color-border)] bg-white px-1 py-1">
                <Image
                  src="/payments/iyzico-badge.jpg"
                  alt="iyzico korumali odeme"
                  width={32}
                  height={32}
                  className="h-7 w-7 rounded-sm object-cover"
                />
              </div>
              {cardBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-lg border border-[color:var(--color-border)] bg-white px-2 py-1 text-[11px] font-semibold text-[color:var(--color-muted)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
