import { Badge } from "@/components/ui/badge";
import { type WriteupMeta, difficultyColours } from "@/lib/writeups";
import { Link } from "@remix-run/react";
import { ArrowLeft, Calendar, User } from "lucide-react";

export function WriteupMetadata({ writeup }: { writeup: WriteupMeta }) {
  const date = new Date(writeup.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-8 space-y-4">
      <Link
        to="/writeups"
        className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-brandGold transition-colors"
        prefetch="intent"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Writeups
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        {writeup.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          {writeup.author}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {date}
        </span>
        {writeup.difficulty && (
          <Badge
            className={
              difficultyColours[writeup.difficulty] ??
              "bg-stone-800 text-stone-300 border-stone-700"
            }
          >
            {writeup.difficulty}
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {writeup.categories.map((cat) => (
          <Link key={cat} to={`/writeups/category/${encodeURIComponent(cat)}`}>
            <Badge
              variant="outline"
              className="text-brandGold border-brandGold/40 hover:bg-brandGold/10"
            >
              {cat}
            </Badge>
          </Link>
        ))}
        {writeup.tags.map((tag) => (
          <Link key={tag} to={`/writeups/tag/${encodeURIComponent(tag)}`}>
            <Badge
              variant="secondary"
              className="bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700"
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
