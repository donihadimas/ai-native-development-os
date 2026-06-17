# DESIGN.md — Modern OSS Docs Landing Page Rules

## 1. Design Direction

This project uses a **Modern Open Source Documentation** style with a **dark premium visual system**, **bento feature layout**, and **code/terminal-first presentation**.

The website should feel like a polished open-source developer product, not a generic AI SaaS landing page.

The visual direction should combine:

- Clean open-source documentation
- Premium dark mode
- Subtle gradients
- Bento grid feature cards
- Terminal/code previews
- GitHub/npm trust indicators
- Minimal animation
- Strong developer-focused copywriting

The design must prioritize clarity, credibility, and fast onboarding.

---

## 2. Core Principles

### 2.1 Documentation-first

The landing page must quickly answer:

1. What is this project?
2. Who is it for?
3. Why should developers use it?
4. How do they install it?
5. Where is the GitHub repository?
6. Where is the npm package?
7. How can they start in less than 2 minutes?

Avoid vague marketing language.

Bad:

> Build the future with intelligent tools.

Good:

> A lightweight open-source CLI for generating production-ready project scaffolds.

---

### 2.2 Code-first Hero

The hero section must include a real install command or quick usage command.

Examples:

```bash
npm install <package-name>
```

```bash
npx <package-name> init
```

```bash
pnpm dlx <package-name> init
```

The command must be visible above the fold.

The primary CTA should be:

- Get Started

Secondary CTAs should be:

- GitHub
- npm
- Documentation

---

### 2.3 Premium but not flashy

The design should look modern and polished, but not overly decorative.

Use:

- Subtle gradient glow
- Soft borders
- Clean spacing
- Dark neutral backgrounds
- Clear typography
- Minimal motion

Avoid:

- Heavy neon effects
- Generic robot illustrations
- Excessive glassmorphism
- Too many animated elements
- Overly complex 3D graphics
- Low-contrast text

---

## 3. Visual Style

## 3.1 Theme

The default visual impression should be **dark premium**.

Dark mode should feel native and carefully designed, not simply inverted colors.

Recommended visual mood:

- Developer-focused
- Calm
- Sharp
- Trustworthy
- Modern
- Technical
- Open-source friendly

---

## 3.2 Color Palette

Use a dark neutral base with one primary accent and one secondary accent.

Recommended colors:

```css
:root {
  --color-bg: #070a12;
  --color-bg-soft: #0b1020;
  --color-surface: #111827;
  --color-surface-soft: #151b2d;

  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-strong: rgba(255, 255, 255, 0.16);

  --color-text: #f8fafc;
  --color-text-muted: #94a3b8;
  --color-text-soft: #cbd5e1;

  --color-accent: #8b5cf6;
  --color-accent-2: #22d3ee;
  --color-accent-soft: rgba(139, 92, 246, 0.16);
}
```

Accent usage:

- Primary CTA
- Active nav item
- Feature icon background
- Focus ring
- Link hover
- Small gradient highlights

Do not use accent colors for every element.

---

## 3.3 Background

Use a dark base with subtle radial gradients.

Recommended pattern:

```css
background:
  radial-gradient(circle at 20% 10%, rgba(139, 92, 246, 0.18), transparent 32%),
  radial-gradient(circle at 80% 0%, rgba(34, 211, 238, 0.12), transparent 30%),
  #070a12;
```

Rules:

- Gradient must be subtle.
- Do not reduce text readability.
- Avoid full-page rainbow gradients.
- Use noise texture only if it remains very subtle.

---

## 3.4 Typography

Typography should be clean, technical, and readable.

Recommended direction:

- Use sans-serif for UI and body text.
- Use monospace only for code, terminal, command blocks, and version badges.
- Headings should be bold but not overly decorative.

Hierarchy:

```text
Hero title: large, bold, tight line-height
Hero subtitle: medium, muted, readable
Section title: clear and concise
Card title: short and specific
Body text: readable, not too small
Code: monospace
```

Avoid:

- Decorative display fonts
- Thin low-contrast text
- Long paragraphs in feature cards

