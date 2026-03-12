import {
  LayoutDashboard,
  Database,
  Brain,
  ShieldCheck,
  Search,
  Bell,
  Lightbulb,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

const navItems = [
  { title: "Dashboard Overview", url: "/", icon: LayoutDashboard },
  { title: "Data Ingestion", url: "/data-ingestion", icon: Database },
  { title: "Data Processing & NLP", url: "/nlp-analysis", icon: Brain },
  { title: "Sensitive Data Masking", url: "/data-masking", icon: ShieldCheck },
  { title: "Risk & Vulnerability", url: "/risk-scan", icon: Search },
  { title: "Alerts & Notifications", url: "/alerts", icon: Bell },
  { title: "Suggestions", url: "/suggestions", icon: Lightbulb },
  { title: "Reports & Audit Logs", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary">
          <span className="text-sm font-bold text-sidebar-primary-foreground">C1</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="truncate text-sm font-semibold text-sidebar-accent-foreground">
              ControlOne
            </h1>
            <p className="truncate text-[10px] text-sidebar-foreground">
              Enterprise Governance
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-10 items-center justify-center border-t border-sidebar-border text-sidebar-foreground transition-colors hover:text-sidebar-accent-foreground"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
