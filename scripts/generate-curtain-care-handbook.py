"""Generate the coordinated A4 handbook from exported TypeScript content.
Run npm run care:handbook. Requires reportlab, Pillow and svglib.
Fonts: Windows Georgia/Arial; equivalent DejaVu fallback on Linux.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json, os
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.barcode.qr import QrCodeWidget
from PIL import Image, ImageOps

root=Path(__file__).resolve().parents[1]
data=json.loads((root/'docs/care-styling/content-for-handbook.json').read_text(encoding='utf-8'))
care=data['principles'];doc=data['document']
win=Path('C:/Windows/Fonts');linux=Path('/usr/share/fonts/truetype/dejavu')
for name,w,l in [('Serif','georgia.ttf','DejaVuSerif.ttf'),('Sans','arial.ttf','DejaVuSans.ttf'),('Bold','arialbd.ttf','DejaVuSans-Bold.ttf')]:
 pdfmetrics.registerFont(TTFont(name,str(win/w if (win/w).exists() else linux/l)))
W,H=595.276,841.89;ink=HexColor('#203c33');paper=HexColor('#f6f3eb');sage=HexColor('#e6e9df')
out=root/'public'/doc['path'].lstrip('/');out.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(out),pagesize=(W,H),invariant=1)
c.setTitle(f"Apex Curtain Care Handbook - {doc['reference']} {doc['revision']}");c.setAuthor('Apex Curtains')
def text(s,x,y,size=11,font='Sans'):
 c.setFillColor(ink);c.setFont(font,size);c.drawString(x,H-y,s)
def para(s,x,y,w=511,size=10.5):
 p=Paragraph(s,ParagraphStyle('body',fontName='Sans',fontSize=size,leading=size*1.48,textColor=ink))
 _,height=p.wrap(w,H);p.drawOn(c,x,H-y-height);return y+height
def line(y,x=42,w=511):
 c.setStrokeColor(HexColor('#c7cbbf'));c.setLineWidth(.6);c.line(x,H-y,x+w,H-y)
def box(y,s):
 c.setFillColor(sage);c.rect(42,H-y-68,511,68,fill=1,stroke=0);para(s,54,y+10,487,10)
def photo(name,x,y,w,h):
 im=ImageOps.fit(Image.open(root/'public'/name).convert('RGB'),(int(w*2),int(h*2)),centering=(.5,.35))
 c.drawImage(ImageReader(im),x,H-y-h,w,h)
def svg(name,x,y,w):
 d=svg2rlg(str(root/'public/curtain-care'/name));scale=w/d.width;d.scale(scale,scale);renderPDF.draw(d,c,x,H-y-d.height*scale)
def start(n,title,kicker):
 c.setFillColor(paper);c.rect(0,0,W,H,fill=1,stroke=0)
 text('APEX CURTAINS',42,35,10,'Bold');text('CURTAIN CARE & STYLING',370,35,8);line(48)
 text(kicker.upper(),42,80,9,'Bold');text(title,42,122,29,'Serif')
 line(793);text(f"{doc['reference']} | {doc['revision']} | {doc['date']} | {doc['status'].upper()}",42,811,7.5);text(f'{n} / 8',526,811,8)
def end():c.showPage()

start(1,'A beautiful fall, cared for.','Your curtains / your care instructions')
para('Practical guidance for the appearance and operation of bespoke curtains. Keep your individual fabric, lining and track instructions with this handbook.',42,144,size=12)
photo('projects/portfolio/jesmond-1.webp',42,207,511,323)
text('Jesmond - genuine Apex installation; not a care demonstration.',42,546,8)
for i,(title,body) in enumerate([
 ('Maintain the intended shape','Gently arrange reachable folds. Leave high headings, hooks and retained apex points as installed.'),
 ('Operate as demonstrated','Release tiebacks from travelling panels. Keep their route clear and stop if movement changes.'),
 ('Check before cleaning','The care of the complete curtain includes every sewn layer, finish and trim.'),
 ('Keep help within reach','Ask Apex when the lining pulls, a hem catches, a fitting moves or the system sounds unusual.')]):
 x=42+i%2*268;y=580+i//2*88;text(title,x,y,12,'Bold');para(body,x,y+12,241,10)
end()
start(2,'Follow the folds.','Dressing / reachable cloth only')
para(care['initialDressing'],42,145)
steps=[('step1.svg','01 / Notice','Keep sewn pleats and the established wave sequence intact.'),('step2.svg','02 / Guide',care['dressing']),('step3.svg','03 / Let it rest','Let each layer and hem hang freely. Do not bind folds, add weights or stretch the cloth.')]
for i,(name,title,body) in enumerate(steps):
 x=42+i*175;svg(name,x,215,161);text(title,x,358,12,'Bold');para(body,x,371,156,9.5)
line(490);svg('even.svg',42,505,242);svg('crossed.svg',310,505,242)
para('Illustrative guidance: balanced folds follow the intended rhythm. Twisted or crowded cloth must not be forced into position.',42,711,size=9.5)
end()
start(3,'Let the heading guide you.','Heading principles / illustrative guidance')
para('Follow the arrangement demonstrated at handover. These illustrations are not hook-setting, sewing or track-configuration instructions.',42,145)
for i,(title,body) in enumerate(data['headings']):
 x=42+i%2*268;y=205+i//2*182
 svg('heading-'+str(i+1)+'.svg',x,y,190);text(title,x,y+119,15,'Serif');para(body,x,y+129,239,9.5)
end()
start(4,'Support the shape.','Tiebacks / layers / settling')
svg('tieback.svg',42,156,255)
text('A gentle, supported sweep',320,175,16,'Serif')
para('Use the agreed hook position and gather reachable folds without twisting or squeezing them. Release tiebacks before operating travelling panels. Retained apex sections stay in place.',320,192,228,10.5)
text('Let each layer fall',42,382,19,'Serif')
para('Arrange face curtains and voiles separately. Keep reachable edges clear of the neighbouring layer; operate each track only as demonstrated.',42,398)
text('Creases and settling',42,475,19,'Serif');para(care['settling'],42,491)
box(653,'Contact Apex if creases persist, the lining pulls or the hem begins to catch. Do not add weights, bind the folds, move hooks or stretch the cloth. Work only from a safely accessible floor-level position.')
end()
start(5,'Care for every sewn layer.','Cleaning / protection / professional handling')
y=154
for title,key in [('Before any treatment','cleaning'),('Everyday dust','dust'),('A spill or mark','spills'),('Sunlight, warmth and moisture','protection'),('High or heavy curtains','highLevel')]:
 text(title,42,y,18,'Serif');bottom=para(care[key],42,y+14,size=10.5);line(bottom+14);y=bottom+43
end()
start(6,'Know the cloth and construction.','Considerations / not replacement care labels')
para('The actual product, coating, finish and sewn layers determine treatment. A fibre name alone does not authorise washing, dry cleaning, steam or pressing.',42,145)
y=207
for title,body in data['fabric']:
 text(title,42,y,13,'Bold');bottom=para(body,42,y+8,size=9.3);line(bottom+9);y=bottom+27
end()
start(7,'Keep movement considered.','Tracks / motors / when to ask Apex')
text('Before operating',42,166,19,'Serif');para(care['operation'],42,183)
text('If movement changes',42,294,19,'Serif');para(care['motorHelp'],42,311)
text('Professional servicing',42,457,19,'Serif')
para('Forest maintenance depends on the actual track, motor and manual revision. Do not apply lubricants or alter the motor settings yourself. Keep safe maintenance access in the plan; no maintenance-free claim is made.',42,475)
text('Loose fitting, changed hem or new snag?',42,574,19,'Serif')
para('Stop use if a bracket moves or a panel drops, keep people clear and contact Apex. Do not test it by pulling. Photograph changes only from a safe position; avoid reaching high tracks or removing heavy panels.',42,592)
box(695,'Remote controls: keep them dry and protected from impact. Use only the battery and operating guidance for the exact supplied model. Third-party controls and integrations need individual advice.')
end()
start(8,'Your curtain care record.','Keep with the project-specific care sheets')
para('Record confirmed information here. The online care guide and this general handbook do not replace the actual product instructions.',42,145)
y=210
for label,count in [('Project / room / window',1),('Face fabric / supplier / product code',1),('Lining / interlining / trims',1),('Track / motor / remote / demonstrated operating method',2),('Complete-curtain care instructions / source / date',2),('Confirmed maintenance and access arrangements',1)]:
 text(label,42,y,10,'Bold')
 for j in range(count):line(y+21+j*18)
 y+=count*18+31
text('Apex Curtains',42,655,17,'Serif');text('apexcurtains.com/contact  |  0800 772 0367',42,677,10)
c.linkURL('https://www.apexcurtains.com/contact',(42,H-684,350,H-660),relative=0)
guide_url='https://www.apexcurtains.com'+doc['guidePath']
para('Online care guide: apexcurtains.com/curtain-care-and-styling<br/>Scan for the online guide. Keep your individual care sheets with this handbook.',42,691,350,8.5)
c.linkURL(guide_url,(42,H-723,390,H-690),relative=0)
qr=QrCodeWidget(guide_url);bounds=qr.getBounds();size=67
d=Drawing(size,size,transform=[size/(bounds[2]-bounds[0]),0,0,size/(bounds[3]-bounds[1]),0,0]);d.add(qr)
renderPDF.draw(d,c,479,H-722)
para('Sources checked 28 Nov 2026: PT Oslo product care; Panaz Curtain Basecloth Sept 2025 pp. 2-3; Forest Shuttle S/M/L Oct 2025 p. 14; Shuttle Go V1.1 pp. 19-20; EasyTouch revision 041024. Exact links and scope accompany the online guide and release record.',42,732,511,7.8)
end();c.save()
print(f"Generated {out} (8 A4 pages, {doc['revision']}, {doc['status']}).")
