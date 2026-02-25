import { WriteupCard } from "@/components/writeups/writeup-card";
import { WriteupFilters } from "@/components/writeups/writeup-filters";
import { WriteupSearch } from "@/components/writeups/writeup-search";
import { generateCanonicalUrl } from "@/lib/utils";
import {
	getAllCategories,
	getAllTags,
	getAllWriteups,
	searchWriteups,
} from "@/lib/writeups";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useSearchParams } from "@remix-run/react";
import { useMemo } from "react";

export const meta: MetaFunction = ({ matches, location }) => {
	const parentMeta = matches.flatMap((match) => match.meta ?? []);
	return [
		...parentMeta,
		{ title: "Writeups | Hack@UCF" },
		{
			name: "description",
			content:
				"CTF writeups and security research from Hack@UCF members. Learn exploitation techniques, binary analysis, and more.",
		},
		generateCanonicalUrl(location.pathname),
	];
};

export default function WriteupsIndex() {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") ?? "";
	const categories = getAllCategories();
	const tags = getAllTags();

	const writeups = useMemo(() => {
		if (query) return searchWriteups(query);
		return getAllWriteups();
	}, [query]);

	function handleSearch(q: string) {
		setSearchParams(q ? { q } : {}, { replace: true });
	}

	return (
		<main className="min-h-screen p-8 bg-background text-foreground pt-28">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col items-center justify-center mb-12 mt-8">
					<h1 className="text-5xl font-bold">Writeups</h1>
					<p className="text-stone-400 mt-4 text-center max-w-2xl">
						CTF writeups and security research from Hack@UCF members
					</p>
				</div>

				<div className="space-y-6 mb-10">
					<WriteupSearch value={query} onChange={handleSearch} />
					<WriteupFilters categories={categories} tags={tags} />
				</div>

				{writeups.length === 0 ? (
					<p className="text-center text-stone-400 py-12">
						No writeups found{query ? ` for "${query}"` : ""}.
					</p>
				) : (
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{writeups.map((w) => (
							<WriteupCard key={w.slug} writeup={w} />
						))}
					</div>
				)}
			</div>
		</main>
	);
}
