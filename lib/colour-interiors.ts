// Editorial colour groupings, not manufacturer colour classifications or stock guarantees.
export type ColourFamily = {
  id: string;
  name: string;
  colour: string;
  title: string;
  introduction: string;
  materials: string;
  scale: string;
  finishing: string;
  fabrics: string[];
  palette: { name: string; colour: string }[];
};
export const colourFamilies: ColourFamily[] = [
  {
    id: "neutrals",
    name: "Neutrals & creams",
    colour: "#e5ddca",
    title: "Neutral curtains, beautifully layered",
    introduction:
      "Cream, ivory and chalk give architectural glazing a quiet frame. A pale curtain can connect the walls across a double-height room, while woven texture and the shadows between folds keep the scheme from feeling flat.",
    materials:
      "Try warm white walls, pale oak and limestone. Compare creamy whites against your paint: a yellow undertone can become more noticeable beside a cool, crisp white.",
    scale:
      "In a large gable, a slight difference between wall and curtain is often enough to make the shape legible. Bring depth through the heading and the texture of upholstery rather than adding many competing colours.",
    finishing:
      "Matching tiebacks keep the silhouette quiet. White track is the usual starting point beside pale ceilings; check how the lining changes the face colour in daylight.",
    fabrics: ["Ivory", "Rice", "Pumice", "Pearl"],
    palette: [
      { name: "Chalk", colour: "#eee9dc" },
      { name: "Pale oak", colour: "#bd9f78" },
      { name: "Stone", colour: "#b4b0a3" },
    ],
  },
  {
    id: "taupes",
    name: "Beige & taupe",
    colour: "#b7a68e",
    title: "Beige and taupe curtains with warmth",
    introduction:
      "Oat, putty and mushroom bridge pale walls and darker furniture. These are useful colours when the room needs softness without a pronounced new hue. Taupe can lean pink, green or grey, so its neighbours matter.",
    materials:
      "Lay samples beside oak, travertine and the sofa. A warm beige can bring honey-coloured timber into the scheme; a greyer taupe may sit more naturally with weathered wood.",
    scale:
      "For open-plan rooms, repeat a related neutral in a rug or dining chair to connect separate zones. Compare the curtain closed as a large surface as well as gathered at the sides.",
    finishing:
      "A slightly deeper matching tieback defines the folds subtly. A coloured reverse can add interest where the curtain turns back; choose its light-control performance separately from its colour.",
    fabrics: ["Linen", "Hemp", "Cappuccino", "Donkey"],
    palette: [
      { name: "Warm plaster", colour: "#ded3c2" },
      { name: "Oak", colour: "#ac855b" },
      { name: "Mushroom", colour: "#8e8175" },
    ],
  },
  {
    id: "greys",
    name: "Greys",
    colour: "#9c9e9b",
    title: "Grey curtains with a considered undertone",
    introduction:
      "Grey can be soft and stony or crisp and architectural. Blue-grey beside concrete feels different from warm greige beside oak. Avoid choosing from the word grey alone: compare the actual fabric with the fixed materials in the room.",
    materials:
      "Warm timber and ivory upholstery can balance a cooler grey. With chrome, steel or black window frames, use texture to soften the harder edges rather than trying to match every metal finish.",
    scale:
      "On tall glazing, a medium grey makes the folds easy to read without the visual weight of charcoal. In lower light, check that your chosen grey does not appear much darker than expected.",
    finishing:
      "White track can recede into a pale ceiling. The optional black finish can relate to dark frames when the track is visible; it need not match chrome or brass furniture hardware.",
    fabrics: ["Sterling", "Chrome", "Granite", "Platinum"],
    palette: [
      { name: "Soft white", colour: "#e7e5dd" },
      { name: "Weathered wood", colour: "#a28e77" },
      { name: "Graphite", colour: "#4b5050" },
    ],
  },
  {
    id: "greens",
    name: "Greens",
    colour: "#7c855a",
    title: "Green apex curtains, connected to the garden",
    introduction:
      "Sage, olive, moss and deep green offer different ways to connect a room with the landscape. Sage feels muted and airy; olive adds warmth; moss gives depth. The Oslo examples below explore olive and yellow-green directions, rather than representing every green subtone.",
    materials:
      "Chalk walls, natural oak and warm stone let green take the lead. A small clay or muted pink accent can add contrast. Check the reflected colour of planting outside before settling on the shade.",
    scale:
      "Green is particularly worth exploring around gable glazing with a garden view. Keep the rest of a double-height room relatively quiet if the curtain is a strong, saturated green.",
    finishing:
      "Matching tiebacks make a continuous sweep; a warm neutral contrast brings the wall palette into the cloth. Compare coloured lining where the reverse shows, alongside the required light control.",
    fabrics: ["Fern", "Verdigris"],
    palette: [
      { name: "Chalk", colour: "#ece7d9" },
      { name: "Olive", colour: "#7c855a" },
      { name: "Clay", colour: "#b6816b" },
    ],
  },
  {
    id: "blues",
    name: "Blues",
    colour: "#637e8b",
    title: "Blue curtains, from airy to enveloping",
    introduction:
      "Pale blue can open up a quiet scheme; deep blue gives glazing a stronger frame. A muted blue need not make a room feel cold when warm wood, cream and textured upholstery provide balance.",
    materials:
      "Explore blue with oak, ivory or restrained terracotta accents. Black frames sharpen the outline; warmer metals add a different note without needing to appear in the curtain fabric itself.",
    scale:
      "View deep blue from the doorway and seating position. A small sample can feel understated while a full curtain becomes the largest dark surface in the room, especially after sunset.",
    finishing:
      "For a bedroom, assess blackout or thermal blackout lining with the chosen blue; dark face fabric alone is not a blackout specification. Matching tiebacks keep attention on the long folds.",
    fabrics: ["Oxford", "Sky", "Aqua"],
    palette: [
      { name: "Ivory", colour: "#ece2ce" },
      { name: "Oak", colour: "#ad8156" },
      { name: "Muted blue", colour: "#637e8b" },
    ],
  },
  {
    id: "pinks",
    name: "Pinks",
    colour: "#bb9290",
    title: "Pink curtains with grown-up softness",
    introduction:
      "Dusty rose and muted blush can warm a room without a sugary effect. Their grey or earthy undertones work especially well when balanced with quieter walls and natural materials.",
    materials:
      "Try rose with chalk, walnut or a muted green accent. Compare pink cloth beside red-toned timber carefully: two similar warm undertones can either connect beautifully or compete.",
    scale:
      "In bedrooms and sitting rooms, a muted pink can soften strong glazing lines. On a very tall curtain, start with a generous sample so you can judge the intensity across a larger area.",
    finishing:
      "Matching tiebacks create a gentle finish. A deeper rose or neutral contrast is a more deliberate detail; check it against the lining at a folded edge before choosing.",
    fabrics: ["Perfume", "Thistle", "Clover", "Heather"],
    palette: [
      { name: "Plaster", colour: "#e6d7cc" },
      { name: "Dusty rose", colour: "#bb9290" },
      { name: "Walnut", colour: "#6c5140" },
    ],
  },
  {
    id: "earth",
    name: "Earth tones",
    colour: "#ae7455",
    title: "Earth-toned curtains for grounded interiors",
    introduction:
      "Clay, rust, tobacco and brown echo natural building materials. They can give a contemporary room warmth or sit comfortably with a country interior's timber, brick and stone.",
    materials:
      "Combine a warm curtain with chalk walls and one darker timber note. Terracotta with muted blue creates controlled contrast; brown beside textured cream offers a quieter layered palette.",
    scale:
      "In a large gable space, distinguish warm colour from sheer darkness. A terracotta curtain can be lively in strong daylight, while deep brown may read as a substantial frame in the evening.",
    finishing:
      "Keep tiebacks tonal for a settled look, or introduce a restrained pale contrast. Consider white track against plaster and black as an optional upgrade where it connects with exposed dark metal.",
    fabrics: ["Tango", "Teak", "Walnut", "Mahogany"],
    palette: [
      { name: "Chalk", colour: "#e9dfce" },
      { name: "Clay", colour: "#ae7455" },
      { name: "Muted blue", colour: "#72878d" },
    ],
  },
  {
    id: "golds",
    name: "Yellows & golds",
    colour: "#b9a364",
    title: "Yellow and gold curtains with a soft glow",
    introduction:
      "Butter, straw and ochre can bring warmth to a scheme. Muted shades sit more quietly than clear yellow, particularly when the curtain occupies a large part of the wall.",
    materials:
      "Explore cream, warm stone and natural timber. A little blue or charcoal can keep a golden scheme balanced. Brass accessories may echo the warmth without requiring a shiny fabric.",
    scale:
      "Check yellow in the room's evening lamps as well as daylight. Warm lighting can intensify its golden character; a large south-facing window can make a light shade appear much brighter.",
    finishing:
      "Tone-on-tone tiebacks avoid breaking up a long curtain. Assess the lining behind the sample: the backing and transmitted light can change the colour you see.",
    fabrics: ["Corn", "Sandstone", "Straw"],
    palette: [
      { name: "Cream", colour: "#efe4cc" },
      { name: "Ochre", colour: "#b9a364" },
      { name: "Charcoal", colour: "#505655" },
    ],
  },
  {
    id: "reds",
    name: "Reds & burgundy",
    colour: "#84434d",
    title: "Red and burgundy curtains with depth",
    introduction:
      "Wine, oxblood and clear red make a confident focal point. A muted burgundy can feel enveloping, while brighter red introduces more energy. Choose the amount of colour as carefully as the shade.",
    materials:
      "Balance deep red with warm white, dark timber or quiet stone. A restrained brass detail can add warmth. Avoid introducing several equally strong colours unless a deliberately lively interior is the aim.",
    scale:
      "Dining rooms and evening spaces can carry a richer palette, but tall glazing increases its visual area. Judge a closed-curtain scheme under the lamps used for dining, not only in midday sun.",
    finishing:
      "Matching tiebacks maintain depth; a small contrasting edge makes a more decorative statement. If blackout is needed, specify the lining and edge coverage rather than relying on the darkness of the red.",
    fabrics: ["Cinder", "Firestone"],
    palette: [
      { name: "Warm white", colour: "#e9dfd0" },
      { name: "Wine", colour: "#84434d" },
      { name: "Dark timber", colour: "#584439" },
    ],
  },
  {
    id: "dark",
    name: "Dark & dramatic",
    colour: "#384244",
    title: "Dark curtains that frame the architecture",
    introduction:
      "Charcoal, black and deep brown bring definition to a tall window. A dark curtain can sit with black frames as one architectural composition, or create a striking boundary against pale plaster.",
    materials:
      "Use differences in texture to stop the scheme feeling flat: matte walls, woven cloth, timber and softer upholstery. Introduce a lighter surface where you want the eye to rest.",
    scale:
      "Look at how much glass remains visible when the curtains are open. A large dark stack has a strong presence even when drawn back; open and closed proportions both belong in the design conversation.",
    finishing:
      "Black track is an optional upgrade that can relate to dark frames; white remains the normal finish. A pale lining may show at the edge, so review the reverse and tieback position together.",
    fabrics: ["Black", "Graphite", "Mahogany", "Oxford"],
    palette: [
      { name: "Charcoal", colour: "#384244" },
      { name: "Warm stone", colour: "#c3b8a5" },
      { name: "Aged brass", colour: "#a78e5f" },
    ],
  },
  {
    id: "pastels",
    name: "Soft pastels",
    colour: "#c1cdd0",
    title: "Pastel curtains with an airy finish",
    introduction:
      "Soft blue, blush and pale aqua can add colour with less contrast. They work best when their undertones connect with the room, rather than when every finish is simply made pale.",
    materials:
      "Try pale timber, chalk and a little darker detailing to define the scheme. Muted colours can sit together more easily than highly saturated ones, but still compare them in the actual light.",
    scale:
      "In Scandinavian or minimal interiors, a pastel curtain can be the single gentle colour note. On high glazing, folds and lining give the pale surface its structure; consider that depth as part of the palette.",
    finishing:
      "White track and matching tiebacks can keep the composition light. For sleep spaces, a pastel face fabric can still be combined with blackout lining, subject to light gaps around the installation.",
    fabrics: ["Sky", "Perfume", "Aqua", "Pearl"],
    palette: [
      { name: "Pale blue", colour: "#c1cdd0" },
      { name: "Blush", colour: "#d6b9b1" },
      { name: "Chalk", colour: "#ece7dc" },
    ],
  },
];

