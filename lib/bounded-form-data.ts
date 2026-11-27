export class FormDataReadError extends Error {
  constructor(public status: number) {
    super("The enquiry form could not be read.");
  }
}

export async function readBoundedFormData(req: Request, limit: number) {
  const declaredLength = Number(req.headers.get("content-length"));
  if (declaredLength > limit) throw new FormDataReadError(413);
  const reader = req.body?.getReader();
  if (!reader) throw new FormDataReadError(400);

  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > limit) {
      await reader.cancel();
      throw new FormDataReadError(413);
    }
    chunks.push(value);
  }

  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.length;
  }

  try {
    return await new Response(body, {
      headers: { "Content-Type": req.headers.get("content-type") ?? "" },
    }).formData();
  } catch {
    throw new FormDataReadError(400);
  }
}
