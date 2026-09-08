from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT=Path(__file__).resolve().parents[1]
PAGES=['index.html','works.html','service.html','flow-price.html','contact.html']
errors=[]

class Audit(HTMLParser):
    def __init__(self,page):
        super().__init__(); self.page=page; self.h1=0; self.viewport=False
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=='h1': self.h1+=1
        if tag=='meta' and d.get('name')=='viewport': self.viewport=True
        if tag=='img' and 'alt' not in d: errors.append(f'{self.page}: img missing alt')
        for key in ('href','src'):
            v=d.get(key)
            if not v or v.startswith(('#','mailto:','tel:','data:')): continue
            if urlparse(v).scheme: continue
            target=(ROOT/self.page).parent/v.split('?',1)[0].split('#',1)[0]
            if not target.exists(): errors.append(f'{self.page}: missing {v}')
for page in PAGES:
    path=ROOT/page
    if not path.exists(): errors.append(f'missing page: {page}'); continue
    a=Audit(page); a.feed(path.read_text(encoding='utf-8'))
    if a.h1!=1: errors.append(f'{page}: expected 1 h1, found {a.h1}')
    if not a.viewport: errors.append(f'{page}: viewport meta missing')

for asset in ['assets/site.css','assets/site.js','assets/subpage.css','assets/media/hero.mp4','assets/media/hero-poster.webp']:
    if not (ROOT/asset).exists(): errors.append(f'missing asset: {asset}')

if errors:
    print('\n'.join(errors)); raise SystemExit(1)
print('BitFrame site QA: OK')