---

## 4. Layout Rules

## 4.1 Page Structure

The landing page should follow this structure:

```text
Navbar
Hero
Trust badges / GitHub / npm indicators
Bento feature grid
Code example / terminal preview
Why this project exists
Installation / quick start
Docs sections preview
Final CTA
Footer
```

---

## 4.2 Navbar

Navbar must be simple and developer-focused.

Required links:

- Docs
- Guides
- API
- Changelog
- GitHub

Optional links:

- npm
- Examples
- Contributing

Rules:

- Keep navbar minimal.
- GitHub link should be visually accessible.
- Do not overload the navbar with too many links.
- Sticky navbar is allowed if it does not feel heavy.

---

## 4.3 Hero Section

Hero must include:

- Project name
- One clear value proposition
- Short description
- Install command or quick start command
- Primary CTA
- GitHub/npm links
- Optional product/code preview

Hero copy format:

```text
<ProjectName> helps <target users> do <main job> without <main pain>.
```

Example:

```text
AIOS helps developers scaffold production-ready app foundations without rebuilding the same project structure from scratch.
```

Hero layout recommendation:

```text
Left:
  Badge
  Headline
  Description
  Install command
  CTA buttons

Right:
  Terminal preview / code preview / product screenshot
```

---

## 4.4 Bento Grid

Use bento grid to explain features.

Recommended card count:

- Minimum: 4 cards
- Ideal: 6 cards
- Maximum: 8 cards

Recommended card types:

1. Install / quick setup
2. Type-safe API
3. GitHub/npm ready
4. Configurable architecture
5. CLI or package workflow
6. Open-source friendly
7. Documentation-first
8. Lightweight and fast

Example layout:

```text
[ Main Feature Large Card       ][ Install Command Card ]
[ Type-safe API                 ][ GitHub/npm Card      ]
[ Customizable                  ][ Docs-first Card      ]
```

Rules:

- Every card must explain one concrete benefit.
- Avoid vague labels like “Powerful”, “Smart”, or “Next-gen”.
- Use small code snippets where useful.
- Use icons sparingly.
- Each card should have a clear title and one short paragraph.

---

## 4.5 Code / Terminal Preview

Every developer-focused landing page must include at least one code or terminal preview.

Recommended components:

- Install command block
- CLI output preview
- Minimal usage example
- Configuration example
- Generated file structure preview

Example terminal card:

```bash
$ npx <package-name> init

✔ Project name: my-app
✔ Framework: Astro
✔ Package manager: pnpm
✔ Created project structure
✔ Installed dependencies

Next steps:
  cd my-app
  pnpm dev
```

Rules:

- Code examples must be real or realistic.
- Do not show fake commands that do not exist.
- Keep examples short.
- Prefer copyable commands.
- Use syntax highlighting where possible.

---

## 4.6 Trust Layer

Because this is an open-source project, the page must show trust indicators.

Recommended indicators:

- GitHub stars
- GitHub license
- npm version
- npm downloads
- TypeScript support
- Last release
- Build status
- Open-source badge

Example:

```text
MIT Licensed · TypeScript Ready · Published on npm · Open Source on GitHub
```

Rules:

- Trust indicators should be visible near the hero or after the hero.
- Do not fake metrics.
- If metrics are not available yet, use static claims only.

---

## 5. Component Rules

## 5.1 Buttons

Primary button:

- Used for “Get Started”
- Strong accent background
- High contrast text

Secondary button:

- Used for “GitHub”, “npm”, or “View Docs”
- Transparent or soft surface
- Border visible

Button rules:

- Use short labels.
- Do not use more than two primary-looking buttons in one section.
- Use consistent radius.
- Button hover should be subtle.

---

## 5.2 Cards

Cards should feel premium and technical.

Recommended style:

```css
.card {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.03)
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
}
```

Rules:

- Use soft border.
- Avoid heavy shadow.
- Add hover only if it improves clarity.
- Do not make every card glow.
- Keep text readable.

---

## 5.3 Code Blocks

