"use client";
import { useId, type ReactNode } from "react";
import type { SurveyWindow } from "@/lib/atelier/model";
export function Button({
  children,
  onClick,
  secondary = false,
  disabled = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`at-button ${secondary ? "at-button-secondary" : ""}`}
    >
      {children}
    </button>
  );
}
export function Field({
  label,
  value,
  onChange,
  type = "text",
  hint,
  wide = false,
  options,
  showZero = false,
  required = false,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
  wide?: boolean;
  options?: readonly string[];
  showZero?: boolean;
  required?: boolean;
}) {
  const hintId = useId();
  return (
    <label className={`at-field ${wide ? "at-wide" : ""}`}>
      <span>
        {label}
        {required ? (
          <span className="at-required" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </span>
      {options ? (
        <select
          aria-label={label}
          aria-required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? hintId : undefined}
        >
          {options.map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          aria-label={label}
          aria-required={required}
          rows={3}
          aria-describedby={hint ? hintId : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          aria-label={label}
          aria-required={required}
          type={type}
          min={type === "number" ? 0 : undefined}
          step={type === "number" ? "any" : undefined}
          inputMode={type === "number" ? "decimal" : undefined}
          aria-describedby={hint ? hintId : undefined}
          value={value === 0 && type === "number" && !showZero ? "" : value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}{" "}
      {hint ? <small id={hintId}>{hint}</small> : null}
    </label>
  );
}
export function Toggle({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="at-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{children}</span>
    </label>
  );
}
export function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="at-section">
      <div className="at-section-title">
        <span>{number}</span>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
export function WindowDiagram({ w }: { w: SurveyWindow }) {
  const peak =
    w.widthMm && w.apexOffsetMm ? 40 + (200 * w.apexOffsetMm) / w.widthMm : 140;
  return (
    <svg
      className="at-window-diagram"
      viewBox="0 0 280 230"
      role="img"
      aria-label={`${w.type} window diagram`}
    >
      <defs>
        <pattern
          id="atelier-folds"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M2 0v10" stroke="#B9A583" strokeWidth=".8" />
        </pattern>
      </defs>
      <path
        d={
          w.type === "apex"
            ? `M40 180V80L${peak} 30L240 80V180Z`
            : "M40 180V40H240V180Z"
        }
        fill="url(#atelier-folds)"
        fillOpacity=".28"
        stroke="#9C855C"
        strokeWidth="1.5"
      />
      <path
        d="M40 202H240M40 197V207M240 197V207"
        fill="none"
        stroke="#9C855C"
      />
      <text x="140" y="220" textAnchor="middle">
        {w.widthMm ? `${w.widthMm} mm` : "coverage"}
      </text>
      <path d="M20 180V30M15 30H25M15 180H25" fill="none" stroke="#9C855C" />
      <text x="13" y="110" transform="rotate(-90 13 110)" textAnchor="middle">
        {w.longDropMm ? `${w.longDropMm} mm` : "longest drop"}
      </text>
    </svg>
  );
}
export async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });
  const body = await res.json();
  if (!res.ok)
    throw new Error(
      body.issues?.join("\n") || body.error || "Please try again.",
    );
  return body as T;
}
