import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import sharp from "sharp";
import {
  catalogue,
  publishedProducts,
  isPublishable,
} from "../lib/healthcare/catalogue";
import {
  enquirySchema,
  snapshotItems,
  boundedFormData,
  MAX_REQUEST_BYTES,
} from "../lib/healthcare/enquiry";
import { validateUploads } from "../lib/healthcare/uploads";
import { validateCatalogue, parseCsv } from "./healthcare-catalogue";
import { POST } from "../app/api/healthcare/enquiries/route";

let db: PGlite;
const originalFetch = globalThis.fetch;
let mailCalls = 0,
  failMail = false,
  failUpload = false;
const storedFiles = new Map<string, unknown>();
const example = {
  requestId: randomUUID(),
  company: "Apex QA practice",
  name: "Test contact",
  email: "qa@example.test",
  phone: "08007720367",
  postcode: "B1 1AA",
  facility: "Dental practice",
  categories: ["Clinical roller blinds"],
  rooms: "2",
  dimensions: "120 cm wide",
  quantity: "2",
  service: "Supply and installation",
  preferredProduct: "",
  existingTrack: "",
  timescale: "Planning",
  requirements: "Synthetic local test — no customer data",
  previousReference: "",
  retainSpecification: true,
  privacyAccepted: true,
  website: "",
  items: [{ id: "louvolite-ex-lite-slate", quantity: 2, sample: false }],
};
async function begin(id: string, fingerprint = "test", rate = randomUUID()) {
  return (
    await db.query<{
      result: { reference?: string; complete?: boolean; error?: string };
    }>("select public.healthcare_begin_enquiry($1,$2,$3,$4,$5) as result", [
      id,
      fingerprint,
      {},
      rate,
      randomUUID(),
    ])
  ).rows[0].result;
}
before(async () => {
  db = new PGlite();
  await db.exec(
    "create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create table auth.users(id uuid primary key); create schema storage; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);",
  );
  await db.exec(
    readFileSync(
      "supabase/migrations/20261111083340_healthcare_enquiries.sql",
      "utf8",
    ),
  );
  process.env.HEALTHCARE_SUPABASE_URL = "https://healthcare.test";
  process.env.HEALTHCARE_SUPABASE_SERVICE_ROLE_KEY = "synthetic-local-test-key";
  process.env.RESEND_API_KEY = "re_synthetic_local_test";
  globalThis.fetch = async (input, init) => {
    const url = new URL(
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url,
    );
    const method = init?.method || "GET";
    if (url.hostname === "api.resend.com") {
      mailCalls++;
      assert.equal(
        new Headers(init?.headers)
          .get("idempotency-key")
          ?.startsWith("healthcare-"),
        true,
      );
      return Response.json(
        failMail
          ? { name: "application_error", message: "test rejection" }
          : { id: "local-provider-id" },
        { status: failMail ? 500 : 200 },
      );
    }
    assert.equal(
      url.hostname,
      "healthcare.test",
      "Tests must never contact a real backend",
    );
    if (url.pathname.includes("/storage/v1/object/")) {
      if (failUpload)
        return Response.json(
          {
            message: "test upload failure",
            statusCode: 503,
            error: "unavailable",
          },
          { status: 503 },
        );
      storedFiles.set(url.pathname, init?.body);
      return Response.json({ Key: url.pathname });
    }
    const body = typeof init?.body === "string" ? JSON.parse(init.body) : {};
    if (url.pathname.endsWith("/rpc/healthcare_begin_enquiry")) {
      const r = await db.query<Record<string, unknown>>(
        "select public.healthcare_begin_enquiry($1,$2,$3,$4,$5) result",
        [
          body.p_id,
          body.p_fingerprint,
          body.p_data,
          body.p_rate_key,
          body.p_ip_key,
        ],
      );
      return Response.json(r.rows[0].result);
    }
    if (url.pathname.endsWith("/rpc/healthcare_claim_notification")) {
      const r = await db.query<Record<string, unknown>>(
        "select public.healthcare_claim_notification($1) result",
        [body.p_id],
      );
      return Response.json(r.rows[0].result);
    }
    if (url.pathname.endsWith("/healthcare_enquiries")) {
      const id = url.searchParams.get("id")?.replace(/^eq\./, "");
      if (method === "PATCH") {
        const keys = Object.keys(body);
        await db.query<Record<string, unknown>>(
          `update public.healthcare_enquiries set ${keys.map((k, i) => `"${k}"=$${i + 1}`).join(",")} where id=$${keys.length + 1}`,
          [...Object.values(body), id],
        );
        return new Response(null, { status: 204 });
      }
      const r = await db.query<Record<string, unknown>>(
        "select * from public.healthcare_enquiries where id=$1",
        [id],
      );
      return Response.json(r.rows[0] || null);
    }
    if (url.pathname.endsWith("/healthcare_enquiry_files")) {
      await db.query<Record<string, unknown>>(
        "insert into public.healthcare_enquiry_files(enquiry_id,path,name,mime_type,size) values($1,$2,$3,$4,$5) on conflict(path) do nothing",
        [body.enquiry_id, body.path, body.name, body.mime_type, body.size],
      );
      return new Response(null, { status: 201 });
    }
    throw new Error(`Unexpected local test request: ${url.pathname}`);
  };
});
after(async () => {
  globalThis.fetch = originalFetch;
  await db.close();
});
function request(data = example, file?: File) {
  const form = new FormData();
  for (const [k, v] of Object.entries(data)) {
    if (k === "categories") for (const c of v as string[]) form.append(k, c);
    else if (k === "items") form.set(k, JSON.stringify(v));
    else if (typeof v === "boolean") {
      if (v) form.set(k, "on");
    } else form.set(k, String(v));
  }
  if (file) form.append("files", file);
  return new Request("https://www.apexcurtains.com/api/healthcare/enquiries", {
    method: "POST",
    body: form,
    headers: { origin: "https://www.apexcurtains.com" },
  });
}