Code blocks should look polished.

Rules:

- Use monospace font.
- Use sufficient contrast.
- Add copy button if possible.
- Use clear terminal prompt.
- Keep lines short.
- Avoid horizontal overflow on mobile.

---

## 5.4 Badges

Badges are useful for:

- npm version
- license
- TypeScript
- GitHub
- beta/stable status

Badge style:

- Small
- Rounded
- Low contrast but readable
- Not too colorful

Example:

```text
Open Source
npm package
TypeScript
GitHub Pages ready
```

---

## 6. Content Rules

## 6.1 Tone of Voice

The copy should be:

- Clear
- Technical
- Confident
- Honest
- Direct
- Developer-friendly

Avoid:

- Overpromising
- AI buzzwords
- “Revolutionary”
- “Next-gen”
- “10x everything”
- “Magical”
- “Game-changing”

Use:

- “Open-source”
- “Typed”
- “Composable”
- “Lightweight”
- “Configurable”
- “Production-ready”
- “Documentation-first”
- “Works with...”

---

## 6.2 Feature Copy Formula

Each feature card should follow this pattern:

```text
Title: concrete capability
Description: what it helps the developer do
Visual: code, icon, mini diagram, or badge
```

Example:

```text
Type-safe configuration

Define project behavior with typed configuration so changes are easier to understand, review, and maintain.
```

---

## 6.3 Hero Copy Formula

Use this formula:

```text
<ProjectName> is an open-source <tool type> for <target user> who want to <main outcome> without <main pain>.
```

Example:

```text
AIOS is an open-source CLI toolkit for developers who want to scaffold clean project foundations without rebuilding the same setup every time.
```

---

## 7. Motion and Interaction

Use minimal motion only.

Allowed:

- Button hover
- Card hover
- Small glow movement
- Code block copy feedback
- Subtle section reveal

Avoid:

- Heavy parallax
- Continuous distracting animation
- Excessive blur movement
- Complex 3D interaction
- Animation that delays reading

Motion must never reduce readability.

---

## 8. Accessibility Rules

The website must be accessible.

Required:

- High text contrast
- Visible focus state
- Keyboard navigable links/buttons
- Semantic headings
- Good mobile layout
- Alt text for meaningful images
- No text hidden inside images only

Do not sacrifice readability for aesthetics.

---

## 9. Responsive Rules

The landing page must work well on:

- Mobile
- Tablet
- Desktop
- Wide desktop

Rules:

- Hero should stack on mobile.
- Bento grid should become one column on mobile.
- Code blocks must not break layout.
- Navbar should remain simple.
- CTA buttons should wrap cleanly.

---

## 10. Astro Starlight Implementation Rules

Use Starlight as the documentation foundation.

Recommended files:

```text
src/
  content/
    docs/
      index.mdx
      getting-started/
      guides/
      api/
      changelog/
  components/
    landing/
      Hero.astro
      BentoGrid.astro
      FeatureCard.astro
      TerminalPreview.astro
      TrustBadges.astro
  styles/
    custom.css
astro.config.mjs
```

Use custom CSS through Starlight configuration:

```js
starlight({
  title: "<ProjectName>",
  customCss: ["./src/styles/custom.css"],
});
```

Rules:

- Do not fight Starlight too much.
- Keep documentation pages readable.
- Customize homepage more heavily than inner docs pages.
- Avoid turning the docs into a complex marketing site.
- Use MDX components for reusable landing sections.

---

## 11. Homepage Requirements

The homepage must include:

- Clear project name
- One-line positioning
- Install command
- GitHub link
- npm link
- Get Started link
- Bento feature grid
- Real code or terminal preview
- Open-source/license mention
- Final CTA

Minimum homepage sections:

```text
Hero
TrustBadges
BentoFeatures
CodePreview
QuickStart
FooterCTA
```

---

## 12. Do and Don't

### Do

- Show real commands.
- Show real use cases.
- Keep copy short.
- Use dark premium style.
- Use bento cards for features.
- Make GitHub/npm links obvious.
- Prioritize documentation clarity.
- Make the page fast and lightweight.

