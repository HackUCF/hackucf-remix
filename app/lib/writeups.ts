import type { ComponentType } from "react";

export interface WriteupMeta {
	slug: string;
	title: string;
	date: string;
	author: string;
	description: string;
	categories: string[];
	tags: string[];
	difficulty: string;
}

export const difficultyColours: Record<string, string> = {
	Easy: "bg-green-600/20 text-green-400 border-green-600/40",
	Medium: "bg-yellow-600/20 text-yellow-400 border-yellow-600/40",
	Hard: "bg-red-600/20 text-red-400 border-red-600/40",
};

interface WriteupFrontmatter {
	slug?: string;
	title: string;
	date: string;
	author: string;
	description: string;
	categories: string[];
	tags: string[];
	difficulty: string;
}

export interface WriteupModule {
	default: ComponentType;
	frontmatter: WriteupFrontmatter;
}

const modules = import.meta.glob<WriteupModule>("../content/writeups/*.mdx", {
	eager: true,
});

function slugFromPath(path: string): string {
	return path.replace("../content/writeups/", "").replace(".mdx", "");
}

export function getAllWriteups(): WriteupMeta[] {
	return Object.entries(modules)
		.map(([path, mod]) => ({
			slug: mod.frontmatter.slug ?? slugFromPath(path),
			...mod.frontmatter,
		}))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getWriteupBySlug(
	slug: string,
): { frontmatter: WriteupMeta; Component: ComponentType } | null {
	const entry = Object.entries(modules).find(
		([path, mod]) => (mod.frontmatter.slug ?? slugFromPath(path)) === slug,
	);
	if (!entry) return null;
	const [path, mod] = entry;
	return {
		frontmatter: {
			slug: mod.frontmatter.slug ?? slugFromPath(path),
			...mod.frontmatter,
		},
		Component: mod.default,
	};
}

export function getWriteupsByCategory(category: string): WriteupMeta[] {
	return getAllWriteups().filter((w) =>
		w.categories.some((c) => c.toLowerCase() === category.toLowerCase()),
	);
}

export function getWriteupsByTag(tag: string): WriteupMeta[] {
	return getAllWriteups().filter((w) =>
		w.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
	);
}

export function getAllCategories(): string[] {
	const cats = new Set<string>();
	for (const w of getAllWriteups()) {
		for (const c of w.categories) cats.add(c);
	}
	return Array.from(cats).sort();
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	for (const w of getAllWriteups()) {
		for (const t of w.tags) tags.add(t);
	}
	return Array.from(tags).sort();
}

export function getAdjacentWriteups(slug: string): {
	prev: WriteupMeta | null;
	next: WriteupMeta | null;
} {
	const all = getAllWriteups();
	const idx = all.findIndex((w) => w.slug === slug);
	return {
		prev: idx < all.length - 1 ? all[idx + 1] : null,
		next: idx > 0 ? all[idx - 1] : null,
	};
}

export function searchWriteups(query: string): WriteupMeta[] {
	if (!query.trim()) return getAllWriteups();
	const q = query.toLowerCase();
	return getAllWriteups().filter(
		(w) =>
			w.title.toLowerCase().includes(q) ||
			w.description.toLowerCase().includes(q) ||
			w.author.toLowerCase().includes(q) ||
			w.tags.some((t) => t.toLowerCase().includes(q)) ||
			w.categories.some((c) => c.toLowerCase().includes(q)),
	);
}

export function getReadingTime(content: string): number {
	const words = content.split(/\s+/).length;
	return Math.max(1, Math.ceil(words / 200));
}
