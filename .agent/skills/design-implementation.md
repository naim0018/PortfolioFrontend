---
name: Premium Design System
description: A high-density, professional design system featuring Tailwind 4, dynamic brand theming, and a scoped Admin Dark Mode.
---

# Premium Design System

Use this skill to implement a professional, scalable, and high-performance design system in any web application. This system is optimized for **information-dense dashboards** and **multi-tenant branding**.

## 🚀 Key Features

- **Tailwind 4 Native**: Zero-config theme integration directly in `index.css`.
- **Global Brand System**: Unified `--color-brand-*` variables for consistent UI.
- **Dynamic Content Themes**: Scoped color overrides (Emerald, Rose, etc.) for different app sections.
- **Scoped Admin Dark Mode**: A dedicated `.admin-dark` implementation that applies only to admin layouts, with automatic legibility overrides for standard light-mode components.
- **High-Density Typography**: Globally tuned font sizes and spacing for professional tools.

## 🛠️ Implementation Steps

### 1. Initialize CSS
Copy the [template.css](file:///e:/Projects/ProjectManagement/skills/premium-design-system/resources/template.css) into your project's `src/index.css`.

### 2. Configure Your Brand
Modify the `--color-brand-*` variables in the `@theme` block to match your primary brand colors.

### 3. Usage Patterns

#### Using Brand Colors in React/Charts
```tsx
// Using CSS Variables directly (best for SVG/Canvas/Charts)
<Area stroke="var(--color-brand-600)" fill="url(#brandGradient)" />

// Using Tailwind Utilities
<Button className="bg-brand-600 hover:bg-brand-700 text-white">
  Click Me
</Button>
```

#### Implementing Admin Dark Mode
Add the `.admin-dark` class to your dashboard layout's root container:
```tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="admin-dark min-h-screen">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

### 4. Best Practices
- **Prefer CSS Variables for Charts**: It ensures colors stay in sync with the theme without manual hex code entry.
- **Avoid Per-Component Dark Classes**: Use the global overrides in `index.css` to keep your component code clean.
- **Use Sub-Themes for Sections**: Wrap specific areas in `.theme-emerald` or `.theme-rose` to change the accent color dynamically.
