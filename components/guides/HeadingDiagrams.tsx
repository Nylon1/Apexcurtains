export function PleatDiagram({ kind }: { kind: "pinch" | "pencil" | "wave" }) {
  const labels = {
    pinch:
      "Front-view diagram of paired folds meeting at sewn double pinch pleats",
    pencil:
      "Front-view diagram of narrow gathers formed along pencil pleat tape",
    wave: "Plan-view diagram of fabric alternating in front of and behind a wave carrier line",
  };
  return (
    <svg
      viewBox="0 0 360 180"
      role="img"
      aria-label={labels[kind]}
      className="heading-pleat-diagram"
    >
      <text x="20" y="24" className="diagram-small">
        {kind === "wave" ? "SEEN FROM ABOVE" : "SEEN FROM THE FRONT"}
      </text>
      {kind === "wave" ? (
        <>
          <path
            d="M22 100H338"
            stroke="#83958a"
            strokeDasharray="4 5"
            fill="none"
          />
          <path
            d="M24 100C24 38 76 38 76 100S128 162 128 100S180 38 180 100S232 162 232 100S284 38 284 100S336 162 336 100"
            fill="none"
            stroke="#ad9066"
            strokeWidth="10"
          />
          {[24, 76, 128, 180, 232, 284, 336].map((x) => (
            <circle key={x} cx={x} cy="100" r="4" fill="#203c35" />
          ))}
        </>
      ) : (
        <>
          <path
            d="M25 49H335L342 153Q180 170 18 153Z"
            fill="#e3d6bd"
            stroke="#ad9066"
          />
          {kind === "pencil"
            ? Array.from({ length: 19 }, (_, i) => {
                const x = 30 + i * 16;
                return (
                  <path
                    key={x}
                    d={`M${x} 50q8 11 0 27q-5 12 0 29l-3 45m8-101q-6 10 0 28q5 12 0 29l3 44`}
                    fill="none"
                    stroke="#92794f"
                    strokeWidth="1.5"
                  />
                );
              })
            : [73, 180, 287].map((x) => (
                <g key={x} fill="none" stroke="#92794f" strokeWidth="2">
                  <path
                    d={`M${x - 24} 49Q${x - 17} 83 ${x} 103Q${x + 17} 83 ${x + 24} 49M${x} 49V103M${x - 12} 49L${x} 103L${x + 12} 49M${x - 6} 104L${x - 22} 156M${x + 6} 104L${x + 22} 156`}
                  />
                  <path d={`M${x - 6} 104h12`} strokeWidth="5" />
                </g>
              ))}
        </>
      )}
    </svg>
  );
}

export function ApexHeadingDiagram() {
  return (
    <svg
      viewBox="0 0 680 560"
      role="img"
      aria-label="Apex curtain planning diagram: one, the measured sloping upper line; two, retained upper cloth; three, varying drops to the floor; four, tiebacks and visible glazing"
      className="heading-apex-diagram"
    >
      <path
        d="M60 520V214L334 34L620 251V520"
        fill="#e9e4d7"
        stroke="#8b9687"
        strokeWidth="2"
      />
      <path
        d="M130 490V250L334 98L550 281V490Z"
        fill="#d5e0dc"
        stroke="#203c35"
        strokeWidth="4"
      />
      <path d="M334 98V490M130 328H550" stroke="#203c35" strokeWidth="4" />
      <path
        d="M96 229L334 57Q280 279 155 362L173 492H96L120 356Z"
        fill="#c5b08a"
        stroke="#8d754f"
        strokeWidth="2"
      />
      <path
        d="M334 57L591 256L570 369L594 492H511L531 371Q395 290 334 57Z"
        fill="#c5b08a"
        stroke="#8d754f"
        strokeWidth="2"
      />
      <g fill="none" stroke="#8d754f" strokeWidth="2" opacity="0.7">
        <path d="M142 194Q168 302 138 360L124 490M194 155Q202 284 143 358L144 490M252 113Q253 262 149 359L162 490M406 116Q414 287 541 367L523 490M464 160Q472 310 550 365L550 490M525 206Q548 300 558 368L575 490" />
      </g>
      <path
        d="M108 348l49 17M532 372l48-14"
        stroke="#efe4ce"
        strokeWidth="10"
      />
      <path d="M65 504H620" stroke="#203c35" strokeWidth="2" />
      <path
        d="M90 217L334 43L600 250"
        stroke="#203c35"
        strokeWidth="5"
        fill="none"
      />
      {[
        [334, 43, "1"],
        [414, 210, "2"],
        [81, 420, "3"],
        [584, 354, "4"],
      ].map(([x, y, n]) => (
        <g key={n}>
          <circle
            cx={x}
            cy={y}
            r="20"
            fill="#203c35"
            stroke="#faf7ee"
            strokeWidth="3"
          />
          <text
            x={x}
            y={Number(y) + 6}
            textAnchor="middle"
            fill="#fff8e8"
            fontSize="18"
          >
            {n}
          </text>
        </g>
      ))}
      <text x="340" y="545" textAnchor="middle" className="diagram-small">
        ONE POSSIBLE TIED-BACK ARRANGEMENT · NOT TO SCALE
      </text>
    </svg>
  );
}
