import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import sharp from "sharp";
import { sampleJob, checklist } from "../lib/atelier/model";

// Explicitly opt in: creates and removes a disposable, fictitious fixture. Never sends email.
if (process.env.ATELIER_INTEGRATION !== "1")
  throw new Error(
    "Set ATELIER_INTEGRATION=1 to run the temporary fixture test.",
  );
process.loadEnvFile(".env.local");
const base = process.env.ATELIER_TEST_URL || "http://127.0.0.1:3015";
const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
const password = randomUUID() + randomUUID(),
  email = `atelier-qa-${randomUUID()}@example.invalid`;
let userId: string | undefined, jobId: string | undefined;
const storagePaths: string[] = [];
const jar = new Map<string, string>();
const auth = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll: () => [...jar].map(([name, value]) => ({ name, value })),
      setAll: (items) => items.forEach((c) => jar.set(c.name, c.value)),
    },
  },
);
async function call(
  path: string,
  method = "GET",
  body?: unknown,
  status = 200,
  anonymous = false,
) {
  const headers: Record<string, string> = { Origin: base };
  if (!anonymous)
    headers.Cookie = [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
  if (body && !(body instanceof FormData))
    headers["Content-Type"] = "application/json";
  const r = await fetch(base + path, {
    method,
    headers,
    body:
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });
  assert.equal(
    r.status,
    status,
    `${method} ${path}: expected ${status}, received ${r.status} ${r.status !== status ? await r.text() : ""}`,
  );
  return r;
}
try {
  await call("/api/atelier/jobs", "GET", undefined, 401, true);
  const created = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (created.error) throw created.error;
  userId = created.data.user.id;
  const login = await auth.auth.signInWithPassword({ email, password });
  if (login.error) throw login.error;
  await call("/api/atelier/jobs", "GET", undefined, 403);
  const membership = await db
    .from("apex_atelier_staff")
    .insert({ user_id: userId });
  if (membership.error) throw membership.error;
  const data = sampleJob().data;
  data.title = "Disposable Atelier integration fixture";
  data.customerEmail = "client@example.invalid";
  data.workshopEmail = "workroom@example.invalid";
  data.fitterEmail = "fitter@example.invalid";
  let job = (await (await call("/api/atelier/jobs", "POST", data, 201)).json())
    .job;
  jobId = job.id;
  await call(`/api/atelier/jobs/${jobId}/send`, "POST", {}, 409);
  await call(
    `/api/atelier/jobs/${jobId}/approve`,
    "POST",
    { version: job.version },
    422,
  );
  const anonymousDb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const leaked = await anonymousDb
    .from("apex_atelier_jobs")
    .select("id")
    .eq("id", jobId);
  assert.ok(leaked.error || !leaked.data?.length);
  const photo = await sharp({
    create: { width: 400, height: 300, channels: 3, background: "#ddd3bd" },
  })
    .jpeg()
    .toBuffer();
  const assetIds: string[] = [];
  for (const w of data.windows) {
    const form = new FormData();
    form.set("file", new Blob([photo], { type: "image/jpeg" }), "fixture.jpg");
    form.set("windowId", w.id);
    form.set("kind", "window");
    form.set("caption", "Temporary test image");
    const asset = (
      await (
        await call(`/api/atelier/jobs/${jobId}/photos`, "POST", form)
      ).json()
    ).asset;
    storagePaths.push(asset.path);
    assetIds.push(asset.id);
    w.measuredConfirmed = true;
    w.careInstructions =
      "Use only the care method confirmed by the fabric and lining supplier. Test fixture instructions.";
    w.careSource = "Fixture supplier record";
  }
  await call(`/api/atelier/photos/${assetIds[0]}`, "GET", undefined, 401, true);
  const photoResponse = await call(`/api/atelier/photos/${assetIds[0]}`);
  assert.equal(photoResponse.headers.get("content-type"), "image/jpeg");
  data.choicesConfirmed = true;
  data.workroomConfirmed = true;
  const originalVersion = job.version;
  job = (
    await (
      await call(`/api/atelier/jobs/${jobId}`, "PUT", {
        version: job.version,
        data,
      })
    ).json()
  ).job;
  await call(
    `/api/atelier/jobs/${jobId}`,
    "PUT",
    { version: originalVersion, data },
    409,
  );
  const hostile = await fetch(base + `/api/atelier/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      Origin: "https://unrelated.example",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version: job.version, data }),
  });
  assert.equal(hostile.status, 403);
  job = (
    await (
      await call(`/api/atelier/jobs/${jobId}/approve`, "POST", {
        version: job.version,
      })
    ).json()
  ).job;
  assert.equal(job.approved_version, job.version);
  await call(`/api/atelier/jobs/${jobId}/approve`, "POST", {
    version: job.version,
  });
  const revision = await db
    .from("apex_atelier_revisions")
    .select("*")
    .eq("job_id", jobId);
  assert.equal(revision.data?.length, 1);
  const queues = await db
    .from("apex_atelier_deliveries")
    .select("kind,recipient,status")
    .eq("job_id", jobId);
  assert.equal(queues.data?.length, 3);
  assert.ok(queues.data?.every((d) => d.status === "pending"));
  await mkdir(".next/atelier-qa", { recursive: true });
  for (const kind of ["brochure", "workroom", "fitter"]) {
    const pdf = await call(`/api/atelier/jobs/${jobId}/documents/${kind}`);
    assert.ok(pdf.headers.get("content-type")?.includes("application/pdf"));
    const bytes = Buffer.from(await pdf.arrayBuffer());
    assert.equal(bytes.subarray(0, 4).toString(), "%PDF");
    await writeFile(`.next/atelier-qa/integration-${kind}.pdf`, bytes);
  }
  await call(
    `/api/atelier/jobs/${jobId}/completion`,
    "PUT",
    { checks: {}, complete: true },
    400,
  );
  job = (
    await (
      await call(`/api/atelier/jobs/${jobId}/completion`, "PUT", {
        checks: Object.fromEntries(checklist(data).map((c) => [c, true])),
        complete: true,
      })
    ).json()
  ).job;
  assert.equal(job.status, "complete");
  const changed = { ...data, title: "Fixture revised" };
  job = (
    await (
      await call(`/api/atelier/jobs/${jobId}`, "PUT", {
        version: job.version,
        data: changed,
      })
    ).json()
  ).job;
  assert.equal(job.status, "draft");
  await call(`/api/atelier/jobs/${jobId}/send`, "POST", {}, 409);
  const immutable = await db
    .from("apex_atelier_revisions")
    .select("data")
    .eq("job_id", jobId)
    .single();
  assert.equal(immutable.data?.data.title, data.title);
  console.log(
    "PASS: anonymous and non-staff denial, private photos, save/reload, optimistic concurrency, origin checks, approval validation, immutable revision, exactly three email queues, three PDF endpoints, handover and revision invalidation. No email sent.",
  );
} finally {
  if (storagePaths.length) {
    const r = await db.storage.from("apex-atelier").remove(storagePaths);
    if (r.error) console.error("Fixture storage cleanup failed");
  }
  if (jobId) {
    const r = await db.from("apex_atelier_jobs").delete().eq("id", jobId);
    if (r.error) console.error("Fixture job cleanup failed");
  }
  if (userId) {
    const r = await db.auth.admin.deleteUser(userId);
    if (r.error) console.error("Fixture user cleanup failed");
  }
  console.log("Disposable fixture cleanup finished.");
}
