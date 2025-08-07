import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";
import { Card, Chip } from "@/components/ui/Card";
import Image from "next/image";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return [{ slug: "sample-case-study" }, { slug: "analytics-automation" }];
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
      <div className="flex gap-2 flex-wrap">
        {project.tech.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <Card>
        <div className="grid gap-6">
          <div>
            <h2 className="font-medium">Problem</h2>
            <p className="text-sm opacity-80">{project.problem}</p>
          </div>
          <div>
            <h2 className="font-medium">Approach</h2>
            <p className="text-sm opacity-80">{project.approach}</p>
          </div>
          <div>
            <h2 className="font-medium">Impact</h2>
            <p className="text-sm opacity-80">{project.impact}</p>
          </div>
        </div>
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        {project.images.map((src) => (
          <div key={src} className="relative w-full h-64">
            <Image src={src} alt="preview" fill className="object-cover rounded-lg border" />
          </div>
        ))}
      </div>
    </section>
  );
}
