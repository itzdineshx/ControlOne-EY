import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Settings as SettingsIcon, User, Shield, Bell, Database, Key, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { fetchGeneralSettings, fetchNotificationPrefs, fetchSecuritySettings, fetchPlatformUsers, fetchApiKeys, type GeneralSettingItem, type NotificationPrefItem, type SecuritySettingItem, type PlatformUserItem, type ApiKeyItem } from "@/lib/api";

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettingItem[]>([]);
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefItem[]>([]);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettingItem[]>([]);
  const [users, setUsers] = useState<PlatformUserItem[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);

  useEffect(() => {
    fetchGeneralSettings().then(setGeneralSettings).catch(console.error);
    fetchNotificationPrefs().then(setNotificationPrefs).catch(console.error);
    fetchSecuritySettings().then(setSecuritySettings).catch(console.error);
    fetchPlatformUsers().then(setUsers).catch(console.error);
    fetchApiKeys().then(setApiKeys).catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Platform configuration, user management, and system preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Settings panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* General */}
          <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">General Settings</h3>
            </div>
            <div className="space-y-4">
              {generalSettings.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-card-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">Notification Preferences</h3>
            </div>
            <div className="space-y-4">
              {notificationPrefs.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">Security Settings</h3>
            </div>
            <div className="space-y-4">
              {securitySettings.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: User Management */}
        <div>
          <div className="rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-card-foreground">User Management</h3>
              </div>
              <button className="text-xs text-primary hover:underline">+ Add User</button>
            </div>
            <div className="space-y-3">
              {users.map((u) => (
                <div key={u.email} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-card-foreground">{u.name}</p>
                    <span className={u.status === "Active" ? "severity-low" : "severity-medium"}>{u.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">{u.role}</span>
                    <span>{u.lastLogin}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Keys */}
          <div className="mt-6 rounded-lg border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Key className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">API Keys</h3>
            </div>
            <div className="space-y-3">
              {apiKeys.map((k) => (
                <div key={k.name} className="rounded-md border border-border p-3">
                  <p className="text-sm font-medium text-card-foreground">{k.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{k.key}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">Created: {k.created}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
