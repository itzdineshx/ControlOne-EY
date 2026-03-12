const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ─── Dashboard / Index ──────────────────────────────────────

export interface KpiData {
  total_records_processed: number;
  records_change_text: string;
  records_change_type: "positive" | "negative" | "neutral";
  active_alerts: number;
  alerts_change_text: string;
  alerts_change_type: string;
  identified_vulnerabilities: number;
  vulnerabilities_change_text: string;
  vulnerabilities_change_type: string;
  pending_actions: number;
  actions_change_text: string;
  actions_change_type: string;
}

export interface RiskTrendPoint {
  month: string;
  risk: number;
}

export interface VulnCategory {
  category: string;
  count: number;
}

export const fetchKpi = () => fetchJson<KpiData | null>("/dashboard/kpi/");
export const fetchRiskTrend = () => fetchJson<RiskTrendPoint[]>("/risk-trend/");
export const fetchVulnCategories = () => fetchJson<VulnCategory[]>("/vulnerability-categories/");

// ─── Alerts ─────────────────────────────────────────────────

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  category: string;
  severity: string;
  read: boolean;
  time: string;
}

export interface AlertStatsData {
  unread_alerts: number;
  total_today: number;
  dismissed: number;
}

export const fetchAlerts = () => fetchJson<AlertItem[]>("/alerts/");
export const fetchAlertStats = () => fetchJson<AlertStatsData>("/alert-stats/");

// ─── Recommendations ────────────────────────────────────────

export interface RecommendationItem {
  id: number;
  title: string;
  description: string;
  priority: string;
}

export const fetchRecommendations = () => fetchJson<RecommendationItem[]>("/recommendations/");

// ─── Data Ingestion ─────────────────────────────────────────

export interface DataSourceItem {
  id: number;
  name: string;
  type: string;
  status: string;
  records: string;
  lastSync: string;
}

export interface IngestionJobItem {
  id: string;
  source: string;
  records: number;
  status: string;
  duration: string;
}

export interface IngestionStatsData {
  total_sources: number;
  records_today: string;
  failed_jobs: number;
}

export const fetchDataSources = () => fetchJson<DataSourceItem[]>("/data-sources/");
export const fetchIngestionJobs = () => fetchJson<IngestionJobItem[]>("/ingestion-jobs/");
export const fetchIngestionStats = () => fetchJson<IngestionStatsData>("/ingestion-stats/");

// ─── Data Masking ───────────────────────────────────────────

export interface MaskingRuleItem {
  id: number;
  field: string;
  pattern: string;
  type: string;
  applied: number;
  status: string;
}

export interface DetectedPIIItem {
  id: number;
  source: string;
  field: string;
  records: number;
  masked: boolean;
  confidence: number;
}

export interface MaskingStatsData {
  pii_fields_detected: number;
  fields_masked: number;
  coverage_rate: string;
  active_rules: number;
}

export const fetchMaskingRules = () => fetchJson<MaskingRuleItem[]>("/masking-rules/");
export const fetchDetectedPII = () => fetchJson<DetectedPIIItem[]>("/detected-pii/");
export const fetchMaskingStats = () => fetchJson<MaskingStatsData>("/masking-stats/");

// ─── NLP Analysis ───────────────────────────────────────────

export interface SentimentDataItem {
  name: string;
  value: number;
  color: string;
}

export interface EntityDataItem {
  entity: string;
  count: number;
}

export interface NlpAnalysisItem {
  id: string;
  document: string;
  entities: number;
  sentiment: string;
  topics: number;
  status: string;
}

export interface NlpStatsData {
  documents_processed: string;
  entities_extracted: string;
  avg_confidence: string;
  active_models: number;
}

export const fetchSentimentData = () => fetchJson<SentimentDataItem[]>("/sentiment-data/");
export const fetchEntityData = () => fetchJson<EntityDataItem[]>("/entity-data/");
export const fetchNlpAnalyses = () => fetchJson<NlpAnalysisItem[]>("/nlp-analyses/");
export const fetchNlpStats = () => fetchJson<NlpStatsData>("/nlp-stats/");

// ─── Reports & Audit ────────────────────────────────────────

export interface ReportItem {
  id: string;
  name: string;
  type: string;
  generated: string;
  size: string;
  status: string;
}

export interface AuditLogItem {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  ip: string;
}

export const fetchReports = () => fetchJson<ReportItem[]>("/reports/");
export const fetchAuditLogs = () => fetchJson<AuditLogItem[]>("/audit-logs/");

// ─── Risk Scan ──────────────────────────────────────────────

export interface RiskByCategoryItem {
  category: string;
  score: number;
}

export interface SecurityPostureItem {
  subject: string;
  A: number;
  fullMark: number;
}

export interface VulnerabilityItem {
  id: string;
  title: string;
  severity: string;
  asset: string;
  status: string;
  discovered: string;
}

export interface RiskScanStatsData {
  total_vulnerabilities: number;
  critical: number;
  in_progress: number;
  resolved_30d: number;
}

export const fetchRiskByCategory = () => fetchJson<RiskByCategoryItem[]>("/risk-by-category/");
export const fetchSecurityPosture = () => fetchJson<SecurityPostureItem[]>("/security-posture/");
export const fetchVulnerabilities = () => fetchJson<VulnerabilityItem[]>("/vulnerabilities/");
export const fetchRiskScanStats = () => fetchJson<RiskScanStatsData>("/riskscan-stats/");

// ─── Settings ───────────────────────────────────────────────

export interface GeneralSettingItem {
  id: number;
  label: string;
  value: string;
}

export interface NotificationPrefItem {
  id: number;
  label: string;
  enabled: boolean;
}

export interface SecuritySettingItem {
  id: number;
  label: string;
  enabled: boolean;
}

export interface PlatformUserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export interface ApiKeyItem {
  id: number;
  name: string;
  key: string;
  created: string;
}

export const fetchGeneralSettings = () => fetchJson<GeneralSettingItem[]>("/general-settings/");
export const fetchNotificationPrefs = () => fetchJson<NotificationPrefItem[]>("/notification-preferences/");
export const fetchSecuritySettings = () => fetchJson<SecuritySettingItem[]>("/security-settings/");
export const fetchPlatformUsers = () => fetchJson<PlatformUserItem[]>("/platform-users/");
export const fetchApiKeys = () => fetchJson<ApiKeyItem[]>("/api-keys/");

// ─── Suggestions ────────────────────────────────────────────

export interface SuggestionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  effort: string;
  status: string;
}

export interface SuggestionStatsData {
  open_suggestions: number;
  in_review: number;
  implemented: number;
}

export const fetchSuggestions = () => fetchJson<SuggestionItem[]>("/suggestions/");
export const fetchSuggestionStats = () => fetchJson<SuggestionStatsData>("/suggestion-stats/");
