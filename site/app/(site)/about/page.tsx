import { Card, Chip } from "@/components/ui/Card";
import { getProfile } from "@/lib/data";

export default function AboutPage() {
  const profile = getProfile();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      <p className="opacity-80 max-w-2xl">
        As a Data Analyst with a master’s in Data Science from Indiana University, I turn raw
        data into decisions. I build KPI dashboards, automate reporting pipelines, and deliver
        clear insights across academia and operations. Comfortable across Python, SQL, Power BI,
        Tableau, and SPSS, I focus on analysis that bridges research and action.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-medium mb-2">Analysis</h3>
          <div className="flex flex-wrap gap-2">
            {["Python", "SQL", "Pandas", "NumPy", "StatsModels", "Forecasting"].map((s, i) => (
              <Chip key={"a" + i}>{s}</Chip>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-medium mb-2">Visualization</h3>
          <div className="flex flex-wrap gap-2">
            {["Power BI", "Tableau", "Plotly", "Streamlit", "PyDeck", "Grafana"].map((s, i) => (
              <Chip key={"v" + i}>{s}</Chip>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-medium mb-2">Engineering</h3>
          <div className="flex flex-wrap gap-2">
            {["GCP", "BigQuery", "Cloud Run", "NoSQL", "Docker", "REST APIs"].map((s, i) => (
              <Chip key={"e" + i}>{s}</Chip>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-4">
        <h2 className="font-medium">Timeline</h2>
        <div className="grid gap-3">
          {["AI Engineer • Balance AI (2025)", "Data Analyst • IU Kelley School of Business (2024–2025)", "Automation & Reporting • IU School of Public Health (2024)", "Software Engineer Intern • Tesler (2021–2022)", "M.S. Data Science • Indiana University (2023–2025)", "B.E. Computer Science • RCOEM (2019–2023)"].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-foreground" />
                <div className="text-sm opacity-80">{item}</div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
