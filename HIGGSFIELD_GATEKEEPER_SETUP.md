# 🚀 GATEKEEPER + HIGGSFIELD MOTION WEBSITE GENERATOR

Build a professional marketing website for Gatekeeper in minutes using Higgsfield's Motion Website Generator.

---

## 📋 WHAT YOU'LL GET

✅ Professional marketing website (auto-generated)  
✅ Brand-consistent design with your branding  
✅ Scroll-based hero sections, features, pricing, CTA  
✅ Mobile responsive out-of-the-box  
✅ Deployed live in 1 minute  
✅ Built-in optimization for conversions  

---

## ⚡ QUICK START (5 STEPS)

### **Step 1: Create a Higgsfield Account**

1. Go to https://higgsfield.ai
2. Sign up (free credits included)
3. Verify email
4. Log in

**Cost:** Free tier + credits included

---

### **Step 2: Set Up Higgsfield MCP in Claude Code** (Desktop)

If you have **Claude Desktop** or **Claude Code**:

```bash
# Add Higgsfield MCP server
claude mcp add --transport http --scope user higgsfield https://mcp.higgsfield.ai/mcp

# Verify
claude mcp list
```

**What it does:**
- Enables Higgsfield tools in Claude
- OAuth connects to your Higgsfield account
- Allows Claude to generate videos/images/websites directly

---

### **Step 3: Prepare Your Gatekeeper Brand Kit**

Before using the Motion Website Generator, gather:

**Logo:**
- `gatekeeper-mark.svg` (already have this)

**Colors:**
- Primary: `#1e3a8a` (deep blue)
- Accent: `#f59e0b` (gold/amber)
- Background: `#0f172a` (dark blue)

**Fonts:**
- Headings: Inter Bold
- Body: Inter Regular

**Business Description:**
```
Gatekeeper is a universal expert verification platform that 
helps litigators, organizations, and institutions instantly 
verify expert credentials and risk scores across 5+ industries. 

We aggregate data from 7+ free APIs (RetractionWatch, ORCID, 
NIH, CrossRef, PubMed, arXiv, USPTO) to provide instant, 
actionable expert intelligence.
```

---

### **Step 4: Trigger Motion Website Generator**

Once you have Higgsfield MCP set up, ask Claude:

```
Use Higgsfield's Motion Website Generator to build a professional
website for Gatekeeper Expert Verification Platform.

Brand Kit:
- Logo: /path/to/gatekeeper-mark.svg
- Colors: Primary #1e3a8a, Accent #f59e0b, Dark #0f172a
- Fonts: Inter (bold headings, regular body)

Business Brief:
Gatekeeper is a universal expert verification platform across 
5+ industries. We provide instant expert risk scoring using 7+ 
free data sources. Built for litigators, companies, and 
institutions. Pricing starts at $500/month.

Website sections:
1. Hero - "Instant Expert Verification"
2. How It Works - 4-step process
3. Industries - MDL, Environmental Law, Financial, Engineering, Scientific
4. Features - Search, Risk Scoring, Data Integration
5. Experts - Display 35+ verified experts
6. Pricing - Tiers: Starter ($500), Pro ($2000), Enterprise (custom)
7. CTA - "Start Verifying Experts Today"

Generation preferences:
- Use Fable 5 model for best results
- Motion effects: subtle, professional
- No heavy animations
- Focus on conversion
```

---

### **Step 5: Iterate & Deploy**

**What Higgsfield Does:**
1. Claude plans sections
2. Generates video clips via MCP
3. Assembles scroll site
4. Returns HTML file

**You Then:**
1. Review in browser
2. Ask for tweaks: "Tighten the hero copy" or "Swap section 3 for pricing block"
3. Approve
4. Deploy (Netlify, Vercel, or GitHub Pages)

---

## 🎯 DEPLOYMENT OPTIONS (1-Minute Deploy)

### **Option A: Vercel (Recommended)**
```bash
vercel --prod
```
Live URL: `https://gatekeeper-XXXXX.vercel.app`

### **Option B: Netlify**
```bash
netlify deploy --prod --dir=.
```

