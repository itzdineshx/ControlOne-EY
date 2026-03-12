import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Lightbulb, ArrowRight, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { fetchSuggestions, fetchSuggestionStats, type SuggestionItem, type SuggestionStatsData } from "@/lib/api";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [stats, setStats] = useState<SuggestionStatsData | null>(null);

  useEffect(() => {
    fetchSuggestions().then(setSuggestions).catch(console.error);
    fetchSuggestionStats().then(setStats).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Suggestions & Recommendations</h1>
        <p className="text-sm text-muted-foreground">AI-generated insights and actionable recommendations for your enterprise</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Open Suggestions", value: stats ? String(stats.open_suggestions) : "—", icon: Lightbulb, cls: "text-warning" },
          { label: "In Review", value: stats ? String(stats.in_review) : "—", icon: Clock, cls: "text-primary" },
          { label: "Implemented", value: stats ? String(stats.implemented) : "—", icon: CheckCircle, cls: "text-success" },
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

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.map((s) => (
          <div key={s.id} className="group rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">{s.id}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{s.category}</span>
                  <span className={
                    s.status === "Open" ? "severity-medium" :
                    s.status === "In Review" ? "severity-low" : "severity-low"
                  }>{s.status}</span>
                </div>
                <h3 className="text-sm font-semibold text-card-foreground mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                  <span>Impact: <span className={s.impact === "High" ? "font-medium text-destructive" : "font-medium"}>{s.impact}</span></span>
                  <span>Effort: <span className="font-medium">{s.effort}</span></span>
                </div>
              </div>
              <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
