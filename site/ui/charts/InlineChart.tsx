"use client";
import { LineChart, Line, ResponsiveContainer } from "recharts";

type Point = { x: number; y: number };

export function InlineChart({ data }: { data: Point[] }) {
  const rechartsData = data.map((d) => ({ x: d.x, y: d.y }));
  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rechartsData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <Line type="monotone" dataKey="y" stroke="currentColor" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
