// Authorised local data only. This tool never fetches or scrapes supplier sites.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  productSchema,
  isPublishable,
  catalogue,
} from "../lib/healthcare/catalogue";
import { z } from "zod";

export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [],
    field = "",
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"';
        i++;
      } else quoted = !quoted;
    } else if (c === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (quoted) throw new Error("Unclosed CSV quote");
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const header = rows.shift();
  if (!header || new Set(header).size !== header.length)
    throw new Error("CSV needs unique column headers");
  return rows.map((values, n) => {
    if (values.length !== header.length)
      throw new Error(`CSV row ${n + 2} has the wrong column count`);
    return Object.fromEntries(
      header.map((h, i) => [h.replace(/^\uFEFF/, ""), values[i]]),
    );
  });
}
export function validateCatalogue(input: unknown) {
  const products = z.array(productSchema).parse(input);
  const ids = new Set<string>();
  for (const p of products) {
    if (ids.has(p.id)) throw new Error(`Duplicate ID: ${p.id}`);
    ids.add(p.id);
    if (p.status === "verified-published" && !isPublishable(p))
      throw new Error(`Publication evidence/image permission missing: ${p.id}`);
    for (const i of p.images) {
      if (!existsSync(resolve("public", i.src.slice(1))))
        throw new Error(`Missing local asset: ${i.src}`);
    }
    if (p.verifiedAt > new Date().toISOString().slice(0, 10))
      throw new Error(`Future verification date: ${p.id}`);
  }
  return products;
}
if (
  process.argv[1]?.replaceAll("\\", "/").endsWith("healthcare-catalogue.ts")
) {
  const args = process.argv.slice(2);
  const input = args[args.indexOf("--input") + 1];
  const out = args[args.indexOf("--out") + 1];
  let records: unknown = catalogue;
  if (args.includes("--input")) {
    if (!input) throw new Error("Supply --input file.json or file.csv");
    const raw = readFileSync(input, "utf8");
    records = input.endsWith(".csv")
      ? parseCsv(raw).map((row) =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              key,
              [
                "properties",
                "applications",
                "specs",
                "images",
                "documents",
                "sources",
                "limitations",
              ].includes(key)
                ? JSON.parse(value)
                : value,
            ]),
          ),
        )
      : JSON.parse(raw);
  }
  const products = validateCatalogue(records);
  if (args.includes("--out")) {
    if (!out || !args.includes("--input"))
      throw new Error(
        "Use --input with --out. Review the output before replacing catalogue data.",
      );
    if (resolve(out) === resolve("lib/healthcare/products.json"))
      throw new Error(
        "Write a review file, then approve its diff before replacing the catalogue.",
      );
    writeFileSync(out, JSON.stringify(products, null, 2) + "\n");
  }
  console.log(
    JSON.stringify(
      {
        records: products.length,
        published: products.filter(isPublishable).length,
        suppliers: [...new Set(products.map((p) => p.supplier))].map((s) => ({
          supplier: s,
          published: products.filter(
            (p) => p.supplier === s && isPublishable(p),
          ).length,
          held: products.filter((p) => p.supplier === s && !isPublishable(p))
            .length,
        })),
      },
      null,
      2,
    ),
  );
}
