import { SparklesIcon, UserGroupIcon } from "@heroicons/react/24/outline";

import type { ProductStory as ProductStoryType } from "@/lib/constants";

interface ProductStoryProps {
  story: ProductStoryType;
}

export function ProductStory({ story }: ProductStoryProps) {
  return (
    <section className="grid gap-6 rounded-3xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.05)] lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">Product Story</p>
        <h2 className="mt-2 text-3xl font-bold">{story.title}</h2>
        <p className="mt-3 text-sm text-[color:var(--color-muted)]">{story.description}</p>

        <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--color-foreground)]">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <aside className="rounded-2xl border border-[color:var(--color-border)] bg-[linear-gradient(150deg,_#fff1f2,_#ffffff)] p-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">
          <UserGroupIcon className="size-4 text-[color:var(--color-primary)]" />
          Bu urun neyi cozer?
        </p>

        <ul className="mt-4 space-y-3 text-sm">
          {story.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <SparklesIcon className="mt-0.5 size-4 shrink-0 text-[color:var(--color-primary)]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
