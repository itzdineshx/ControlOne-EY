import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { FileText, Download, Calendar, Filter } from "lucide-react";
import { fetchReports, fetchAuditLogs, type ReportItem, type AuditLogItem } from "@/lib/api";

export default function Reports() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  useEffect(() => {
    fetchReports().then(setReports).catch(console.error);
    fetchAuditLogs().then(setAuditLogs).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Reports & Audit Logs</h1>
          <p className="text-sm text-muted-foreground">Generated reports, export history, and complete audit trail</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <FileText className="h-4 w-4" /> Generate Report
        </button>
      </div>

      {/* Reports */}
      <div className="rounded-lg border border-border bg-card p-5 mb-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="mb-4 text-sm font-semibold text-card-foreground">Generated Reports</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Report ID</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Generated</th>
                <th className="pb-3 font-medium">Size</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-card-foreground">{r.id}</td>
                  <td className="py-3 max-w-[280px] truncate text-muted-foreground">{r.name}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{r.type}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{r.generated}</td>
                  <td className="py-3 text-muted-foreground">{r.size}</td>
                  <td className="py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-card-foreground">Audit Logs</h3>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted">
              <Calendar className="h-3.5 w-3.5" /> Date Range
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Timestamp</th>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Action</th>
                <th className="pb-3 font-medium">Module</th>
                <th className="pb-3 font-medium text-right">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 font-mono text-xs text-muted-foreground">{log.timestamp}</td>
                  <td className="py-3 text-muted-foreground">{log.user}</td>
                  <td className="py-3 text-card-foreground">{log.action}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{log.module}</span>
                  </td>
                  <td className="py-3 text-right font-mono text-xs text-muted-foreground">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
