"use client";

import { useState } from "react";

function CurtainLayer({ open, stack, voile = false }: { open: boolean; stack: string; voile?: boolean }) {
  return (
    <div className="arch-layer" data-open={open} data-stack={stack} data-voile={voile}>
      <span className="arch-panel" />
      <span className="arch-panel" />
    </div>
  );
}

export default function CurtainMotion() {
  const [shape, setShape] = useState("tall");
  const [stack, setStack] = useState("centre");
  const [layers, setLayers] = useState("double");
  const [curtainOpen, setCurtainOpen] = useState(true);
  const [voileOpen, setVoileOpen] = useState(false);

  return (
    <section id="technical-tool" className="arch-tool arch-section" aria-labelledby="motion-title">
      <h2 id="motion-title">See how the curtains move</h2>
      <p>Compare centre-opening and one-way movement on tall rectangular or wide glazing. With two tracks, try operating the voile and curtain independently.</p>
      <div className="arch-fields">
        <label>Window elevation
          <select value={shape} onChange={(event) => setShape(event.target.value)}>
            <option value="tall">Tall double-height glazing</option>
            <option value="wide">Wide rectangular glazing</option>
          </select>
        </label>
        <label>Draw arrangement
          <select value={stack} onChange={(event) => setStack(event.target.value)}>
            <option value="centre">Centre opening</option>
            <option value="one">One way to the left</option>
          </select>
        </label>
        <label>Layers
          <select value={layers} onChange={(event) => setLayers(event.target.value)}>
            <option value="double">Voile and curtain</option>
            <option value="single">Curtain only</option>
          </select>
        </label>
      </div>
      <div className="arch-elevation" data-shape={shape} aria-hidden="true">
        {layers === "double" && <CurtainLayer open={voileOpen} stack={stack} voile />}
        <CurtainLayer open={curtainOpen} stack={stack} />
      </div>
      <div className="arch-motion-actions">
        <button type="button" className="arch-button" onClick={() => setCurtainOpen(!curtainOpen)}>
          {curtainOpen ? "Close curtain" : "Open curtain"}
        </button>
        {layers === "double" && (
          <button type="button" className="arch-button" onClick={() => setVoileOpen(!voileOpen)}>
            {voileOpen ? "Close voile" : "Open voile"}
          </button>
        )}
      </div>
      <p role="status">Curtain {curtainOpen ? "open" : "closed"}{layers === "double" && `, voile ${voileOpen ? "open" : "closed"}`}.</p>
      <p>Illustrative elevation. Stack sizes, motor compatibility and achievable layouts are assessed for the actual project.</p>
    </section>
  );
}
