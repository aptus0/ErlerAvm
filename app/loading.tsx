export default function AppLoading() {
  return (
    <main className="container flex min-h-[50vh] items-center justify-center py-14">
      <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--color-primary)]">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[color:var(--color-primary)]" />
        Sayfa yukleniyor...
      </div>
    </main>
  );
}
