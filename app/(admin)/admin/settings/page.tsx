import { Input } from "@/components/ui/Input";

export default function AdminSettingsPage() {
  return (
    <section className="card p-6">
      <h1 className="text-2xl font-bold">Ayarlar</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Kargo, iletisim, sosyal medya ve odeme ayarlari bu bolumde tutulacak.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Input id="store-name" label="Magaza Adi" defaultValue="ERLER AVM" />
        <Input id="store-email" label="Destek E-posta" defaultValue="destek@erkuravm.com" />
        <Input id="store-phone" label="Destek Telefon" defaultValue="0850 000 00 00" />
        <Input id="cargo-threshold" label="Ucretsiz Kargo Limiti" defaultValue="1500" />
      </div>
    </section>
  );
}
