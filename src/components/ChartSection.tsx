import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchRiskTrend, fetchVulnCategories, type RiskTrendPoint, type VulnCategory } from "@/lib/api";

export function RiskTrendChart() {
  const [data, setData] = useState<RiskTrendPoint[]>([]);

  useEffect(() => {
    fetchRiskTrend().then(setData).catch(console.error);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">Risk Trend Over Time</h3>
      {data.length === 0 ? (
        <p className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215 10% 50%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 10% 50%)" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="hsl(215 70% 45%)"
              strokeWidth={2}
              dot={{ fill: "hsl(215 70% 45%)", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export function VulnerabilityCategoryChart() {
  const [data, setData] = useState<VulnCategory[]>([]);

  useEffect(() => {
    fetchVulnCategories().then(setData).catch(console.error);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">Vulnerability Categories</h3>
      {data.length === 0 ? (
        <p className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 90%)" />
            <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(215 10% 50%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 10% 50%)" />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(215 70% 45%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
