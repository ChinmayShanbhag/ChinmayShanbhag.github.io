"use client";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import Reveal from "@/components/ux/Reveal";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

type Row = { date: string; category: string; value: number };

const data: Row[] = [
  { date: "2024-01-01", category: "Retail", value: 120 },
  { date: "2024-02-01", category: "Retail", value: 134 },
  { date: "2024-03-01", category: "Retail", value: 142 },
  { date: "2024-04-01", category: "Retail", value: 151 },
  { date: "2024-01-01", category: "Electronics", value: 90 },
  { date: "2024-02-01", category: "Electronics", value: 102 },
  { date: "2024-03-01", category: "Electronics", value: 99 },
  { date: "2024-04-01", category: "Electronics", value: 115 },
  { date: "2024-01-01", category: "Grocery", value: 140 },
  { date: "2024-02-01", category: "Grocery", value: 138 },
  { date: "2024-03-01", category: "Grocery", value: 145 },
  { date: "2024-04-01", category: "Grocery", value: 149 }
];

export default function DashboardsPage() {
  const [selected, setSelected] = useState<string>("Retail");
  const filtered = useMemo(() => data.filter((d) => d.category === selected), [selected]);
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Sales Trend by Category</h1>
      <Reveal>
      <Card>
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {["Retail", "Electronics", "Grocery"].map((c) => (
            <button
              key={c}
              onClick={() => setSelected(c)}
              className={
                "text-sm px-3 py-1 rounded-md " +
                (selected === c ? "bg-black/10 dark:bg-white/10" : "bg-black/5 dark:bg-white/5")
              }
            >
              {c}
            </button>
          ))}
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filtered} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="currentColor"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      </Reveal>
      <Reveal>
        <div className="text-sm opacity-70">Sample Data</div>
      </Reveal>
      <Reveal>
        <div className="mt-6">
          <iframe
            src="https://police-stops-analysis-chvshan.streamlit.app/?embed=true"
            className="w-full h-[600px] border-none"
            loading="lazy"
          />
        </div>
      </Reveal>
    </section>
  );
}
