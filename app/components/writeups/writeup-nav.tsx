import type { WriteupMeta } from "@/lib/writeups";
import { Link } from "@remix-run/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function WriteupNav({
  prev,
  next,
}: {
  prev: WriteupMeta | null;
  next: WriteupMeta | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Previous and next writeups"
      className="flex justify-between items-stretch gap-4 mt-12 pt-8 border-t border-stone-800"
    >
      {prev ? (
        <Link
          to={`/writeups/${prev.slug}`}
          className="flex items-center gap-2 text-sm text-stone-400 hover:text-brandGold transition-colors group max-w-[45%]"
          prefetch="intent"
        >
          <ChevronLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
          <div className="text-left">
            <p className="text-xs text-stone-500">Previous</p>
            <p className="text-foreground group-hover:text-brandGold transition-colors line-clamp-1">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`/writeups/${next.slug}`}
          className="flex items-center gap-2 text-sm text-stone-400 hover:text-brandGold transition-colors group max-w-[45%] ml-auto"
          prefetch="intent"
        >
          <div className="text-right">
            <p className="text-xs text-stone-500">Next</p>
            <p className="text-foreground group-hover:text-brandGold transition-colors line-clamp-1">
              {next.title}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
