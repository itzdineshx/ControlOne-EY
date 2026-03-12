import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAlerts, type AlertItem } from "@/lib/api";

export function RecentAlertsTable() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    fetchAlerts()
      .then((data) => setAlerts(data.slice(0, 5)))
      .catch(console.error);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">Recent Alerts</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Alert ID</TableHead>
            <TableHead className="text-xs">Description</TableHead>
            <TableHead className="text-xs">Severity</TableHead>
            <TableHead className="text-xs text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="text-xs font-medium">{alert.id}</TableCell>
              <TableCell className="max-w-[300px] truncate text-xs">{alert.message || alert.title}</TableCell>
              <TableCell>
                <span className={`severity-${alert.severity.toLowerCase()}`}>{alert.severity}</span>
              </TableCell>
              <TableCell className="text-right text-xs text-muted-foreground">{alert.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
