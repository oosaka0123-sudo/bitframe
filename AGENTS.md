# AGENTS.md — BitFrame

## Project
BitFrame is an AI Creative Film Studio / CM production website.

## Top-level priorities
1. Display speed
2. Usability
3. Content readability
4. Responsive quality
5. Design
6. Motion
7. AI effects

Principles: Performance First / Content First / Usability First / Motion Second / AI Backstage.

## Agent roles
- Claude Code: primary implementation, design, architecture, integration, QA.
- Google Jules: repetitive, low-risk, bulk edits and maintenance when actually available.
- OpenAI Codex: independent technical review, debugging, performance, refactoring and edge cases when actually available.
- GitHub Copilot: PR review and lightweight findings when actually available.

Never claim an agent was used unless it was actually invoked.

## Design
Reference TONMANA only for design thinking: bold typography, whitespace, visual rhythm, layering, scroll experience and high-quality micro-interactions. Never copy code, text, images, logo, layout, or branding.

Avoid AI-template clichés: purple gradients, card spam, glassmorphism, everything-centered layouts, meaningless fade-up repetition and excessive JavaScript.

## Frontend
- Mobile first.
- Prefer semantic HTML and CSS.
- JavaScript is progressive enhancement only.
- Important content and navigation must remain usable without JS where practical.
- No loading screens.
- No runtime AI/API dependency for initial rendering.
- No blocking hero video.
- Respect prefers-reduced-motion.
- Avoid unnecessary libraries.

## Performance targets
Aim for LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 and Mobile Lighthouse Performance >= 90 where practical.

## Responsive QA
Check around 320, 360, 375, 390 and 430px, plus tablet, desktop and large desktop.

## Git workflow
GitHub is the Single Source of Truth.
Use Task → Branch → Implementation → Test → Pull Request → Review → Fix → Merge → Deploy.
Do not let multiple agents edit the same file concurrently.

## Safety
Do not expose or modify secrets, credentials, passwords or production data without explicit need. Do not invent clients, awards, testimonials, metrics, guarantees, prices or business facts.

## Production migration
Audit the existing BitFrame WordPress environment before replacing production behavior. Preserve or deliberately replace form, analytics, SEO, structured data, routing and other required functionality.