### **Option C: GitHub Pages**
```bash
git push origin main
# Enable Pages in repo settings
```

---

## 📦 HIGGSFIELD WORKFLOW (Step-by-Step)

### **Inside Claude (with Higgsfield MCP enabled):**

**Step 1: Load Motion Website Generator skill**
```
/mcp Motion Website Generator
```

**Step 2: Provide brand kit + brief**
- Upload or reference logo
- Provide color palette
- Paste business description
- List website sections

**Step 3: Claude plans the site**
```
I'll create:
- Section 1: Hero (main value prop)
- Section 2: How it works (4 steps)
- Section 3: Industries showcase
- Section 4: Expert database demo
- Section 5: Risk scoring explainer
- Section 6: Pricing tiers
- Section 7: CTA section
```

**Step 4: Higgsfield generates**
- Creates video clips for each section
- Generates HTML/CSS structure
- Assembles scroll site
- Returns single `.html` file

**Step 5: You iterate**
```
"Slow down the scroll pacing"
"Make the pricing section more prominent"
"Add testimonials after the features section"
"Change 'Sign Up' to 'Start Free Trial'"
```

**Step 6: Final deployment**
- Download HTML file
- Deploy to Vercel/Netlify/GitHub Pages
- Share live URL

---

## 🎨 GATEKEEPER WEBSITE STRUCTURE

### **Section 1: Hero**
**Headline:** "Instant Expert Verification"  
**Subheading:** "Verify expert credentials, risk scores, and litigation history in seconds"  
**CTA:** "Start Verifying" (green button)  
**Visual:** Animated expert verification animation  

### **Section 2: The Problem**
**Copy:** "Experts should be trusted based on credentials, not claims"  
**Points:**
- 1 in 5 experts have undisclosed conflicts
- Manual verification takes days/weeks
- Critical cases need instant answers

### **Section 3: How It Works**
**4-step visual process:**
1. Search expert by name
2. Our platform fetches 7+ data sources
3. Risk score calculated (LOW/MEDIUM/HIGH/CRITICAL)
4. Complete profile displayed with sources

### **Section 4: Industries**
**5 industry cards (scrollable):**
- MDL / Medical (10+ experts)
- Environmental Law (8+ experts)
- Financial (6+ experts)
- Engineering (6+ experts)
- Scientific (5+ experts)

### **Section 5: Features**
**Feature blocks:**
- Real-time Search (with live demo)
- Multi-Source Verification (APIs listed)
- Risk Scoring Algorithm (transparent methodology)
- Instant Export (PDF/CSV)
- API Access (for your applications)

### **Section 6: Expert Database**
**Show 10-15 experts:**
- Name, specialty, risk score
- Data sources used
- Link to full profile

### **Section 7: Pricing**
**3 tiers:**
1. **Starter** — $500/mo (up to 100 searches)
2. **Pro** — $2,000/mo (unlimited searches + API)
3. **Enterprise** — Custom (dedicated support, white-label)

### **Section 8: CTA Footer**
**Headline:** "Start Verifying Experts Today"  
**Buttons:** "Free Trial" | "Schedule Demo"  
**Social links**  

---

## 🚨 IMPORTANT: HIGGSFIELD ACCOUNT SETUP

### **1. Create Account at higgsfield.ai**
- Free signup
- New accounts get free credits ($50-100 value)
- No credit card required for free tier

### **2. Add MCP in Claude Code/Desktop**
```bash
claude mcp add --transport http --scope user higgsfield https://mcp.higgsfield.ai/mcp
```

### **3. Authenticate on First Use**
- Claude Code opens browser for OAuth
- Approve access
- Claude can now use Higgsfield tools

### **4. Verify Connection**
```bash
claude mcp list
# Should show "higgsfield" connected
```

---

## 💡 PRO TIPS

**Iteration Best Practice:**
- First version: plain copy, focused layout
- Second pass: "Make it more exciting"
- Third pass: "Adjust tone to match audience"
- Final: "Add social proof/testimonials"

