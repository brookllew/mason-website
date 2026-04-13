# Mason Interactive Website Redesign
## Internal Team Brief | April 2026

---

## 1. What This Is

A complete website redesign for masoninteractive.com. This folder contains HTML prototypes for every page of the new site, ready for WordPress development. Each file is a self-contained, browser-viewable prototype with final copy, layout, interactions, and assets.

### Files in This Folder

| File | Page | Status |
|------|------|--------|
| `mason-homepage.html` | Homepage `/` | Complete |
| `mason-higher-education.html` | Higher Education `/higher-education/` | Complete |
| `mason-ecommerce.html` | eCommerce & DTC `/ecommerce/` | Complete |
| `mason-about-v2.html` | About `/about/` | Complete |
| `mason-services.html` | Services `/services/` | Updated |
| `mason-work.html` | Work/Case Studies `/work/` | Updated |
| `mason-blog.html` | Blog `/blog/` | Updated |
| `mason-lets-talk.html` | Contact `/lets-talk/` | Complete |
| `mason-creative-portfolio.html` | Creative Portfolio `/creative-portfolio/` | From previous session |

### Asset Files
All video and image assets are in this folder. They will be uploaded to WordPress Media Library during the build.

---

## 2. Strategic Context

### Why We're Rebuilding
- 71% of all traffic hits the homepage and leaves. The rest of the site was largely invisible.
- The old site had 30+ pages. Most had near-zero traffic.
- Competitive analysis showed three gaps: no AI messaging, "generalist" positioning with 9+ verticals, and creative buried behind paid media.
- The site didn't reflect how Mason actually pitches (see CSU deck, TCS deck).

