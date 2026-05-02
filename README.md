# Daffy's Brewgarden — Luxury Speakeasy Website

> *"Not all bars are easy to find."*

A production-ready, immersive luxury speakeasy cocktail bar website built with **Next.js 14 App Router**, designed to feel like an experience rather than a webpage.

---

## 🚀 Setup

```bash
# Clone and install
npm install

# Development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + CSS Custom Properties |
| Animations | Framer Motion (component-level) |
| Smooth Scroll | Lenis |
| 3D/Canvas | Native Canvas API (hero particles) |
| Fonts | Playfair Display + Inter (Google Fonts via next/font) |

---

## 🎨 Design Philosophy

Built on three principles:

1. **Emotion > Information** — Every section tells a story, not just a fact
2. **Experience > Navigation** — The page flows like a narrative chapter
3. **Mystery > Clarity** — Invite curiosity; don't answer every question immediately

### Color System
```css
--bg-void: #050505        /* Near-black base */
--gold: #c9a84c           /* Warm matte gold */
--gold-bright: #f0c060    /* Shimmer highlight */
--emerald-deep: #0d2b1e   /* Background accent */
--emerald-light: #2a6b45  /* Lab section accent */
--amber-glow: #d4692a     /* Warm candlelight */
```

---

## 📁 Structure

```
src/
├── app/
│   ├── layout.tsx        ← Root layout (fonts, metadata, grain overlay)
│   ├── page.tsx          ← Main page (section assembly)
│   └── globals.css       ← Design system (CSS vars, animations, utilities)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx    ← Scroll-aware transparency + mobile drawer
│   │   └── Footer.tsx    ← Minimal 3-column footer
│   ├── sections/
│   │   ├── Hero.tsx      ← Canvas particles + typewriter + door SVG
│   │   ├── About.tsx     ← Parallax split + quote + pillars
│   │   ├── Cocktails.tsx ← 3D flip card grid
│   │   ├── Experience.tsx← 4-chapter menu narrative
│   │   ├── Lab.tsx       ← Futuristic experiment cards
│   │   └── Reservation.tsx← Floating-label form + door confirmation
│   └── ui/
│       ├── CursorEffect.tsx    ← Custom gold dot + ring cursor
│       ├── LenisProvider.tsx   ← Smooth scroll initializer
│       ├── AnimatedSection.tsx ← IntersectionObserver scroll reveal
│       ├── CTAButton.tsx       ← Glow button (3 variants)
│       ├── GlassCard.tsx       ← Frosted glass container
│       └── CocktailCard.tsx    ← 3D flip card
├── data/
│   └── cocktails.json    ← Mock CMS data (CMS-ready structure)
```

---

## ⚡ Key Animation Details

### Hero Canvas Particles
80 ambient dust particles (70% cream, 30% gold) rise upward using a simple RAF loop. Radial gradient creates a candlelight effect. Zero library dependencies.

### Typewriter Effect
Character-by-character reveal at 60ms intervals using `setInterval`. Cursor blinks until text completes, then fades. Fully accessible (no layout shift).

### Door SVG Animation
CSS `drop-shadow` filter creates the ethereal gold glow. On CTA click, Framer Motion scales the door to `8x` with opacity fade → triggers scroll to `#about`.

### Cocktail Cards
CSS `transform-style: preserve-3d` + Framer Motion `rotateY` creates the 3D flip. Front shows name/tagline; back reveals notes + story. Mobile: tap to flip.

### Chapter Menu (Experience)
Framer Motion `AnimatePresence` with `mode="wait"` handles the animated chapter transitions. `layoutId` on the underline creates the smooth tab indicator.

### Scroll Reveals
`IntersectionObserver` with CSS transitions (not GSAP) for maximum performance. `translateY` + `opacity` transitions use `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo).

---

## 📱 Responsive Design

- **Mobile (<768px)**: Hamburger → full-screen clip-path drawer
- **Cocktail grid**: 2 columns on mobile, 3 on desktop
- **Hero typography**: `clamp()` for fluid scaling
- **Touch**: Cocktail cards tap-to-flip (no hover needed)

---

## 🔮 Future Improvements

1. **Headless CMS** — Replace `cocktails.json` with Sanity or Contentful
2. **Reservation API** — Connect form to Resy/OpenTable API
3. **Ambient Audio** — Toggle background jazz/ambient sound
4. **Three.js Hero** — Replace canvas particles with a 3D glass/smoke scene
5. **Page Transitions** — Add route-level fade transitions with `next-view-transitions`
6. **i18n** — Spanish/English toggle (Paradiso is Barcelona-based)
7. **Easter Egg** — Konami code → hidden "after hours" section
8. **PWA** — Offline manifest for returning guests

---

## 🚢 Deployment

```bash
# Vercel (recommended)
vercel deploy

# Self-hosted
npm run build
npm start
```

Environment: Node.js 18+, no external environment variables required.

---

*Built with obsessive attention to detail. Because a bar this exclusive deserves a website to match.*
