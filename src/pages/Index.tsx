import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { RiskTrendChart, VulnerabilityCategoryChart } from "@/components/ChartSection";
import { RecentAlertsTable } from "@/components/RecentAlertsTable";
import { RecommendationsPanel } from "@/components/RecommendationsPanel";
import { FileText, AlertTriangle, ShieldAlert, Clock } from "lucide-react";
import { fetchKpi, type KpiData } from "@/lib/api";

const Index = () => {
  const [kpi, setKpi] = useState<KpiData | null>(null);

  useEffect(() => {
    fetchKpi().then(setKpi).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Records Processed"
          value={kpi ? kpi.total_records_processed.toLocaleString() : "—"}
          change={kpi?.records_change_text}
          changeType={(kpi?.records_change_type as "positive" | "negative" | "neutral") ?? "neutral"}
          icon={FileText}
          gradient="var(--kpi-gradient-1)"
        />
        <KpiCard
          title="Active Alerts"
          value={kpi ? kpi.active_alerts : "—"}
          change={kpi?.alerts_change_text}
          changeType={(kpi?.alerts_change_type as "positive" | "negative" | "neutral") ?? "neutral"}
          icon={AlertTriangle}
          gradient="var(--kpi-gradient-2)"
        />
        <KpiCard
          title="Identified Vulnerabilities"
          value={kpi ? kpi.identified_vulnerabilities : "—"}
          change={kpi?.vulnerabilities_change_text}
          changeType={(kpi?.vulnerabilities_change_type as "positive" | "negative" | "neutral") ?? "neutral"}
          icon={ShieldAlert}
          gradient="var(--kpi-gradient-3)"
        />
        <KpiCard
          title="Pending Actions"
          value={kpi ? kpi.pending_actions : "—"}
          change={kpi?.actions_change_text}
          changeType={(kpi?.actions_change_type as "positive" | "negative" | "neutral") ?? "neutral"}
          icon={Clock}
          gradient="var(--kpi-gradient-4)"
        />
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RiskTrendChart />
        <VulnerabilityCategoryChart />
      </div>

      {/* Table & Recommendations */}
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentAlertsTable />
        </div>
        <RecommendationsPanel />
      </div>
    </DashboardLayout>
  );
};

export default Index;
