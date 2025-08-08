export const dynamic = "force-static";
export default function sitemap() {
  const base = "";
  const routes = ["/", "/work", "/dashboards", "/about", "/contact"].map((r) => ({ url: `${base}${r}` }));
  return routes;
}
