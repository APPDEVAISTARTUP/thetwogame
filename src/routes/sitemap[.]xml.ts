import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.playtwo.in";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          `  <url>`,
          `    <loc>${BASE_URL}/</loc>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>1.0</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/support</loc>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>0.8</priority>`,
          `  </url>`,
          ...["/terms", "/privacy", "/refund-policy", "/contact"].flatMap((path) => [
            `  <url>`,
            `    <loc>${BASE_URL}${path}</loc>`,
            `    <changefreq>yearly</changefreq>`,
            `    <priority>0.3</priority>`,
            `  </url>`,
          ]),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
