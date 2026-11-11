import sharp from "sharp";
import { createHash } from "node:crypto";
import { EnquiryError, MAX_UPLOAD_BYTES } from "./enquiry";
export type CleanUpload = {
  name: string;
  type: string;
  bytes: Buffer;
  digest: string;
};
export async function validateUploads(form: FormData): Promise<CleanUpload[]> {
  const files = form
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);
  if (
    files.length > 3 ||
    files.reduce((n, f) => n + f.size, 0) > MAX_UPLOAD_BYTES
  )
    throw new EnquiryError(
      "Choose up to three files, totalling no more than 3 MB.",
      413,
    );
  return Promise.all(
    files.map(async (file, index) => {
      let bytes = Buffer.from(await file.arrayBuffer());
      let type = file.type;
      let extension = "";
      if (
        (type === "image/jpeg" &&
          bytes[0] === 0xff &&
          bytes[1] === 0xd8 &&
          bytes[2] === 0xff) ||
        (type === "image/png" &&
          bytes
            .subarray(0, 8)
            .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
      ) {
        try {
          bytes = await sharp(bytes, {
            limitInputPixels: 24000000,
            animated: false,
          })
            .rotate()
            .resize({
              width: 2400,
              height: 2400,
              fit: "inside",
              withoutEnlargement: true,
            })
            .jpeg({ quality: 85 })
            .toBuffer();
        } catch {
          throw new EnquiryError(
            "An image could not be read. Please export it as a standard JPEG or PNG.",
          );
        }
        type = "image/jpeg";
        extension = "jpg";
      } else if (
        type === "application/pdf" &&
        bytes.subarray(0, 5).toString() === "%PDF-" &&
        bytes
          .subarray(Math.max(0, bytes.length - 1024))
          .includes(Buffer.from("%%EOF"))
      ) {
        // PDFs remain private, untrusted attachments; never rendered inline or emailed.
        if (
          /\/(JavaScript|JS|Launch|EmbeddedFile|OpenAction|AA|RichMedia|Encrypt)\b/i.test(
            bytes.toString("latin1"),
          )
        )
          throw new EnquiryError(
            "Please export a plain, unencrypted PDF without scripts or embedded files.",
          );
        extension = "pdf";
      } else
        throw new EnquiryError(
          "Upload valid PDF, JPEG or PNG files only. The file contents must match the format.",
        );
      return {
        name: `document-${index + 1}.${extension}`,
        type,
        bytes,
        digest: createHash("sha256").update(bytes).digest("hex"),
      };
    }),
  );
}