**Motion Effects:**
- Keep animations subtle (professional look)
- Avoid heavy autoplay videos (faster load)
- Use Fable 5 or Opus 4.8 for best results

**Content Tone:**
- Professional (litigation audience)
- Data-driven (emphasize accuracy)
- Accessible (explain technical terms)
- Conversion-focused (clear CTAs)

**Testing:**
- Desktop (1920×1080)
- Mobile (375×667)
- Tablet (768×1024)

---

## 🎬 EXAMPLE HIGGSFIELD REQUEST

```
Use the Motion Website Generator to create a professional marketing 
website for Gatekeeper Expert Verification Platform.

BRAND KIT:
Logo: [upload gatekeeper-mark.svg]
Primary Color: #1e3a8a
Accent Color: #f59e0b
Dark Background: #0f172a
Typography: Inter (bold headings, regular body)

BUSINESS BRIEF:
Gatekeeper instantly verifies expert credentials across 5 industries 
using real-time data from 7+ free APIs. We serve litigation firms, 
corporations, and institutions. Current offering: 35 verified experts, 
risk scoring, complete profile histories.

WEBSITE SECTIONS:
1. Hero: "Instant Expert Verification"
2. Problem: "Why Experts Matter"
3. How It Works: 4-step process with visuals
4. Industries: 5 industry cards with expert counts
5. Features: Real-time search, risk scoring, API access
6. Expert Database: Display 10-15 sample experts
7. Pricing: 3 tiers ($500, $2K, Enterprise)
8. CTA: "Start Verifying Experts Today"

GENERATION PREFERENCES:
- Model: Fable 5 (best quality)
- Style: Professional, data-driven
- Animations: Subtle scroll effects
- Load: Optimized for speed
- Mobile: Fully responsive
- Deployment: Single HTML file ready for Vercel
```

---

## ✅ DEPLOYMENT CHECKLIST

Before you go live:

**Content:**
- [ ] All 35 experts loaded in database section
- [ ] Accurate pricing tiers
- [ ] CTA buttons functional
- [ ] Social links set
- [ ] Privacy/Terms links added

**Design:**
- [ ] Brand colors applied throughout
- [ ] Logo displayed properly
- [ ] Fonts rendering correctly
- [ ] Mobile responsive (test on phone)
- [ ] No broken images/links

**Performance:**
- [ ] Page loads in < 3 seconds
- [ ] All animations smooth
- [ ] Forms functional
- [ ] Analytics tracking added (optional)

**Go Live:**
- [ ] Deploy to Vercel/Netlify/GitHub Pages
- [ ] Test live link on desktop + mobile
- [ ] Share with stakeholders
- [ ] Monitor uptime

---

## 🎊 YOU'RE READY!

**Next Steps:**

1. **Create Higgsfield account** at higgsfield.ai
2. **Set up MCP** with `claude mcp add ...`
3. **Prepare your brand kit** (logo, colors, copy)
4. **Use Motion Website Generator** in Claude
5. **Deploy in 1 minute** to Vercel/Netlify
6. **Share your live website!**

---

## 🆘 TROUBLESHOOTING

**Q: Higgsfield MCP won't connect**  
A: Make sure you're in Claude Code (desktop). Web version needs manual setup.

**Q: "Motion Website Generator" not found  
A: Make sure Higgsfield MCP is connected and loaded (`claude mcp list`)

**Q: Videos not generating  
A: Check your Higgsfield credits (free tier provides ~$50-100 of free credits)

**Q: Website looks wrong on mobile  
A: Tell Claude: "Make this fully responsive on mobile (375px width)"

**Q: Deploy to Vercel failed  
A: Make sure you have Node.js installed and are logged in to Vercel

---

## 📚 RESOURCES

- Higgsfield Docs: https://higgsfield.ai/docs
- Motion Website Generator: Built-in skill (load with /mcp)
- Vercel Deploy: https://vercel.com/new
- Netlify Deploy: https://netlify.com/drop

---

**Version 1.0**  
**September 22, 2026**  
**Gatekeeper + Higgsfield Integration Guide**

🚀 **LET'S BUILD!** 🚀

