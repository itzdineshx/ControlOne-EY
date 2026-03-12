import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Database, Upload, FileUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { fetchDataSources, fetchIngestionJobs, fetchIngestionStats, type DataSourceItem, type IngestionJobItem, type IngestionStatsData } from "@/lib/api";

export default function DataIngestion() {
  const [sources, setSources] = useState<DataSourceItem[]>([]);
  const [recentJobs, setRecentJobs] = useState<IngestionJobItem[]>([]);
  const [stats, setStats] = useState<IngestionStatsData | null>(null);

  useEffect(() => {
    fetchDataSources().then(setSources).catch(console.error);
    fetchIngestionJobs().then(setRecentJobs).catch(console.error);
    fetchIngestionStats().then(setStats).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Data Ingestion</h1>
          <p className="text-sm text-muted-foreground">Manage data sources, uploads, and ingestion pipelines</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Upload className="h-4 w-4" /> New Data Source
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Total Sources", value: stats ? String(stats.total_sources) : "—", icon: Database, color: "text-primary" },
          { label: "Records Today", value: stats ? stats.records_today : "—", icon: FileUp, color: "text-success" },
          { label: "Failed Jobs", value: stats ? String(stats.failed_jobs) : "—", icon: AlertCircle, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-3">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-card-foreground">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connected Sources */}
      <div className="rounded-lg border border-border bg-card p-5 mb-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold text-card-foreground">Connected Data Sources</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Source Name</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Records</th>
                <th className="pb-3 font-medium text-right">Last Sync</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.name} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-card-foreground">{s.name}</td>
                  <td className="py-3 text-muted-foreground">{s.type}</td>
                  <td className="py-3">
                    <span className={
                      s.status === "Connected" ? "severity-low" :
                      s.status === "Processing" ? "severity-medium" : "severity-high"
                    }>{s.status}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{s.records}</td>
                  <td className="py-3 text-right text-muted-foreground">{s.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold text-card-foreground">Recent Ingestion Jobs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Job ID</th>
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Records</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Duration</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((j) => (
                <tr key={j.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-card-foreground">{j.id}</td>
                  <td className="py-3 text-muted-foreground">{j.source}</td>
                  <td className="py-3 text-muted-foreground">{j.records.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={
                      j.status === "Completed" ? "severity-low" :
                      j.status === "In Progress" ? "severity-medium" : "severity-high"
                    }>{j.status}</span>
                  </td>
                  <td className="py-3 text-right text-muted-foreground">{j.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
