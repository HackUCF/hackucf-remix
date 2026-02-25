import { WriteupCard } from "@/components/writeups/writeup-card";
import { WriteupFilters } from "@/components/writeups/writeup-filters";
import { generateCanonicalUrl } from "@/lib/utils";
import { getAllCategories, getAllTags, getWriteupsByTag } from "@/lib/writeups";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useParams } from "@remix-run/react";

export const meta: MetaFunction = ({ params, location }) => {
	const tag = decodeURIComponent(params.tag ?? "");
	return [
		{ title: `${tag} Writeups | Hack@UCF` },
		{
			name: "description",
			content: `CTF writeups tagged with ${tag} from Hack@UCF members.`,
		},
		generateCanonicalUrl(location.pathname),
	];
};

export default function WriteupsByTag() {
	const { tag } = useParams();
	const decoded = decodeURIComponent(tag ?? "");
	const writeups = getWriteupsByTag(decoded);
	const categories = getAllCategories();
	const tags = getAllTags();

	return (
		<main className="min-h-screen p-8 bg-background text-foreground pt-28">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col items-center justify-center mb-12 mt-8">
					<h1 className="text-5xl font-bold">Writeups</h1>
					<p className="text-stone-400 mt-4">
						Tag: <span className="text-brandGold">{decoded}</span>
					</p>
				</div>

				<div className="mb-10">
					<WriteupFilters
						categories={categories}
						tags={tags}
						activeTag={decoded}
					/>
				</div>

				{writeups.length === 0 ? (
					<p className="text-center text-stone-400 py-12">
						No writeups found with this tag.
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
