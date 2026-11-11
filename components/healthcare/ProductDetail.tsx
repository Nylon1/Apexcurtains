"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HEALTHCARE_ROOT,
  type HealthcareProduct,
  productUrl,
  UNKNOWN_SPEC,
} from "@/lib/healthcare/catalogue";
import { ProductImage } from "./CatalogueBrowser";
import { AddSelection } from "./Shortlist";

export default function ProductDetail({
  product: p,
  colourways,
}: {
  product: HealthcareProduct;
  colourways: HealthcareProduct[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(false);
  return (
    <>
      <div className="hc-detail-grid">
        <div>
          <button
            className="hc-image-button"
            onClick={() => {
              setZoom(true);
              dialog.current?.showModal();
            }}
            aria-label={`Enlarge ${p.name} supplier image`}
          >
            <ProductImage product={p} large />
          </button>
          <p className="hc-small">
            Select the image to enlarge.{" "}
            {p.images[0]?.kind === "basecloth"
              ? "Original supplier texture image; high-resolution photographs and printed colourways available on request."
              : "Supplier product image. Screen colours are a guide; request a physical sample."}
          </p>
        </div>
        <div>
          <p className="hc-eyebrow">
            {p.supplier} / {p.collection}
          </p>
          <h1>{p.name}</h1>
          <p className="hc-reference">Supplier reference {p.reference}</p>
          <p className="hc-lede">{p.description}</p>
          <p>
            {p.colour}
            {p.colourReference ? ` · ${p.colourReference}` : ""}
          </p>
          <div className="hc-tags">
            {p.properties.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
          <div className="hc-actions">
            <AddSelection id={p.id} />
            {p.category !== "tracks" && <AddSelection id={p.id} sample />}
          </div>
          <p className="hc-small">
            {p.supplyStatus}. Quotations are prepared individually.
          </p>
        </div>
      </div>
      {colourways.length > 1 && (
        <section className="hc-section">
          <p className="hc-eyebrow">The colour collection</p>
          <h2>Find your shade.</h2>
          <div className="hc-colourways">
            {colourways.map((c) => (
              <Link
                key={c.id}
                href={productUrl(c)}
                aria-current={c.id === p.id ? "page" : undefined}
              >
                <ProductImage product={c} />
                <span>{c.colour}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <div className="hc-detail-grid hc-section">
        <section>
          <h2>Technical specification</h2>
          <table className="hc-spec-table">
            <caption>
              Manufacturer-listed information · checked {p.verifiedAt}
            </caption>
            <tbody>
              {Object.entries(p.specs).map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v || UNKNOWN_SPEC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>For your specification</h2>
          <p>
            <strong>Applications:</strong> {p.applications.join(", ")}
          </p>
          <p>
            <strong>Compatibility:</strong> {p.compatibility}
          </p>
          <ul>
            {p.limitations.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <h3>Supplier documents</h3>
          {p.documents.length ? (
            <ul>
              {p.documents.map((d) => (
                <li key={d.url}>
                  <a href={d.url} target="_blank" rel="noreferrer">
                    {d.title} ↗
                  </a>
                  <span className="hc-small">
                    {" "}
                    ·{" "}
                    {d.type === "certificate"
                      ? "Certificate — check scope"
                      : "Manufacturer information, not an independent certificate"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>{UNKNOWN_SPEC}</p>
          )}
          <details>
            <summary>Sources & verification</summary>
            <ul>
              {p.sources.map((s, i) => (
                <li key={s}>
                  <a href={s} target="_blank" rel="noreferrer">
                    Official {p.supplier} source {i + 1} ↗
                  </a>
                </li>
              ))}
            </ul>
            <p>
              Verified product record. Trade supply and project approval are
              separate checks. Supplier imagery used with permission confirmed
              by Apex.
            </p>
          </details>
        </section>
      </div>
      <dialog
        ref={dialog}
        className="hc-zoom"
        aria-label={`${p.name} supplier image`}
        onClose={() => setZoom(false)}
      >
        <button className="hc-button" onClick={() => dialog.current?.close()}>
          Close image
        </button>
        {zoom && p.images[0] && (
          <Image
            src={p.images[0].src}
            width={1200}
            height={900}
            sizes="90vw"
            alt={p.images[0].alt}
          />
        )}
        <p>
          {p.images[0]?.alt}. Enlargement is limited by the supplier original.
        </p>
      </dialog>
      <p>
        <Link href={`${HEALTHCARE_ROOT}/quotation`} className="hc-button">
          Review your project & enquire →
        </Link>
      </p>
    </>
  );
}
