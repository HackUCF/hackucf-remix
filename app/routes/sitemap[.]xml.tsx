import type { LoaderFunction } from "@remix-run/cloudflare";
import { getAllWriteups } from "@/lib/writeups";

export const loader: LoaderFunction = async () => {
  const baseUrl = "https://hackucf.org";

  const routes = [
    "",
    "about-us",
    "competitions",
    "constitution",
    "sponsorship",
    "contact-us",
    "nonprofit",
    "calendar",
    "execs",
    "wicys",
    "ccdc",
    "ctf",
    "faq",
    "writeups",
  ];

  const writeups = getAllWriteups();
  const writeupRoutes = writeups.map((w) => `writeups/${w.slug}`);

  const allRoutes = [...routes, ...writeupRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map(
          (route) => `
        <url>
          <loc>${baseUrl}${route ? `/${route}` : ""}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${route === "" ? "1.0" : route.startsWith("writeups/") ? "0.6" : "0.8"}</priority>
        </url>
      `,
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
