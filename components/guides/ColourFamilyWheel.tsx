"use client";
import { colourFamilies } from "@/lib/colour-interiors";
function sector(index: number) {
  const point = (a: number, r: number) =>
    `${(200 + r * Math.cos(a)).toFixed(3)},${(200 + r * Math.sin(a)).toFixed(3)}`;
  const start = -Math.PI / 2 + (index * 2 * Math.PI) / colourFamilies.length;
  const end = start + (2 * Math.PI) / colourFamilies.length - 0.025;
  return `M${point(start, 184)} A184,184 0 0 1 ${point(end, 184)} L${point(end, 100)} A100,100 0 0 0 ${point(start, 100)} Z`;
}
export default function ColourFamilyWheel({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="colour-wheel-controls">
      <svg
        viewBox="0 0 400 400"
        className="colour-selector-wheel"
        aria-label="Curtain colour family wheel"
        role="group"
      >
        {colourFamilies.map((f, i) => (
          <g key={f.id}>
            <path
              d={sector(i)}
              fill={f.colour}
              stroke={selected === f.id ? "#203b35" : "transparent"}
              strokeWidth="4"
              role="button"
              tabIndex={0}
              aria-label={`Explore ${f.name}`}
              aria-pressed={selected === f.id}
              onClick={() => onSelect(f.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(f.id);
                }
              }}
            />
            <text
              x={(
                200 +
                142 *
                  Math.cos(
                    -Math.PI / 2 +
                      ((i + 0.5) * 2 * Math.PI) / colourFamilies.length,
                  )
              ).toFixed(3)}
              y={(
                205 +
                142 *
                  Math.sin(
                    -Math.PI / 2 +
                      ((i + 0.5) * 2 * Math.PI) / colourFamilies.length,
                  )
              ).toFixed(3)}
              textAnchor="middle"
              fill={i === 8 || i === 9 ? "#fff" : "#172b2b"}
              fontSize="14"
              pointerEvents="none"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
        <text
          x="200"
          y="190"
          textAnchor="middle"
          fontSize="13"
          letterSpacing="3"
          fill="#6b695f"
          aria-hidden="true"
        >
          YOUR PALETTE
        </text>
        <text
          x="200"
          y="222"
          textAnchor="middle"
          fontSize="19"
          fontFamily="Georgia, serif"
          fill="#203b35"
          aria-hidden="true"
        >
          {colourFamilies.find((f) => f.id === selected)?.name}
        </text>
      </svg>
      <div className="colour-legend" aria-label="Choose a colour family">
        {colourFamilies.map((f, i) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={selected === f.id}
            onClick={() => onSelect(f.id)}
          >
            <span style={{ backgroundColor: f.colour }} aria-hidden="true" />
            <small>{String(i + 1).padStart(2, "0")}</small>
            {f.name}
          </button>
        ))}
      </div>
      <p className="home-note">
        Illustrative palette colours. Make the final choice from a physical
        fabric sample.
      </p>
    </div>
  );
}
