# 🌾 MVRP Exports Website
### Mana Vooru Raitulu Panta | మన వూరు రైతులు పంట

Premium Agricultural Exports from India to Dubai, USA, UK & Vietnam.

---

## 📁 Project Structure

```
mvrp-website/
│
├── index.html              ← Main HTML (all pages in one)
│
├── css/
│   ├── reset.css           ← Browser reset / normalize
│   ├── variables.css       ← CSS custom properties (colors, fonts, spacing)
│   ├── base.css            ← Typography, buttons, utilities
│   ├── nav.css             ← Navigation & mobile menu
│   ├── hero.css            ← Hero section & background effects
│   ├── sections.css        ← About, Certifications, Markets, Testimonials
│   ├── products.css        ← Product cards & filter tabs
│   ├── contact.css         ← Contact form & validation UI
│   ├── footer.css          ← Footer & WhatsApp float button
│   ├── animations.css      ← Scroll reveal, keyframes
│   └── responsive.css      ← Mobile/tablet breakpoints
│
├── js/
│   ├── translations.js     ← English / Telugu i18n system
│   ├── nav.js              ← Sticky nav, mobile menu, active links
│   ├── animations.js       ← Scroll reveal, counter animation
│   ├── products.js         ← Tab filter, card interactions
│   ├── form.js             ← Form validation & submission
│   └── main.js             ← App init, utilities, accessibility
│
└── images/
    └── favicon.svg         ← Logo favicon
```

---

## 🚀 GitHub Pages Deployment (Free Hosting)

### Step 1: Create Repository
1. Go to **github.com** → Sign Up / Log In
2. Click **"+"** → **New repository**
3. Name: `mvrp-exports` → Set to **Public** → **Create**

### Step 2: Upload Files
1. Click **"uploading an existing file"**
2. Drag the **entire `mvrp-website` folder contents** (not the folder itself)
3. Make sure the folder structure is maintained
4. Commit message: `Initial MVRP website`
5. Click **Commit changes**

### Step 3: Enable GitHub Pages
1. Go to repo **Settings** tab
2. Left sidebar → **Pages**
3. Source: **main** branch → **/ (root)**
4. Click **Save**
5. Wait 2–3 minutes...

### Step 4: Your Site is Live! 🎉
```
https://YOUR-GITHUB-USERNAME.github.io/mvrp-exports/
```

---

## ✏️ Before Going Live – Update These

Open `index.html` and search for these placeholders:

| Placeholder | Replace With |
|-------------|--------------|
| `+91 XXXXX XXXXX` | Your real phone number |
| `exports@mvrpexports.com` | Your real email address |
| `Andhra Pradesh, India` | Your specific address |
| `https://wa.me/91XXXXXXXXXX` | Your WhatsApp link (2 places) |

---

## 🎨 Customization Guide

### Change Colors
Edit `css/variables.css`:
```css
--gold:  #C8A951;   /* Change gold accent color */
--navy:  #0B1F3A;   /* Change dark background */
```

### Add New Product
Copy a product card block in `index.html` and update:
- Emoji, product name, HS code
- Origin location
- Specs (moisture, packaging, etc.)
- `data-cat` attribute (grain/spice/veg/cash)
- MOQ badge

### Add New Language
Edit `js/translations.js`:
```javascript
const TRANSLATIONS = {
  en: { ... },
  te: { ... },
  ar: { ... }  // Add Arabic, etc.
};
```

---

## 📧 Phase 2 – AWS Backend (Real Email)

When ready to add real email functionality:

1. **AWS API Gateway** → Create endpoint `/inquiry`
2. **AWS Lambda** → Process form data
3. **AWS SES** → Send email to you + auto-reply to buyer

In `js/form.js`, uncomment the Phase 2 block:
```javascript
const response = await fetch('https://your-api.amazonaws.com/inquiry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

---

## 🔍 SEO Checklist

- [x] Title tag & meta description
- [x] Open Graph tags (social sharing)
- [x] Structured data (Organization schema)
- [x] Canonical URL
- [x] Semantic HTML (article, section, nav, footer)
- [x] Alt text attributes
- [x] Mobile responsive
- [ ] Add `sitemap.xml` (create manually)
- [ ] Add `robots.txt`
- [ ] Connect Google Search Console
- [ ] Add Google Analytics

---

## 📦 Products Included

| Product | Category | HS Code |
|---------|----------|---------|
| Premium Rice | Grain | 1006 |
| Yellow Maize | Grain | 1005 |
| Red Chilli | Spice | 0904 |
| Turmeric Powder | Spice | 0910 |
| Ginger Powder | Spice | 0910 |
| Coriander Seeds | Spice | 0909 |
| Moringa Powder | Spice | 1212 |
| Tomato | Vegetable | 0702 |
| Onion | Vegetable | 0703 |
| Sugarcane / Raw Sugar | Cash Crop | 1701 |
| Tobacco (Virginia FCV) | Cash Crop | 2401 |

---

*Built for MVRP – Mana Vooru Raitulu Panta | Phase 1: GitHub Pages | Phase 2: AWS*
