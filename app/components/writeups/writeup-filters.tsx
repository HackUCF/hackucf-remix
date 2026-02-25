import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/styles";
import { Link } from "@remix-run/react";

export function WriteupFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
}: {
  categories: string[];
  tags: string[];
  activeCategory?: string;
  activeTag?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        <Link to="/writeups">
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer transition-colors",
              !activeCategory && !activeTag
                ? "bg-brandGold text-background border-brandGold"
                : "text-foreground border-stone-600 hover:border-brandGold",
            )}
          >
            All
          </Badge>
        </Link>
        {categories.map((cat) => (
          <Link key={cat} to={`/writeups/category/${encodeURIComponent(cat)}`}>
            <Badge
              variant="outline"
              className={cn(
                "cursor-pointer transition-colors",
                activeCategory?.toLowerCase() === cat.toLowerCase()
                  ? "bg-brandGold text-background border-brandGold"
                  : "text-brandGold border-brandGold/40 hover:bg-brandGold/10",
              )}
            >
              {cat}
            </Badge>
          </Link>
        ))}
        {tags.map((tag) => (
          <Link key={tag} to={`/writeups/tag/${encodeURIComponent(tag)}`}>
            <Badge
              variant="secondary"
              className={cn(
                "cursor-pointer transition-colors",
                activeTag?.toLowerCase() === tag.toLowerCase()
                  ? "bg-brandGold text-background border-brandGold"
                  : "bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700",
              )}
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
