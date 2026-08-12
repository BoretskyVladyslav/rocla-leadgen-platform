---
name: ui-b2b-leadgen
description: Conventions and component rules for high-conversion B2B lead generation pages in Next.js + Tailwind v4.
paths:
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
---
# B2B Lead Generation UI Standards

## Architectural Rules
1. Component Isolation: Keep code modular under `src/components/ui`, `src/components/sections`, and `src/components/forms`. Avoid monolith files.
2. Form Standards: Ensure lead forms retain clean TypeScript interfaces (`ProductOrderFormData`, `FilePayload`).
3. Asset Handling: Always use Next.js `<Image />` for images with explicit attributes for PageSpeed optimization.
4. Tailwind Styling: Follow the defined white/light-grey/dark-graphite (`#111827`) design system. High-contrast CTA buttons are mandatory for all order and contact triggers.
