import { WriteupContent } from "@/components/writeups/writeup-content";
import { WriteupMetadata } from "@/components/writeups/writeup-metadata";
import { WriteupNav } from "@/components/writeups/writeup-nav";
import { WriteupToc } from "@/components/writeups/writeup-toc";
import { generateCanonicalUrl } from "@/lib/utils";
import { getAdjacentWriteups, getWriteupBySlug } from "@/lib/writeups";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useParams } from "@remix-run/react";

export const meta: MetaFunction = ({ params, location }) => {
  const slug = params.slug ?? "";
  const writeup = getWriteupBySlug(slug);
  if (!writeup) {
    return [{ title: "Not Found | Hack@UCF" }];
  }
  const { frontmatter: fm } = writeup;
  return [
    { title: `${fm.title} | Writeups | Hack@UCF` },
    { name: "description", content: fm.description },
    { property: "og:type", content: "article" },
    { property: "og:title", content: fm.title },
    { property: "og:description", content: fm.description },
    { property: "article:published_time", content: fm.date },
    { property: "article:author", content: fm.author },
    ...fm.tags.map((t) => ({ property: "article:tag", content: t })),
    generateCanonicalUrl(location.pathname),
  ];
};

export default function WriteupPage() {
  const { slug = "" } = useParams();
  const writeup = getWriteupBySlug(slug);

  if (!writeup) {
    throw new Response("Not Found", { status: 404 });
  }

  const { frontmatter, Component } = writeup;
  const { prev, next } = getAdjacentWriteups(slug);

  return (
    <main className="min-h-screen p-8 bg-background text-foreground pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-12">
          <div className="min-w-0 flex-1">
            <WriteupMetadata writeup={frontmatter} />
            <WriteupContent Component={Component} />
            <WriteupNav prev={prev} next={next} />
          </div>
          <aside className="w-56 shrink-0 hidden xl:block">
            <WriteupToc />
          </aside>
        </div>
      </div>
    </main>
  );
}
