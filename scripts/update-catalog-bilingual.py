from pathlib import Path
import sys, json, hashlib, subprocess
import pypdfium2 as pdf
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
if len(sys.argv) != 3:
    raise SystemExit('Supply Chinese PDF and English PDF, in that order')
languages = {}
names = {
    'zh': ['封面', '四款穿戴', 'WEAVE', 'GLOVE', 'PULSE', 'PULSE Pro', 'CAP', 'HumanPlus-1000', '联系信息'],
    'en': ['Cover', 'Four wearables', 'WEAVE', 'GLOVE', 'PULSE', 'PULSE Pro', 'CAP', 'HumanPlus-1000', 'Contact'],
}
for lang, filename in zip(('zh', 'en'), sys.argv[1:]):
    source = Path(filename)
    version = hashlib.sha256(source.read_bytes() + b'lossless-4.8').hexdigest()[:12]
    folder = root / 'private/catalog' / lang / version
    folder.mkdir(parents=True, exist_ok=True)
    doc, reader = pdf.PdfDocument(str(source)), PdfReader(source)
    if len(doc) != len(names[lang]):
        raise SystemExit(f'{lang}: expected {len(names[lang])} V7 pages, got {len(doc)}')
    pages = []
    for i, page in enumerate(doc):
        name = f'page-{i+1:02}.webp'
        page.render(scale=4.8).to_pil().save(folder / name, 'WEBP', lossless=True, method=5)
        links = []
        rp = reader.pages[i]
        w, h = float(rp.mediabox.width), float(rp.mediabox.height)
        annotations = rp.get('/Annots', [])
        if hasattr(annotations, 'get_object'):
            annotations = annotations.get_object()
        for item in annotations:
            a = item.get_object()
            url = str(a.get('/A', {}).get('/URI', ''))
            if url.startswith('https://') and a.get('/Rect'):
                x1, y1, x2, y2 = map(float, a['/Rect'])
                links.append(dict(url=url, x=x1/w*100, y=(h-y2)/h*100, w=(x2-x1)/w*100, h=(y2-y1)/h*100))
        pages.append(dict(file=name, title=names[lang][i] if i<len(names[lang]) else f'Page {i+1}', links=links))
    languages[lang] = dict(title='HumanPlus Product Catalogue', edition='V7', version=version, sourceDir=f'{lang}/{version}', pages=pages)
    print(f'{lang}: {len(pages)} pages, version {version}', flush=True)
if len(languages) != 2:
    raise SystemExit('Supply Chinese PDF and English PDF, in that order')
manifest = dict(languages['zh'], languages=languages)
(root/'private/catalog/manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
subprocess.run(['node', str(root/'scripts/optimize-catalog.mjs')], cwd=root, check=True)
