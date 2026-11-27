"""Refresh official source fingerprints; never silently adopt changed technical data."""
import json, hashlib, urllib.request, urllib.parse
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT/'lib/specifier-resources.json').read_text(encoding='utf8'))
indices = ['https://www.forestgroup.com/en/downloads/'+s for s in ['brochures','technical-documents','orderforms']]
def fetch(url):
    with urllib.request.urlopen(url, timeout=45) as response:
        return response.read()
with ThreadPoolExecutor(max_workers=3) as ex:
    index_html = list(ex.map(fetch, indices))
def check(source):
    raw = fetch(source['url'])
    digest = hashlib.sha256(raw).hexdigest()
    filename = urllib.parse.unquote(source['url'].split('/')[-1])
    listed = [url for url, html in zip(indices,index_html) if filename in urllib.parse.unquote(html.decode())]
    return {'id':source['id'], 'url':source['url'], 'sha256':digest, 'unchanged':digest==source['sha256'], 'listedOn':listed, 'isPdf':raw.startswith(b'%PDF')}
with ThreadPoolExecutor(max_workers=4) as ex:
    results = list(ex.map(check, data['sources']))
out={'checkedAt':datetime.now(timezone.utc).isoformat(),'sources':results}
(ROOT/'docs/specifier-review/source-verification.json').write_text(json.dumps(out,indent=2)+'\n',encoding='utf8')
for r in results: print(r['id'], 'unchanged:',r['unchanged'], 'official index links:',len(r['listedOn']))
assert all(r['unchanged'] and r['isPdf'] and r['listedOn'] for r in results), 'Source changed or no longer listed: technical re-review required.'
