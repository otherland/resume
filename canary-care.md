# Canary Care - Project Overview and Achievements

**Company:** Utilita Health (trading as Canary Care)
**Role:** Lead/Senior Engineer
**Duration:** 2+ years
**Tech Stack:** TypeScript, React, Python, PHP, AWS, Docker, Ansible
**Key Repos:** canary-portal, canarybackend, configuration-management

---

## Executive Summary

**Canary Care** is a connected care platform for elderly residents and care facilities, combining IoT sensors (smart hubs with motion, door, and vibration sensors), cloud infrastructure, and web/mobile applications to monitor resident wellbeing and alert caregivers to potential issues.

As a **cross-functional Lead/Senior Engineer**, I've driven architectural modernization, containerization initiatives, and design system improvements while maintaining production stability for 200+ care facilities and 10,000+ residents.

**Scale:**
- **200+ care facilities** across UK
- **10,000+ residents** monitored
- **2 IoT hub versions** (v1 legacy, v2 modern)
- **26 backend services** (mix of PHP, Python, Go)
- **374 React components** in portal (39,730 LOC)
- **AWS infrastructure** (RDS, ECR, ECS, ALB, Fargate)

---

## Key Projects & Achievements

### 1. Container Orchestration & ECS Migration (Ongoing)

**Objective:** Modernize deployment from Ansible VMs to containerized ECS services.

**What I Built:**
- **Docker containerization** for 7 backend services (AppAPI, HubAPI, Notifications, Delivery Agents, Bandr)
- **ECR pipeline** (`backend-ecr-pipeline.yml`) with OIDC authentication to AWS
- **Multi-stage deployment** with approval gates (TagDev → TagUAT → TagProd)
- **Portal containerization** for ECS alongside backend services
- **Terraform templates** for ECS task definitions and service configuration

**Impact:**
- **2 services in production** (AppAPI, HubAPI running in ECS develop)
- **4 services ready to deploy** (Portal, Notifications, Bandr, Delivery Agents)
- **Progress: 39% complete** (7/18 services containerized), on track for 75-100% by March 2026
- **Standardized deployment** - single pipeline pattern eliminates deployment variance

**Technical Details:**
- Multi-stage Dockerfile builds (Node/Python Alpine base → runtime)
- Environment variable injection via `docker-entrypoint.sh`
- Health checks for all services
- ECR image tagging with timestamps for auditability
- Rollback/promote functionality in pipeline

**Commits:**
- `68b3b6cc0`: feat: Add ECR pipeline for portal
- `e99493465`: feat: Add container support for portal (CAN3-1115)
- `b5519576`: Consolidated container pipelines with promote/rollback

---

### 2. Frontend Build System Migration: Webpack → Vite (Q4 2025)

**Objective:** Replace slow Webpack 4 build pipeline with modern Vite, reduce dev startup time.

**What I Did:**
- **Migrated build system** from Webpack 4 to Vite 6
- **Maintained React 18** with TypeScript and ESLint integration
- **Preserved Yarn Berry** (v4.9.2) Plug'n'Play dependencies
- **Zero-downtime deployment** - cache busting via chunk imports in `spa.js`
- **Storybook 9** integration for component development

**Impact:**
- **Faster dev startup** - Vite's instant module serving vs Webpack's 30+ second builds
- **Smaller bundle size** - D3 vendor splitting, CSS minification
- **100+ PDF export optimization** - File size improvements in Portal
- **Clean test infrastructure** - Jest + React Testing Library maintained

**Technical Details:**
- Vite config with TypeScript support
- Alias paths matching Webpack configuration
- Environment variable injection at runtime
- Git worktree support with global Yarn cache (no duplicate node_modules)

**Commits:**
- `c5dfcd5b7`: feat: Migrate build system from webpack to Vite (CAN3-725)
- `46fb833f4`: Move inline config to external config.js for CSP compliance
- `238bb4482`: Optimize PDF export file size

