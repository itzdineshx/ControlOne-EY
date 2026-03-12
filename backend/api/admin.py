from django.contrib import admin
from .models import (
    KpiSnapshot, RiskTrendPoint, VulnerabilityCategory,
    Alert, AlertStats, Recommendation,
    DataSource, IngestionJob, IngestionStats,
    MaskingRule, DetectedPII, MaskingStats,
    SentimentDataPoint, EntityDataPoint, NlpAnalysis, NlpStats,
    Report, AuditLog,
    RiskByCategory, SecurityPosture, Vulnerability, RiskScanStats,
    GeneralSetting, NotificationPreference, SecuritySetting, PlatformUser, ApiKey,
    Suggestion, SuggestionStats,
)


@admin.register(KpiSnapshot)
class KpiSnapshotAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'total_records_processed', 'active_alerts', 'identified_vulnerabilities', 'pending_actions')


@admin.register(RiskTrendPoint)
class RiskTrendPointAdmin(admin.ModelAdmin):
    list_display = ('month', 'risk', 'order')


@admin.register(VulnerabilityCategory)
class VulnerabilityCategoryAdmin(admin.ModelAdmin):
    list_display = ('category', 'count')


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ('alert_id', 'title', 'severity', 'category', 'read', 'created_at')
    list_filter = ('severity', 'category', 'read')


@admin.register(AlertStats)
class AlertStatsAdmin(admin.ModelAdmin):
    list_display = ('unread_alerts', 'total_today', 'dismissed')


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ('title', 'priority', 'order')


@admin.register(DataSource)
class DataSourceAdmin(admin.ModelAdmin):
    list_display = ('name', 'source_type', 'status', 'records', 'last_sync')


@admin.register(IngestionJob)
class IngestionJobAdmin(admin.ModelAdmin):
    list_display = ('job_id', 'source', 'records', 'status', 'duration')


@admin.register(IngestionStats)
class IngestionStatsAdmin(admin.ModelAdmin):
    list_display = ('total_sources', 'records_today', 'failed_jobs')


@admin.register(MaskingRule)
class MaskingRuleAdmin(admin.ModelAdmin):
    list_display = ('field', 'pattern', 'mask_type', 'applied', 'status')


@admin.register(DetectedPII)
class DetectedPIIAdmin(admin.ModelAdmin):
    list_display = ('source', 'field', 'records', 'masked', 'confidence')


@admin.register(MaskingStats)
class MaskingStatsAdmin(admin.ModelAdmin):
    list_display = ('pii_fields_detected', 'fields_masked', 'coverage_rate', 'active_rules')


@admin.register(SentimentDataPoint)
class SentimentDataPointAdmin(admin.ModelAdmin):
    list_display = ('name', 'value', 'color')


@admin.register(EntityDataPoint)
class EntityDataPointAdmin(admin.ModelAdmin):
    list_display = ('entity', 'count')


@admin.register(NlpAnalysis)
class NlpAnalysisAdmin(admin.ModelAdmin):
    list_display = ('analysis_id', 'document', 'entities', 'sentiment', 'topics', 'status')


@admin.register(NlpStats)
class NlpStatsAdmin(admin.ModelAdmin):
    list_display = ('documents_processed', 'entities_extracted', 'avg_confidence', 'active_models')


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('report_id', 'name', 'report_type', 'generated', 'size', 'status')


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'user', 'action', 'module', 'ip')
    list_filter = ('module',)


@admin.register(RiskByCategory)
class RiskByCategoryAdmin(admin.ModelAdmin):
    list_display = ('category', 'score')


@admin.register(SecurityPosture)
class SecurityPostureAdmin(admin.ModelAdmin):
    list_display = ('subject', 'score', 'full_mark')


@admin.register(Vulnerability)
class VulnerabilityAdmin(admin.ModelAdmin):
    list_display = ('vuln_id', 'title', 'severity', 'asset', 'status', 'discovered')
    list_filter = ('severity', 'status')


@admin.register(RiskScanStats)
class RiskScanStatsAdmin(admin.ModelAdmin):
    list_display = ('total_vulnerabilities', 'critical', 'in_progress', 'resolved_30d')


@admin.register(GeneralSetting)
class GeneralSettingAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'order')


@admin.register(NotificationPreference)
class NotificationPreferenceAdmin(admin.ModelAdmin):
    list_display = ('label', 'enabled', 'order')


@admin.register(SecuritySetting)
class SecuritySettingAdmin(admin.ModelAdmin):
    list_display = ('label', 'enabled', 'order')


@admin.register(PlatformUser)
class PlatformUserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role', 'status', 'last_login')


@admin.register(ApiKey)
class ApiKeyAdmin(admin.ModelAdmin):
    list_display = ('name', 'key', 'created')


@admin.register(Suggestion)
class SuggestionAdmin(admin.ModelAdmin):
    list_display = ('suggestion_id', 'title', 'category', 'impact', 'effort', 'status')
    list_filter = ('category', 'status', 'impact')


@admin.register(SuggestionStats)
class SuggestionStatsAdmin(admin.ModelAdmin):
    list_display = ('open_suggestions', 'in_review', 'implemented')
