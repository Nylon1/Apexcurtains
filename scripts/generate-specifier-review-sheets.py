"""Render the requested review questions and business sheet as editable Word files.
Use managed workspace Python; these are review documents, not website downloads.
"""
from pathlib import Path
from datetime import datetime,timezone
import re
from docx import Document
from docx.shared import Mm,Pt,RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
ROOT=Path(__file__).resolve().parents[1]
for slug,ref in [('forest-questions','APX-FQ01'),('business-confirmation','APX-BC01')]:
    doc=Document();sec=doc.sections[0]
    sec.page_width,sec.page_height=Mm(210),Mm(297)
    sec.top_margin=sec.bottom_margin=Mm(18);sec.left_margin=sec.right_margin=Mm(18)
    sec.different_first_page_header_footer=False;doc.settings.odd_and_even_pages_header_footer=False
    for name in ['Normal','Title','Heading 1']:
        style=doc.styles[name];style.font.name='Arial';style.font.color.rgb=RGBColor.from_string('202D28')
        for attr in ['asciiTheme','hAnsiTheme','eastAsiaTheme','cstheme']:
            style.element.get_or_add_rPr().get_or_add_rFonts().attrib.pop(qn('w:'+attr),None)
        for border in style.element.xpath('./w:pPr/w:pBdr'):border.getparent().remove(border)
    doc.styles['Normal'].font.size=Pt(11);doc.styles['Normal'].paragraph_format.space_after=Pt(7)
    doc.styles['Normal'].paragraph_format.line_spacing=1.05
    doc.styles['Title'].font.name='Georgia';doc.styles['Title'].font.size=Pt(22)
    doc.styles['Heading 1'].font.size=Pt(13)
    brand=doc.add_paragraph('APEX CURTAINS');brand.runs[0].bold=True
    lines=(ROOT/f'docs/specifier-review/{slug}.md').read_text(encoding='utf8').splitlines()
    for line in lines:
        if not line.strip():continue
        if line.startswith('# '):doc.add_paragraph(line[2:],'Title');continue
        if line.startswith('|'):
            cells=[c.strip() for c in line.strip('|').split('|')]
            if cells[0] in ['Responsibility','---']:continue
            p=doc.add_paragraph(cells[0],style='Heading 1')
            doc.add_paragraph('Delivery party / scope: [Complete]\nLimits / evidence: [Complete]')
            continue
        line=re.sub(r'\*\*(.*?)\*\*',r'\1',line)
        line=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'\1 (\2)',line)
        doc.add_paragraph(line.removeprefix('- '))
    foot=sec.footer.paragraphs[0]
    foot.add_run(f'{ref} / R01 / 27 November 2026 / REVIEW ONLY\nApex Curtains | hello@apexcurtains.com | 0800 772 0367').font.size=Pt(8)
    doc.core_properties.title=lines[0][2:];doc.core_properties.author='Apex Curtains'
    doc.core_properties.created=doc.core_properties.modified=datetime(2026,11,27,tzinfo=timezone.utc)
    out=ROOT/f'docs/specifier-review/{slug}.docx';doc.save(out);print(out)
