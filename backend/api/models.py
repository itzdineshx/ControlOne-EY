from django.db import models


# ─── Dashboard / KPI ────────────────────────────────────────────────

class KpiSnapshot(models.Model):
    """Point-in-time KPI metrics for the dashboard overview."""
    total_records_processed = models.BigIntegerField(default=0)
    records_change_text = models.CharField(max_length=120, blank=True, default='')
    records_change_type = models.CharField(
        max_length=10,
        choices=[('positive', 'Positive'), ('negative', 'Negative'), ('neutral', 'Neutral')],
        default='neutral',
    )
    active_alerts = models.IntegerField(default=0)
    alerts_change_text = models.CharField(max_length=120, blank=True, default='')
    alerts_change_type = models.CharField(max_length=10, default='neutral')
    identified_vulnerabilities = models.IntegerField(default=0)
    vulnerabilities_change_text = models.CharField(max_length=120, blank=True, default='')
    vulnerabilities_change_type = models.CharField(max_length=10, default='neutral')
    pending_actions = models.IntegerField(default=0)
    actions_change_text = models.CharField(max_length=120, blank=True, default='')
    actions_change_type = models.CharField(max_length=10, default='neutral')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        get_latest_by = 'created_at'

    def __str__(self):
        return f"KPI Snapshot {self.created_at:%Y-%m-%d %H:%M}"


# ─── Risk Trend ────────────────────────────────────────────────────

class RiskTrendPoint(models.Model):
    month = models.CharField(max_length=20)
    risk = models.IntegerField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.month}: {self.risk}"


# ─── Vulnerability Category ───────────────────────────────────────

class VulnerabilityCategory(models.Model):
    category = models.CharField(max_length=120)
    count = models.IntegerField(default=0)

    class Meta:
        ordering = ['category']
        verbose_name_plural = 'Vulnerability categories'

    def __str__(self):
        return f"{self.category} ({self.count})"


# ─── Alerts ────────────────────────────────────────────────────────

class Alert(models.Model):
    SEVERITY_CHOICES = [
        ('Critical', 'Critical'),
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ]
    CATEGORY_CHOICES = [
        ('Security', 'Security'),
        ('System', 'System'),
        ('Compliance', 'Compliance'),
        ('Analytics', 'Analytics'),
    ]
    alert_id = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=300)
    message = models.CharField(max_length=500, blank=True, default='')
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='System')
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.alert_id} – {self.title}"


# ─── Alert Stats ──────────────────────────────────────────────────

class AlertStats(models.Model):
    """Singleton-like stats for the alerts page header cards."""
    unread_alerts = models.IntegerField(default=0)
    total_today = models.IntegerField(default=0)
    dismissed = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Alert stats'

    def __str__(self):
        return "Alert Stats"


# ─── Recommendations ──────────────────────────────────────────────

class Recommendation(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(
        max_length=10,
        choices=[('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')],
    )
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


# ─── Data Sources ─────────────────────────────────────────────────

class DataSource(models.Model):
    name = models.CharField(max_length=200)
    source_type = models.CharField(max_length=50)
    status = models.CharField(max_length=30)
    records = models.CharField(max_length=30, blank=True, default='—')
    last_sync = models.CharField(max_length=50, blank=True, default='—')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


# ─── Ingestion Jobs ───────────────────────────────────────────────

class IngestionJob(models.Model):
    job_id = models.CharField(max_length=20, unique=True)
    source = models.CharField(max_length=120)
    records = models.IntegerField(default=0)
    status = models.CharField(max_length=30)
    duration = models.CharField(max_length=30, blank=True, default='—')

    class Meta:
        ordering = ['-job_id']

    def __str__(self):
        return f"{self.job_id} – {self.source}"


# ─── Data Ingestion Stats ────────────────────────────────────────

class IngestionStats(models.Model):
    total_sources = models.IntegerField(default=0)
    records_today = models.CharField(max_length=30, default='0')
    failed_jobs = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Ingestion stats'

    def __str__(self):
        return "Ingestion Stats"


# ─── Masking Rules ────────────────────────────────────────────────

class MaskingRule(models.Model):
    field = models.CharField(max_length=120)
    pattern = models.CharField(max_length=120)
    mask_type = models.CharField(max_length=30)
    applied = models.IntegerField(default=0)
    status = models.CharField(max_length=20)

    class Meta:
        ordering = ['field']

    def __str__(self):
        return f"{self.field} – {self.mask_type}"


# ─── Detected PII ────────────────────────────────────────────────

class DetectedPII(models.Model):
    source = models.CharField(max_length=120)
    field = models.CharField(max_length=120)
    records = models.IntegerField(default=0)
    masked = models.BooleanField(default=False)
    confidence = models.IntegerField(default=0)

    class Meta:
        ordering = ['source']
        verbose_name = 'Detected PII'
        verbose_name_plural = 'Detected PII'

    def __str__(self):
        return f"{self.source}.{self.field}"


# ─── Data Masking Stats ──────────────────────────────────────────

class MaskingStats(models.Model):
    pii_fields_detected = models.IntegerField(default=0)
    fields_masked = models.IntegerField(default=0)
    coverage_rate = models.CharField(max_length=20, default='0%')
    active_rules = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Masking stats'

    def __str__(self):
        return "Masking Stats"


# ─── NLP Sentiment Data ──────────────────────────────────────────

class SentimentDataPoint(models.Model):
    name = models.CharField(max_length=30)
    value = models.IntegerField(default=0)
    color = models.CharField(max_length=50)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name}: {self.value}"