### What the Data Said (GA4, March 2025 - March 2026)
- Homepage: 151,263 views (71%)
- Creative Portfolio: 8,747 views (#2 page, Mike's sales tool)
- Highest engagement: /our-team/ (38.7s), /our-approach/ (35.7s), /case-studies/ (31.8s)
- Only 2 pages drove conversions: /free-marketing-analysis/ (806 key events) and /contact-us/ (278 key events)
- The Unbounce /work-with-us page converts at 21.58% (789 conversions from 3,656 visitors)

### Positioning
**"Creative-Led, AI-Accelerated Full Service Agency"**

This is the tagline. It appears on every page. It says three things:
1. Creative-led: we are not a performance marketing shop
2. AI-accelerated: we are not behind the curve
3. Full service: we are not a boutique that only does one thing

### The Dual-Brand System
The site serves two verticals with different visual identities:

**eCommerce & DTC (default):**
- Dark background (#0a0a08)
- Cream text (#f0ebe0)
- Acid green accent (#c8f060)
- Video-forward, editorial energy
- Reference: within.co

**Higher Education:**
- Cream background (#ede8df)
- Dark text (#2a2a28)
- Teal green accent (#2eb87a)
- Text-forward, consulting energy
- Reference: TCS weekly strategy deck

The mode persists via localStorage. A URL parameter `?mode=highered` can set it from ad clicks. The nav toggle on every page lets visitors switch.

---

## 3. Sitemap

### New Structure (consolidated from 30+ pages to 10)

```
/                        Homepage (dark, all clients, video hero)
/higher-education/       Dedicated Higher Ed page (cream, always)
/ecommerce/              Dedicated eCommerce page (dark, always)
/work/                   Case studies (dual-mode)
/services/               Services (dual-mode)
/about/                  About (dual-mode)
/blog/                   Blog index (dual-mode)
/lets-talk/              Contact form (dual-mode, no nav)
/creative-portfolio/     Mike's sales tool (hidden from nav)
/growth/[client]/[sow]   Growth Portal (password-protected, from previous session)
```

### 301 Redirect Map (implement before DNS cutover)

| Old URL | New URL |
|---------|---------|
| /our-offerings/ (and all children) | /services/ |
| /our-offerings/creative-portfolio/ | /creative-portfolio/ |
| /case-studies/ (and all children) | /work/ |
| /our-approach/ | /about/ |
| /our-team/ | /about/ |
| /our-mission/ | /about/ |
| /our-clients/ | /about/ |
| /resources/ | /blog/ |
| /webinars/ | /blog/ |
| /beauty/ /fashion/ /cpg/ /lifestyle/ | /ecommerce/ |
| /b2b/ /education/ | /higher-education/ |
| /institutional-growth/ | /higher-education/ |
| /work-with-us/ | /lets-talk/ |
| /free-marketing-analysis/ | /lets-talk/ |
| /contact-us/ | /lets-talk/ |

**IMPORTANT:** Do NOT redirect individual blog post URLs. All existing /blog/post-slug/ URLs stay exactly as-is for SEO.

---

## 4. Page-by-Page Specs

### Homepage `/`
- Hero: video module (16:8, rounded corners) with headline "Human creativity just got an unfair advantage" overlaid
- "Running AI-native paid media for brands spending $10K to $10M a month" sub-line
- Stats: $1B+ / 17 years / 100+ brands
- Toggle: All | Higher Education (links to /higher-education/) | eCommerce & DTC (filters grid)
- Client grid: 4x4 tiles with video/image assets, hover reveals industry + services
- Higher Ed CTA band below grid
- Ticker strip
- Mason Intel AI section
- 6 service cards (3x2)
- Rotating testimonials (3 quotes, 5-second rotation)
- Footer: "Let's talk." centered

**SEO Target:** "ai agency", "ai marketing agency", "creative agency NYC"

### Higher Education `/higher-education/`
- Cream background (permanent, not toggled)
- Hero video (lacrosse.mp4 placeholder, swap for Mike's Higher Ed sizzle when ready)
- Headline: "Higher education strategies with higher creative standards."
- Sub: "And a proprietary AI media engine to make them scale."
- 12 institution cards in 4x3 grid
- "What Makes Us Different" 4-panel section
- Mason Intel section
- 6 service cards (includes Enrollment Strategy, Slate)
- Cross-reference to eCommerce
- Scott Lucente / CIA testimonial

**SEO Target:** "higher education marketing agency", "enrollment marketing agency"

### eCommerce & DTC `/ecommerce/`
- Dark background (permanent)
- Hero video (laurentferrier.mp4)
- Headline: "From emerging brands to global luxury."
- 8 client tiles with videos/images
- Positioning statements
- Mason Intel section
- 6 service cards
- Cross-reference to Higher Ed
- Nicole Weiss / Dagne Dover testimonial

**SEO Target:** "ecommerce marketing agency", "DTC growth agency", "paid media agency"

### About `/about/`
- Hero: "Creative is still the unfair advantage. AI is how we scale it."
- Mike's copy about human directors + AI producers
- Numbers strip: 2008 / $1B+ / 100+ / 2 verticals / 17 years
- Story section (4 paragraphs)
- 6 values cards
- Team grid (7 members + hiring card): Brook Shepard, Michael Mellia, Ashley Bruzas, Brian Poole, Caitlin Groseclose, Andrew Womble, Caroline Pachacz
- Partner badges

**SEO Target:** "creative branding agency", "brand strategy agency Brooklyn"

### Services `/services/`
- 4 service pillars (full-bleed horizontal blocks):
  01 Creative & Production
  02 Paid Media
  03 Owned & Lifecycle (now includes AI Search / AIO)
  04 Lead Generation
- How We Work: 4-step process
- Industries: 6-card grid

**SEO Target:** "paid media agency", "paid social agency", "email marketing agency"

### Work `/work/`
- Featured case study
- 8-card grid with filter tabs
- Real results needed per case study

**SEO Target:** "creative agency for luxury brands", "creative agency for fashion brands"

### Blog `/blog/`
- Featured post: "ROAS Is Killing Your Growth" (5,886 views, top organic post)
- Filter tabs: All / Paid Media / Creative / SEO / Higher Ed / eCommerce / Strategy
- 6-post grid
- Newsletter signup

**SEO Target:** Long-tail content keywords from DTC keyword research

### Let's Talk `/lets-talk/`
- Based on Unbounce /work-with-us (21.58% conversion rate)
- NO main navigation (no escape routes)
- Two-column: headline left, form right
- 6 form fields: First Name*, Last Name*, Company, Email*, Website, Message
- "Let's Talk" submit button in rust #F4632A
- 4-step process below
- 2 testimonials
- Partner badges

**SEO Target:** Brand searches only (this is a conversion page, not an SEO page)

---

## 5. Design System

### Colors
```
Default (eCommerce):
  Background:   #0a0a08
  Surface:       #111110
  Text:          #f0ebe0
  Muted:         #6b6b60
  Accent:        #c8f060

Higher Ed:
  Background:   #ede8df
  Surface:       #e4dfd6
  Text:          #2a2a28
  Muted:         #7a7a72
  Accent:        #2eb87a

Universal:
  CTA Button:   #F4632A (rust orange, same in both modes)
```

### Typography
```
Headlines:     Playfair Display (serif) - Google Fonts
Labels/UI:     DM Mono (monospace) - Google Fonts
Body:          DM Sans (sans-serif) - Google Fonts
Sub-headlines: Work Sans (sans-serif) - Google Fonts

Note: These are placeholder fonts from the prototype. Check Adobe Fonts or Fontspring for the actual purchased fonts. The live site uses Athletics, Big Daily Short, Montserrat, and Work Sans.
```

### Logos
- `Mason Logo White.png` - for dark backgrounds (eCommerce mode)
- `Mason Logo.png` - for cream backgrounds (Higher Ed mode)
- Logos swap automatically based on mode via CSS classes `.logo-light` / `.logo-dark`

### Shared Elements
- Noise texture overlay (SVG-based, fixed position, 0.4 opacity dark / 0.15 cream)
- Scroll-reveal animations on sections (IntersectionObserver)
- 16px border-radius on hero video modules and CTA buttons
- No custom cursor (killed, using default browser pointer)

---

## 6. Technical Requirements for WordPress Build

### CSS Framework
Use **Tailwind CSS**. The design tokens map directly to Tailwind's config:
```
tailwind.config.js:
  colors: {
    bg: '#0a0a08',
    bg2: '#111110',
    cream: '#f0ebe0',
    muted: '#6b6b60',
    accent: '#c8f060',
    rust: '#F4632A',
    // Higher Ed variants
    'he-bg': '#ede8df',
    'he-bg2': '#e4dfd6',
    'he-text': '#2a2a28',
    'he-muted': '#7a7a72',
    'he-accent': '#2eb87a',
  }
```

### Google Tag Manager
GTM container in the `<head>` of every page template. Required for:
- GA4 event tracking
- Meta, Google, TikTok pixel
- Growth Portal tracking (contract viewed/signed)
- Heatmap tools

### Mode Persistence (JavaScript)
Every page must include this at the top of its script:
```javascript
const urlMode = new URLSearchParams(window.location.search).get('mode');
if (urlMode) localStorage.setItem('mason-mode', urlMode);
const mode = localStorage.getItem('mason-mode') || 'default';
if (mode === 'highered') {
  document.body.classList.add('highered-mode');
}
```

### Video Assets
All video files need to be uploaded to WordPress Media Library. Current local files:
- laurentferrier.mp4 (6.8MB)
- roam-video.mp4 (6.5MB)
- lacrosse.mp4 (4.0MB)
- lewisuniversity.mp4 (4.0MB)
- neucognition.mp4 (3.3MB)
- edward sexton.mp4 (1.9MB)

Plus hosted assets already on masoninteractive.com:
- Aman tennis video
- CIA photo
- Floof case study video

### Mike's Deliverables Needed Before Launch
- [ ] Higher Ed sizzle reel (save as `highered-reel.mp4`, 2560x1280 or 1920x960, under 8MB)
- [ ] eCommerce sizzle reel (multi-client cuts: Laurent Ferrier, Edward Sexton, Roam, Aman)
- [ ] Real team headshots for About page
- [ ] Any additional client tile imagery

---

## 7. Unbounce Migration

### Pages to MOVE on-domain (rebuild in WordPress):
- /work-with-us (21.58% conversion) -> /lets-talk/
- /free-marketing-analysis (1.95%, 428 conversions) -> CTA on homepage

### Pages to KEEP on Unbounce (campaign-specific):
- Google EDU Summit (6.15%)
- EDU Audit (4.25%)
- Education Portfolio (7.37%)
- Beauty Portfolio (3.8%)
- Future event/campaign landing pages

### Pages to UNPUBLISH (~85 pages):
All expired webinars, zero-conversion content pages, dated marketing guides. See full audit in session notes.

---

## 8. SEO Keyword Targets (from 2026 Mason Marketing Keywords.xlsx)

### Primary Keywords by Page

| Page | Primary Keyword | Volume | CPC |
|------|----------------|--------|-----|
| Homepage | "ai marketing agency" | 2,400 | $10.48 |
| Homepage | "ai agency" | 8,100 | $10.11 |
| Services | "paid media agency" | 2,900 | $36.16 |
| Services | "social media marketing agency" | 22,200 | $9.10 |
| Services | "email marketing agency" | 9,900 | $13.64 |
| About | "branding agency" | 14,800 | $6.65 |
| About | "brand strategy agency" | 2,900 | $8.46 |
| Work | "creative agency for luxury brands" | (Tier 1 Google Ads) | |
| Higher Ed | "higher education marketing agency" | (needs separate research) | |
| eCommerce | "DTC marketing agency" | (Tier 1 Google Ads) | |

### Blog Content Strategy (from DTC keyword research)
Each of these is a blog post targeting problem-aware DTC founders:
- "how to scale a DTC brand"
- "how to scale meta ads profitably"
- "DTC brand stuck at $1M revenue"
- "how to lower CAC for DTC brand"
- "meta ads ROAS declining what to do"
- "scaling ecommerce past 7 figures"
- "DTC unit economics not working"

---

## 9. Open Items

### Content Needed
- [ ] Purchased font names (check Adobe Fonts / Fontspring)
- [ ] Real team headshots + titles for About page
- [ ] Real case study results per client for /work/
- [ ] Client testimonials with permission to use
- [ ] Lawyer-approved T&C for Growth Portal
- [ ] Higher Ed sizzle reel from Mike
- [ ] eCommerce sizzle reel from Mike

### Technical
- [ ] WordPress theme development (Tailwind CSS)
- [ ] GTM container setup
- [ ] 301 redirects implementation
- [ ] DNS cutover plan
- [ ] Sitemap submission to Google Search Console
- [ ] Unbounce page unpublishing (85+ pages)

### Sales Team Input
- [ ] Confirm Growth Portal pricing
- [ ] Confirm service catalog line items
- [ ] Who receives sign notifications

---

## 10. Source Documents Referenced

All analysis and decisions in this redesign were informed by:

1. GA4 data export (March 2025 - March 2026, 212K views)
2. Previous session redesign brief (mason-website-brief.docx)
3. CSU 2026 pitch deck (document_pdf.pdf)
4. TCS weekly strategy agenda (The Community Solution - Agenda 4.7.26.pdf)
5. Mason Competitive Analysis 2026 (Mason_Competitive_Analysis_2026.html)
6. Higher Ed Competitive Analysis (higher-ed-competitive-analysis.html)
7. ChatGPT strategic direction conversation
8. Mason Creative Intel screenshot (intel.masoninteractive.com)
9. Mike's homepage prototype (homepage-elevated-dark.html)
10. Unbounce dashboard audit (101 published pages)
11. Work With Us landing page screenshots (21.58% converter)
12. 2026 Mason Marketing Keywords (keyword research, 651 keywords)
13. Mike's asset folder (Google Drive: mason homepage draft compressed)

---

*Generated April 13, 2026 | Mason Interactive Website Redesign Session*
