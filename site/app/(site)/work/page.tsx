import Link from "next/link";
import { Card, Chip } from "@/components/ui/Card";
import { getProjects } from "@/lib/data";
import { InlineChart } from "@/ui/charts/InlineChart";

export default function WorkPage() {
  const projects = getProjects();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Work</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`}>
            <Card className="hover:shadow-sm transition-shadow">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-sm opacity-80">{p.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.slice(0, 4).map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                <div>
                  <InlineChart
                    data={[
                      { x: 1, y: 2 },
                      { x: 2, y: 3 },
                      { x: 3, y: 1 },
                    ]}
                  />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
