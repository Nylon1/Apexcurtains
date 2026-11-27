"use client";

import { useState, type FormEvent } from "react";
import { estimateCurtainWeight, type CurtainWeightInputs } from "@/lib/curtain-weight";

const inputs = [
  { name: "width", label: "Track width covered (m)", min: .1, max: 100, step: .01, value: 5 },
  { name: "drop", label: "Finished drop (m)", min: .1, max: 100, step: .01, value: 4 },
  { name: "fullness", label: "Fullness (×)", min: 1, max: 5, step: .05, value: 2 },
  { name: "fabric", label: "Face fabric (g/m²)", min: 1, max: 5000, step: 1, value: 280 },
  { name: "lining", label: "Lining (g/m², 0 for unlined)", min: 0, max: 5000, step: 1, value: 150 },
  { name: "allowance", label: "Retained make-up allowance (%)", min: 0, max: 100, step: 1, value: 5 },
] as const;

const format = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });

export default function CurtainWeight() {
  const [result, setResult] = useState<ReturnType<typeof estimateCurtainWeight> | null>(null);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(inputs.map(({ name }) => [name, Number(data.get(name))])) as CurtainWeightInputs;
    setResult(estimateCurtainWeight(values));
  }

  return (
    <section id="technical-tool" className="arch-tool arch-section" aria-labelledby="weight-title">
      <h2 id="weight-title">Curtain weight estimator</h2>
      <p>Estimate the textile mass across one rectangular curtain layer. Replace the illustrative values with your own. The allowance represents fabric retained in the finished curtain.</p>
      <form onSubmit={calculate} onChange={() => setResult(null)}>
        <div className="arch-fields">
          {inputs.map(({ name, label, min, max, step, value }) => (
            <label key={name}>{label}
              <input name={name} type="number" inputMode="decimal" min={min} max={max} step={step} defaultValue={value} required />
            </label>
          ))}
        </div>
        <button type="submit" className="arch-button" style={{ marginTop: "1rem" }}>Calculate textile mass</button>
        <div role="status">
          {result && (
            <>
              <p className="arch-output">Estimated textile mass {format.format(result.total)} kg</p>
              <p>{format.format(result.fabricMass)} kg face fabric and {format.format(result.liningMass)} kg lining over {format.format(result.area)} m² before make-up allowance.</p>
            </>
          )}
        </div>
      </form>
      <p>This preliminary estimate excludes tracks, hardware and heading components. A professional survey and the specified system determine suitability and structural loads.</p>
    </section>
  );
}
