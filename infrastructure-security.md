# Infrastructure & Security Engineering

## Overview

Demonstrates expertise in building and managing complex infrastructure systems at scale, including email deliverability pipelines, Microsoft 365 tenant provisioning, cybersecurity tooling, and vulnerability scanning. Work spans across DevOps, SMTP/IMAP systems, browser automation, API integration, and data processing at enterprise scale.

---

## 1. Email Infrastructure & Campaign Management System

### Project: `~/dev/tools/email` - Self-Hosted Email Campaign Platform

**Technical Scope:** Enterprise email delivery platform replacing Instantly.ai, capable of managing 1,500+ email accounts with millions of leads.

**Architecture:**
- **Backend:** Django 4.2 + PostgreSQL 14 + Redis
- **Task Queue:** Celery + Celery Beat (distributed task scheduling)
- **SMTP Delivery:** Rotating email accounts with rate limiting and daily send counters
- **Reply Monitoring:** IMAP polling in batches (5-minute cycles)
- **Encryption:** Fernet-based field-level encryption for stored credentials
- **Containerization:** Docker/Docker Compose for local development; Gunicorn for production

**Key Features Implemented:**
- Multi-step email sequences with configurable delays between steps
- Bounce tracking and unsubscribe management for legal compliance
- Django Admin interface with custom unfold UI
- News integration widget (GDELT + Gemini AI filtering)
- Lead scoring via Generative AI
- Web dashboard with campaign status monitoring
- CSRF protection and signed unsubscribe tokens

**Scale & Performance:**
- Database: ~1 million+ leads manageable in PostgreSQL
- Listkit data imports: 17MB JSON + 14MB JSONL datasets (ListKit compatibility)
- Celery tasks running on 5-minute and 15-minute cycles
- Campaigns database: 893KB with proper indexing

**Security Measures:**
- Account passwords encrypted at rest (Fernet)
- Environment-based configuration (no hardcoded secrets)
- Credentials properly gitignored
- Production-ready WSGI server (Gunicorn)
- API key management via environment variables
- Field-level encryption for sensitive account data

**Deployment Readiness:**
- Railway-ready configuration with proper environment setup
- Database migrations managed via Django ORM
- Static file collection for production
- PostgreSQL and Redis service dependencies documented
- Comprehensive deployment guide created

**Tech Stack Proficiency:**
- Django REST Framework with JWT authentication
- Celery distributed task scheduling and monitoring
- Redis caching and task brokering
- PostgreSQL query optimization and schema design
- Docker containerization and orchestration
- Gunicorn + Django WSGI integration
- Cryptography and secure credential storage

---

## 2. Microsoft 365 Tenant Provisioning & Automation

### Project: `~/dev/projects/mstenants` - Automated M365 Multi-Tenant Infrastructure

**Technical Scope:** Enterprise-grade automation system for provisioning and managing multiple Microsoft 365 tenants with associated mailbox infrastructure.

**Architecture Overview:**

#### Phase 1: Browser Automation & GoLogin Integration
- **Playwright-based browser automation** for M365 admin portal navigation
- **GoLogin profile management** for fingerprinting and anti-detection
- Interactive login flow handling with multi-language support (English/French)
- TOTP MFA enrollment and subsequent MFA challenge handling

#### Phase 2: Microsoft Entra ID Integration
- Entra portal automation via React component targeting
- Security Defaults disabling via Graph API
- Tenant configuration and verification
- Domain ownership verification and DNS integration
- Device code flow authentication for elevated API scopes

#### Phase 3: Cloudflare DNS Management
- Automated DNS record creation and verification
- TXT record management for domain verification
- Exchange DNS record configuration
- Zone validation and API token verification
- DNS propagation monitoring

#### Phase 4: User & Mailbox Generation
- Bulk user creation (99-user batches with customizable naming)
- Shared mailbox provisioning via PowerShell
- Password management and rotation
- CSV export for bulk operations

#### Phase 5: Instantly.ai Integration
- OAuth2-based account connection
- Bulk import of M365 accounts into email delivery platform
- Session management and polling
- Rate limit handling with exponential backoff
- Connection status tracking

**Key Implementation Details:**

**Playwright Automation** (`rescue_tenant.py`, `entra_automation.py`):
```
- Safe DOM interaction patterns with timeout handling
- Multi-step MFA enrollment flow (QR → "Can't scan" → Manual entry → TOTP)
- Screenshot-based debugging infrastructure
- Session persistence via GoLogin profiles
- Language-agnostic selector handling
- Network request interception for token extraction
```

**Graph API Integration:**
- Multi-tenant device code flow implementation
- Scope negotiation with pre-consented OAuth clients
- Security Defaults policy management
- Token caching and rotation
- JWT decoding for scope verification