test("catalogue publication needs source, permission and an existing matched image", () => {
  assert.equal(validateCatalogue(catalogue).length, 78);
  assert.equal(publishedProducts.length, 28);
  assert.equal(
    catalogue.filter((p) => p.supplier === "Behrens" && isPublishable(p))
      .length,
    0,
  );
  const p = structuredClone(publishedProducts[0]);
  p.images[0].permission = "pending";
  assert.equal(isPublishable(p), false);
  assert.throws(() => validateCatalogue([p]));
  assert.equal(
    publishedProducts.filter(
      (p) =>
        p.supplier === "Panaz" &&
        p.properties.includes("ShieldPlus antimicrobial"),
    ).length,
    2,
  );
});
test("authorised CSV importer handles quoted commas, newlines and escaped quotes", () => {
  assert.deepEqual(
    parseCsv('name,description\r\n"Sample","Line 1, yes\nLine ""2"""\r\n'),
    [{ name: "Sample", description: 'Line 1, yes\nLine "2"' }],
  );
  assert.throws(() => parseCsv('a,b\n"missing,quote'));
});
test("enquiries reject incomplete, spam and unpublished product selections", () => {
  assert.equal(enquirySchema.safeParse(example).success, true);
  assert.equal(
    enquirySchema.safeParse({ ...example, categories: [] }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...example, website: "spam" }).success,
    false,
  );
  assert.throws(() =>
    snapshotItems([{ id: "behrens-e-b-375", quantity: 1, sample: false }]),
  );
  assert.equal(snapshotItems(example.items)[0].reference, "1022974");
});
test("upload verification strips metadata and rejects spoofed and active files", async () => {
  const jpeg = await sharp({
    create: { width: 10, height: 10, channels: 3, background: "white" },
  })
    .jpeg()
    .withMetadata()
    .toBuffer();
  const f = new FormData();
  f.append(
    "files",
    new File([new Uint8Array(jpeg)], "../../personal-name.jpg", {
      type: "image/jpeg",
    }),
  );
  const [clean] = await validateUploads(f);
  assert.equal(clean.name, "document-1.jpg");
  assert.equal((await sharp(clean.bytes).metadata()).exif, undefined);
  const bad = new FormData();
  bad.append(
    "files",
    new File(["<script>"], "image.jpg", { type: "image/jpeg" }),
  );
  await assert.rejects(() => validateUploads(bad));
  const pdf = new FormData();
  pdf.append(
    "files",
    new File(["%PDF-1.7\n/JavaScript evil\n%%EOF"], "plan.pdf", {
      type: "application/pdf",
    }),
  );
  await assert.rejects(() => validateUploads(pdf));
});
test("request body limit applies even without content-length", async () => {
  const req = new Request("https://example.test", {
    method: "POST",
    headers: { "content-type": "multipart/form-data; boundary=x" },
    body: new Uint8Array(MAX_REQUEST_BYTES + 1),
  });
  await assert.rejects(() => boundedFormData(req), /3 MB/);
});
test("database migration enforces private tables and service-only RPCs", async () => {
  await db.exec("set role anon");
  await assert.rejects(
    () =>
      db.query<Record<string, unknown>>(
        "select * from public.healthcare_enquiries",
      ),
    /permission denied/,
  );
  await assert.rejects(() => begin(randomUUID()), /permission denied/);
  await db.exec("reset role");
  const r = await db.query<{ public: boolean }>(
    "select public from storage.buckets where id='healthcare-enquiries'",
  );
  assert.equal(r.rows[0].public, false);
});
test("database idempotency, processing lease and per-email throttling", async () => {
  const id = randomUUID();
  assert.ok((await begin(id)).reference);
  assert.equal((await begin(id)).error, "BUSY");
  assert.equal((await begin(id, "changed")).error, "CONFLICT");
  await db.query<Record<string, unknown>>(
    "update public.healthcare_enquiries set status='received' where id=$1",
    [id],
  );
  assert.equal((await begin(id)).complete, true);
  const key = randomUUID();
  for (let i = 0; i < 5; i++)
    assert.ok((await begin(randomUUID(), "x", key)).reference);
  assert.equal((await begin(randomUUID(), "x", key)).error, "RATE_LIMIT");
});
test("real submission handler stores product snapshot and sends one notification across retries", async () => {
  mailCalls = 0;
  const first = await POST(request());
  assert.equal(first.status, 200, await first.clone().text());
  const result = await first.json();
  assert.ok(result.reference.startsWith("AH-"));
  const second = await POST(request());
  assert.equal(second.status, 200);
  assert.equal((await second.json()).reference, result.reference);
  assert.equal(mailCalls, 1);
  const row = (
    await db.query<{ data: typeof example; notification_status: string }>(
      "select data,notification_status from public.healthcare_enquiries where id=$1",
      [example.requestId],
    )
  ).rows[0];
  assert.equal(row.data.items[0].quantity, 2);
  assert.equal(row.notification_status, "sent");
});
test("email provider failure never loses a saved lead and can retry idempotently", async () => {
  failMail = true;
  const data = {
    ...example,
    requestId: randomUUID(),
    email: "retry@example.test",
  };
  const response = await POST(request(data));
  assert.equal(response.status, 200);
  assert.equal(
    (
      await db.query<Record<string, unknown>>(
        "select notification_status from public.healthcare_enquiries where id=$1",
        [data.requestId],
      )
    ).rows[0].notification_status,
    "failed",
  );
  failMail = false;
  assert.equal((await POST(request(data))).status, 200);
  assert.equal(
    (
      await db.query<Record<string, unknown>>(
        "select notification_status from public.healthcare_enquiries where id=$1",
        [data.requestId],
      )
    ).rows[0].notification_status,
    "sent",
  );
});
test("unconfigured email preserves the lead without starting the provider retry window", async () => {
  const key = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  const data = { ...example, requestId: randomUUID(), email: "unconfigured@example.test" };
  try {
    assert.equal((await POST(request(data))).status, 200);
    const row = (await db.query<Record<string, unknown>>(
      "select notification_status,notification_first_attempt_at from public.healthcare_enquiries where id=$1", [data.requestId],
    )).rows[0];
    assert.equal(row.notification_status, "failed");
    assert.equal(row.notification_first_attempt_at, null);
  } finally {
    process.env.RESEND_API_KEY = key;
  }
  assert.equal((await POST(request(data))).status, 200);
  assert.equal((await db.query<Record<string, unknown>>(
    "select notification_status from public.healthcare_enquiries where id=$1", [data.requestId],
  )).rows[0].notification_status, "sent");
});

