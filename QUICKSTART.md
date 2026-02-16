# Quick Start - 5 Minutes to Live CV

## Fastest Path: Deploy Now

### Step 1: Install Vercel CLI (if needed)
```bash
npm install -g vercel
# or already have it? Skip this
```

### Step 2: Deploy
```bash
cd ~/dev/projects/resume
vercel
# Follow prompts, press enter a few times
# Done! Your URL is ready
```

### Step 3: Share
```
Share your new URL with:
- LinkedIn
- Email signature
- GitHub bio
- Anywhere you want people to see your work
```

**Total time: 2 minutes ⚡**

---

## Want to Customize First?

### Change Colors
Edit `styles/main.css`, line 6-10:
```css
--color-accent: #00d9ff;      /* Change this cyan to your color */
--color-dark: #0a0a0a;         /* Or this dark background */
```

### Update Contact Info
Edit `index.html`, search for "Contact" section:
- Change email link
- Update GitHub URL
- Update LinkedIn URL

### Add New Project
1. Find "Projects Grid" section in `index.html`
2. Copy one `<div class="project-card">` block
3. Paste below and edit text/tags
4. Done!

### Verify Content
Before deploying, check:
- [ ] All contact links are correct
- [ ] No dead links to GitHub/LinkedIn
- [ ] Metrics are accurate
- [ ] Your name/location are right

---

## Alternative Deployments

### Netlify (Also Free)
```bash
npm install -g netlify-cli
cd ~/dev/projects/resume
netlify deploy --prod --dir .
# Or: drag folder to netlify.app/drop
```

### GitHub Pages (Also Free)
```bash
cd ~/dev/projects/resume
git init
git add .
git commit -m "CV landing page"
git remote add origin https://github.com/YOUR_USERNAME/resume.git
git push -u origin main

# Then enable Pages in GitHub repo settings
# Your page: https://YOUR_USERNAME.github.io/resume
```

### Local Testing First
```bash
cd ~/dev/projects/resume
python3 -m http.server 8000
# Visit: http://localhost:8000
# See it live before deploying
```

---

## What to Share

**One-liner intro:**
> "I'm a senior full-stack engineer with 3+ years experience modernizing enterprise systems, building automation businesses, and shipping innovative products. Check out my work →"

**Then link to your new URL!**

---

## Next Steps (After Deploying)

1. **LinkedIn** - Add to profile URL section
2. **Email** - Put in signature
3. **GitHub** - Link from bio
4. **Twitter** - Include in pinned tweet
5. **Job applications** - Use as portfolio link

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "vercel not found" | `npm install -g vercel` |
| Page looks plain/broken | Refresh browser (Ctrl+Shift+R) |
| Colors are wrong | Check CSS variables in styles/main.css |
| Links don't work | Verify URLs in index.html |
| Mobile looks bad | Use responsive inspector (F12) |

---

## File Descriptions (Quick Ref)

| File | What It Is |
|------|-----------|
| `index.html` | **Your actual page** - this is what people see |
| `styles/main.css` | **All the styling** - colors, layout, responsive |
| `js/main.js` | **Interactions** - smooth scroll, animations |
| `*-care.md` | Detailed documentation (read if curious) |
| `cv-summary.md` | One-page narrative (for copy-pasting) |
| `DEPLOYMENT.md` | Full deployment guide (if you want details) |

---

## Sharing Your URL

### The Best Line
> "I spent 3+ years modernizing enterprise systems, building automation businesses, and shipping innovative products. My work is here: [your-url]"

### Work Examples to Highlight
- **Canary Care** - Enterprise SaaS at scale (200+ facilities, 10K residents)
- **Wexley** - Founder of lead-gen business (1B+ leads, multiple SaaS products)
- **Infrastructure** - Backend systems, security, automation
- **Innovation** - 9+ research/experimental projects

---

## One More Thing

The markdown files (canary-care.md, wexley-lead-gen.md, etc.) are there for:
- **Your reference** - Deep context on each project
- **Copy-pasting** - Statements/bullets for resumes/LinkedIn
- **Proof** - Shows you did the work

You don't need to deploy them, but you CAN link to them if hosting on GitHub:
```html
<a href="canary-care.md">Full Canary Care details →</a>
```

---

## You're All Set! 🚀

Your CV is ready. Deploy it now:

```bash
cd ~/dev/projects/resume && vercel
```

That's it. You're live in 60 seconds.

Questions? Check:
- DEPLOYMENT.md (for hosting details)
- PROJECT_MANIFEST.md (for complete overview)
- index.html (for customization)

---

**Welcome to your new CV landing page. Now go get 'em! 💪**
