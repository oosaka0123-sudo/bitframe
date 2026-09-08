# BitFrame Competition Home — Design Direction

## Creative concept

**FRAME / LIGHT / MOTION**

BitFrame is an AI Creative Film Studio. The homepage should not merely describe filmmaking; the page itself should feel edited like a film. Typography, spacing, image frames, chapter markers and transitions should suggest cuts, timecode, masking and light without imitating editing software UI.

Reference TONMANA only at the level of design thinking: oversized typography, generous whitespace, layered text/media, changes of rhythm between sections, scroll curiosity and refined micro-interactions. Do not copy code, assets, layout, copy or branding.

## Competition standard

The first page must be memorable even with all media temporarily replaced by placeholders. Generated video and imagery are enhancement, not structural support.

Judging priorities:

1. A clear original concept visible within the first viewport.
2. Strong type hierarchy and controlled negative space.
3. Varied composition rather than repeated cards.
4. Motion that communicates editing, focus and depth.
5. Mobile composition designed independently, not desktop squeezed smaller.
6. Real commercial usability: works, services and contact remain obvious.
7. Accessibility and performance are part of the design quality.

## Information architecture

### 01 Hero
Immediate brand, proposition and two direct actions: WORKS and CONTACT. The visual frame is visible before any animation or video has loaded.

### 02 Selected Works
The emotional core. Three asymmetric cinematic frames. Until real portfolio assets are approved, every sample is labelled `CONCEPT / DEMO` and contains no invented client claim.

### 03 Point of view
A hard editorial transition: **AI IS A TOOL. DIRECTION IS THE WORK.** This positions BitFrame around creative direction rather than novelty technology.

### 04 Services
Services are expressed as a typographic sequence, not a grid of identical cards. Each row changes alignment and scale to keep a film-credit rhythm.

### 05 Process
A concise five-cut production flow. Visual language shifts from large image fields to precise timeline typography.

### 06 Contact
Large final scene with a direct consultation CTA and minimal footer information.

## Motion behavior

- Critical copy is never hidden waiting for JavaScript.
- Decorative frames can shift 12–28px on entry using `transform` only.
- Selected Works media reacts subtly to pointer position; the effect is disabled on coarse pointers.
- Section labels and rules reveal by scale/clip without delaying reading.
- Header changes contrast after the hero using IntersectionObserver.
- No scroll-jacking, loader, mandatory intro, WebGL or heavy animation dependency.
- `prefers-reduced-motion: reduce` disables nonessential motion and smooth scrolling.

## Visual system

- Base: near-black `#0b0b0b`, warm paper `#f1eee7`.
- Signal accent: warm red-orange `#ff5a36` used sparingly like a recording light.
- Secondary signal: acid-lime `#dfff45` only for small status/metadata moments.
- Type: system sans stack for speed; condensed feeling achieved through tracking, size and line-height rather than an external font dependency.
- Rules and timecode details remain subtle. Avoid turning the page into a fake NLE interface.

## Media plan

### Hero
Later replace the abstract CSS frame with a 6–10 second muted, loopable cinematic brand clip. Always include a poster image. The HTML copy and composition must appear immediately without waiting for video.

### Works
Each work should support AVIF/WebP poster plus optional MP4/WebM preview. Use 16:9 for primary film work and selective 9:16 crops to demonstrate multi-format production.

### Google AI generation
Use Google image/video generation during production to create original concept footage when it materially strengthens the art direction. Generated assets must be reviewed for anatomy, text/logo artifacts, continuity, crop quality and mobile readability before use.

## Mobile composition

At 320–430px, the hero becomes a tall editorial poster rather than a scaled desktop layout. Giant brand typography intentionally clips at the viewport edges, the media frame sits between the two brand words, and CTAs remain reachable without horizontal scrolling. Work frames stack with alternating inset widths rather than becoming uniform cards.

## Performance / accessibility guardrails

- No loader.
- No runtime AI/API dependency.
- Semantic HTML and usable links without JS.
- Keyboard-visible focus states.
- Minimum practical tap target around 44px.
- No external font or JS dependency in v1.
- Media below first viewport may lazy-load; hero poster should not.
- Explicit media dimensions/aspect ratios to avoid CLS.
- Target Core Web Vitals remains LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 where practical, but a small controlled cost is acceptable for a stronger cinematic brand experience.