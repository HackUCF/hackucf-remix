import type { ComponentType } from "react";

export function WriteupContent({ Component }: { Component: ComponentType }) {
  return (
    <article className="prose prose-invert max-w-none prose-headings:text-foreground prose-a:text-brandGold prose-a:no-underline hover:prose-a:underline prose-code:text-brandGold prose-pre:bg-stone-900 prose-pre:border prose-pre:border-stone-700 prose-strong:text-foreground prose-blockquote:border-brandGold/40 prose-blockquote:text-stone-400 prose-li:marker:text-brandGold">
      <Component />
    </article>
  );
}