# ─── NLP Entity Data ─────────────────────────────────────────────

class EntityDataPoint(models.Model):
    entity = models.CharField(max_length=60)
    count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-count']

    def __str__(self):
        return f"{self.entity}: {self.count}"


# ─── NLP Analyses ────────────────────────────────────────────────

class NlpAnalysis(models.Model):
    analysis_id = models.CharField(max_length=20, unique=True)
    document = models.CharField(max_length=200)
    entities = models.IntegerField(default=0)
    sentiment = models.CharField(max_length=20)
    topics = models.IntegerField(default=0)
    status = models.CharField(max_length=20)

    class Meta:
        ordering = ['-analysis_id']
        verbose_name_plural = 'NLP analyses'

    def __str__(self):
        return f"{self.analysis_id} – {self.document}"


# ─── NLP Stats ───────────────────────────────────────────────────

class NlpStats(models.Model):
    documents_processed = models.CharField(max_length=30, default='0')
    entities_extracted = models.CharField(max_length=30, default='0')
    avg_confidence = models.CharField(max_length=20, default='0%')
    active_models = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'NLP stats'

    def __str__(self):
        return "NLP Stats"


# ─── Reports ─────────────────────────────────────────────────────

class Report(models.Model):
    report_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=300)
    report_type = models.CharField(max_length=30)
    generated = models.CharField(max_length=50)
    size = models.CharField(max_length=20)
    status = models.CharField(max_length=20, default='Ready')

    class Meta:
        ordering = ['-report_id']

    def __str__(self):
        return f"{self.report_id} – {self.name}"


# ─── Audit Logs ──────────────────────────────────────────────────

class AuditLog(models.Model):
    timestamp = models.DateTimeField()
    user = models.CharField(max_length=120)
    action = models.CharField(max_length=300)
    module = models.CharField(max_length=60)
    ip = models.GenericIPAddressField()

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.timestamp} – {self.user}: {self.action}"


# ─── Risk Scan ───────────────────────────────────────────────────

class RiskByCategory(models.Model):
    category = models.CharField(max_length=60)
    score = models.IntegerField(default=0)

    class Meta:
        ordering = ['category']
        verbose_name_plural = 'Risk by category'

    def __str__(self):
        return f"{self.category}: {self.score}"


class SecurityPosture(models.Model):
    subject = models.CharField(max_length=60)
    score = models.IntegerField(default=0)
    full_mark = models.IntegerField(default=100)

    class Meta:
        ordering = ['subject']

    def __str__(self):
        return f"{self.subject}: {self.score}"


class Vulnerability(models.Model):
    vuln_id = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=300)
    severity = models.CharField(max_length=10)
    asset = models.CharField(max_length=120)
    status = models.CharField(max_length=20)
    discovered = models.CharField(max_length=50)

    class Meta:
        ordering = ['-vuln_id']
        verbose_name_plural = 'Vulnerabilities'

    def __str__(self):
        return f"{self.vuln_id} – {self.title}"


# ─── Risk Scan Stats ─────────────────────────────────────────────

class RiskScanStats(models.Model):
    total_vulnerabilities = models.IntegerField(default=0)
    critical = models.IntegerField(default=0)
    in_progress = models.IntegerField(default=0)
    resolved_30d = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Risk scan stats'

    def __str__(self):
        return "Risk Scan Stats"


# ─── Settings ────────────────────────────────────────────────────

class GeneralSetting(models.Model):
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=200, blank=True, default='')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.label}: {self.value}"


class NotificationPreference(models.Model):
    label = models.CharField(max_length=200)
    enabled = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.label}: {'On' if self.enabled else 'Off'}"


class SecuritySetting(models.Model):
    label = models.CharField(max_length=200)
    enabled = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.label}: {'On' if self.enabled else 'Off'}"


class PlatformUser(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    role = models.CharField(max_length=30)
    status = models.CharField(max_length=20)
    last_login = models.CharField(max_length=50, blank=True, default='—')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.email})"


class ApiKey(models.Model):
    name = models.CharField(max_length=120)
    key = models.CharField(max_length=120)
    created = models.CharField(max_length=50)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


# ─── Suggestions ─────────────────────────────────────────────────

class Suggestion(models.Model):
    suggestion_id = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=300)
    description = models.TextField()
    category = models.CharField(max_length=30)
    impact = models.CharField(max_length=10)
    effort = models.CharField(max_length=10)
    status = models.CharField(max_length=30)

    class Meta:
        ordering = ['-suggestion_id']

    def __str__(self):
        return f"{self.suggestion_id} – {self.title}"


# ─── Suggestions Stats ───────────────────────────────────────────

class SuggestionStats(models.Model):
    open_suggestions = models.IntegerField(default=0)
    in_review = models.IntegerField(default=0)
    implemented = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Suggestion stats'

    def __str__(self):
        return "Suggestion Stats"
