export type DrawingKind = "height" | "fullness" | "stack" | "layers" | "access" | "making" | "fixing";

const details: Record<DrawingKind, { title: string; note: string }> = {
  height: { title: "Opening height and curtain drop", note: "The opening, hanging point and finished hem are separate survey references." },
  fullness: { title: "Track width and flat fabric width", note: "The same covered width takes more cloth as fullness increases. The drawing illustrates two times fullness." },
  stack: { title: "Stack-back and clear glazing", note: "Allow room beside the glazing for the folded panels to collect." },
  layers: { title: "Curtain and voile on separate tracks", note: "Here the voile sits nearest the glass, with the main curtain on the room side. Allow space for both headings to move." },
  access: { title: "High-level survey and access planning", note: "Review the working area, the route into the room and the intended track line before choosing access equipment." },
  making: { title: "Pattern alignment across fabric widths", note: "Plan seam positions and match the repeat before the fabric is cut." },
  fixing: { title: "Track support and fixing substrate", note: "Confirm the load path into suitable structure behind the ceiling finish." },
};

const drawing: Record<DrawingKind, React.ReactNode> = {
  height: <>
    <path className="draw-heavy" d="M96 54H360 M96 228H360 M133 70H305V206H133z M219 70v136 M133 138h172" />
    <path className="draw-fabric" d="M121 61h196v7H121z M140 68q8 65 3 154h19q4-67-1-154m128 0q-6 65-1 154h19q-2-67 2-154" />
    <path d="M83 70v136m-5-130 10-6m-10 136 10-6m-1-130h39m-39 136h39M340 68v154m-5-148 10-6m-10 154 10-6m-6-148h-23m23 154h-23" />
    <text x="77" y="139" textAnchor="end">Opening</text>
    <text x="348" y="139">Drop</text>
  </>,
  fullness: <>
    <path className="draw-heavy" d="M120 73H300 M120 65v16 M300 65v16 M120 139H300" />
    <path className="draw-fabric" d="M120 139q9-27 18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0" />
    <path d="M30 200h360M30 191v18m360-18v18 M120 151v15m180-15v15" />
    <text x="210" y="60" textAnchor="middle">Track width</text>
    <text x="210" y="225" textAnchor="middle">Flat fabric width</text>
  </>,
  stack: <>
    <path className="draw-heavy" d="M36 65H384m-284 19h220v123H100zM210 84v123m-110-61h220" />
    <path className="draw-fabric" d="M46 68h56v145H46zM318 68h56v145h-56z M57 68v145m11-145v145m11-145v145m11-145v145m239-145v145m11-145v145m11-145v145m11-145v145" />
    <path d="M46 225h56m-56-5v10m56-10v10m216-5h56m-56-5v10m56-10v10" />
    <text x="74" y="247" textAnchor="middle">Stack</text>
    <text x="346" y="247" textAnchor="middle">Stack</text>
  </>,
  layers: <>
    <path className="draw-heavy" d="M49 65H371m-302 22h282M69 129h282M110 181h200m-200 10h200" />
    <path className="draw-fabric" d="M80 92q13-17 26 0t26 0t26 0t26 0t26 0t26 0t26 0t26 0t26 0t26 0 M80 136q13-20 26 0t26 0t26 0t26 0t26 0t26 0t26 0t26 0t26 0t26 0" />
    <text x="210" y="46" textAnchor="middle">Ceiling recess · plan</text>
    <text x="210" y="119" textAnchor="middle">Curtain rail</text>
    <text x="210" y="166" textAnchor="middle">Voile rail</text>
    <text x="210" y="217" textAnchor="middle">Glazing</text>
  </>,
  access: <>
    <path className="draw-heavy" d="M48 223h320V68L246 40 118 68v155 M128 74h226 M154 94h174v104H154zM241 94v104 M154 146h174" />
    <path d="M160 209h159v14H160z" strokeDasharray="5 5" />
    <path className="draw-fabric" d="M66 206h75m-8-5 8 5-8 5M88 106l52-26" />
    <text x="53" y="121">Track line</text>
    <text x="53" y="190">Route in</text>
    <text x="242" y="246" textAnchor="middle">Clear working area</text>
  </>,
  making: <>
    <path className="draw-heavy" d="M84 64h252v141H84z M210 64v141" />
    <path className="draw-fabric" d="M84 94q31-18 63 0t63 0t63 0t63 0 M84 122q31-18 63 0t63 0t63 0t63 0 M84 150q31-18 63 0t63 0t63 0t63 0 M84 178q31-18 63 0t63 0t63 0t63 0" />
    <path d="M210 208v13 M84 50v-8h126v8m0 0v-8h126v8" />
    <text x="147" y="32" textAnchor="middle">Fabric width</text>
    <text x="273" y="32" textAnchor="middle">Fabric width</text>
    <text x="210" y="244" textAnchor="middle">Aligned seam</text>
  </>,
  fixing: <>
    <path className="draw-heavy" d="M81 57h242v34H81z M81 107h242m-148 1h70v16h-70zM185 124v15h50v-15" />
    <path d="M88 84l22-20m12 20 22-20m12 20 22-20m12 20 22-20m12 20 22-20m12 20 22-20m12 20 22-20 M194 118V73m31 45V73" />
    <path className="draw-fabric" d="M197 139q-8 34-5 72h40q3-35-9-72" />
    <text x="201" y="42" textAnchor="middle">Structural substrate</text>
    <text x="252" y="130">Rail</text>
    <text x="247" y="198">Curtain load</text>
  </>,
};

export default function ArchitectureDrawing({ kind }: { kind: DrawingKind }) {
  const { title, note } = details[kind];
  return (
    <figure className="arch-drawing">
      <svg viewBox="0 0 420 266" role="img" aria-label={`${title}. ${note}`}>
        <g stroke="currentColor" strokeWidth="1" fill="none">{drawing[kind]}</g>
      </svg>
      <figcaption><strong>{title}</strong><span>{note} Illustrative drawing.</span></figcaption>
    </figure>
  );
}
