"""
Management command to populate the database with realistic seed data
matching the original dashboard mock data.
"""
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import (
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


class Command(BaseCommand):
    help = 'Seed the database with initial dashboard data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # ─── KPI Snapshot ─────────────────────────────────
        KpiSnapshot.objects.all().delete()
        KpiSnapshot.objects.create(
            total_records_processed=1284503,
            records_change_text='+12.5% from last month',
            records_change_type='positive',
            active_alerts=47,
            alerts_change_text='8 new today',
            alerts_change_type='negative',
            identified_vulnerabilities=112,
            vulnerabilities_change_text='23 critical',
            vulnerabilities_change_type='negative',
            pending_actions=29,
            actions_change_text='5 overdue',
            actions_change_type='neutral',
        )

        # ─── Risk Trend ──────────────────────────────────
        RiskTrendPoint.objects.all().delete()
        for i, (month, risk) in enumerate([
            ('Jul', 32), ('Aug', 45), ('Sep', 38),
            ('Oct', 52), ('Nov', 41), ('Dec', 36), ('Jan', 29),
        ]):
            RiskTrendPoint.objects.create(month=month, risk=risk, order=i)

        # ─── Vulnerability Categories ─────────────────────
        VulnerabilityCategory.objects.all().delete()
        for cat, cnt in [
            ('SQL Injection', 24), ('XSS', 18), ('Data Leak', 31),
            ('Auth Bypass', 12), ('Misconfig', 27),
        ]:
            VulnerabilityCategory.objects.create(category=cat, count=cnt)

        # ─── Dashboard Alerts (Recent Alerts table) ───────
        Alert.objects.all().delete()
        now = timezone.now()
        dashboard_alerts = [
            ('ALT-001', 'Unauthorized access attempt detected on API gateway', 'Unauthorized access attempt detected on API gateway', 'Security', 'High', False, now - timedelta(minutes=2)),
            ('ALT-002', 'Sensitive PII data found in unmasked export file', 'Sensitive PII data found in unmasked export file', 'Compliance', 'High', False, now - timedelta(minutes=15)),
            ('ALT-003', 'Unusual spike in data processing requests', 'Unusual spike in data processing requests', 'System', 'Medium', True, now - timedelta(hours=1)),
            ('ALT-004', 'SSL certificate expiring in 7 days', 'SSL certificate expiring in 7 days', 'System', 'Medium', True, now - timedelta(hours=3)),
            ('ALT-005', 'Routine compliance check completed', 'Routine compliance check completed', 'Compliance', 'Low', True, now - timedelta(hours=5)),
        ]
        # Full alerts page entries
        full_alerts = [
            ('ALT-301', 'Critical vulnerability detected in production API', '', 'Security', 'Critical', False, now - timedelta(minutes=2)),
            ('ALT-300', 'Data ingestion job ING-2039 failed after timeout', '', 'System', 'High', False, now - timedelta(minutes=15)),
            ('ALT-299', 'Unmasked PII detected in exported dataset', '', 'Compliance', 'High', False, now - timedelta(hours=1)),
            ('ALT-298', 'Unusual login pattern from IP 192.168.1.45', '', 'Security', 'Medium', True, now - timedelta(hours=2)),
            ('ALT-297', 'Storage utilization exceeded 80% threshold', '', 'System', 'Medium', True, now - timedelta(hours=3)),
            ('ALT-296', 'NLP model accuracy dropped below 90%', '', 'Analytics', 'Medium', True, now - timedelta(hours=5)),
            ('ALT-295', 'Scheduled compliance report generated successfully', '', 'Compliance', 'Low', True, now - timedelta(hours=6)),
            ('ALT-294', 'New data source connected: Vendor Portal', '', 'System', 'Low', True, now - timedelta(hours=8)),
            ('ALT-293', 'Weekly risk assessment completed', '', 'Security', 'Low', True, now - timedelta(days=1)),
        ]
        for aid, title, msg, cat, sev, read, ts in dashboard_alerts + full_alerts:
            a = Alert.objects.create(
                alert_id=aid, title=title, message=msg or title,
                category=cat, severity=sev, read=read,
            )
            Alert.objects.filter(pk=a.pk).update(created_at=ts)

        # ─── Alert Stats ─────────────────────────────────
        AlertStats.objects.all().delete()
        AlertStats.objects.create(unread_alerts=3, total_today=12, dismissed=47)

        # ─── Recommendations ─────────────────────────────
        Recommendation.objects.all().delete()
        for i, (title, desc, pri) in enumerate([
            ('Enable Multi-Factor Authentication', '3 admin accounts lack MFA. Enable to reduce unauthorized access risk by 80%.', 'High'),
            ('Update Data Masking Rules', '12 new PII fields detected in recent ingestion. Update masking policies accordingly.', 'Medium'),
            ('Schedule Vulnerability Re-scan', 'Last full scan was 14 days ago. Recommend weekly scans for compliance.', 'Medium'),
            ('Archive Processed Logs', 'Storage utilization at 78%. Archive logs older than 90 days to optimize performance.', 'Low'),
        ]):
            Recommendation.objects.create(title=title, description=desc, priority=pri, order=i)

        # ─── Data Sources ────────────────────────────────
        DataSource.objects.all().delete()
        for name, stype, st, rec, sync in [
            ('ERP System – SAP', 'Database', 'Connected', '423,102', '2 min ago'),
            ('HR Portal – Workday', 'API', 'Connected', '87,231', '15 min ago'),
            ('CRM – Salesforce', 'API', 'Connected', '312,445', '1 hr ago'),
            ('Financial Reports (CSV)', 'File Upload', 'Processing', '54,200', 'In progress'),
            ('Email Archive – Exchange', 'API', 'Disconnected', '—', '3 days ago'),
        ]:
            DataSource.objects.create(name=name, source_type=stype, status=st, records=rec, last_sync=sync)

        # ─── Ingestion Jobs ──────────────────────────────
        IngestionJob.objects.all().delete()
        for jid, src, rec, st, dur in [
            ('ING-2041', 'SAP ERP', 12450, 'Completed', '4m 32s'),
            ('ING-2040', 'Workday HR', 8320, 'Completed', '2m 18s'),
            ('ING-2039', 'Financial CSV', 54200, 'In Progress', '—'),
            ('ING-2038', 'Salesforce CRM', 15600, 'Completed', '5m 45s'),
            ('ING-2037', 'Exchange Email', 0, 'Failed', '—'),
        ]:
            IngestionJob.objects.create(job_id=jid, source=src, records=rec, status=st, duration=dur)

        # ─── Ingestion Stats ─────────────────────────────
        IngestionStats.objects.all().delete()
        IngestionStats.objects.create(total_sources=12, records_today='145,230', failed_jobs=3)

        # ─── Masking Rules ───────────────────────────────
        MaskingRule.objects.all().delete()
        for field, pattern, mtype, applied, st in [
            ('Social Security Number', 'XXX-XX-****', 'Full Mask', 45230, 'Active'),
            ('Credit Card Number', '****-****-****-1234', 'Partial Mask', 23100, 'Active'),
            ('Email Address', 'j***@***.com', 'Partial Mask', 87450, 'Active'),
            ('Phone Number', '(***) ***-4567', 'Partial Mask', 31200, 'Active'),
            ('Date of Birth', '**/**/1990', 'Partial Mask', 45230, 'Paused'),
            ('Home Address', '[REDACTED]', 'Full Mask', 12800, 'Active'),
        ]:
            MaskingRule.objects.create(field=field, pattern=pattern, mask_type=mtype, applied=applied, status=st)

        # ─── Detected PII ────────────────────────────────
        DetectedPII.objects.all().delete()
        for src, fld, rec, masked, conf in [
            ('HR Database', 'employee_ssn', 12400, True, 99),
            ('Customer CRM', 'customer_email', 87450, True, 97),
            ('Financial Reports', 'account_number', 5600, False, 94),
            ('Vendor Portal', 'tax_id', 2300, False, 91),
            ('Email Archive', 'phone_number', 31200, True, 96),
        ]:
            DetectedPII.objects.create(source=src, field=fld, records=rec, masked=masked, confidence=conf)

        # ─── Masking Stats ───────────────────────────────
        MaskingStats.objects.all().delete()
        MaskingStats.objects.create(pii_fields_detected=156, fields_masked=132, coverage_rate='84.6%', active_rules=24)

        # ─── NLP Sentiment ───────────────────────────────
        SentimentDataPoint.objects.all().delete()
        for name, val, color in [
            ('Positive', 45, 'hsl(152 60% 40%)'),
            ('Neutral', 35, 'hsl(215 70% 45%)'),
            ('Negative', 20, 'hsl(0 72% 51%)'),
        ]:
            SentimentDataPoint.objects.create(name=name, value=val, color=color)

        # ─── NLP Entities ────────────────────────────────
        EntityDataPoint.objects.all().delete()
        for ent, cnt in [
            ('Person', 3420), ('Organization', 2180), ('Location', 1560),
            ('Date', 4200), ('Financial', 2890),
        ]:
            EntityDataPoint.objects.create(entity=ent, count=cnt)

        # ─── NLP Analyses ────────────────────────────────
        NlpAnalysis.objects.all().delete()
        for aid, doc, ent, sent, top, st in [
            ('NLP-401', 'Q4 Financial Report.pdf', 234, 'Neutral', 8, 'Completed'),
            ('NLP-400', 'HR Policy Update.docx', 89, 'Positive', 5, 'Completed'),
            ('NLP-399', 'Customer Complaints Batch', 1200, 'Negative', 12, 'Completed'),
            ('NLP-398', 'Legal Contracts Archive', 567, 'Neutral', 15, 'Processing'),
            ('NLP-397', 'Vendor Emails Export', 340, 'Positive', 6, 'Completed'),
        ]:
            NlpAnalysis.objects.create(analysis_id=aid, document=doc, entities=ent, sentiment=sent, topics=top, status=st)

        # ─── NLP Stats ───────────────────────────────────
        NlpStats.objects.all().delete()
        NlpStats.objects.create(documents_processed='8,432', entities_extracted='142,560', avg_confidence='94.2%', active_models=6)

        # ─── Reports ─────────────────────────────────────
        Report.objects.all().delete()
        for rid, name, rtype, gen, size, st in [
            ('RPT-201', 'Monthly Compliance Report – January 2026', 'Compliance', 'Feb 1, 2026', '2.4 MB', 'Ready'),
            ('RPT-200', 'Quarterly Risk Assessment – Q4 2025', 'Risk', 'Jan 15, 2026', '5.1 MB', 'Ready'),
            ('RPT-199', 'Data Masking Audit Trail', 'Audit', 'Jan 10, 2026', '1.8 MB', 'Ready'),
            ('RPT-198', 'Vulnerability Scan Summary – Week 4', 'Security', 'Jan 28, 2026', '890 KB', 'Ready'),
            ('RPT-197', 'NLP Processing Performance Report', 'Analytics', 'Jan 20, 2026', '3.2 MB', 'Ready'),
        ]:
            Report.objects.create(report_id=rid, name=name, report_type=rtype, generated=gen, size=size, status=st)

        # ─── Audit Logs ──────────────────────────────────
        AuditLog.objects.all().delete()
        base = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
        for ts_str, user, action, module, ip in [
            (base.replace(hour=14, minute=32, second=15), 'admin@controlone.com', 'Updated masking rule for SSN field', 'Data Masking', '10.0.1.45'),
            (base.replace(hour=13, minute=15, second=42), 'manager@controlone.com', 'Exported compliance report RPT-201', 'Reports', '10.0.1.22'),
            (base.replace(hour=11, minute=48, second=30), 'admin@controlone.com', 'Initiated vulnerability scan VUL-2041', 'Risk Scan', '10.0.1.45'),
            (base.replace(hour=10, minute=22, second=8), 'auditor@controlone.com', 'Reviewed alert ALT-298', 'Alerts', '10.0.1.88'),
            (base.replace(hour=9, minute=5, second=17), 'admin@controlone.com', 'Added new data source: Vendor Portal', 'Data Ingestion', '10.0.1.45'),
            (base - timedelta(days=1) + timedelta(hours=17, minutes=45, seconds=33), 'manager@controlone.com', 'Modified user role for viewer@controlone.com', 'Settings', '10.0.1.22'),
            (base - timedelta(days=1) + timedelta(hours=15, minutes=30, seconds=11), 'admin@controlone.com', 'Deployed NLP model v2.4.1', 'NLP Analysis', '10.0.1.45'),
        ]:
            AuditLog.objects.create(timestamp=ts_str, user=user, action=action, module=module, ip=ip)

        # ─── Risk by Category ────────────────────────────
        RiskByCategory.objects.all().delete()
        for cat, score in [
            ('Infrastructure', 72), ('Application', 58), ('Data', 85),
            ('Access Control', 45), ('Compliance', 63), ('Network', 51),
        ]:
            RiskByCategory.objects.create(category=cat, score=score)

        # ─── Security Posture ────────────────────────────
        SecurityPosture.objects.all().delete()
        for subj, score in [
            ('Confidentiality', 85), ('Integrity', 72), ('Availability', 90),
            ('Authentication', 65), ('Authorization', 78), ('Audit', 82),
        ]:
            SecurityPosture.objects.create(subject=subj, score=score, full_mark=100)

        # ─── Vulnerabilities ─────────────────────────────
        Vulnerability.objects.all().delete()
        for vid, title, sev, asset, st, disc in [
            ('VUL-101', 'SQL Injection in API endpoint /v2/users', 'Critical', 'API Gateway', 'Open', '2 days ago'),
            ('VUL-102', 'Outdated TLS 1.0 configuration on web server', 'High', 'Web Server', 'In Progress', '5 days ago'),
            ('VUL-103', 'Unencrypted PII in database backup files', 'High', 'DB Backup', 'Open', '1 week ago'),
            ('VUL-104', 'Missing rate limiting on authentication endpoint', 'Medium', 'Auth Service', 'Resolved', '2 weeks ago'),
            ('VUL-105', 'Default admin credentials on staging environment', 'Critical', 'Staging Env', 'Open', '1 day ago'),
            ('VUL-106', 'Cross-site scripting in search functionality', 'Medium', 'Web App', 'In Progress', '3 days ago'),
        ]:
            Vulnerability.objects.create(vuln_id=vid, title=title, severity=sev, asset=asset, status=st, discovered=disc)

        # ─── Risk Scan Stats ─────────────────────────────
        RiskScanStats.objects.all().delete()
        RiskScanStats.objects.create(total_vulnerabilities=112, critical=18, in_progress=34, resolved_30d=67)

        # ─── General Settings ────────────────────────────
        GeneralSetting.objects.all().delete()
        for i, (label, value) in enumerate([
            ('Platform Name', 'ControlOne Enterprise'),
            ('Organization', 'Acme Corporation'),
            ('Timezone', 'UTC+05:30 (IST)'),
            ('Language', 'English (US)'),
        ]):
            GeneralSetting.objects.create(label=label, value=value, order=i)

        # ─── Notification Preferences ────────────────────
        NotificationPreference.objects.all().delete()
        for i, (label, enabled) in enumerate([
            ('Email Alerts for Critical Vulnerabilities', True),
            ('Daily Digest Summary', True),
            ('Real-time Browser Notifications', False),
            ('Slack Integration Alerts', True),
            ('SMS for System Downtime', False),
        ]):
            NotificationPreference.objects.create(label=label, enabled=enabled, order=i)

        # ─── Security Settings ───────────────────────────
        SecuritySetting.objects.all().delete()
        for i, (label, enabled) in enumerate([
            ('Enforce Multi-Factor Authentication', True),
            ('Session Timeout (30 min)', True),
            ('IP Whitelisting', False),
            ('Audit Log Retention (365 days)', True),
        ]):
            SecuritySetting.objects.create(label=label, enabled=enabled, order=i)

        # ─── Platform Users ──────────────────────────────
        PlatformUser.objects.all().delete()
        for name, email, role, st, login in [
            ('John Mitchell', 'admin@controlone.com', 'Administrator', 'Active', 'Today, 14:32'),
            ('Sarah Chen', 'manager@controlone.com', 'Manager', 'Active', 'Today, 13:15'),
            ('David Park', 'auditor@controlone.com', 'Auditor', 'Active', 'Today, 10:22'),
            ('Emily Ross', 'viewer@controlone.com', 'Viewer', 'Active', 'Yesterday'),
            ('Mark Johnson', 'mark@controlone.com', 'Viewer', 'Inactive', '2 weeks ago'),
        ]:
            PlatformUser.objects.create(name=name, email=email, role=role, status=st, last_login=login)

        # ─── API Keys ────────────────────────────────────
        ApiKey.objects.all().delete()
        for name, key, created in [
            ('Production API Key', 'ck_prod_****_8f3a', 'Jan 5, 2026'),
            ('Staging API Key', 'ck_stag_****_2d1b', 'Dec 12, 2025'),
        ]:
            ApiKey.objects.create(name=name, key=key, created=created)

        # ─── Suggestions ─────────────────────────────────
        Suggestion.objects.all().delete()
        for sid, title, desc, cat, impact, effort, st in [
            ('SUG-101', 'Enable Multi-Factor Authentication for Admin Accounts',
             '3 administrator accounts do not have MFA enabled. Enabling MFA can reduce unauthorized access risk by up to 80%. This is a critical compliance requirement for SOC 2 Type II.',
             'Security', 'High', 'Low', 'Open'),
            ('SUG-102', 'Update Data Masking Rules for New PII Fields',
             '12 new PII fields were detected in the latest data ingestion from Workday HR. Update masking policies to cover employee_bank_account, emergency_contact_phone, and 10 other fields.',
             'Compliance', 'High', 'Medium', 'In Review'),
            ('SUG-103', 'Schedule Weekly Vulnerability Scans',
             'Current scan frequency is bi-weekly. Industry best practice recommends weekly scans for enterprise environments. Last full scan was conducted 14 days ago.',
             'Security', 'Medium', 'Low', 'Open'),
            ('SUG-104', 'Archive Processed Logs Older Than 90 Days',
             'Storage utilization is at 78%. Archiving logs older than 90 days to cold storage would free approximately 240GB and improve query performance by 15%.',
             'Performance', 'Medium', 'Low', 'Implemented'),
            ('SUG-105', 'Implement API Rate Limiting',
             'The authentication API endpoint currently has no rate limiting configured. This could lead to brute-force attacks. Recommend implementing 100 requests/minute per IP.',
             'Security', 'High', 'Medium', 'Open'),
            ('SUG-106', 'Optimize NLP Model for Financial Documents',
             'Current NLP model shows 87% accuracy on financial documents vs 95% on general text. Fine-tuning the model with financial corpus would improve entity extraction for financial reports.',
             'Analytics', 'Medium', 'High', 'In Review'),
        ]:
            Suggestion.objects.create(suggestion_id=sid, title=title, description=desc, category=cat, impact=impact, effort=effort, status=st)

        # ─── Suggestion Stats ────────────────────────────
        SuggestionStats.objects.all().delete()
        SuggestionStats.objects.create(open_suggestions=14, in_review=5, implemented=23)

        self.stdout.write(self.style.SUCCESS('✓ Database seeded successfully!'))
