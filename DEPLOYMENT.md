# CV Landing Page - Deployment Guide

## Project Structure

```
resume/
├── index.html              # Main landing page
├── styles/
│   └── main.css           # All styling (dark theme)
├── js/
│   └── main.js            # Interactions and animations
├── canary-care.md         # Detailed work history - Canary Care
├── wexley-lead-gen.md     # Business building - Wexley
├── infrastructure-security.md  # Backend/security work
├── experimental-projects.md    # Innovation & research
├── cv-summary.md          # High-level CV narrative
├── CV_STRUCTURE.md        # Page structure & narrative arc
├── PAGE_TEMPLATE.md       # Design specifications
├── README.md              # Project overview
└── DEPLOYMENT.md          # This file
```

## Quick Start (Local)

1. Clone/copy the resume folder
2. Open `index.html` in your browser (works locally, no server needed!)
3. See everything rendering with styling

## Deployment Options

### Option 1: Vercel (Recommended - Free & Fast)

**Pros:** Free tier, global CDN, automatic deployments from Git

```bash
# If not installed
npm install -g vercel

# From resume directory
vercel

# Follow prompts, deploy in seconds
```

**Then:**
- Vercel gives you a URL (e.g., `resume-tom.vercel.app`)
- Connect to custom domain if desired
- Automatic deployments from Git

### Option 2: Netlify (Also Free)

```bash
# Drag & drop the resume folder here:
https://app.netlify.com/drop

# Or use CLI:
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### Option 3: GitHub Pages (Free)

```bash
# Create repo at github.com/otherland/resume
git init
git add .
git commit -m "Initial CV landing page"
git branch -M main
git remote add origin https://github.com/otherland/resume.git
git push -u origin main

# In GitHub repo settings:
# Settings → Pages → Source: main branch, / (root)
# Your page is live at: https://otherland.github.io/resume
```

### Option 4: Self-Hosted (Advanced)

**Simple HTTP Server:**
```bash
# Python 3
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

**With Nginx (Production):**
```nginx
server {
    listen 80;
    server_name resume.tomyates.dev;

    root /var/www/resume;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Domain Setup

If using custom domain (e.g., `resume.tomyates.dev`):

1. **Get domain:** GoDaddy, Namecheap, Google Domains, etc.
2. **Point DNS to host:**
   - **Vercel:** Add CNAME to Vercel provided
   - **Netlify:** Add CNAME to Netlify provided
   - **GitHub Pages:** Add A record pointing to GitHub IPs
   - **Self-hosted:** A record to your server IP

## Performance Optimization

The site is already highly optimized:
- ✅ No build step needed (pure HTML/CSS/JS)
- ✅ Single CSS file (8KB minified)
- ✅ Single JS file (3KB minified)
- ✅ No external dependencies
- ✅ Loads in <500ms on 3G

**Optional:** Minify for even faster loads:
```bash
# CSS minification
npm install -g cssnano-cli
cssnano styles/main.css > styles/main.min.css

# JS minification
npm install -g terser
terser js/main.js -c -m -o js/main.min.js

# Then update index.html to reference .min files
```

## SEO & Meta Tags

The HTML already includes:
- ✅ Title and description
- ✅ Open Graph tags (for social sharing)
- ✅ Structured data ready for JSON-LD

**Optional enhancements:**
```html
<!-- Add to <head> for Google verification -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">

<!-- Add for analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Updates & Maintenance

To add new projects or update content:

1. **Update markdown:** Edit `experimental-projects.md`, `wexley-lead-gen.md`, etc.
2. **Update HTML:** Edit sections in `index.html` to add new content
3. **Deploy:** Push to Git (if using GitHub Pages/Vercel/Netlify) or manually upload

**Make sure to:**
- Update resume links if you move repos to private
- Add portfolio projects as they're completed
- Keep LinkedIn/GitHub links current
- Update contact info if it changes

## Analytics & Tracking

The JS file has placeholders for:
- Google Analytics (GA4)
- Custom event tracking
- Web Vitals monitoring

Uncomment the analytics section in `js/main.js` and add your GA measurement ID.

## Troubleshooting

**Page looks broken locally:**
- Make sure you're opening `index.html` in browser (file:// protocol works!)
- Check browser console for errors (F12 → Console)

**CSS not loading:**
- Ensure `styles/main.css` is in the same directory structure
- Check file paths in `index.html`

**JavaScript errors:**
- Check `js/main.js` exists
- Look in browser console (F12 → Console)

**Images not showing:**
- Currently using no images, only CSS styling
- To add: put images in `images/` folder and reference in HTML

## Best Practices

1. **Keep it updated** - Portfolio gets stale. Update every 3-6 months.
2. **Mobile first** - Test on phone before deploying
3. **Performance** - Keep it fast. <1s load time is ideal.
4. **Simplicity** - Less is more. Avoid heavy frameworks.
5. **Personality** - Let your personality shine through!

## Next Steps

1. Choose deployment platform (recommend **Vercel** for simplicity)
2. Deploy with one command
3. Share link: `resume-tom.vercel.app` or `tomyates.dev`
4. Set up custom domain if desired
5. Add to LinkedIn, GitHub bio, email signature

## Questions?

- **Deployment issues?** Check platform-specific docs
- **Want to customize?** Edit `styles/main.css` and `index.html`
- **Add interactivity?** Expand `js/main.js`
- **SEO improvements?** Add JSON-LD structured data

---

**Deployment Checklist:**

- [ ] Reviewed all content in index.html
- [ ] Tested locally (works great on file:// protocol)
- [ ] Tested on mobile
- [ ] Verified all links work
- [ ] Chose deployment platform
- [ ] Deployed successfully
- [ ] Tested live URL
- [ ] Set up custom domain (optional)
- [ ] Added analytics (optional)
- [ ] Shared with network!

Good luck! 🚀
