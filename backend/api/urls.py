from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Dashboard
router.register(r'risk-trend', views.RiskTrendViewSet)
router.register(r'vulnerability-categories', views.VulnerabilityCategoryViewSet)

# Alerts
router.register(r'alerts', views.AlertViewSet)

# Recommendations
router.register(r'recommendations', views.RecommendationViewSet)

# Data Ingestion
router.register(r'data-sources', views.DataSourceViewSet)
router.register(r'ingestion-jobs', views.IngestionJobViewSet)

# Data Masking
router.register(r'masking-rules', views.MaskingRuleViewSet)
router.register(r'detected-pii', views.DetectedPIIViewSet)

# NLP
router.register(r'sentiment-data', views.SentimentDataViewSet)
router.register(r'entity-data', views.EntityDataViewSet)
router.register(r'nlp-analyses', views.NlpAnalysisViewSet)

# Reports
router.register(r'reports', views.ReportViewSet)
router.register(r'audit-logs', views.AuditLogViewSet)

# Risk Scan
router.register(r'risk-by-category', views.RiskByCategoryViewSet)
router.register(r'security-posture', views.SecurityPostureViewSet)
router.register(r'vulnerabilities', views.VulnerabilityViewSet)

# Settings
router.register(r'general-settings', views.GeneralSettingViewSet)
router.register(r'notification-preferences', views.NotificationPreferenceViewSet)
router.register(r'security-settings', views.SecuritySettingViewSet)
router.register(r'platform-users', views.PlatformUserViewSet)
router.register(r'api-keys', views.ApiKeyViewSet)

# Suggestions
router.register(r'suggestions', views.SuggestionViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # Singleton / aggregate endpoints
    path('dashboard/kpi/', views.dashboard_kpi, name='dashboard-kpi'),
    path('alert-stats/', views.alert_stats, name='alert-stats'),
    path('ingestion-stats/', views.ingestion_stats, name='ingestion-stats'),
    path('masking-stats/', views.masking_stats, name='masking-stats'),
    path('nlp-stats/', views.nlp_stats, name='nlp-stats'),
    path('riskscan-stats/', views.riskscan_stats, name='riskscan-stats'),
    path('suggestion-stats/', views.suggestion_stats, name='suggestion-stats'),
]
