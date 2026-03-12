import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient: string;
}

export function KpiCard({ title, value, change, changeType = "neutral", icon: Icon, gradient }: KpiCardProps) {
  return (
    <div className="kpi-card" style={{ background: gradient }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-85">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {change && (
            <p className="mt-1 text-xs opacity-75">
              {changeType === "positive" && "↑ "}
              {changeType === "negative" && "↓ "}
              {change}
            </p>
          )}
        </div>
        <div className="rounded-md bg-primary-foreground/15 p-2">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
