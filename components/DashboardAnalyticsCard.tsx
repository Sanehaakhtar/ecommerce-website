"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const SPEND_SPARK = [
  { month: "Jan", spent: 420 },
  { month: "Feb", spent: 310 },
  { month: "Mar", spent: 520 },
  { month: "Apr", spent: 460 },
];

export default function DashboardAnalyticsCard() {
  return (
    <div className="bento-card bento-card-hover p-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">Analytics</p>
          <h3 className="text-lg font-bold text-[var(--foreground)]">Spending Pulse</h3>
        </div>
        <span className="text-xs font-bold text-[var(--accent)]">+12%</span>
      </div>
      <div className="mt-6 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SPEND_SPARK} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
            <Tooltip
              cursor={{ fill: "rgba(128, 0, 0, 0.08)" }}
              contentStyle={{
                background: "var(--bg-surface)",
                borderRadius: 12,
                border: "1px solid rgba(128,0,0,0.08)",
                fontSize: 11,
              }}
              formatter={(value: number) => [`$${value}`, "Spent"]}
            />
            <Bar dataKey="spent" fill="var(--accent)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
