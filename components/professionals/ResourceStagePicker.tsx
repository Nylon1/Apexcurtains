"use client";

import { useState } from "react";

type Stage = { id: string; label: string; decision: string };
type Resource = { id: string; title: string; anchor: string; stages: string[] };

export default function ResourceStagePicker({
  stages,
  resources,
}: {
  stages: Stage[];
  resources: Resource[];
}) {
  const [selected, setSelected] = useState(stages[0].id);
  const stage = stages.find((item) => item.id === selected)!;
  return (
    <div className="resource-stages">
      <div
        className="resource-stage-buttons"
        role="group"
        aria-label="Choose your project stage"
      >
        {stages.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === item.id}
            onClick={() => setSelected(item.id)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="resource-stage-result"
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <p className="resource-kicker">Your next coordination decision</p>
          <h3>{stage.decision}</h3>
        </div>
        <ul>
          {resources
            .filter((item) => item.stages.includes(selected))
            .map((item) => (
              <li key={item.id}>
                <a href={`#${item.anchor}`}>
                  <span>{item.id}</span>
                  {item.title}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
        </ul>
      </div>
      <noscript>
        <p>All five documents and their project stages are listed below.</p>
      </noscript>
    </div>
  );
}
