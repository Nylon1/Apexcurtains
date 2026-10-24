/* Photographs are served through the staff-checked asset endpoint. */
/* eslint-disable @next/next/no-img-element */
import {
  palettes,
  lengthLabel,
  type JobData,
  type Asset,
} from "@/lib/atelier/model";
export default function BrochurePreview({
  data,
  assets,
  reference,
}: {
  data: JobData;
  assets: Asset[];
  reference: string;
}) {
  const w = data.windows[0],
    palette = palettes[w.palette];
  const photo = assets.find((a) => a.window_id === w.id && a.kind === "window");
  return (
    <article className="at-brochure">
      <div className="at-brochure-cover">
        <div>
          <span>APEX CURTAINS</span>
          <small>A PERSONAL COLLECTION</small>
          <h2>
            A home,
            <br />
            <em>beautifully considered.</em>
          </h2>
          <p>Prepared for {data.customerName || "your client"}</p>
        </div>
        <img
          src="/visualiser/double-pinch-gable-desktop.webp"
          alt="Apex interior inspiration"
        />
        <small>INTERIOR INSPIRATION · THE APEX COLLECTION</small>
      </div>
      <div className="at-brochure-page">
        <span className="at-eyebrow">EVERY DETAIL, CHOSEN WITH INTENTION</span>
        <h3>{w.room}</h3>
        <p className="at-brochure-intro">
          {w.designNotes ||
            "The fall of a fabric. The warmth of a colour. The way light moves through a window. Thoughtful details bring a room beautifully together."}
        </p>
        {photo && data.photoPermission ? (
          <img
            className="at-brochure-room"
            src={`/api/atelier/photos/${photo.id}`}
            alt={`${w.room} · ${w.name}`}
          />
        ) : null}
        <div className="at-brochure-spec">
          <div>
            <span>YOUR FABRIC</span>
            <b>{w.fabric || "Fabric to be chosen"}</b>
            <p>{w.colour}</p>
          </div>
          <div>
            <span>THE FINISH</span>
            <b>{w.heading}</b>
            <p>{lengthLabel(w)}</p>
          </div>
          <div>
            <span>LINING</span>
            <b>{w.lining}</b>
            <p>{w.liningColour}</p>
          </div>
          <div>
            <span>THE FINAL DETAIL</span>
            <b>{w.tiebacks || "Tiebacks to be chosen"}</b>
            <p>{w.hookColour}</p>
          </div>
        </div>
        <span className="at-eyebrow">COLOUR & INTERIORS</span>
        <h3>A palette to live with.</h3>
        <div className="at-brochure-swatches">
          {palette.colours.map((c, i) => (
            <div key={c}>
              <span style={{ background: c }} />
              <small>{palette.names[i]}</small>
            </div>
          ))}
        </div>
        <p>{palette.advice}</p>
        <p>
          Consider your samples in daylight and evening light. Allow textures to
          add depth, and repeat an accent gently through the room.
        </p>
        <h3>Cared for over time.</h3>
        <p>
          {w.careInstructions ||
            "Your brochure will include care instructions approved for the chosen fabric, lining and trims."}
        </p>
        <div className="at-brochure-voucher">
          <span className="at-eyebrow">WITH OUR THANKS</span>
          <h4>10% off</h4>
          <p>any future order</p>
          <small>APEX10-{reference.replace(/^APX-/, "")}</small>
        </div>
        <p className="at-fine-print">
          This screen previews the first window. The downloadable brochure
          includes every room and window in the collection.
        </p>
      </div>
    </article>
  );
}