---

### 3. Portal Containerization for ECS Deployment (Q4 2025)

**Objective:** Enable Portal to run as container alongside backend services.

**What I Built:**
- **Multi-stage Docker build** (Node.js Alpine builder → Nginx Alpine runtime)
- **Runtime config injection** - environment variables → JavaScript config
- **Nginx proxy configuration** - routes `/v1/*` API calls to backend
- **Health check endpoint** - `/health` and `/config.js` validation
- **Container-native deployment** - no webpack build artifacts needed

**Key Features:**
- Environment-aware configuration (PORTAL_ENVIRONMENT, GTM_ID, etc.)
- Configurable API base URL (`/v1` by default)
- Inactivity timeout configuration
- Support for local dev (proxy to external backend) and production (ALB routing)

**Impact:**
- **Unified deployment pattern** - Portal follows same ECS deployment as backend
- **Faster deployments** - Static file serving via Nginx is minimal/fast
- **Smaller footprint** - Multi-stage build reduces image size
- **Consistent environments** - Same container runs in dev/uat/production

**Commits:**
- `52b607eb2`: Merged PR 17166: Portal containerisation for ECS deployment
- `abca8d034`: docs: Update readme with Docker containerization instructions

---

### 4. Confluence Documentation Consolidation & Maintenance (Jan-Feb 2026)

**Objective:** Organize 677 Confluence pages into searchable knowledge base.

**What I Delivered:**
- **QMD semantic search engine** - indexed 677 pages from Confluence
- **Hierarchical categorization** - mapped pages into 15+ logical categories
- **Gap analysis** - identified missing documentation (ISO 27001, monitoring, GDPR)
- **Master index files** - automated markdown indexes for navigation
- **CLI tools** - semantic search, reverse indexing, batch extraction

**Artifacts:**
- `confluence_wiki_full/` - 677 pages as searchable markdown
- `CONFLUENCE_HIERARCHICAL_TREE_COMPLETE.md` - Full page catalog
- `INDEX_IMPROVED_CATEGORIZED.md` - 677 pages organized by topic
- QMD search ready for knowledge queries

**Impact:**
- **Searchable documentation** - 677 pages indexed and queryable
- **Reduced onboarding time** - New developers can find procedures quickly
- **Evidence of needs** - Gap analysis shows where docs need writing
- **Maintenance framework** - Automated sync and re-indexing

---

### 5. Infrastructure & Security Improvements

#### A. Sensitive Data Migration to AWS SSM (Q4 2025)

**Objective:** Remove hardcoded secrets from code and Ansible, move to SSM Parameter Store.

**Progress:** 70% complete (16/25 parameters)

**What I Did:**
- Migrated **15 database credentials** to SSM
- Identified **Grafana Loki token**, **iOS APNS cert**, **Android Firebase config**
- Audited hardcoded secrets across codebase
- Documented migration path in `docs/security/sensitive_keys_audit.md`

**Remaining Work:**
- iOS APNS certificate → SSM (CAN3-1066)
- Android Firebase JSON → SSM (CAN3-1067)
- BehaveEngine API key rotation (CAN3-1068)
- Zendesk token → SSM

---

#### B. Sensor Data Handling & Vibration Events (Q1 2026)

**Objective:** Improve reliability of sensor data processing and event detection.

**Work Completed:**
- Fixed **sensor unpair handling** from v2 hubs (status -1)
- Added **vibration event graphs** (cherry-pick to production)
- Implemented **MessageID exposure** in door_list API for event ordering
- Fixed **GetUserConsents** bug returning all users' records

**Related Commits:**
- `02c02711`: CAN3-959: Handle sensor unpair (status -1) from v2 hubs
- `d9bcaf56`: CAN3-1285: Expose MessageID in door_list API
- `d7f0a5e4`: CAN3-1370: Fix GetUserConsents returning all users' consent records

---

### 6. Design System & Component Library (Ongoing)

