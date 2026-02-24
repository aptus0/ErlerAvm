export default function ProductsLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`product-skeleton-${index}`}
          className="animate-pulse rounded-2xl border border-[color:var(--color-border)] bg-white p-4"
        >
          <div className="h-52 rounded-xl bg-[#fff1f2]" />
          <div className="mt-3 h-5 w-2/3 rounded bg-[#f4d7db]" />
          <div className="mt-2 h-4 w-full rounded bg-[#f4d7db]" />
          <div className="mt-4 h-10 rounded-xl bg-[#f4d7db]" />
        </div>
      ))}
    </div>
  );
}
