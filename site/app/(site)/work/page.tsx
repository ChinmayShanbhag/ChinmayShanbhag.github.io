import Link from "next/link";
import { Card, Chip } from "@/components/ui/Card";
import { getProjects, getExperience } from "@/lib/data";
import { InlineChart } from "@/ui/charts/InlineChart";
import Reveal from "@/components/ux/Reveal";

export default function WorkPage() {
  const projects = getProjects();
  const experience = getExperience();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Work</h1>
      <div className="space-y-4">
        <h2 className="font-medium">Experience</h2>
        <div className="grid gap-4">
          {experience.map((e, idx) => (
            <Reveal key={idx}>
              <Card>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">{e.role} • {e.company}</div>
                  <div className="text-xs opacity-70">{e.location} • {e.dates}</div>
                  {e.bullets.length > 0 && (
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm opacity-80">
                      {e.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`}>
            <Reveal>
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
                    <div className="text-xs opacity-70 mb-1">Sample Data</div>
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
            </Reveal>
          </Link>
        ))}
      </div>
    </section>
  );
}
