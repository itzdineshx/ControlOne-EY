import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Search, ShieldAlert, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { fetchRiskByCategory, fetchSecurityPosture, fetchVulnerabilities, fetchRiskScanStats, type RiskByCategoryItem, type SecurityPostureItem, type VulnerabilityItem, type RiskScanStatsData } from "@/lib/api";

export default function RiskScan() {
  const [riskByCategory, setRiskByCategory] = useState<RiskByCategoryItem[]>([]);
  const [radarData, setRadarData] = useState<SecurityPostureItem[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityItem[]>([]);
  const [stats, setStats] = useState<RiskScanStatsData | null>(null);

  useEffect(() => {
    fetchRiskByCategory().then(setRiskByCategory).catch(console.error);
    fetchSecurityPosture().then(setRadarData).catch(console.error);
    fetchVulnerabilities().then(setVulnerabilities).catch(console.error);
    fetchRiskScanStats().then(setStats).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Risk & Vulnerability Scan</h1>
          <p className="text-sm text-muted-foreground">Security assessments, vulnerability tracking, and risk scoring</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Search className="h-4 w-4" /> Run New Scan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: "Total Vulnerabilities", value: stats ? String(stats.total_vulnerabilities) : "—", icon: ShieldAlert, cls: "text-destructive" },
          { label: "Critical", value: stats ? String(stats.critical) : "—", icon: XCircle, cls: "text-destructive" },
          { label: "In Progress", value: stats ? String(stats.in_progress) : "—", icon: AlertTriangle, cls: "text-warning" },
          { label: "Resolved (30d)", value: stats ? String(stats.resolved_30d) : "—", icon: CheckCircle, cls: "text-success" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-3">
              <s.icon className={`h-5 w-5 ${s.cls}`} />
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-card-foreground">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
        <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">Risk Score by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={riskByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 90%)" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} stroke="hsl(215 10% 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 10% 50%)" domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">Security Posture</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(215 20% 90%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} stroke="hsl(215 10% 50%)" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Score" dataKey="A" stroke="hsl(215 70% 45%)" fill="hsl(215 70% 45%)" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vulnerabilities Table */}
      <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold text-card-foreground">Vulnerability Register</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Severity</th>
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Discovered</th>
              </tr>
            </thead>
            <tbody>
              {vulnerabilities.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-card-foreground">{v.id}</td>
                  <td className="py-3 max-w-[250px] truncate text-muted-foreground">{v.title}</td>
                  <td className="py-3">
                    <span className={
                      v.severity === "Critical" || v.severity === "High" ? "severity-high" :
                      v.severity === "Medium" ? "severity-medium" : "severity-low"
                    }>{v.severity}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{v.asset}</td>
                  <td className="py-3">
                    <span className={
                      v.status === "Resolved" ? "severity-low" :
                      v.status === "In Progress" ? "severity-medium" : "severity-high"
                    }>{v.status}</span>
                  </td>
                  <td className="py-3 text-right text-muted-foreground">{v.discovered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
