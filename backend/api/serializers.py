from rest_framework import serializers
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


class KpiSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = KpiSnapshot
        fields = '__all__'


class RiskTrendPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskTrendPoint
        fields = ['id', 'month', 'risk']


class VulnerabilityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VulnerabilityCategory
        fields = ['id', 'category', 'count']


class AlertSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='alert_id')
    time = serializers.SerializerMethodField()

    class Meta:
        model = Alert
        fields = ['id', 'title', 'message', 'category', 'severity', 'read', 'time']

    def get_time(self, obj):
        from django.utils import timezone
        from datetime import timedelta
        delta = timezone.now() - obj.created_at
        if delta < timedelta(minutes=1):
            return "just now"
        elif delta < timedelta(hours=1):
            mins = int(delta.total_seconds() / 60)
            return f"{mins} min ago"
        elif delta < timedelta(days=1):
            hrs = int(delta.total_seconds() / 3600)
            return f"{hrs} hr{'s' if hrs > 1 else ''} ago"
        else:
            days = delta.days
            return f"{days} day{'s' if days > 1 else ''} ago"


class AlertStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlertStats
        fields = ['unread_alerts', 'total_today', 'dismissed']


class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ['id', 'title', 'description', 'priority']


class DataSourceSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='source_type')
    lastSync = serializers.CharField(source='last_sync')

    class Meta:
        model = DataSource
        fields = ['id', 'name', 'type', 'status', 'records', 'lastSync']


class IngestionJobSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='job_id')

    class Meta:
        model = IngestionJob
        fields = ['id', 'source', 'records', 'status', 'duration']


class IngestionStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngestionStats
        fields = ['total_sources', 'records_today', 'failed_jobs']


class MaskingRuleSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='mask_type')

    class Meta:
        model = MaskingRule
        fields = ['id', 'field', 'pattern', 'type', 'applied', 'status']


class DetectedPIISerializer(serializers.ModelSerializer):
    class Meta:
        model = DetectedPII
        fields = ['id', 'source', 'field', 'records', 'masked', 'confidence']


class MaskingStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaskingStats
        fields = ['pii_fields_detected', 'fields_masked', 'coverage_rate', 'active_rules']


class SentimentDataPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentDataPoint
        fields = ['id', 'name', 'value', 'color']


class EntityDataPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntityDataPoint
        fields = ['id', 'entity', 'count']


class NlpAnalysisSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='analysis_id')

    class Meta:
        model = NlpAnalysis
        fields = ['id', 'document', 'entities', 'sentiment', 'topics', 'status']


class NlpStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NlpStats
        fields = ['documents_processed', 'entities_extracted', 'avg_confidence', 'active_models']


class ReportSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='report_id')
    type = serializers.CharField(source='report_type')

    class Meta:
        model = Report
        fields = ['id', 'name', 'type', 'generated', 'size', 'status']


class AuditLogSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = AuditLog
        fields = ['id', 'timestamp', 'user', 'action', 'module', 'ip']


class RiskByCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskByCategory
        fields = ['id', 'category', 'score']


class SecurityPostureSerializer(serializers.ModelSerializer):
    subject = serializers.CharField()
    A = serializers.IntegerField(source='score')
    fullMark = serializers.IntegerField(source='full_mark')

    class Meta:
        model = SecurityPosture
        fields = ['id', 'subject', 'A', 'fullMark']


class VulnerabilitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='vuln_id')

    class Meta:
        model = Vulnerability
        fields = ['id', 'title', 'severity', 'asset', 'status', 'discovered']


class RiskScanStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskScanStats
        fields = ['total_vulnerabilities', 'critical', 'in_progress', 'resolved_30d']


class GeneralSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralSetting
        fields = ['id', 'label', 'value']


class NotificationPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationPreference
        fields = ['id', 'label', 'enabled']


class SecuritySettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecuritySetting
        fields = ['id', 'label', 'enabled']


class PlatformUserSerializer(serializers.ModelSerializer):
    lastLogin = serializers.CharField(source='last_login')

    class Meta:
        model = PlatformUser
        fields = ['id', 'name', 'email', 'role', 'status', 'lastLogin']


class ApiKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiKey
        fields = ['id', 'name', 'key', 'created']


class SuggestionSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='suggestion_id')

    class Meta:
        model = Suggestion
        fields = ['id', 'title', 'description', 'category', 'impact', 'effort', 'status']


class SuggestionStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestionStats
        fields = ['open_suggestions', 'in_review', 'implemented']
