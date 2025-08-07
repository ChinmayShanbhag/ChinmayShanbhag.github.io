import { Card, Chip } from "@/components/ui/Card";
import { getProfile } from "@/lib/data";

export default function AboutPage() {
  const profile = getProfile();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      <p className="opacity-80 max-w-2xl">{profile.bio}</p>
      <div className="grid md:grid-cols-3 gap-6">
        {["Analysis", "Engineering", "Visualization"].map((g) => (
          <Card key={g}>
            <h3 className="font-medium mb-2">{g}</h3>
            <div className="flex flex-wrap gap-2">
              {["Placeholder", "Placeholder", "Placeholder"].map((s, i) => (
                <Chip key={g + i}>{s}</Chip>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <h2 className="font-medium">Timeline</h2>
        <div className="grid gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-foreground" />
              <div className="text-sm opacity-80">Placeholder experience or education {i}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
