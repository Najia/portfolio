# Portfolio Website

Personal portfolio website to showcase web development projects.

## Current Goals

- [x] **Build responsive navigation** - Mobile hamburger menu, sticky header, smooth scroll to sections
- [x] **Create animated hero section** - Intro text with typing effect, subtle background animation, CTA buttons
- [x] **Add projects grid** - Filterable cards with hover effects, category tags, links to live demos/repos
- [x] **Build contact form** - Input validation, error states, success feedback (no backend required)
- [x] **Implement dark mode** - Toggle button, localStorage persistence, respect system preference

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (ES6+, no frameworks)

## Project Structure

```
/
├── index.html          # Main entry point
├── css/
│   └── styles.css      # All styles, including dark mode
├── js/
│   └── main.js         # Core functionality
├── assets/
│   ├── images/         # Project screenshots, profile photo
│   └── icons/          # SVG icons
└── projects/           # Individual project pages (optional)
```

## Style Guidelines

- **Design**: Modern, minimal aesthetic with generous whitespace
- **Dark mode**: Support via `prefers-color-scheme` media query and manual toggle
- **Colors**: Use CSS custom properties for theming
- **Typography**: System font stack for performance
- **Responsive**: Mobile-first approach, breakpoints at 768px and 1024px

## Design System

### Color Palette

```css
:root {
  /* Primary - Blue */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;   /* Base */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;

  /* Secondary - Purple */
  --color-secondary-50: #faf5ff;
  --color-secondary-100: #f3e8ff;
  --color-secondary-200: #e9d5ff;
  --color-secondary-300: #d8b4fe;
  --color-secondary-400: #c084fc;
  --color-secondary-500: #a855f7;  /* Base */
  --color-secondary-600: #9333ea;
  --color-secondary-700: #7e22ce;

  /* Neutrals - Light Mode */
  --color-bg: #ffffff;
  --color-surface: #f8fafc;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-border: #334155;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
}
```

### Spacing Scale (8px base)

| Token | Value | Use case |
|-------|-------|----------|
| `--space-1` | 4px | Tight spacing, icon gaps |
| `--space-2` | 8px | Default small gap |
| `--space-3` | 12px | Form element padding |
| `--space-4` | 16px | Card padding, list gaps |
| `--space-5` | 24px | Section padding (mobile) |
| `--space-6` | 32px | Component separation |
| `--space-8` | 48px | Section gaps |
| `--space-10` | 64px | Section padding (desktop) |
| `--space-12` | 96px | Hero sections |

### Typography Scale

```css
:root {
  /* Font Family */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Component Patterns

**Buttons**
```css
.btn {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  border-radius: 6px;
  transition: all 0.2s ease;
}
.btn--primary { background: var(--color-primary-500); color: white; }
.btn--secondary { background: var(--color-secondary-500); color: white; }
.btn--outline { border: 1px solid var(--color-border); background: transparent; }
```

**Cards**
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--space-4);
}
.card__image { border-radius: 8px; aspect-ratio: 16/9; object-fit: cover; }
.card__title { font-size: var(--text-lg); font-weight: var(--font-semibold); }
.card__description { color: var(--color-text-muted); font-size: var(--text-sm); }
```

**Tags/Badges**
```css
.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: 9999px;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
}
[data-theme="dark"] .tag {
  background: var(--color-primary-700);
  color: var(--color-primary-100);
}
```

**Section Layout**
```css
.section {
  padding: var(--space-8) var(--space-4);
}
.section__title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-6);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

## Code Conventions

### HTML
- Use semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Include proper meta tags for SEO and social sharing
- Ensure accessibility (alt text, ARIA labels, keyboard navigation)

### CSS
- BEM naming convention for classes (`.block__element--modifier`)
- CSS custom properties defined in `:root`
- No `!important` unless absolutely necessary
- Group properties: positioning, display, box model, typography, visual

### JavaScript
- ES6+ syntax (const/let, arrow functions, template literals)
- No jQuery or frameworks
- Event delegation where appropriate
- Keep DOM queries minimal and cache references

## Key Features

- Project gallery with filtering
- Dark/light theme toggle with localStorage persistence
- Smooth scroll navigation
- Contact form (frontend validation)
- Lazy loading for images

## Performance Goals

- No external CSS/JS frameworks
- Optimize images (WebP with fallbacks)
- Minimize HTTP requests
- Target 90+ Lighthouse score
