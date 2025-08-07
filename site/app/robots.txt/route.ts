import { siteConfig } from "@/content/config";
export const dynamic = "force-static";
export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${siteConfig.baseUrl.replace(/\/$/, "")}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