export const styleAdvice = {
  Modern:
    "Let the glazing and a restrained colour palette lead. A clear heading rhythm and tonal tiebacks give the cloth a composed architectural line.",
  Contemporary:
    "Layer a current mix of textures: quiet cloth, tactile upholstery and a deliberate contrast in timber or metal. A subtle colour can still feel distinctive.",
  Traditional:
    "Consider a more defined pleated heading and carefully proportioned tiebacks. Richer colour can sit with timber and decorative details without requiring a busy curtain pattern.",
  Minimal:
    "Choose a close relationship between walls and curtains, then use weave and the shadow of folds for depth. Plan stack-back early so the open curtain feels intentional.",
  Luxury:
    "Focus on generous proportions, a considered lining and beautifully dressed folds. Restrained colour and precise finishing can have more presence than shine or ornament.",
  Country:
    "Take cues from stone, timber and the garden. Olive, warm neutrals and earthy tones can feel settled; a relaxed texture still needs a stable construction on tall drops.",
  Industrial:
    "Soften brick, steel and concrete with tactile cloth. Optional black track may connect to dark frames, but the correct fixing method is determined by the actual structure.",
  Scandinavian:
    "Start with pale wood, soft walls and useful daylight. Muted blue, warm neutral or restrained green can introduce colour without overwhelming the natural materials.",
} as const;
export const roomAdvice = {
  "Living room":
    "View the scheme from your favourite chair and the doorway. Balance the curtain with the sofa and rug, and consider privacy when the lamps are on.",
  Bedroom:
    "Start with sleep and privacy as well as colour. Discuss blackout or thermal blackout lining and the light gaps at the top, sides and floor; no lining alone guarantees a dark room.",
  "Dining room":
    "Check the cloth under the evening lighting used for meals. Rich colour can feel intimate, while a pale curtain can connect the dining area to the wider room.",
  "Open-plan space":
    "Repeat an undertone across living and dining zones rather than matching every fabric. Check the curtains from the furthest part of the room.",
  "Double-height space":
    "Assess a larger hanging sample from ground level. Texture, joins and shadow behave differently across a 4–6 m drop, and finished weight affects the track and fixings.",
  "Gable / apex room":
    "Design around the roofline, stack-back and visible glass. A close wall tone can quieten the outline; a deeper curtain makes the geometry more prominent.",
} as const;
export const moodAdvice = {
  Warm: "Compare cream, clay or timber accents alongside your selected colour. Warmth can come from the supporting palette rather than changing the curtain itself.",
  Cool: "Try chalk, blue-grey or soft green surroundings. Check the resulting scheme after sunset, when warmer lamps may change the balance.",
  Bright:
    "Keep supporting surfaces lighter and consider how much glazing the open curtains leave visible. A bright colour is not the same as more daylight.",
  Calm: "Reduce the contrast between the curtain, walls and floor. Let a limited palette and the texture of the cloth provide interest.",
  Dramatic:
    "Increase the difference in value between the curtain and its surroundings, or repeat a deeper tone around the room for an enveloping effect.",
  Soft: "Explore muted colour, tactile upholstery and less abrupt contrasts. The heading and the way the folds are dressed also shape the final impression.",
} as const;
export const lightAdvice = {
  "North-facing":
    "Often cooler and more even in UK rooms. Compare warm and cool undertones beside the window; outdoor reflections and obstructions can matter as much as orientation.",
  "South-facing":
    "Often receives stronger direct daylight in the UK. Compare the sample in sun and shade, review glare and lining, and ask about the fabric's suitability for prolonged exposure.",
  "East-facing":
    "Assess the brighter morning light and the quieter afternoon separately. A colour chosen only at breakfast may feel different later in the day.",
  "West-facing":
    "Check the warmer late-day light as well as the morning. Low sun can make texture and fold shadows more noticeable.",
  "Bright sun":
    "Hold the proposed lining behind the fabric to compare transmitted light. Check fading suitability for the specific cloth; no colour family is automatically fade-proof.",
  "Lower light":
    "Judge the sample under the actual lamps as well as daylight. A darker fabric may read deeper; a pale fabric will not create light that is absent from the room.",
} as const;