### Don't

- Use generic AI visuals.
- Hide the install command.
- Overuse gradients.
- Overuse glassmorphism.
- Add heavy animation.
- Use vague claims.
- Create fake metrics.
- Make the design more important than the docs.

---

# AI Agent Implementation Instructions

## Goal

Implement a modern open-source documentation landing page using Astro Starlight with a dark premium style, bento feature grid, and code/terminal preview.

The result should look like a polished developer tool website while keeping Starlight documentation clean and usable.

---

## Agent Responsibilities

The AI agent must:

1. Inspect the existing Astro/Starlight project structure.
2. Identify whether the project already has:
   - `astro.config.mjs`
   - `src/content/docs`
   - `src/styles`
   - `src/components`

3. Preserve existing documentation content unless explicitly asked to replace it.
4. Add or update reusable landing components.
5. Add custom CSS tokens and visual styling.
6. Create or update the homepage.
7. Ensure GitHub Pages compatibility.
8. Ensure the site remains responsive and accessible.

---

## Required Components

Create these components if they do not exist:

```text
src/components/landing/Hero.astro
src/components/landing/BentoGrid.astro
src/components/landing/FeatureCard.astro
src/components/landing/TerminalPreview.astro
src/components/landing/TrustBadges.astro
src/components/landing/FooterCTA.astro
```

If the project structure is different, adapt while keeping the same component responsibilities.

---

## Required Styles

Create or update:

```text
src/styles/custom.css
```

The CSS must define:

- Dark premium background
- Accent color tokens
- Hero gradient background
- Bento grid layout
- Card surface styles
- Terminal preview styles
- Button styles
- Mobile responsiveness
- Focus states

Do not add unnecessary CSS frameworks unless the project already uses them.

---

## Required Homepage

Create or update:

```text
src/content/docs/index.mdx
```

The homepage must use the landing components.

Suggested MDX structure:

```mdx
---
title: Home
description: Modern open-source documentation landing page.
template: splash
---

import Hero from "../../components/landing/Hero.astro";
import TrustBadges from "../../components/landing/TrustBadges.astro";
import BentoGrid from "../../components/landing/BentoGrid.astro";
import TerminalPreview from "../../components/landing/TerminalPreview.astro";
import FooterCTA from "../../components/landing/FooterCTA.astro";

<Hero />

<TrustBadges />

<BentoGrid />

<TerminalPreview />

<FooterCTA />
```

Adjust import paths based on the actual file location.

---

## Required Configuration

Update `astro.config.mjs` to include custom CSS:

```js
starlight({
  title: "<ProjectName>",
  customCss: ["./src/styles/custom.css"],
});
```

If `customCss` already exists, append the stylesheet without removing existing entries.

---

## GitHub Pages Rules

If deploying to GitHub Pages, ensure Astro config uses correct `site` and `base`.

For a user/organization page:

```js
export default defineConfig({
  site: "https://<username>.github.io",
});
```

For a project page:

```js
export default defineConfig({
  site: "https://<username>.github.io",
  base: "/<repo-name>",
});
```

The AI agent must not guess the final GitHub Pages URL if username/repo is unknown.

Instead, leave a clear TODO:

```js
site: 'https://<username>.github.io',
base: '/<repo-name>',
```

---

## Quality Checklist

Before finishing, the AI agent must verify:

- The site builds successfully.
- The homepage renders without broken imports.
- Mobile layout works.
- GitHub and npm links are present.
- Install command is visible above the fold.
- There are no fake metrics.
- Text contrast is readable.
- Existing docs are not accidentally deleted.
- Starlight navigation still works.
- Custom CSS does not break inner documentation pages.

---

## Final Agent Response Format

After implementation, the AI agent must report:

```text
Done:
- ...

Changed files:
- ...

Not done yet:
- ...

How to run:
- pnpm dev
- pnpm build
```

If something cannot be completed due to missing information, the agent must state it clearly and leave TODO comments in the code.

---
