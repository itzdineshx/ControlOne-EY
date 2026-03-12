import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ShieldCheck, Eye, EyeOff, Lock, Settings2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { fetchMaskingRules, fetchDetectedPII, fetchMaskingStats, type MaskingRuleItem, type DetectedPIIItem, type MaskingStatsData } from "@/lib/api";

export default function DataMasking() {
  const [maskingRules, setMaskingRules] = useState<MaskingRuleItem[]>([]);
  const [detectedPII, setDetectedPII] = useState<DetectedPIIItem[]>([]);
  const [stats, setStats] = useState<MaskingStatsData | null>(null);

  useEffect(() => {
    fetchMaskingRules().then(setMaskingRules).catch(console.error);
    fetchDetectedPII().then(setDetectedPII).catch(console.error);
    fetchMaskingStats().then(setStats).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Sensitive Data Masking</h1>
          <p className="text-sm text-muted-foreground">PII detection, masking rules, and data protection policies</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Settings2 className="h-4 w-4" /> Configure Rules
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: "PII Fields Detected", value: stats ? String(stats.pii_fields_detected) : "—", icon: Eye },
          { label: "Fields Masked", value: stats ? String(stats.fields_masked) : "—", icon: EyeOff },
          { label: "Coverage Rate", value: stats ? stats.coverage_rate : "—", icon: ShieldCheck },
          { label: "Active Rules", value: stats ? String(stats.active_rules) : "—", icon: Lock },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-primary/10 p-2"><s.icon className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-card-foreground">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Masking Rules */}
      <div className="rounded-lg border border-border bg-card p-5 mb-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold text-card-foreground">Masking Rules</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Field</th>
                <th className="pb-3 font-medium">Mask Pattern</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Records Applied</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {maskingRules.map((r) => (
                <tr key={r.field} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-card-foreground">{r.field}</td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{r.pattern}</td>
                  <td className="py-3 text-muted-foreground">{r.type}</td>
                  <td className="py-3 text-muted-foreground">{r.applied.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className={r.status === "Active" ? "severity-low" : "severity-medium"}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detected PII */}
      <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold text-card-foreground">Detected PII Fields</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Field</th>
                <th className="pb-3 font-medium">Records</th>
                <th className="pb-3 font-medium">Confidence</th>
                <th className="pb-3 font-medium text-right">Masked</th>
              </tr>
            </thead>
            <tbody>
              {detectedPII.map((p) => (
                <tr key={p.field} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-card-foreground">{p.source}</td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{p.field}</td>
                  <td className="py-3 text-muted-foreground">{p.records.toLocaleString()}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Progress value={p.confidence} className="h-1.5 w-16" />
                      <span className="text-xs text-muted-foreground">{p.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className={p.masked ? "severity-low" : "severity-high"}>{p.masked ? "Yes" : "No"}</span>
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
