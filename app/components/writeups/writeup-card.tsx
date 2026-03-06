import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type WriteupMeta, difficultyColours } from "@/lib/writeups";
import { Link } from "@remix-run/react";
import { Calendar, User } from "lucide-react";

export function WriteupCard({ writeup }: { writeup: WriteupMeta }) {
  const date = new Date(writeup.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="bg-background border-brandGold/40 border hover:border-brandGold transition-colors group">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          <Link
            to={`/writeups/${writeup.slug}`}
            className="text-foreground group-hover:text-brandGold transition-colors"
            prefetch="intent"
          >
            {writeup.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm text-stone-400 mb-3">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {writeup.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </span>
        </div>
        <p className="text-sm text-stone-400 line-clamp-2">
          {writeup.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1.5">
        {writeup.categories.map((cat) => (
          <Link key={cat} to={`/writeups/category/${encodeURIComponent(cat)}`}>
            <Badge
              variant="outline"
              className="text-brandGold border-brandGold/40 hover:bg-brandGold/10 text-xs"
            >
              {cat}
            </Badge>
          </Link>
        ))}
        {writeup.tags
          .filter((tag) => tag !== writeup.difficulty)
          .map((tag) => (
            <Link key={tag} to={`/writeups/tag/${encodeURIComponent(tag)}`}>
              <Badge
                variant="secondary"
                className="bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700 text-xs"
              >
                {tag}
              </Badge>
            </Link>
          ))}
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
      </CardFooter>
    </Card>
  );
}
