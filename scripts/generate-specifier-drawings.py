"""Original Apex coordination plates. Not product CAD or construction details."""
from pathlib import Path
from html import escape

OUT = Path(__file__).resolve().parents[1] / 'public/guides/specifier'
OUT.mkdir(parents=True, exist_ok=True)
def line(x,y,a,b,dash=False):
    return f'<line x1="{x}" y1="{y}" x2="{a}" y2="{b}" stroke="#24463f" stroke-width="2"'+(' stroke-dasharray="6 5"' if dash else '')+'/>'
def text(x,y,t,size=18):return f'<text x="{x}" y="{y}" font-size="{size}" font-family="Arial, sans-serif" fill="#24463f">{escape(t)}</text>'
def rect(x,y,w,h,fill='none',dash=False):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="#24463f" stroke-width="2"'+(' stroke-dasharray="6 5"' if dash else '')+'/>'
def path(d,fill='none'):return f'<path d="{d}" fill="{fill}" stroke="#24463f" stroke-width="2"/>'
def dim(x,y,a,b,label):
    return line(x,y,a,b)+line(x-5,y+5,x+5,y-5)+line(a-5,b+5,a+5,b-5)+text((x+a)/2-(24 if x==a else 10),(y+b)/2-10,label)
def plate(slug,title,body):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">Original schematic coordination illustration. Not to scale. Lettered dimensions require project-specific assessment. Not a manufacturer-approved construction drawing.</desc><rect width="600" height="400" fill="#f5f3ec"/>{text(26,32,"APEX / COORDINATION STUDY",14)}{body}{line(26,366,574,366)}{text(26,389,"ILLUSTRATIVE / NTS / DIMENSIONS TO BE AGREED",13)}</svg>'
    (OUT/(slug+'.svg')).write_text(svg,encoding='utf8')

plate('height-drop','Window height and finished curtain drop',
rect(150,105,190,210)+line(150,208,340,208)+line(245,105,245,315)+line(110,76,390,76)+line(100,335,430,335)+
path('M 370 88 L 382 88 L 382 319 L 370 319 Z','#ded8c8')+
dim(117,105,117,315,'G')+dim(424,88,424,319,'D')+
text(150,65,'Track / carrier datum',16)+text(151,357,'Finished floor datum',16)+
text(34,160,'Glass',16)+text(34,181,'height G',16)+text(448,175,'Finished',16)+text(448,196,'drop D',16)+
text(40,51,'ELEVATION',13)+line(382,319,424,319,True))

plate('apex','Shaped apex: track route and retained upper cloth',
path('M 90 325 L 90 190 L 300 67 L 510 190 L 510 325 Z')+
line(300,67,300,325)+line(90,190,510,190)+
path('M 75 185 L 300 52 L 164 230 L 120 325 L 75 325 Z','#ded8c8')+
path('M 300 52 L 525 185 L 525 325 L 480 325 L 436 230 Z','#ded8c8')+
line(75,185,300,52)+line(300,52,525,185)+text(36,70,'Retained',16)+text(36,90,'upper cloth',16)+line(145,84,215,109)+
text(190,278,'Agreed open view',18)+text(190,302,'shown schematically',16)+text(60,352,'Track route follows the intended arrangement',17))

plate('stack-back','Plan of stack-back and fold-depth allowances',
line(60,100,540,100)+line(60,108,540,108)+text(232,88,'Glazing',16)+
line(60,159,540,159)+text(233,146,'Track route',16)+
path('M 65 175 Q 75 225 85 175 Q 95 225 105 175 Q 115 225 125 175 Q 135 225 145 175 Q 155 225 165 175 Q 175 225 185 175')+
path('M 415 175 Q 425 225 435 175 Q 445 225 455 175 Q 465 225 475 175 Q 485 225 495 175 Q 505 225 515 175 Q 525 225 535 175')+
dim(65,260,185,260,'S')+dim(415,260,535,260,'S')+dim(370,175,370,212,'F')+
text(66,307,'S = stack along the track',18)+text(66,333,'F = fold depth into the room',18)+text(28,61,'PLAN / CURTAINS OPEN',13)+
line(185,160,185,274,True)+line(65,160,65,274,True))

