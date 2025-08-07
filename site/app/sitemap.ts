export const dynamic = "force-static";
export default function sitemap() {
  const base = "";
  const routes = ["/", "/work", "/dashboards", "/about", "/blog", "/contact"].map((r) => ({ url: `${base}${r}` }));
  return routes;
}
