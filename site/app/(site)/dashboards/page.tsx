"use client";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

type Row = { date: string; category: string; value: number };

const data: Row[] = [
  { date: "2024-01-01", category: "A", value: 12 },
  { date: "2024-01-02", category: "A", value: 19 },
  { date: "2024-01-03", category: "B", value: 8 },
  { date: "2024-01-04", category: "B", value: 14 },
  { date: "2024-01-05", category: "C", value: 10 },
];

export default function DashboardsPage() {
  const [selected, setSelected] = useState<string>("A");
  const filtered = useMemo(() => data.filter((d) => d.category === selected), [selected]);
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <Card>
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {["A", "B", "C"].map((c) => (
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
    </section>
  );
}
