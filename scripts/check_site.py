from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_PAGES = {
    'index.html', 'works.html', 'service.html', 'flow-price.html',
    'studio.html', 'faq.html', 'contact.html', 'privacy.html', 'terms.html'
}
PAGES = sorted(p.name for p in ROOT.glob('*.html'))
errors = []
image_usage = {}

class Audit(HTMLParser):
    def __init__(self, page):
        super().__init__()
        self.page = page
        self.h1 = 0
        self.viewport = False
        self.description = False
        self.canonical = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == 'h1':
            self.h1 += 1
        if tag == 'meta' and d.get('name') == 'viewport':
            self.viewport = True
        if tag == 'meta' and d.get('name') == 'description' and d.get('content', '').strip():
            self.description = True
        if tag == 'link' and d.get('rel') == 'canonical':
            self.canonical.append(d.get('href', ''))
        if tag == 'img':
            if 'alt' not in d:
                errors.append(f'{self.page}: img missing alt')
            src = d.get('src')
            if src:
                image_usage.setdefault(src, set()).add(self.page)

        for key in ('href', 'src'):
            v = d.get(key)
            if not v or v.startswith(('#', 'mailto:', 'tel:', 'data:')):
                continue
            if urlparse(v).scheme:
                continue
            clean = v.split('?', 1)[0].split('#', 1)[0]
            if not clean:
                continue
            target = (ROOT / self.page).parent / clean
            if not target.exists():
                errors.append(f'{self.page}: missing {v}')

if set(PAGES) != EXPECTED_PAGES:
    errors.append(f'root html set mismatch: {PAGES}')

for page in PAGES:
    path = ROOT / page
    text = path.read_text(encoding='utf-8')
    audit = Audit(page)
    audit.feed(text)

    if audit.h1 != 1:
        errors.append(f'{page}: expected 1 h1, found {audit.h1}')
    if not audit.viewport:
        errors.append(f'{page}: viewport meta missing')
    if not audit.description:
        errors.append(f'{page}: description meta missing')

    expected_canonical = (
        'https://bitframe.rss7.net/'
        if page == 'index.html'
        else f'https://bitframe.rss7.net/{page}'
    )
    if audit.canonical != [expected_canonical]:
        errors.append(f'{page}: canonical mismatch {audit.canonical}')

    for required in ('works.html', 'service.html', 'flow-price.html', 'studio.html', 'contact.html'):
        if f'href="{required}"' not in text:
            errors.append(f'{page}: primary navigation missing {required}')
    for required in ('faq.html', 'privacy.html', 'terms.html'):
        if f'href="{required}"' not in text:
            errors.append(f'{page}: footer navigation missing {required}')

    if '????' in text:
        errors.append(f'{page}: suspicious question-mark corruption detected')
    if 'リニューアル公開までは' in text:
        errors.append(f'{page}: stale renewal copy detected')

for src, pages in image_usage.items():
    if len(pages) > 1:
        errors.append(f'image reused across pages: {src} -> {sorted(pages)}')

for asset in [
    'assets/site.css', 'assets/site.js', 'assets/subpage.css',
    'assets/media/hero.mp4', 'assets/media/hero-poster.webp',
    'sitemap.xml', 'static-sitemap.xml', 'robots.txt'
]:
    if not (ROOT / asset).exists():
        errors.append(f'missing asset: {asset}')

index_text = (ROOT / 'index.html').read_text(encoding='utf-8')
if 'つくる速度を、表現の深さへ。' not in index_text:
    errors.append('index.html: editorial statement copy missing or corrupted')
for frame_name in ('Signal Bloom', 'Glass Current', 'Quiet Machine'):
    if frame_name not in index_text:
        errors.append(f'index.html: homepage visual frame missing {frame_name}')
if '02 / NEW FRAMES' not in index_text:
    errors.append('index.html: NEW FRAMES section missing')

static_sitemap = (ROOT / 'static-sitemap.xml').read_text(encoding='utf-8')
for page in sorted(EXPECTED_PAGES):
    url = (
        'https://bitframe.rss7.net/'
        if page == 'index.html'
        else f'https://bitframe.rss7.net/{page}'
    )
    if url not in static_sitemap:
        errors.append(f'static-sitemap.xml: missing {url}')

sitemap_index = (ROOT / 'sitemap.xml').read_text(encoding='utf-8')
for url in (
    'https://bitframe.rss7.net/static-sitemap.xml',
    'https://bitframe.rss7.net/post-sitemap.xml',
    'https://bitframe.rss7.net/page-sitemap.xml',
):
    if url not in sitemap_index:
        errors.append(f'sitemap.xml: missing {url}')

robots = (ROOT / 'robots.txt').read_text(encoding='utf-8')
if 'Sitemap: https://bitframe.rss7.net/sitemap.xml' not in robots:
    errors.append('robots.txt: sitemap declaration missing')

faq = (ROOT / 'faq.html').read_text(encoding='utf-8')
if '"@type":"FAQPage"' not in faq:
    errors.append('faq.html: FAQPage structured data missing')

works = (ROOT / 'works.html').read_text(encoding='utf-8')
if works.count('CONCEPT STUDY') < 6:
    errors.append('works.html: expected at least 6 concept-study labels')
if '<img ' in works:
    errors.append('works.html: photo/image reuse is not allowed on the works index')
if 'NOT CLIENT CASE STUDIES' not in works:
    errors.append('works.html: concept-study disclaimer missing')

if errors:
    print('\n'.join(errors))
    raise SystemExit(1)

print('BitFrame site QA: OK')
