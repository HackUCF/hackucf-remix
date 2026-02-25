import { cn } from "@/lib/styles";
import { useEffect, useState } from "react";

interface TocItem {
	id: string;
	text: string;
	level: number;
}

export function WriteupToc() {
	const [headings, setHeadings] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const article = document.querySelector("article");
		if (!article) return;

		const elements = article.querySelectorAll("h2, h3");
		const items: TocItem[] = Array.from(elements).map((el) => ({
			id: el.id,
			text: el.textContent ?? "",
			level: el.tagName === "H2" ? 2 : 3,
		}));
		setHeadings(items);
	}, []);

	useEffect(() => {
		if (headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "-80px 0px -60% 0px", threshold: 0.1 },
		);

		for (const heading of headings) {
			const el = document.getElementById(heading.id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	}, [headings]);

	if (headings.length === 0) return null;

	return (
		<nav className="hidden xl:block sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
			<p className="text-sm font-semibold text-foreground mb-3">On this page</p>
			<ul className="space-y-1.5 text-sm">
				{headings.map((h) => (
					<li key={h.id}>
						<a
							href={`#${h.id}`}
							className={cn(
								"block transition-colors hover:text-brandGold",
								h.level === 3 && "pl-4",
								activeId === h.id
									? "text-brandGold font-medium"
									: "text-stone-400",
							)}
						>
							{h.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
