# 🚀 Gatekeeper Multi-Industry — Quick Deploy to Vercel

**Status:** 35 Experts | 5 Industries | Ready to Deploy

---

## What You Have

✅ **Backend Script** (`gatekeeper_backend_enhanced.py`)  
- Fetches real data from 7+ free APIs
- Supports 5 industries: MDL, Environmental Law, Financial, Engineering, Scientific
- Creates `expert_data.json` with all expert credentials

✅ **Website** (`gatekeeper_multi_industry.html`)  
- Interactive search & filtering
- Industry-based view
- Risk scoring dashboard
- Mobile responsive

✅ **Data File** (`expert_data.json`)  
- 35 pre-loaded experts
- Credential verification across all sources
- Ready to deploy

---

## Step 1: Run Backend Locally (Get Real Data)

On your machine with internet access:

```bash
# Navigate to outputs folder
cd /path/to/outputs

# Install Python dependencies (if needed)
pip3 install requests

# Run the backend to fetch REAL data from all APIs
python3 gatekeeper_backend_enhanced.py

# This regenerates expert_data.json with live API data
# (RetractionWatch, ORCID, NIH Reporter, CrossRef, PubMed, arXiv, USPTO)
```

**Result:** `expert_data.json` updated with real API data

---

## Step 2: Deploy to Vercel (Free)

### Option A: Vercel CLI (Fastest — 2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to outputs folder
cd /path/to/outputs

# Deploy
vercel

# Follow prompts:
# - Project name: gatekeeper
# - Root directory: ./
# - Build command: (leave blank)
# - Output directory: (leave blank)
```

**Result:** Live at `https://gatekeeper-XXXXX.vercel.app`

---

### Option B: GitHub + Vercel (Automatic Updates)

```bash
# Initialize git repository
cd /path/to/outputs
git init
git add .
git commit -m "Gatekeeper: 35 experts, 5 industries"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/gatekeeper.git
git branch -M main
git push -u origin main

# In Vercel dashboard:
# 1. Visit https://vercel.com/new
# 2. Import your GitHub repo
# 3. Deploy (auto-deploys on every push)
```

**Result:** Auto-deployed website + live link

---

### Option C: Drag & Drop (Simplest)

1. Go to https://vercel.com/new
2. Drag the `/outputs` folder
3. Deploy

**Result:** Instant deployment

---

## Step 3: Verify Live Site

```
URL: https://gatekeeper-XXXXX.vercel.app
```

You should see:
- 35 experts loaded
- Filter by industry, risk level, or search
- All 7 data sources verified for each expert
- Risk scoring dashboard

---

## Update Process (When You Get New Data)

1. Run backend locally:
   ```bash
   python3 gatekeeper_backend_enhanced.py
   ```

2. For GitHub + Vercel:
   ```bash
   git add expert_data.json
   git commit -m "Updated: Fresh API data"
   git push
   # Site auto-updates in 1-2 minutes
   ```

3. For CLI deploy:
   ```bash
   vercel --prod
   ```

---

## Files You Need

```
/outputs/
├── gatekeeper_multi_industry.html    ← Deploy this
├── expert_data.json                   ← Deploy this
├── gatekeeper_backend_enhanced.py     ← Run locally to update data
└── vercel.json                        ← (optional, included)
```

---

## Industries Included

| Industry | Count | Key Data Sources |
|----------|-------|------------------|
| **MDL / Medical** | 10 | RetractionWatch, ORCID, NIH Reporter, PubMed |
| **Environmental Law** | 8 | State Bar, CrossRef, Publications |
| **Financial** | 6 | ORCID, Credentials, Patents |
| **Engineering** | 6 | USPTO Patents, Credentials |
| **Scientific** | 5 | arXiv, CrossRef, PubMed |

---

## API Data Sources

All **FREE** and no authentication required:

1. **RetractionWatch** — `api.retractionwatch.com` — Retracted papers
2. **ORCID** — `pub.orcid.org` — Researcher verification
3. **NIH Reporter** — `api.report.nih.gov` — Federal grants
4. **CrossRef** — `api.crossref.org` — Publications & DOIs
5. **PubMed** — `eutils.ncbi.nlm.nih.gov` — Medical literature
6. **arXiv** — `export.arxiv.org` — Preprints & papers
7. **USPTO Patents** — `api.patentsview.org` — Patents
8. **State Bar APIs** — CA, NY, TX databases — Lawyer verification

---

## Troubleshooting

**"expert_data.json not found"**  
→ Make sure file is in same directory as HTML file

**"API data not updating"**  
→ Run `python3 gatekeeper_backend_enhanced.py` locally with internet
→ Then deploy the updated `expert_data.json` to Vercel

**"Can't find Vercel CLI"**  
→ Install: `npm install -g vercel`  
→ Make sure Node.js 14+ installed

**"Want to add more experts?"**  
→ Add to the lists in `gatekeeper_backend_enhanced.py`
→ Rerun backend
→ Redeploy

---

## Next Steps

- [ ] Run backend locally to fetch real API data
- [ ] Deploy to Vercel (pick any option A/B/C)
- [ ] Share link with team: `https://gatekeeper-XXXXX.vercel.app`
- [ ] Set up auto-updates via GitHub
- [ ] Add more experts to the backend
- [ ] Scale to 100+ experts per industry

---

## Support

**Questions?** Check:
- Backend logs for API errors
- Vercel dashboard for deployment status
- Browser console for JS errors
- expert_data.json structure for data issues

**Need more experts?**  
Edit `gatekeeper_backend_enhanced.py` and add to industry lists.

---

**Deployed with ❤️ by Gatekeeper**  
Last Updated: 2026-09-22