**Project:** Canary Care Design System
**Purpose:** Unified component library for Portal and future applications

**Tech Stack:**
- Yarn Berry v4.9.2 (Plug'n'Play)
- Storybook 9 for component development
- TypeScript + Styled Components
- ESLint + Prettier for code quality

**Impact:**
- **374 React components** (39,730 LOC) maintained and versioned
- **Consistent UI patterns** across all user interfaces
- **Component testing** via Storybook and Jest
- **Single source of truth** for design tokens and patterns

---

### 7. Infrastructure as Code (Ansible)

**Repository:** `configuration-management`
**Size:** 11M (large Ansible playbook collection)

**What I Maintain:**
- **Platform playbooks** - nginx, database, monitoring setup
- **Application playbooks** - deployment and configuration
- **Security hardening** - Bootstrap playbook for new VMs
- **IPSec tunnels** - libreswan configuration for CSL/Eseye links

**Status:** Transitioning to Terraform/ECS (Ansible being phased out)

---

## Technical Decisions & Justifications

### 1. Webpack → Vite Migration
**Why:** Build performance bottleneck (30s+ Webpack vs 1-2s Vite)
**Impact:** 10x faster dev loop, improved developer experience

### 2. Containerization Before Configuration Rewrite
**Why:** Infrastructure modernization enables config simplification
**Impact:** Unified deployment pattern, easier scaling

### 3. Yarn Berry Plug'n'Play
**Why:** Prevent dependency confusion, faster installs
**Impact:** Better security posture, faster CI/CD

### 4. Local-first Configuration Design (Research)
**Why:** Reduced complexity vs cloud APIs, privacy-first approach
**Status:** In research phase, documented for future implementation

---

## Operational Excellence & Stability

### Production Incidents Managed
- **V2 Hub Sensor Unpair Handling** - Fixed race condition in sensor status
- **User Consent Data Leak** - Fixed query returning all users' records instead of filtered
- **Date Range Calculation Bug** - Incorrect end date calculation fixed (CAN3-1306)

### Testing & Quality
- **Unit tests:** Jest + React Testing Library (374 components)
- **E2E tests:** Cypress integration
- **CI/CD:** Azure DevOps pipeline with approval gates
- **Code coverage:** ESLint + Prettier + TypeScript strict mode

### Deployment Rigor
- **Staging → Testing → Production** promotion pattern
- **Release tagging** with version numbering
- **Back-merge** to develop after production deployment
- **Approval gates** for deployment progression

---

## Quantifiable Impact

| Metric | Result |
|--------|--------|
| **Care Facilities Supported** | 200+ |
| **Residents Monitored** | 10,000+ |
| **React Components** | 374 (39,730 LOC) |
| **Backend Services** | 26 total, 7 containerized (39% complete) |
| **Confluence Pages** | 677 indexed and searchable |
| **Development Speed** | 10x faster with Vite |
| **Secrets Migration** | 70% complete (16/25 parameters) |
| **Infrastructure Coverage** | AWS (RDS, ECR, ECS, ALB, Fargate) |

---

## Current Q4 2025-Q1 2026 OKR Progress

### Objective 1: Build Sustainability Awareness (Containerization)
- **KR 1.1: Containerization** - 39% complete (7/18), on track for 75-100% by March
- **KR 1.2: CI/CD Pipeline** - Core pipeline built, extension in progress
- **KR 1.3: Vibration Sensors** - Deprioritized stretch goal

### Objective 2: Increase Resilience & Efficiency
- **KR 2.1: BAU Triage** - Ongoing ticket triage work
- **KR 2.2: UAT Defects** - Baseline being established
- **KR 2.3: Config Experience Design** - Substantial research complete (AppAPI analysis, Local AI proposal)

