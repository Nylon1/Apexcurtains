"use client";
import { useId, type ReactNode } from "react";
import type { SurveyWindow } from "@/lib/atelier/model";
import {
  shapeName,
  windowOutline,
  windowGeometry,
} from "@/lib/atelier/geometry";
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
  const patternId = useId();
  const outline = windowOutline(w);
  const g = windowGeometry(w);
  const path =
    outline
      ?.map(([x, y], i) => `${i ? "L" : "M"}${40 + x * 200} ${30 + y * 150}`)
      .join(" ") + " Z";
  return (
    <svg
      className="at-window-diagram"
      viewBox="0 0 280 230"
      role="img"
      aria-label={`${shapeName(w)} measurement guide`}
    >
      <defs>
        <pattern
          id={patternId}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M2 0v10" stroke="#B9A583" strokeWidth=".8" />
        </pattern>
      </defs>
      {outline ? (
        <path
          d={path}
          fill={`url(#${patternId})`}
          fillOpacity=".28"
          stroke="#9C855C"
          strokeWidth="1.5"
        />
      ) : (
        <>
          <rect
            x="40"
            y="30"
            width="200"
            height="150"
            rx="10"
            fill="none"
            stroke="#9C855C"
            strokeDasharray="4 5"
          />
          <text x="140" y="95" textAnchor="middle">
            Your custom shape
          </text>
          <text x="140" y="115" textAnchor="middle">
            See typed measurements
          </text>
        </>
      )}
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
        {g.longest ? `${g.longest} mm` : "longest drop"}
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
