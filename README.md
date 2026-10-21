# A&E Technologies, LLC (A&E Weld Shop) — Blueprint WebStudio Concept

Independent, non-official redesign concept for http://aeweldshop.com/ (Golden, CO).
Preview: https://aet.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom build, not the shared concept layout. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `a-and-e-technologies` (framework: Vite, team mrwerner-s-projects). Pushes to `main` deploy automatically.
Domain `aet.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional): `VITE_CONCEPT_END_DATE` (countdown end, 2026-11-25). The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site. The quote request form posts to `api/contact.js` (Resend: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`); without them it answers in demo mode.

## Design

- Palette from their own site CSS: navy #032f62, blue #094fa0 and bright blue #2488fe, with their steel grays. Added a spark orange (#ff7a1a / #ffb347) taken from the sparks in their welding photos as the one accent, and plate-steel grays for light bands.
- Their original "A&E TECHNOLOGIES, LLC" logo (white, downloaded into `src/assets/ae-logo.png`) sits on the navy header and footer.
- Saira Condensed (squared, condensed headings that echo the logo lettering), Barlow (body) and JetBrains Mono (spec labels, part numbers, dimension text).
- Motifs from the trade: the hero is laid out like a shop drawing on blueprint grid paper, with dimension lines, numbered callouts and an engineering title block (shop, drawing no., AWS welders, no minimum charge, hours, address). Animated spark accents on the hero photo (off for reduced motion). Weld-bead SVG dividers with heat-tint coloring. A plate-steel spec strip, services numbered P-01 to P-07 like process codes, projects numbered like part numbers, metal stock shown as hang tags, and the quote form styled as a shop work order.
- Section order: utility bar (hours, no minimum, phone) → hero shop drawing → spec strip → capabilities (7 processes) → shop capacity chart → Dream Chaser feature → projects gallery with lightbox (14 parts) → industries served → quote request (process / material / thickness / quantity / needed-by) → metal for sale + industrial stairways → story, AWS certification and partners → now hiring → visit/contact with map → footer.

## What changed from the current site

- Replaces a 2014-era jQuery template (no mobile viewport tag, IE6/IE8 upgrade-banner code, Universal Analytics tag, "© 2022" footer) with a responsive one-page site checked at 1440px and 390px with no sideways scrolling.
- The current contact form posts to `http://www.btswebdev.com/testsites/ae/formmail.php`, a web developer's test-site script over plain HTTP. The concept replaces it with a quote request that captures process, material, thickness/size, quantity and deadline.
- https://aeweldshop.com/ serves a self-signed certificate; the concept runs on HTTPS.
- Cutting and shearing capacities (4" flame, 2" plasma, 10 × 10 ft, ¼" × 12 ft shear) were buried on separate service pages; they are now in one capacity chart near the top.
- Thirteen pages are condensed into one: phone, hours, services and the quote form are all within a scroll or two. The Dream Chaser project, previously a small homepage thumbnail, is a featured section.
- Projects become a full gallery with captions and a lightbox instead of a grid of 280px thumbnails.

## Owner should confirm

- Hours "7:30am–4pm MST M–Fri" are shown as 7:30am–4:00pm Monday–Friday.
- The metal-sales contact `TKilworth@qwestoffice.net` (from the Metal for Sale page) is still current, or whether metal inquiries should go to info@aeweldshop.com.
- Whether the two industrial stairways (81-inch rise) and platform are still for sale. The CAT 40 CNC tool holders are commented out on the current page, so they are left off.
- "More than 10 years in business" is the current site's wording; the founding year isn't stated, so no year is shown. Add the year if the owner wants one.
- AWS certification "by Dr. Jessie Grantham of Welding and Joining Management Group" and the partner list (WJMG, General Air, Hanson & Co. CPAs, Union Bearing) are copied from the About page; confirm they are current. The Union Bearing link on their site points to goldenindustrial.com.
- Payment: the homepage says Visa or MasterCard; the metal page says cash, credit or debit. Both are shown.
- The employment benefits list and "Equal Opportunity Employment" are from the About page; confirm they're still hiring and the right way to apply (the concept uses an email to info@).
- No awards, badges or reviews appear on the current site, so none are shown; only a "Read reviews on Google" link. No rating is quoted.
- Photos are their own images from aeweldshop.com (downloaded into `src/assets/photos`). Several are low resolution, and some service photos look like stock imagery; replace with fresh shop photos before launch.
- The fax number (303) 278-7454 is still in use.
