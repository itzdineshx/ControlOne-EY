import { useState, useEffect } from "react";
import { Lightbulb, ArrowRight } from "lucide-react";
import { fetchRecommendations, type RecommendationItem } from "@/lib/api";

export function RecommendationsPanel() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);

  useEffect(() => {
    fetchRecommendations().then(setRecommendations).catch(console.error);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold text-card-foreground">System Recommendations</h3>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="group flex items-start gap-3 rounded-md border border-border p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-card-foreground">{rec.title}</p>
                <span
                  className={
                    rec.priority === "High"
                      ? "severity-high"
                      : rec.priority === "Medium"
                      ? "severity-medium"
                      : "severity-low"
                  }
                >
                  {rec.priority}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{rec.description}</p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
