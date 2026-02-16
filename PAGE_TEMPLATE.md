# CV Landing Page Template

## Static HTML Structure

```
/index.html
  - Hero section with photo + intro
  - Navigation (About, Work, Projects, Contact)

/styles/main.css
  - Dark mode theme
  - Responsive grid for projects
  - Code syntax highlighting

/js/interactions.js
  - Smooth scrolling
  - Project filtering/sorting
  - Contact form

/content/
  - about.html
  - canary-work.html
  - wexley-business.html
  - infrastructure.html
  - projects.html
  - contact.html
```

## Page Sections

### 1. Hero
```
[Photo]
Tom Yates
Full-Stack Engineer | Founder | Scale Specialist

Led React rewrite at $10M SaaS, built lead-gen business from zero,
deployed infrastructure for 1B+ data operations
```

### 2. About / Narrative
- 3+ years professional development
- Senior role at Canary Care
- Founded Wexley lead-gen business
- Deep expertise: frontend, backend, infrastructure, security

### 3. Featured Work

#### Canary Care (2023-2026)
- Senior Engineer → Frontend modernization
- React rewrite of PHP codebase
- Served thousands of customers
- Tech: React, TypeScript, Docker, GCloud

#### Wexley (2024-2026)
- Founder, built lead-gen + automation business
- 1B+ lead database, multiple SaaS products
- Tech: Node.js, Python, BigQuery, SMTP

#### Infrastructure & Security
- Vulnerability scanning, incident response
- Email infrastructure from scratch
- BigQuery data pipelines
- Tech: GCloud, DevOps, Security

### 4. Skills Matrix

**Frontend:** React, TypeScript, Performance, CSS, HTML5
**Backend:** Node.js, Python, Go, Microservices, APIs
**Data:** BigQuery, SQL, Redis, Data pipelines
**Infrastructure:** Docker, Kubernetes, GCloud, DevOps
**AI/ML:** LLM fine-tuning, OpenAI, Transcription
**Security:** Vulnerability scanning, Incident response, Secure design

### 5. Projects Gallery

Grid of 12-15 project cards with:
- Project name
- 2-3 line description
- Tech stack badges
- GitHub link (if public)
- Live demo link (if available)

### 6. Metrics & Impact

- Served 10,000+ customers (Canary)
- 1B+ records in BigQuery pipeline
- 3 SaaS products in production (Wexley)
- X open-source projects

### 7. Contact

- Email: tomyates@canarycare.co.uk
- GitHub: @otherland
- LinkedIn: [profile]
- Available for: Consulting, full-time roles, partnerships

---

## Design Requirements

- **Aesthetic:** Clean, minimal, professional, no generic AI look
- **Accessibility:** WCAG AA compliant
- **Performance:** <2s load time
- **Mobile:** Fully responsive
- **Interactivity:** Smooth transitions, project filtering
- **Dark mode:** Primary theme with optional light mode toggle
- **Typography:** Modern sans-serif + monospace for code

## Build Process

1. Write content in markdown (.md files)
2. Convert to HTML with semantic markup
3. Style with CSS (mobile-first)
4. Add light JavaScript interactions
5. Deploy to static host (Vercel, Netlify, GitHub Pages)
6. Update from master branch for portfolio changes