plate('single-double','Single and independent curtain and voile track plan',
text(32,70,'SINGLE TRACK',16)+line(36,92,264,92)+line(36,150,264,150)+
path('M 38 176 Q 53 131 68 176 Q 83 221 98 176 Q 113 131 128 176 Q 143 221 158 176 Q 173 131 188 176 Q 203 221 218 176 Q 233 131 248 176')+
text(335,70,'INDEPENDENT LAYERS',16)+line(326,92,568,92)+line(326,138,568,138)+line(326,218,568,218)+
path('M 330 147 Q 340 124 350 147 Q 360 170 370 147 Q 380 124 390 147 Q 400 170 410 147 Q 420 124 430 147 Q 440 170 450 147 Q 460 124 470 147 Q 480 170 490 147 Q 500 124 510 147 Q 520 170 530 147')+
path('M 330 240 Q 345 195 360 240 Q 375 285 390 240 Q 405 195 420 240 Q 435 285 450 240 Q 465 195 480 240 Q 495 285 510 240 Q 525 195 540 240')+
dim(304,138,304,218,'C')+text(34,309,'Glazing side above / room side below',17)+text(34,337,'C = track centres, coordinated with both cloth envelopes',16))

plate('mounting-recess','Ceiling, wall and recessed mounting sections',
text(30,78,'CEILING',16)+text(223,78,'WALL',16)+text(406,78,'POCKET',16)+
rect(30,110,145,24,'#ded8c8')+rect(83,134,34,24)+line(100,158,100,295)+
rect(224,110,22,185,'#ded8c8')+path('M 246 145 L 335 145 L 335 165 L 315 165')+rect(300,165,34,24)+line(317,189,317,295)+
path('M 403 180 L 435 180 L 435 110 L 540 110 L 540 180 L 574 180')+rect(470,110,34,24)+line(487,134,487,295)+
dim(435,218,540,218,'P')+text(40,320,'Support, bracket and finish are separate interfaces.',16)+text(40,345,'P = clear pocket width; confirm depth and end access.',16))

plate('support','Structural support interface and concealed evidence',
rect(66,84,470,50,'#ded8c8')+rect(66,173,470,20)+rect(254,134,80,39,'#c7d2ca')+
line(272,112,272,205)+line(316,112,316,205)+rect(256,199,76,19)+rect(270,218,48,28)+line(294,246,294,324)+
text(78,116,'Building structure',18)+text(346,157,'Backing / interface',16)+line(334,150,346,150)+
text(78,219,'Ceiling finish',16)+text(346,233,'Bracket + track',16)+line(318,232,338,232)+
text(78,291,'Load path requires',17)+text(78,314,'project assessment',17)+text(346,287,'Record support',17)+text(346,310,'before closure',17))

plate('motor-clearance','Motor body, assembly and service access envelope',
line(64,87,548,87)+rect(72,110,370,20)+rect(442,110,66,28)+rect(448,138,54,150,'#ded8c8')+
rect(410,98,136,228,'none',True)+path('M 458 305 L 458 337 L 478 337 M 470 330 L 478 337 L 470 344')+
text(76,175,'Track',18)+text(76,221,'Dashed: assembly, cable',17)+text(76,245,'and removal allowance',17)+line(299,237,410,237)+
text(76,296,'Motor body dimensions alone',17)+text(76,320,'do not define this envelope.',17)+text(329,67,'Ceiling interface',16))

plate('access','Double-height installation and future maintenance access',
rect(85,76,208,252)+line(85,182,293,182)+line(189,76,189,328)+line(65,60,335,60)+line(50,337,552,337)+
line(364,130,364,337)+line(479,130,479,337)+line(364,184,479,184)+line(364,255,479,255)+line(364,255,479,337)+line(479,255,364,337)+
rect(347,184,149,9,'#ded8c8')+line(350,130,493,130)+line(350,130,350,184)+line(493,130,493,184)+
text(323,89,'Access strategy',17)+text(323,113,'by installer',17)+text(320,218,'Keep route clear',16)+
text(67,359,'Equipment, floor loading and protection require assessment.',15))
print('Generated 8 original SVG coordination plates')
