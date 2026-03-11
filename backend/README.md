# ControlOne Dashboard – Django Backend

## Requirements
- Python 3.10+
- Django 5.x
- Django REST Framework
- django-cors-headers

## Setup

```bash
cd backend
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py seed_data        # populate with sample data
python manage.py createsuperuser  # optional – for admin panel
python manage.py runserver 8000
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/dashboard/kpi/` | KPI snapshot |
| GET | `/api/risk-trend/` | Risk trend chart data |
| GET | `/api/vulnerability-categories/` | Vuln category bar chart |
| GET | `/api/alerts/` | All alerts |
| GET | `/api/alert-stats/` | Alert summary stats |
| GET | `/api/recommendations/` | System recommendations |
| GET | `/api/data-sources/` | Connected data sources |
| GET | `/api/ingestion-jobs/` | Recent ingestion jobs |
| GET | `/api/ingestion-stats/` | Ingestion summary stats |
| GET | `/api/masking-rules/` | Masking rules |
| GET | `/api/detected-pii/` | Detected PII fields |
| GET | `/api/masking-stats/` | Masking summary stats |
| GET | `/api/sentiment-data/` | NLP sentiment chart |
| GET | `/api/entity-data/` | NLP entity chart |
| GET | `/api/nlp-analyses/` | NLP analyses list |
| GET | `/api/nlp-stats/` | NLP summary stats |
| GET | `/api/reports/` | Generated reports |
| GET | `/api/audit-logs/` | Audit log entries |
| GET | `/api/risk-by-category/` | Risk score by category |
| GET | `/api/security-posture/` | Security posture radar |
| GET | `/api/vulnerabilities/` | Vulnerability register |
| GET | `/api/riskscan-stats/` | Risk scan summary stats |
| GET | `/api/general-settings/` | General settings |
| GET | `/api/notification-preferences/` | Notification prefs |
| GET | `/api/security-settings/` | Security settings |
| GET | `/api/platform-users/` | User management |
| GET | `/api/api-keys/` | API keys |
| GET | `/api/suggestions/` | Suggestions list |
| GET | `/api/suggestion-stats/` | Suggestion summary stats |

All list endpoints also support POST, PUT, PATCH, DELETE via REST framework.

Admin panel: `/admin/`

## Environment Configuration

### Setup Environment Variables

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your configuration:
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Key environment variables:**

   | Variable | Description | Default |
   |----------|-------------|---------|
   | `SECRET_KEY` | Django secret key (generate new for production) | `django-insecure-...` |
   | `DEBUG` | Enable debug mode | `True` |
   | `ALLOWED_HOSTS` | Comma-separated allowed hosts | `localhost,127.0.0.1,0.0.0.0` |
   | `DATABASE_ENGINE` | Database backend engine | `django.db.backends.sqlite3` |
   | `API_PORT` | Port for Django server | `8000` |
   | `CORS_ALLOWED_ORIGINS` | Frontend URLs for CORS | `http://localhost:5173,...` |

### Database Configuration

**SQLite (Default):** No additional setup required.

**PostgreSQL (Production):** Update `.env` with:
```env
DATABASE_ENGINE=django.db.backends.postgresql
DATABASE_NAME=controlone_db
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

### Security Notes
- **Change `SECRET_KEY`** before deploying to production
- **Set `DEBUG=False`** in production  
- **Configure proper `ALLOWED_HOSTS`** for production
- **Use environment variables** for sensitive data