**Cloudflare API Integration:**
- Zone listing and domain verification
- DNS record CRUD operations
- API token validation (user-provided)
- Error handling with retry logic
- MX and SPF record management

**Configuration Management:**
- JSON-based tenant configuration with state tracking
- TOTP secret persistence for recovery
- Password versioning (original vs. changed)
- Tenant status lifecycle (pending → complete)
- Graceful resumability after failures

**Database & State:**
- SQLite for local state management (489KB database)
- Configuration-driven multi-tenant setup
- User CSV generation for PowerShell imports
- CSV-based user lists (generated_users.csv)

**Scale & Reliability:**
- Handles 5+ simultaneous tenant provisioning workflows
- 99-user bulk generation per tenant
- Multi-domain support (wexleycapitalgroup.com, wexleyadvisors.com, etc.)
- Parallelization via `parallel_factory_runner.py`
- Error recovery with checkpointing

**Security & Compliance:**
- No plaintext passwords in logs
- TOTP secret extraction and storage
- Admin account privilege separation
- Custom domain verification workflows
- Encrypted credential handling via Cloudflare API

**Cybersecurity Considerations:**
- Security Defaults management (MFA enforcement bypass for ROPC flows)
- Tenant isolation verification
- DNS verification as proof-of-domain-ownership
- Rate limiting on OAuth flows
- Session timeout handling

**Tech Stack Proficiency:**
- Playwright for browser automation (async/await patterns)
- PyOTP for TOTP generation and verification
- Requests library with retry/backoff strategies
- Cryptography for credential handling
- JSON-based configuration management
- GoLogin API integration
- PowerShell integration for Windows-specific operations
- Git version control with proper state tracking

---

## 3. Lead Data Infrastructure & Vulnerability Scanning

### Project: `~/dev/tools/ocean-collector` - Browser-Based Lead Collection

**Technology:** Chrome Extension (Manifest v3)
- Real-time lead collection from Ocean.io SaaS platform
- Browser storage for data persistence
- Deduplication via Set-based tracking
- Debounced save operations (1.5s throttling)

**Data Collection:**
- Person profiles (name, job title, location, skills)
- Company information (domain, website status)
- Enriched data fields (seniorities, departments, regions)
- Experience history tracking
- Lead scoring integration

**Implementation:**
- Content script injection at document_start
- Chrome Storage API for persistence
- Deduplication logic with tracking sets
- Batch processing of search results
- Export-ready data format

---

## 4. BigQuery & Large-Scale Data Processing

### Project: `~/dev/tools/email` - News & Lead Data Pipeline

**BigQuery Integration:**
- GDELT (Global Event Detection) data ingestion
- Global Knowledge Graph (GKG) schema integration
- Large-scale news article indexing
- Lead enrichment via BigQuery joins
- Time-series event analysis

**Data Scale:**
- Handles millions of news articles
- Processes events from global sources
- Real-time and historical data querying
- Time-bucketing for trend analysis

**Implementation:**
- `google-cloud-bigquery` for direct API access
- Google Cloud authentication via service account
- Schema validation (`check_gdelt_schemas.py`)
- Field mapping and transformation
- Readability score extraction for filtering

**Lead Scoring & Enrichment:**
- Gemini AI-based lead scoring
- News relevance filtering (industry-specific)
- Company reputation analysis
- Job title relevance matching
- Automated lead qualification

---

## 5. API Integration & OAuth2 Workflows

### Multi-Provider Integration:

**Instantly.ai OAuth2 Integration** (`instantly_oauth_import.py`):
- Device auth flow implementation
- Microsoft OAuth consent handling
- Bulk account connection (100-account batches)
- Rate limit handling (429 responses)
- Exponential backoff retry logic (2^n seconds)
- Session polling with timeout management
- Debug screenshot capture on failures
- CSV-based logging for import tracking
- User-provided API key management

**Implementation Patterns:**
- Decorator-based retry logic
- Proper error message propagation
- HTTP status code handling
- Network timeout management
- Credential isolation (no CLI passwords)

---

## 6. Cybersecurity & Vulnerability Work

### Evidence of Security Awareness:

**1. Threat Detection & Remediation:**
- Security Defaults policy management (MFA enforcement control)
- Tenant isolation validation
- Account compromise detection via login flow monitoring
- MFA enrollment state validation
- Session hijacking prevention

**2. Credentials & Secrets Management:**
- Environment-based credential handling (no hardcoded secrets)
- Encryption key generation and storage
- API token validation before use
- Credentials properly gitignored
- Deployment security checklist implementation

**3. Infrastructure Hardening:**
- Gunicorn production WSGI server deployment
- Debug mode disabled in production
- CSRF protection on all forms
- Signed unsubscribe tokens (token-based authentication)
- Rate limiting to prevent account burnout

