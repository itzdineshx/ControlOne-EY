import { Bell, User, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Dashboard Overview</h2>
        <p className="text-xs text-muted-foreground">
          Enterprise management & governance insights
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-md p-2 transition-colors hover:bg-muted">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground"></p>
            <p className="text-[10px] text-muted-foreground"></p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
