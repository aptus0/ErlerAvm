import { notFound } from "next/navigation";

import { CORPORATE_PAGES } from "@/lib/constants";

type CorporatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CorporateDetailPage({ params }: CorporatePageProps) {
  const { slug } = await params;
  const page = CORPORATE_PAGES[slug];

  if (!page) {
    notFound();
  }

  return (
    <article className="card p-6 md:p-8">
      <h1 className="text-3xl font-bold">{page.title}</h1>
      <p className="mt-2 text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
        Son guncelleme: {page.updatedAt}
      </p>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-[color:var(--color-foreground)]">{page.content}</p>
    </article>
  );
}
