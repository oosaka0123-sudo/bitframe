# AGENTS.md — BitFrame

## Project
BitFrame is an AI Creative Film Studio / CM production website.

## Campaign execution mode through 2026-09-18
- Use Claude Code aggressively as the primary design/implementation agent while campaign capacity is available.
- If connected Google MCP / Google AI media generation is actually available, use it proactively for hero visuals, section visuals, thumbnails, motion loops, and other brand media that materially improves the site.
- Generate multiple media candidates when useful, inspect quality, and keep only assets that improve the experience.
- Never claim Claude, Jules, Codex, Copilot, Google MCP, or another tool was used unless it was actually invoked.

## Top-level priorities
1. Usability and immediate access to core content
2. Brand experience and premium visual quality
3. Content readability
4. Responsive quality
5. Motion quality
6. Media richness
7. Performance optimization

Principles: Content Immediately Visible / Premium Motion / AI Backstage / Mobile First.
A modest performance cost is acceptable when high-quality imagery or video clearly improves BitFrame's brand experience. Loading screens, blank initial states, or waiting for video/AI/API before core content appears remain prohibited.

## Agent roles
- Claude Code: primary implementation, design, architecture, integration, motion, media direction, QA.
- Google Jules: repetitive, low-risk, bulk edits and maintenance when actually available.
- OpenAI Codex: independent technical review, debugging, performance, refactoring and edge cases when actually available.
- GitHub Copilot: PR review and lightweight findings when actually available.

## Design
Aim for a premium, cinematic, editorial site with a strong scroll experience. Reference TONMANA only for design thinking: bold typography, generous/asymmetrical whitespace, image/text layering, strong section rhythm, scroll reveals, parallax where meaningful, and high-quality micro-interactions. Never copy TONMANA code, text, images, logo, exact layout, or branding.

The target should feel much closer to a high-end creative studio than a normal corporate or WordPress site. Use large visual moments and motion confidently when they improve storytelling.

Avoid AI-template clichés: purple gradients, card spam, glassmorphism, everything-centered layouts, meaningless fade-up repetition and generic AI iconography.

## Media direction
- Prefer original AI-generated stills/video, BitFrame-owned work, or properly licensed assets.
- Google media generation should be considered early in design, not merely as final decoration.
- Hero video or cinematic loops are allowed and encouraged when effective.
- Always provide poster/fallback imagery and ensure the main heading/navigation/CTA render immediately without waiting for media.
- Use responsive image formats and compression, but do not over-compress premium hero media to the point that quality visibly suffers.
- Mobile may use a different crop, still image, or shorter video than desktop.
- Respect prefers-reduced-motion.

## Frontend
- Mobile first, but design desktop as a full premium composition rather than a stretched mobile layout.
- Prefer semantic HTML and CSS.
- JavaScript is progressive enhancement for content availability; sophisticated motion JS is permitted when justified.
- No loading screens.
- No runtime AI/API dependency for initial rendering.
- Important navigation and core copy must be available without JS where practical.
- Avoid libraries that do not materially improve the result; GSAP/ScrollTrigger is acceptable for complex premium scroll interaction.

## Performance targets
Core content must appear quickly and remain responsive. LCP <= 2.5s, INP <= 200ms and CLS <= 0.1 remain desirable targets, but Lighthouse 90 is no longer a hard design constraint if a deliberate media-rich experience produces a clearly better BitFrame presentation. Optimize after the visual concept is proven.

## Responsive QA
Check around 320, 360, 375, 390 and 430px, plus tablet, desktop and large desktop. Validate video/image crop, typography, menu, CTA, and motion independently at mobile sizes.

## Git workflow
GitHub is the Single Source of Truth.
Use Task → Branch → Implementation → Test → Pull Request → Review → Fix → Merge → Deploy.
Do not let multiple agents edit the same file concurrently.

## Safety
Do not expose or modify secrets, credentials, passwords or production data without explicit need. Do not invent clients, awards, testimonials, metrics, guarantees, prices or business facts.

## Production migration
Audit the existing BitFrame WordPress environment before replacing production behavior. Preserve or deliberately replace form, analytics, SEO, structured data, routing and other required functionality.
