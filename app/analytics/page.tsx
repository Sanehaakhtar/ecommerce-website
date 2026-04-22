"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MONTHLY_SPENDING = [
  { month: "Jan", spent: 420 },
  { month: "Feb", spent: 310 },
  { month: "Mar", spent: 520 },
  { month: "Apr", spent: 460 },
  { month: "May", spent: 610 },
  { month: "Jun", spent: 480 },
];

export default function AnalyticsPage() {
  const totalSpent = MONTHLY_SPENDING.reduce((sum, item) => sum + item.spent, 0);
  const savedThisMonth = 84;
  const rewardPoints = 1260;

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-primary)]">
      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
        <div className="max-w-5xl mx-auto space-y-5">
        <header>
          <p className="label-caps mb-1">Insights</p>
          <h1 className="text-xl font-bold tracking-tight">Spending Analytics</h1>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Track your monthly spend and keep rewards on point.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bento-card bento-card-hover p-4">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Total spent</p>
            <p className="text-xl font-bold text-[var(--foreground)] mt-2">${totalSpent}</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Across the last 6 months</p>
          </div>
          <div className="bento-card bento-card-hover p-4">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Saved this month</p>
            <p className="text-xl font-bold text-[var(--accent)] mt-2">${savedThisMonth}</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Deals applied</p>
          </div>
          <div className="bento-card bento-card-hover p-4">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Reward points</p>
            <p className="text-xl font-bold text-[var(--foreground)] mt-2">{rewardPoints}</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-1">Ready to redeem</p>
          </div>
        </section>

        <section className="bento-card p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-bold text-[var(--foreground)]">Monthly Spending</h2>
              <p className="text-[9px] text-[var(--text-muted)]">Your spending over the past 6 months.</p>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">2026</span>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_SPENDING} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(128, 0, 0, 0.08)" }}
                  contentStyle={{
                    background: "var(--bg-surface)",
                    borderRadius: 12,
                    border: "1px solid var(--border-subtle)",
                    fontSize: 11,
                    color: "var(--foreground)",
                  }}
                  formatter={(value: number) => [`$${value}`, "Spent"]}
                />
                <Bar dataKey="spent" fill="var(--accent)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