### Objective 3: Support Luxion Group Initiatives
- **KR 3.1: AWS Training** - 50% complete, on track for finish this week
- **KR 3.2: Sensitive Data Migration** - 70% complete, 4 parameters remaining
- **KR 3.3: SLA Dashboarding** - Grafana dashboards planned with containerization metrics

---

## Technology Stack Summary

### Frontend
- **React 18** with TypeScript
- **Vite 6** for build (migrated from Webpack 4)
- **Styled Components** for CSS-in-JS
- **D3 7** for data visualization
- **Formik + Yup** for form validation
- **React Query 3** for server state
- **Jest + Cypress** for testing

### Backend
- **PHP** (legacy AppAPI, being evaluated for Python migration)
- **Python 3** (HubAPI, Notifications, Delivery Agents)
- **Go** (some service implementations)
- **MySQL/RDS** for primary database
- **Docker** for containerization

### Infrastructure
- **AWS** - RDS, ECR, ECS, Fargate, ALB, S3, CloudWatch
- **Terraform** for IaC
- **Ansible** for configuration management (being phased to Terraform)
- **Azure DevOps** for CI/CD pipelines
- **Grafana Cloud** for monitoring/observability

### DevOps & Tooling
- **Yarn Berry 4.9.2** (Plug'n'Play)
- **Docker** & **ECR** for image management
- **Jira** & **Azure DevOps** for project management
- **Git** with feature branches and release tagging
- **ESLint + Prettier** for code quality

---

## Key Learnings & Insights

1. **Infrastructure Investment Pays Off** - Containerization enables faster iteration and reduces deployment risk
2. **Documentation is Critical** - 677 Confluence pages were unmaintainable; consolidation enables knowledge sharing
3. **Test Coverage Matters** - E2E and unit tests catch regressions before production
4. **Secure by Default** - Secrets management and SSM migration prevent data leaks
5. **Performance Optimization Compounds** - Vite migration enables faster feedback loops, improving developer velocity

---

## Future Roadmap (Self-Directed)

### Short-term (March 2026)
- Complete containerization (75-100% of 18 services)
- Extend CI/CD pipeline to all services
- Finish AWS training and knowledge transfer
- Migrate remaining sensitive data to SSM

### Medium-term (Q2 2026)
- Evaluate AppAPI Python migration (99 endpoints analyzed)
- Implement local AI for sensor data analysis
- Design natural language configuration interface
- Deprecate Ansible, complete migration to Terraform

### Long-term (H2 2026)
- Browser-based LLM for family portal
- Care coordinator daily summaries (AI-assisted)
- Advanced analytics dashboard
- Mobile app enhancements

---

## How This Experience Prepared Me

This role has given me deep expertise in:
- **Full-stack ownership** - Frontend (React), Backend (multiple languages), Infrastructure (Docker/AWS)
- **System design at scale** - 200+ facilities, 10,000+ residents, 26 services
- **Cross-functional leadership** - Worked with product, ops, data science teams
- **Modernization projects** - Successfully managed major upgrades (Webpack→Vite, Ansible→Terraform→ECS)
- **Operational excellence** - Production incident handling, release management, security
- **Strategic thinking** - OKRs, roadmapping, prioritization in complex environments

---

## Getting Started (If Needed)

### Local Development
```bash
# Frontend
cd ~/dev/work/canary-portal
yarn install
yarn start  # localhost:3000

# Backend context
python ~/dev/work/tracking/scripts/fetch_jira.py --my-tickets

# Database access (via SSH tunnel)
bash ~/dev/work/canarybackend/containers/setup-tunnel.sh -u tom
```

### Documentation
- **Tracking repo** - ~/dev/work/tracking (Jira/Confluence/Git aggregation)
- **Confluence** - 677 pages indexed in QMD search
- **Development SOP** - ~/dev/work/tracking/docs/development/
- **Architecture reference** - ~/dev/work/tracking/docs/architecture/

---

**Last Updated:** 2026-02-16
**Status:** Active - Lead/Senior Engineer at Canary Care/Utilita
