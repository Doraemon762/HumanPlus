from pathlib import Path
import sys,json,hashlib
import pypdfium2 as pdf
from pypdf import PdfReader
source=Path(sys.argv[1]);root=Path(__file__).resolve().parents[1]/'private/catalog';root.mkdir(parents=True,exist_ok=True)
doc=pdf.PdfDocument(str(source));reader=PdfReader(source);names=['封面','四款穿戴','WEAVE','GLOVE','PULSE','CAP','HumanPlus-1000','联系信息'];pages=[]
for i,page in enumerate(doc):
 name=f'page-{i+1:02}.webp';im=page.render(scale=4.8).to_pil();im.save(root/name,'WEBP',lossless=True,method=5)
 links=[];rp=reader.pages[i];w=float(rp.mediabox.width);h=float(rp.mediabox.height)
 for item in rp.get('/Annots',[]):
  a=item.get_object();action=a.get('/A',{});url=str(action.get('/URI',''))
  if url.startswith('https://') and a.get('/Rect'):
   x1,y1,x2,y2=map(float,a['/Rect']);links.append(dict(url=url,x=x1/w*100,y=(h-y2)/h*100,w=(x2-x1)/w*100,h=(y2-y1)/h*100))
 pages.append(dict(file=name,title=names[i] if i<len(names) else f'第{i+1}页',links=links))
manifest=dict(title='HumanPlus 产品手册',edition='V3' if 'V3' in source.name else 'V2',version=hashlib.sha256(source.read_bytes()+b'lossless-4.8').hexdigest()[:12],pages=pages)
(root/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Updated {len(pages)} pages; protected images total {sum(f.stat().st_size for f in root.glob("*.webp"))/1024/1024:.1f} MB')