test("upload failure is recoverable without duplicate enquiry or notification", async () => {
  const data = {
    ...example,
    requestId: randomUUID(),
    email: "upload@example.test",
  };
  const jpeg = await sharp({
    create: { width: 5, height: 5, channels: 3, background: "white" },
  })
    .jpeg()
    .toBuffer();
  const file = new File([new Uint8Array(jpeg)], "test.jpg", {
    type: "image/jpeg",
  });
  failUpload = true;
  const failed = await POST(request(data, file));
  assert.equal(failed.status, 503);
  failUpload = false;
  const saved = await POST(request(data, file));
  assert.equal(saved.status, 200, await saved.clone().text());
  assert.equal(
    (
      await db.query<Record<string, unknown>>(
        "select count(*)::int count from public.healthcare_enquiry_files where enquiry_id=$1",
        [data.requestId],
      )
    ).rows[0].count,
    1,
  );
  assert.ok(storedFiles.size > 0);
});
test("cross-site requests and forged references cannot create leads", async () => {
  const cross = request({ ...example, requestId: randomUUID() });
  cross.headers.set("origin", "https://other.test");
  assert.equal((await POST(cross)).status, 403);
  const forged = request({
    ...example,
    requestId: randomUUID(),
    items: [{ id: "unpublished", quantity: 1, sample: false }],
  });
  assert.equal((await POST(forged)).status, 400);
});
test("ambiguous email attempts are held after the provider idempotency window", async () => {
  const id = randomUUID();
  await begin(id);
  await db.query<Record<string, unknown>>(
    "update public.healthcare_enquiries set status='received',notification_status='failed',notification_first_attempt_at=now()-interval '25 hours' where id=$1",
    [id],
  );
  assert.equal(
    (
      await db.query<Record<string, unknown>>(
        "select public.healthcare_claim_notification($1) result",
        [id],
      )
    ).rows[0].result,
    false,
  );
  assert.equal(
    (
      await db.query<Record<string, unknown>>(
        "select notification_status from public.healthcare_enquiries where id=$1",
        [id],
      )
    ).rows[0].notification_status,
    "uncertain",
  );
});
