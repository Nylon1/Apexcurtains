import { z } from "zod";
import records from "./products.json";

export const HEALTHCARE_ROOT = "/professionals/healthcare";
export const UNKNOWN_SPEC = "Specification available on request";
const httpsUrl = z
  .url()
  .refine((v) => v.startsWith("https://"), "Use an HTTPS source");
export const productSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  supplier: z.enum(["Panaz", "Forest", "Louvolite", "Behrens"]),
  category: z.enum(["reusable", "tracks", "blinds", "disposable"]),
  collection: z.string().min(1),
  name: z.string().min(1),
  reference: z.string().min(1),
  description: z.string().min(1),
  colour: z.string(),
  colourReference: z.string(),
  colourFamily: z.string(),
  pattern: z.string(),
  curtainType: z.string(),
  properties: z.array(z.string()),
  applications: z.array(z.string()).min(1),
  specs: z.record(z.string(), z.string().nullable()),
  images: z.array(
    z.object({
      src: z
        .string()
        .regex(/^\/healthcare\/[a-z0-9/_.-]+$/)
        .refine(
          (v) => !v.split("/").includes(".."),
          "Image paths must stay inside healthcare assets",
        ),
      alt: z.string().min(8),
      source: httpsUrl,
      permission: z.enum(["owner-confirmed", "supplier-licence", "pending"]),
      permissionEvidence: z.string().min(1),
      kind: z.enum(["swatch", "product", "supplier-roomset", "basecloth"]),
    }),
  ),
  documents: z.array(
    z.object({
      title: z.string(),
      url: httpsUrl,
      type: z.enum(["technical-data", "certificate", "care", "catalogue"]),
    }),
  ),
  sources: z.array(httpsUrl).min(1),
  verifiedAt: z.iso.date(),
  status: z.enum([
    "verified-published",
    "awaiting-technical-confirmation",
    "awaiting-image-permission",
    "incomplete",
    "retired",
  ]),
  supplyStatus: z.string(),
  compatibility: z.string(),
  limitations: z.array(z.string()),
});
export type HealthcareProduct = z.infer<typeof productSchema>;
export const catalogue = z.array(productSchema).parse(records);
export function isPublishable(p: HealthcareProduct) {
  return (
    p.status === "verified-published" &&
    p.sources.length > 0 &&
    Object.values(p.specs).some((value) => Boolean(value?.trim())) &&
    p.images.length > 0 &&
    p.images.every((i) => i.permission !== "pending" && !!i.permissionEvidence)
  );
}
export const publishedProducts = catalogue.filter(isPublishable);
export function productUrl(p: Pick<HealthcareProduct, "id">) {
  return `${HEALTHCARE_ROOT}/products/${p.id}`;
}
export function getProduct(id: string) {
  return publishedProducts.find((p) => p.id === id);
}
export const categories = [
  {
    id: "reusable",
    slug: "reusable-curtains",
    title: "Reusable clinical curtains",
    supplier: "Made by Apex · Panaz fabrics",
    text: "Bespoke privacy curtains, made in our workroom around your room, track and care requirements.",
  },
  {
    id: "tracks",
    slug: "medical-tracks",
    title: "Medical curtain tracks",
    supplier: "Forest MTS",
    text: "Straight and curved screening layouts, with the fixings, carriers and support designed together.",
  },
  {
    id: "blinds",
    slug: "roller-blinds",
    title: "Clinical roller blinds",
    supplier: "Louvolite Ex-Lite",
    text: "A considered starting range for light control: wipe-clean blackout fabric in thirteen colours.",
  },
  {
    id: "disposable",
    slug: "disposable-curtains",
    title: "Disposable clinical curtains",
    supplier: "Behrens Healthcare",
    text: "Standard and bespoke supply, with heading checks and a replacement service built around your facility.",
  },
] as const;
