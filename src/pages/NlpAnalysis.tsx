import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Brain, FileText, Tags, TrendingUp, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { fetchSentimentData, fetchEntityData, fetchNlpAnalyses, fetchNlpStats, type SentimentDataItem, type EntityDataItem, type NlpAnalysisItem, type NlpStatsData } from "@/lib/api";

export default function NlpAnalysis() {
  const [sentimentData, setSentimentData] = useState<SentimentDataItem[]>([]);
  const [entityData, setEntityData] = useState<EntityDataItem[]>([]);
  const [recentAnalyses, setRecentAnalyses] = useState<NlpAnalysisItem[]>([]);
  const [stats, setStats] = useState<NlpStatsData | null>(null);

  useEffect(() => {
    fetchSentimentData().then(setSentimentData).catch(console.error);
    fetchEntityData().then(setEntityData).catch(console.error);
    fetchNlpAnalyses().then(setRecentAnalyses).catch(console.error);
    fetchNlpStats().then(setStats).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Data Processing & NLP Analysis</h1>
        <p className="text-sm text-muted-foreground">Natural language processing pipeline and text analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: "Documents Processed", value: stats ? stats.documents_processed : "—", icon: FileText },
          { label: "Entities Extracted", value: stats ? stats.entities_extracted : "—", icon: Tags },
          { label: "Avg. Confidence", value: stats ? stats.avg_confidence : "—", icon: TrendingUp },
          { label: "Active Models", value: stats ? String(stats.active_models) : "—", icon: Brain },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-primary/10 p-2">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-card-foreground">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
        <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                {sentimentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {sentimentData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                {s.name} ({s.value}%)
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">Named Entity Recognition</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={entityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 90%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(215 10% 50%)" />
              <YAxis dataKey="entity" type="category" tick={{ fontSize: 12 }} stroke="hsl(215 10% 50%)" width={90} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(215 70% 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold text-card-foreground">Recent Analyses</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Document</th>
                <th className="pb-3 font-medium">Entities</th>
                <th className="pb-3 font-medium">Sentiment</th>
                <th className="pb-3 font-medium">Topics</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAnalyses.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-card-foreground">{a.id}</td>
                  <td className="py-3 text-muted-foreground">{a.document}</td>
                  <td className="py-3 text-muted-foreground">{a.entities.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={
                      a.sentiment === "Positive" ? "severity-low" :
                      a.sentiment === "Negative" ? "severity-high" : "severity-medium"
                    }>{a.sentiment}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{a.topics}</td>
                  <td className="py-3 text-right">
                    <span className={a.status === "Completed" ? "severity-low" : "severity-medium"}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