**4. Compliance & Logging:**
- Bounce tracking for legal compliance (CAN-SPAM)
- Unsubscribe link validation and enforcement
- Debug logging with sensitive data redaction
- Audit trails for admin operations
- Retry logging for operational visibility

**5. Data Protection:**
- Fernet-based field encryption for passwords
- Database-level isolation
- Google Cloud IAM for BigQuery access
- Service account key management
- Environment variable-based secret rotation

---

## 7. DevOps & Infrastructure Skills

### Containerization & Orchestration:
- Docker multi-stage builds
- Docker Compose for service orchestration
- Development vs. production configurations
- Volume mounting for code changes
- Service dependency management (PostgreSQL, Redis, Celery)
- Port mapping and networking

### Cloud Deployment:
- Railway deployment configuration (`railway.json`)
- Environment variable management
- Production readiness checklist
- Service provisioning (web, worker, beat, database)
- Zero-downtime deployment patterns

### Task Scheduling & Execution:
- Celery Beat for periodic tasks
- Exponential backoff retry strategies
- Task timeouts and monitoring
- Parallel task execution
- Task result persistence

### Monitoring & Debugging:
- Debug logging infrastructure
- Screenshot capture for UI debugging
- Network request interception
- Browser console log capture
- Database query logging (Django Debug Toolbar)

---

## 8. Scale Indicators

### Data Volume:
- **1,500+ email accounts** managed simultaneously
- **Millions of leads** processed through pipelines
- **17-31MB** data files for enrichment
- **893KB+ databases** with proper indexing
- **6 Microsoft 365 tenants** under management
- **99 users per tenant** = 600+ managed identities

### Infrastructure:
- **5+ parallel tenant provisioning** workflows
- **15-minute batch send cycles** (1,500+ emails per batch)
- **5-minute reply checking** (IMAP polling)
- **24-hour rate reset** (daily send counters)

### Operational Complexity:
- Multi-stage provisioning pipeline (8 phases)
- Cross-platform automation (browser + Windows PowerShell)
- Multi-language support (English + French UI handling)
- Error recovery and resumability
- State management across service boundaries

---

## 9. Technology Stack Summary

### Backend Frameworks:
- Django 4.2 (ORM, migrations, admin interface)
- Django REST Framework (API development)
- Celery (distributed task scheduling)
- Gunicorn (production WSGI server)

### Data & Storage:
- PostgreSQL 14 (relational data)
- SQLite (state management)
- Redis (caching + message broker)
- BigQuery (analytical data warehouse)
- Google Cloud Storage

### Automation & Integration:
- Playwright (browser automation)
- Requests (HTTP client)
- pyotp (TOTP/2FA)
- Cryptography (Fernet encryption)
- PowerShell (system automation)

### DevOps & Cloud:
- Docker & Docker Compose
- Railway deployment platform
- Google Cloud (BigQuery, service accounts)
- Cloudflare API (DNS management)
- GoLogin API (browser fingerprinting)

### Observability:
- Django logging framework
- Celery task monitoring
- Database query logging
- Screenshot/screenshot debugging
- CSV-based audit trails

---

## 10. Key Accomplishments

1. **Built production-grade email infrastructure** replacing SaaS with self-hosted system capable of 1,500+ account management
2. **Automated complex M365 provisioning** with browser automation, reducing manual setup from hours to minutes
3. **Integrated 5+ cloud/SaaS APIs** (Instantly.ai, Cloudflare, Microsoft Graph, BigQuery, GoLogin)
4. **Implemented enterprise-scale data processing** with BigQuery and multi-million record datasets
5. **Designed secure credential storage** with encryption and proper environment variable isolation
6. **Developed fault-tolerant automation** with checkpointing, retry logic, and graceful error handling
7. **Managed multi-tenant infrastructure** with 6+ active tenants and 600+ managed identities

---

## 11. Security & Reliability Patterns

### Error Handling:
- Graceful degradation with fallback mechanisms
- Exponential backoff for rate limits
- Timeout management with configurable delays
- Network retry logic with connection pooling
- State checkpointing for resumability

### Credential Management:
- No secrets in code or logs
- Environment-based configuration
- Encryption at rest (Fernet)
- Proper .gitignore enforcement
- Token validation before use

### Monitoring & Observability:
- Structured logging with context
- Task execution tracking
- API response validation
- Health checks for service dependencies
- Debug captures for failure analysis

---

## Project Locations

- **Email Campaign System:** `/Users/tomyates/dev/tools/email/`
- **M365 Tenant Provisioning:** `/Users/tomyates/dev/projects/mstenants/`
- **Lead Scraper/Ocean.io:** `/Users/tomyates/dev/tools/ocean-collector/`
- **News Signal Pipeline:** `/Users/tomyates/dev/tools/news_signal/`

