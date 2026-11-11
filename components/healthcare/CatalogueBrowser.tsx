"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  type HealthcareProduct,
  productUrl,
  UNKNOWN_SPEC,
} from "@/lib/healthcare/catalogue";
import { AddSelection } from "./Shortlist";

export function ProductImage({
  product,
  large = false,
}: {
  product: HealthcareProduct;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const asset = product.images[0];
  if (!asset || failed)
    return (
      <div className="hc-missing">
        Product photograph unavailable. Please request a sample.
      </div>
    );
  return (
    <div
      className={`hc-product-image ${asset.kind === "basecloth" ? "hc-basecloth" : ""}`}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={
          large
            ? "(max-width: 800px) 90vw, 50vw"
            : "(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
        }
        onError={() => setFailed(true)}
      />
      {asset.kind === "basecloth" && (
        <span className="hc-image-caption">
          Base-cloth texture · supplier photograph
        </span>
      )}
    </div>
  );
}
export default function CatalogueBrowser({
  products,
  fabrics = false,
}: {
  products: HealthcareProduct[];
  fabrics?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [compare, setCompare] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const fields = [
    { key: "colourFamily", label: "Colour" },
    { key: "collection", label: "Collection" },
    { key: "pattern", label: "Pattern" },
    { key: "curtainType", label: "Type" },
    { key: "properties", label: "Property" },
  ] as const;
  const matches = products.filter(
    (p) =>
      `${p.name} ${p.reference} ${p.colour} ${p.supplier}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      fields.every(
        (f) =>
          !filters[f.key] ||
          (f.key === "properties"
            ? p.properties.includes(filters[f.key])
            : p[f.key] === filters[f.key]),
      ),
  );
  const compared = products.filter((p) => compare.includes(p.id));
  return (
    <div className="hc-browser">
      <div className="hc-filterbar">
        <label className="hc-search">
          Search {fabrics ? "fabrics" : "products"}
          <input
            type="search"
            placeholder="Name, colour or reference"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        {fields.map((f) => (
          <label key={f.key}>
            {f.label}
            <select
              value={filters[f.key] || ""}
              onChange={(e) =>
                setFilters({ ...filters, [f.key]: e.target.value })
              }
            >
              <option value="">
                All{" "}
                {f.key === "properties"
                  ? "properties"
                  : `${f.label.toLowerCase()}s`}
              </option>
              {[
                ...new Set(
                  products.flatMap((p) =>
                    f.key === "properties" ? p.properties : [p[f.key]],
                  ),
                ),
              ]
                .sort()
                .map((v) => (
                  <option key={v}>{v}</option>
                ))}
            </select>
          </label>
        ))}
        <button
          className="hc-text-button"
          onClick={() => {
            setQuery("");
            setFilters({});
          }}
        >
          Reset filters
        </button>
      </div>
      <p className="hc-small" role="status">
        {matches.length} verified {matches.length === 1 ? "record" : "records"}
        {fabrics
          ? " · base cloths; printed colourways awaiting supplier confirmation"
          : ""}
      </p>
      <h2 className="hc-sr-only">Verified product collection</h2>
      <div className="hc-product-grid">
        {matches.map((p) => (
          <article className="hc-product-card" key={p.id}>
            <Link href={productUrl(p)}>
              <ProductImage product={p} />
            </Link>
            <div className="hc-card-copy">
              <p className="hc-eyebrow">
                {p.supplier} · {p.reference}
              </p>
              <h3>
                <Link href={productUrl(p)}>{p.name}</Link>
              </h3>
              <p className="hc-small">
                {p.colour} · {p.curtainType}
              </p>
              <p>{p.description}</p>
              <div className="hc-actions">
                <AddSelection id={p.id} />
                <Link className="hc-text-link" href={productUrl(p)}>
                  View details →
                </Link>
              </div>
              <label className="hc-check">
                <input
                  type="checkbox"
                  checked={compare.includes(p.id)}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      setCompare(compare.filter((id) => id !== p.id));
                      setMessage("");
                    } else if (compare.length < 4)
                      setCompare([...compare, p.id]);
                    else
                      setMessage(
                        "Compare up to four products. Remove one to choose another.",
                      );
                  }}
                />{" "}
                Compare
              </label>
            </div>
          </article>
        ))}
      </div>
      {matches.length === 0 && (
        <div className="hc-note">
          No matching verified products. Reset the filters or tell us what your
          project needs in the quotation form.
        </div>
      )}
      <p role="status">{message}</p>
      {compared.length > 0 && (
        <section className="hc-comparison" aria-label="Product comparison">
          <h2>Compare your selections</h2>
          <p>
            Compare up to four. Unconfirmed information remains available on
            request.
          </p>
          <div
            className="hc-table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Scrollable comparison table"
          >
            <table>
              <caption className="hc-sr-only">
                Selected product specifications
              </caption>
              <thead>
                <tr>
                  <th scope="col">Specification</th>
                  {compared.map((p) => (
                    <th scope="col" key={p.id}>
                      {p.name}
                      <button
                        className="hc-text-button"
                        aria-label={`Remove ${p.name} from comparison`}
                        onClick={() =>
                          setCompare(compare.filter((id) => id !== p.id))
                        }
                      >
                        Remove
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "Supplier",
                  "Reference",
                  "Colour",
                  "Width",
                  "Composition",
                  "Weight",
                  "Fire performance",
                  "Care",
                ].map((key) => (
                  <tr key={key}>
                    <th scope="row">{key}</th>
                    {compared.map((p) => (
                      <td key={p.id}>
                        {key === "Supplier"
                          ? p.supplier
                          : key === "Reference"
                            ? p.reference
                            : key === "Colour"
                              ? p.colour
                              : p.specs[key] || UNKNOWN_SPEC}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
