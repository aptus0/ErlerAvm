import Link from "next/link";

const adminLinks = [
  { href: "/admin", title: "Dashboard" },
  { href: "/admin/products", title: "Urunler" },
  { href: "/admin/orders", title: "Siparisler" },
  { href: "/admin/categories", title: "Kategoriler" },
  { href: "/admin/menus", title: "Menuler" },
  { href: "/admin/settings", title: "Ayarlar" },
];

export function AdminSidebar() {
  return (
    <aside className="w-72 border-r border-[color:var(--color-border)] bg-white px-5 py-6">
      <Link href="/admin" className="text-lg font-bold text-[color:var(--color-primary)]">
        Erkur Admin
      </Link>
      <nav className="mt-8 grid gap-1">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--color-foreground)] hover:bg-[color:var(--color-background)]"
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
