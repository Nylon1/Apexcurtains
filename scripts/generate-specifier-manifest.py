"""Record actual download metadata after PDF and Word print review.

The Word page count is measured from its Microsoft Word A4 PDF render.
"""
import hashlib, json
from pathlib import Path
import pymupdf
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'lib/specifier-resources.json').read_text(encoding='utf8'))
files=[]
for resource in data['resources']:
    for extension in (['pdf','docx','txt'] if resource['id']=='APX-T05' else ['pdf']):
        path=ROOT/f'public/downloads/specifier/{resource["id"]}-{resource["slug"]}-{data["revision"]}.{extension}'
        pages=None
        if extension=='pdf':
            document=pymupdf.open(path);pages=len(document)
            assert pages==len(resource['pages']), 'Unexpected overflow in '+path.name
            assert all(abs(p.rect.width-595.28)<1 and abs(p.rect.height-841.89)<1 for p in document)
        elif extension=='docx':
            pages=len(pymupdf.open(ROOT/'.portfolio-work/word-review/APX-T05-word.pdf'))
        files.append({'reference':resource['id'],'revision':data['revision'],'date':data['date'],
          'format':extension.upper(),'pages':pages,'href':'/downloads/specifier/'+path.name,
          'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
manifest={'revision':data['revision'],'date':data['date'],'contentSha256':hashlib.sha256((ROOT/'lib/specifier-resources.json').read_text(encoding='utf8').encode('utf8')).hexdigest(),'files':files}
(ROOT/'lib/specifier-downloads.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf8')
print('Recorded',len(files),'downloads; PDF pages:',sum(f['pages'] for f in files if f['format']=='PDF'))
