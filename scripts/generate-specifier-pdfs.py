"""Build the coordinated Apex draft PDFs from the same content used by the library.

Dependencies: reportlab, svglib. Windows fonts are read locally, never redistributed.
Run: python scripts/generate-specifier-pdfs.py
"""
import json
from pathlib import Path
from html import escape
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from svglib.svglib import svg2rlg

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'lib/specifier-resources.json').read_text(encoding='utf8'))
OUT=ROOT/'public/downloads/specifier'
OUT.mkdir(parents=True,exist_ok=True)
FONT=Path('C:/Windows/Fonts')
for name,file in [('ApexSans','arial.ttf'),('ApexBold','arialbd.ttf'),('ApexDisplay','georgia.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
pdfmetrics.registerFontFamily('ApexSans',normal='ApexSans',bold='ApexBold')
GREEN=HexColor('#24463f')
styles={
 'title':ParagraphStyle('title',fontName='ApexDisplay',fontSize=24,leading=28,textColor=GREEN,spaceAfter=10),
 'deck':ParagraphStyle('deck',fontName='ApexSans',fontSize=11,leading=15,textColor=GREEN,spaceAfter=12),
 'h2':ParagraphStyle('h2',fontName='ApexBold',fontSize=11,leading=15,textColor=GREEN,spaceBefore=9,spaceAfter=5),
 'body':ParagraphStyle('body',fontName='ApexSans',fontSize=10.5,leading=14.5,textColor=HexColor('#27332f'),spaceAfter=6),
 'ref':ParagraphStyle('ref',fontName='ApexSans',fontSize=8,leading=11,textColor=GREEN,spaceBefore=3),
}
source_map={s['id']:s for s in DATA['sources']}
def footer(canvas,doc):
    canvas.saveState()
    canvas.setFillColor(GREEN)
    canvas.rect(0,778,595.28,64,fill=1,stroke=0)
    logo=svg2rlg(str(ROOT/'public/images/apex-logo-horizontal.svg'))
    logo.scale(104/logo.width,104/logo.width)
    logo.drawOn(canvas,39,787)
    canvas.setFont('ApexSans',9)
    canvas.setFillColor(HexColor('#ffffff'))
    canvas.drawRightString(556,811,'ARCHITECTURAL TECHNICAL RESOURCES')
    canvas.drawRightString(556,795,doc.resource['id']+' / '+DATA['revision']+' / '+DATA['date'])
    canvas.setStrokeColor(HexColor('#bfc9c2'));canvas.line(39,59,556,59)
    canvas.setFillColor(GREEN);canvas.setFont('ApexSans',8)
    canvas.drawString(39,45,DATA['footerStatus'])
    canvas.drawRightString(556,45,f'{doc.page} / {len(doc.resource["pages"])}')
    canvas.drawString(39,31,'Apex Curtains | 0800 772 0367 | hello@apexcurtains.com')
    canvas.linkURL('mailto:hello@apexcurtains.com',(210,27,420,39),relative=0)
    canvas.drawString(39,18,'apexcurtains.com/professionals/specifier-resources | Project-specific assessment required')
    canvas.restoreState()

class StableCanvas(Canvas):
    def __init__(self,*args,**kwargs):
        kwargs['invariant']=1
        super().__init__(*args,**kwargs)
        self.setAuthor('Apex Curtains')
        self.setSubject(DATA['status'])

for resource in DATA['resources']:
    doc=SimpleDocTemplate(str(OUT/f'{resource["id"]}-{resource["slug"]}-{DATA["revision"]}.pdf'),pagesize=(595.28,841.89),leftMargin=39,rightMargin=39,topMargin=84,bottomMargin=72,title=resource['title'])
    doc.resource=resource
    story=[]
    for index,p in enumerate(resource['pages']):
        if index:story.append(PageBreak())
        story.append(Paragraph(escape(resource['title'] if index==0 else p['title']),styles['title']))
        story.append(Paragraph(escape(p['title'] if index==0 else resource['subtitle']),styles['deck']))
        if p['diagram']:
            drawing=svg2rlg(str(ROOT/'public/guides/specifier'/f'{p["diagram"]}.svg'))
            scale=230/drawing.height
            drawing.scale(scale,scale);drawing.width*=scale;drawing.height*=scale
            drawing.hAlign='CENTER';story.extend([drawing,Spacer(1,5)])
        for s in p['sections']:
            story.append(Paragraph(escape(s['title']),styles['h2']))
            for item in s['items']:story.append(Paragraph(escape(item),styles['body']))
        story.append(Spacer(1,6))
        story.append(Paragraph('Manufacturer references (links; checked '+DATA['date']+'):',styles['ref']))
        for key in p['sources']:
            s=source_map[key]
            story.append(Paragraph(f'<link href="{escape(s["url"],quote=True)}">{escape(s["title"])} - pp. {s["referencePages"]}</link>',styles['ref']))
    doc.build(story,onFirstPage=footer,onLaterPages=footer,canvasmaker=StableCanvas)
    print(OUT/f'{resource["id"]}-{resource["slug"]}-{DATA["revision"]}.pdf')

template=DATA['resources'][-1]
text=[template['title'],template['id']+' / '+DATA['revision']+' / '+DATA['date'],DATA['status'],'Apex Curtains | 0800 772 0367 | hello@apexcurtains.com','']
for p in template['pages']:
    text.append(p['title'].upper())
    for s in p['sections']:
        text.extend(['',s['title'],*s['items']])
    text.append('')
text.extend(['Manufacturer references (checked '+DATA['date']+'):',*[f'{s["title"]}: {s["url"]}' for s in DATA['sources'] if s['id'] in {'ks','cs','shuttle','fabric-height','pelmet'}]])
(OUT/f'APX-T05-preliminary-specification-{DATA["revision"]}.txt').write_text('\n'.join(text)+'\n',encoding='utf8',newline='\n')
