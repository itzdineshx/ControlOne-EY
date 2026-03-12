import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Bell, BellRing, BellOff, Filter, CheckCheck } from "lucide-react";
import { fetchAlerts, fetchAlertStats, type AlertItem, type AlertStatsData } from "@/lib/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [stats, setStats] = useState<AlertStatsData | null>(null);

  useEffect(() => {
    fetchAlerts().then(setAlerts).catch(console.error);
    fetchAlertStats().then(setStats).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Alerts & Notifications</h1>
          <p className="text-sm text-muted-foreground">Monitor system alerts, security events, and compliance notifications</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
            <CheckCheck className="h-4 w-4" /> Mark All Read
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Unread Alerts", value: stats ? String(stats.unread_alerts) : "—", icon: BellRing, cls: "text-destructive" },
          { label: "Total Today", value: stats ? String(stats.total_today) : "—", icon: Bell, cls: "text-primary" },
          { label: "Dismissed", value: stats ? String(stats.dismissed) : "—", icon: BellOff, cls: "text-muted-foreground" },
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

      {/* Alert List */}
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg border bg-card p-4 transition-colors ${
              !alert.read ? "border-primary/30 bg-primary/[0.02]" : "border-border"
            }`}
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {!alert.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={`text-sm ${!alert.read ? "font-semibold" : "font-medium"} text-card-foreground`}>{alert.title}</p>
                    <span className={
                      alert.severity === "Critical" || alert.severity === "High" ? "severity-high" :
                      alert.severity === "Medium" ? "severity-medium" : "severity-low"
                    }>{alert.severity}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{alert.id}</span>
                    <span>•</span>
                    <span>{alert.category}</span>
                    <span>•</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
