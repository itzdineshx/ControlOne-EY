from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
from .serializers import (
    KpiSnapshotSerializer, RiskTrendPointSerializer, VulnerabilityCategorySerializer,
    AlertSerializer, AlertStatsSerializer, RecommendationSerializer,
    DataSourceSerializer, IngestionJobSerializer, IngestionStatsSerializer,
    MaskingRuleSerializer, DetectedPIISerializer, MaskingStatsSerializer,
    SentimentDataPointSerializer, EntityDataPointSerializer, NlpAnalysisSerializer, NlpStatsSerializer,
    ReportSerializer, AuditLogSerializer,
    RiskByCategorySerializer, SecurityPostureSerializer, VulnerabilitySerializer, RiskScanStatsSerializer,
    GeneralSettingSerializer, NotificationPreferenceSerializer, SecuritySettingSerializer,
    PlatformUserSerializer, ApiKeySerializer,
    SuggestionSerializer, SuggestionStatsSerializer,
)


# ───────────── Helper for singleton stats ─────────────

def _get_or_empty(model_class, serializer_class):
    """Return first instance or empty dict with default field values."""
    obj = model_class.objects.first()
    if obj:
        return serializer_class(obj).data
    return {}


# ───────────── Dashboard / Index ──────────────────────

@api_view(['GET'])
def dashboard_kpi(request):
    snapshot = KpiSnapshot.objects.first()
    if snapshot:
        data = KpiSnapshotSerializer(snapshot).data
    else:
        data = None
    return Response(data)


class RiskTrendViewSet(viewsets.ModelViewSet):
    queryset = RiskTrendPoint.objects.all()
    serializer_class = RiskTrendPointSerializer


class VulnerabilityCategoryViewSet(viewsets.ModelViewSet):
    queryset = VulnerabilityCategory.objects.all()
    serializer_class = VulnerabilityCategorySerializer


# ───────────── Alerts ─────────────────────────────────

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer


@api_view(['GET'])
def alert_stats(request):
    return Response(_get_or_empty(AlertStats, AlertStatsSerializer))


# ───────────── Recommendations ────────────────────────

class RecommendationViewSet(viewsets.ModelViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer


# ───────────── Data Ingestion ─────────────────────────

class DataSourceViewSet(viewsets.ModelViewSet):
    queryset = DataSource.objects.all()
    serializer_class = DataSourceSerializer


class IngestionJobViewSet(viewsets.ModelViewSet):
    queryset = IngestionJob.objects.all()
    serializer_class = IngestionJobSerializer


@api_view(['GET'])
def ingestion_stats(request):
    return Response(_get_or_empty(IngestionStats, IngestionStatsSerializer))


# ───────────── Data Masking ───────────────────────────

class MaskingRuleViewSet(viewsets.ModelViewSet):
    queryset = MaskingRule.objects.all()
    serializer_class = MaskingRuleSerializer


class DetectedPIIViewSet(viewsets.ModelViewSet):
    queryset = DetectedPII.objects.all()
    serializer_class = DetectedPIISerializer


@api_view(['GET'])
def masking_stats(request):
    return Response(_get_or_empty(MaskingStats, MaskingStatsSerializer))


# ───────────── NLP Analysis ──────────────────────────

class SentimentDataViewSet(viewsets.ModelViewSet):
    queryset = SentimentDataPoint.objects.all()
    serializer_class = SentimentDataPointSerializer


class EntityDataViewSet(viewsets.ModelViewSet):
    queryset = EntityDataPoint.objects.all()
    serializer_class = EntityDataPointSerializer


class NlpAnalysisViewSet(viewsets.ModelViewSet):
    queryset = NlpAnalysis.objects.all()
    serializer_class = NlpAnalysisSerializer


@api_view(['GET'])
def nlp_stats(request):
    return Response(_get_or_empty(NlpStats, NlpStatsSerializer))


# ───────────── Reports & Audit ───────────────────────

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class AuditLogViewSet(viewsets.ModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer


# ───────────── Risk Scan ─────────────────────────────

class RiskByCategoryViewSet(viewsets.ModelViewSet):
    queryset = RiskByCategory.objects.all()
    serializer_class = RiskByCategorySerializer


class SecurityPostureViewSet(viewsets.ModelViewSet):
    queryset = SecurityPosture.objects.all()
    serializer_class = SecurityPostureSerializer


class VulnerabilityViewSet(viewsets.ModelViewSet):
    queryset = Vulnerability.objects.all()
    serializer_class = VulnerabilitySerializer


@api_view(['GET'])
def riskscan_stats(request):
    return Response(_get_or_empty(RiskScanStats, RiskScanStatsSerializer))


# ───────────── Settings ──────────────────────────────

class GeneralSettingViewSet(viewsets.ModelViewSet):
    queryset = GeneralSetting.objects.all()
    serializer_class = GeneralSettingSerializer


class NotificationPreferenceViewSet(viewsets.ModelViewSet):
    queryset = NotificationPreference.objects.all()
    serializer_class = NotificationPreferenceSerializer


class SecuritySettingViewSet(viewsets.ModelViewSet):
    queryset = SecuritySetting.objects.all()
    serializer_class = SecuritySettingSerializer


class PlatformUserViewSet(viewsets.ModelViewSet):
    queryset = PlatformUser.objects.all()
    serializer_class = PlatformUserSerializer


class ApiKeyViewSet(viewsets.ModelViewSet):
    queryset = ApiKey.objects.all()
    serializer_class = ApiKeySerializer


# ───────────── Suggestions ───────────────────────────

class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer


@api_view(['GET'])
def suggestion_stats(request):
    return Response(_get_or_empty(SuggestionStats, SuggestionStatsSerializer))
