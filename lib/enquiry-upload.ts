// Shared request ceiling: do not treat this as a per-file allowance.
export const MAX_LEAD_BODY_BYTES = 4.5 * 1024 * 1024;

export function guidedPhotoError(file: File): string | undefined {
  if (!/\.(jpe?g|png|webp)$/i.test(file.name) || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return `${file.name}: choose a JPG, PNG or WebP photograph.`;
  }
  if (!file.size) return `${file.name}: this file is empty. Choose another photograph.`;
  if (file.size >= MAX_LEAD_BODY_BYTES) return `${file.name}: this photograph is too large. The total enquiry, including your details, must be under 4.5 MB.`;
}

export function projectFileError(file: File): string | undefined {
  const extensions: Record<string, RegExp> = {
    "image/jpeg": /\.jpe?g$/i, "image/png": /\.png$/i, "application/pdf": /\.pdf$/i,
  };
  if (!extensions[file.type]?.test(file.name)) return `${file.name}: choose a JPEG, PNG or plain, unencrypted PDF.`;
  if (!file.size) return `${file.name}: this file is empty. Choose another file.`;
}

// Measure the browser's multipart envelope too, rather than allowing a file up
// to the request limit and discovering the overhead only after submission.
export async function enquiryBodyTooLarge(body: FormData): Promise<boolean> {
  return (await new Response(body).blob()).size > MAX_LEAD_BODY_BYTES;
}
