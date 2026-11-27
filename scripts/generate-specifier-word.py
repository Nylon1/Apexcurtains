"""Generate the editable A4 APX-T05 from the shared content register.

Run with the managed workspace Python (python-docx). Render with the documents
skill's render_docx.py before regenerating the download manifest.
"""
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from docx import Document
from docx.shared import Mm, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'lib/specifier-resources.json').read_text(encoding='utf8'))
resource = next(r for r in data['resources'] if r['id'] == 'APX-T05')
doc = Document()
section = doc.sections[0]
section.page_width, section.page_height = Mm(210), Mm(297)
section.top_margin, section.bottom_margin = Mm(18), Mm(25)
section.left_margin = section.right_margin = Mm(18)
section.header_distance, section.footer_distance = Mm(10), Mm(10)
section.different_first_page_header_footer = False
doc.settings.odd_and_even_pages_header_footer = False
for name in ['Normal', 'Title', 'Heading 1', 'Heading 2']:
    doc.styles[name].font.name = 'Arial'
    doc.styles[name].font.color.rgb = RGBColor.from_string('202D28')
    for attr in ['asciiTheme', 'hAnsiTheme', 'eastAsiaTheme', 'cstheme']:
        doc.styles[name].element.get_or_add_rPr().get_or_add_rFonts().attrib.pop(qn('w:'+attr), None)
    for border in doc.styles[name].element.xpath('./w:pPr/w:pBdr'):
        border.getparent().remove(border)
normal = doc.styles['Normal']
normal.font.size = Pt(11)
normal.paragraph_format.line_spacing = 1.08
normal.paragraph_format.space_after = Pt(6)
doc.styles['Title'].font.name = 'Georgia'
doc.styles['Title'].font.size = Pt(23)
doc.styles['Title'].paragraph_format.space_after = Pt(8)
doc.styles['Heading 1'].font.size = Pt(16)
doc.styles['Heading 2'].font.size = Pt(11)
doc.styles['Heading 2'].paragraph_format.space_before = Pt(10)
doc.styles['Heading 2'].paragraph_format.space_after = Pt(5)
for name in ['Heading 1', 'Heading 2']:
    doc.styles[name].paragraph_format.keep_with_next = True
lang = OxmlElement('w:lang'); lang.set(qn('w:val'), 'en-GB')
normal.element.get_or_add_rPr().append(lang)
footer = section.footer.paragraphs[0]
footer.paragraph_format.space_after = Pt(0)
r = footer.add_run(data['footerStatus']+'\n'); r.bold = True; r.font.size = Pt(8)
footer.add_run(f'APX-T05  /  {data["revision"]}  /  {data["date"]}\n').font.size = Pt(8)
footer.add_run('Apex Curtains  |  0800 772 0367  |  hello@apexcurtains.com\n').font.size = Pt(8)
footer.add_run('Project-specific assessment required  /  Page ').font.size = Pt(8)
for index, field_name in enumerate(['PAGE', 'NUMPAGES']):
    if index: footer.add_run(' of ').font.size = Pt(8)
    field = OxmlElement('w:fldSimple'); field.set(qn('w:instr'), field_name)
    footer._p.append(field)

def link(p, text, url):
    node = OxmlElement('w:hyperlink')
    node.set(qn('r:id'), p.part.relate_to(url, RT.HYPERLINK, is_external=True))
    run = OxmlElement('w:r'); props = OxmlElement('w:rPr')
    color = OxmlElement('w:color'); color.set(qn('w:val'), '24463F'); props.append(color)
    size = OxmlElement('w:sz'); size.set(qn('w:val'), '16'); props.append(size)
    underline = OxmlElement('w:u'); underline.set(qn('w:val'), 'single'); props.append(underline)
    run.append(props); t = OxmlElement('w:t'); t.text = text; run.append(t); node.append(run); p._p.append(node)

for index, page in enumerate(resource['pages']):
    if index: doc.add_page_break()
    brand = doc.add_paragraph()
    brand.paragraph_format.keep_with_next = True
    brand.paragraph_format.space_after = Pt(10)
    r = brand.add_run('APEX CURTAINS'); r.bold = True; r.font.size = Pt(13)
    r.font.color.rgb = RGBColor.from_string('24463F')
    brand.add_run(f'\n{resource["id"]}  /  {data["revision"]}  /  {data["date"]}').font.size = Pt(9)
    doc.add_paragraph(resource['title'] if index == 0 else page['title'], 'Title' if index == 0 else 'Heading 1')
    if index == 0:
        p = doc.add_paragraph(page['title']); p.paragraph_format.space_after = Pt(4)
        p = doc.add_paragraph('Complete the fields below. Extend the editable paragraphs as needed; pagination will change.'); p.runs[0].font.size = Pt(9)
    for group in page['sections']:
        doc.add_paragraph(group['title'], 'Heading 2')
        for item in group['items']:
            # Native editable text, with conspicuous placeholders rather than raster form fields.
            p = doc.add_paragraph(re.sub(r'_{3,}', '[Enter details]', item))
            p.paragraph_format.widow_control = True
    p = doc.add_paragraph('Manufacturer references / checked ' + data['date'])
    p.paragraph_format.space_before = Pt(8); p.paragraph_format.space_after = Pt(3)
    p.runs[0].font.size = Pt(8)
    for key in page['sources']:
        source = next(s for s in data['sources'] if s['id'] == key)
        p = doc.add_paragraph(); p.paragraph_format.space_after = Pt(2)
        link(p, f'{source["title"]}, pp. {source["referencePages"]}', source['url'])
doc.core_properties.title = resource['title']
doc.core_properties.author = 'Apex Curtains'
doc.core_properties.subject = data['status']
doc.core_properties.revision = 1
doc.core_properties.created = doc.core_properties.modified = datetime(2026, 11, 27, tzinfo=timezone.utc)
out = ROOT / f'public/downloads/specifier/APX-T05-preliminary-specification-{data["revision"]}.docx'
doc.save(out)
print(out)
