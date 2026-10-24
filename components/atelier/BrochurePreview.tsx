/* Photographs are served through the staff-checked asset endpoint. */
/* eslint-disable @next/next/no-img-element */
import { selectedTrack } from "@/lib/atelier/tracks";
import { shapeName } from "@/lib/atelier/geometry";
import {
  selectedFabricPhoto,
  type JobData,
  type Asset,
} from "@/lib/atelier/model";
import {
  customerDetails,
  brochureSpecification,
  brochurePalette,
  roomIntroduction,
  paletteSampleNote,
  generalAftercare,
  type BrochureDetail,
} from "@/lib/atelier/brochure";

function Details({ items }: { items: BrochureDetail[] }) {
  return (
    <dl className="at-brochure-spec">
      {items.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function BrochurePreview({
  data,
  assets,
  reference,
}: {
  data: JobData;
  assets: Asset[];
  reference: string;
}) {
  const [client, address, ...contactDetails] = customerDetails(data);
  return (
    <article
      className="at-brochure"
      aria-label="Your personalised curtain collection"
    >
      <div className="at-brochure-cover">
        <div>
          <span>APEX CURTAINS</span>
          <small>A PERSONAL COLLECTION</small>
          <h2>
            A home,
            <br />
            <em>beautifully considered.</em>
          </h2>
          <p>
            {data.title}
            <br />
            Prepared exclusively for {data.customerName || "you"}
          </p>
        </div>
        <img
          src="/visualiser/double-pinch-gable-desktop.webp"
          alt="Apex interior inspiration"
        />
        <small>INTERIOR INSPIRATION · THE APEX COLLECTION</small>
      </div>
      <section
        className="at-brochure-page at-brochure-dedication"
        aria-label="A dedication to your home"
      >
        <span className="at-eyebrow">AN INDIVIDUAL COMMISSION</span>
        <h3>
          Your home.
          <br />
          <em>Your collection.</em>
        </h3>
        <div className="at-brochure-identity">
          <span className="at-eyebrow">PREPARED EXCLUSIVELY FOR</span>
          <h4>{client.value}</h4>
          <address>{address.value}</address>
        </div>
        <p className="at-brochure-intro">
          A home is made personal by the things chosen with care. This
          collection has been composed for yours, with every fabric, fold and
          finishing touch considered together.
        </p>
        {contactDetails.length ? <Details items={contactDetails} /> : null}
        <p className="at-brochure-signature">
          With warmest wishes,
          <br />
          <em>The Apex Curtains team</em>
        </p>
      </section>
      <section className="at-brochure-page">
        <span className="at-eyebrow">EVERY DETAIL, CHOSEN WITH INTENTION</span>
        <h3>A collection for your home.</h3>
        <p className="at-brochure-intro">
          {data.welcomeNote ||
            "The most inviting rooms are shaped by thoughtful details: the fall of a fabric, the warmth of a colour, the way light moves through a window."}
        </p>
        <p>
          {reference} · {data.windows.length}{" "}
          {data.windows.length === 1 ? "window" : "windows"}, individually
          considered
        </p>
        <ol className="at-brochure-contents">
          {data.windows.map((w) => (
            <li key={w.id}>
              <a href={`#brochure-${w.id}`}>
                <b>{w.room || "Room"}</b>
                <span>
                  {w.name || "Window"} · {shapeName(w)}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>
      {data.windows.map((w, index) => {
        const palette = brochurePalette(w);
        const photo = assets.find(
          (a) => a.window_id === w.id && a.kind === "window",
        );
        const fabric = selectedFabricPhoto(assets, w.id);
        const track = selectedTrack(w);
        return (
          <section
            className="at-brochure-page at-brochure-window"
            id={`brochure-${w.id}`}
            key={w.id}
          >
            <span className="at-eyebrow">
              {String(index + 1).padStart(2, "0")} / {w.name} · {shapeName(w)}
            </span>
            <h3>{w.room || "Your room"}</h3>
            <img
              className="at-brochure-room"
              src={
                photo && data.photoPermission
                  ? `/api/atelier/photos/${photo.id}`
                  : "/visualiser/double-pinch-gable-desktop.webp"
              }
              alt={
                photo && data.photoPermission
                  ? `${w.room} · ${w.name}`
                  : "Apex interior inspiration"
              }
              loading="lazy"
            />
            {!(photo && data.photoPermission) ? (
              <p className="at-fine-print">
                Interior inspiration · not your completed installation
              </p>
            ) : null}
            <p className="at-brochure-intro">{roomIntroduction(w)}</p>
            <span className="at-eyebrow">YOUR CHOSEN DETAILS</span>
            <Details items={brochureSpecification(w)} />
            {w.type === "apex" && w.apexShape === "other" ? (
              <div className="at-custom-shape-notes">
                <span className="at-eyebrow">
                  YOUR WINDOW · RECORDED MEASUREMENTS
                </span>
                <p>{w.otherShapeMeasurements}</p>
              </div>
            ) : null}
            {track ? (
              <figure className="at-brochure-track">
                <img
                  src={track.image}
                  alt={track.name + ", shown in white"}
                  loading="lazy"
                />
                <figcaption>
                  <b>{track.name}</b>
                  <span>
                    Your chosen finish: {w.trackColour || "To be confirmed"}
                  </span>
                  <small>{track.caption} Photograph: Forest Group.</small>
                </figcaption>
              </figure>
            ) : null}
            {fabric ? (
              <figure className="at-brochure-fabric">
                <img
                  src={`/api/atelier/photos/${fabric.id}`}
                  alt={`Chosen fabric: ${w.fabric} in ${w.colour}`}
                  loading="lazy"
                />
                <figcaption>
                  {w.fabric} · {w.colour}
                  <br />
                  {w.fabricCode}
                  <br />
                  Your physical sample is the closest guide to colour and
                  texture.
                </figcaption>
              </figure>
            ) : null}
            <span className="at-eyebrow">COLOUR & INTERIORS / {w.room}</span>
            <h3>{palette.name}</h3>
            <p>{palette.basis}</p>
            <div className="at-brochure-swatches">
              {palette.colours.map((c, i) => (
                <div key={c}>
                  <span style={{ background: c }} />
                  <small>{palette.names[i]}</small>
                  <small>
                    {
                      [
                        "Walls & larger surfaces",
                        "Upholstery & soft layers",
                        "Accents & small details",
                      ][i]
                    }
                  </small>
                </div>
              ))}
            </div>
            <p>{palette.advice}</p>
            <p>{palette.finishingAdvice}</p>
            <p className="at-fine-print">{paletteSampleNote}</p>
          </section>
        );
      })}
      <section className="at-brochure-page">
        <span className="at-eyebrow">CARING FOR YOUR COLLECTION</span>
        <h3>
          Beautiful today.
          <br />
          Cared for over time.
        </h3>
        <p>{generalAftercare}</p>
        {data.windows.map((w) => (
          <div className="at-brochure-care" key={w.id}>
            <h4>
              {w.room} · {w.name}
            </h4>
            <p>
              {w.careInstructions ||
                "Your fabric and lining care instructions are awaiting supplier confirmation. Contact Apex Curtains before cleaning, steaming or applying heat."}
            </p>
            {w.careSource ? (
              <small>Care reference: {w.careSource}</small>
            ) : null}
          </div>
        ))}
        <p>
          We are here when you need us.
          <br />
          hello@apexcurtains.com · 0800 772 0367
        </p>
        <div className="at-brochure-voucher">
          <span className="at-eyebrow">
            WITH OUR THANKS, {data.customerName || "FROM APEX"}
          </span>
          <h4>10% off</h4>
          <p>any future order</p>
          <small>APEX10-{reference.replace(/^APX-/, "")}</small>
        </div>
        <p>
          Quote your personal voucher code when arranging your next order with
          Apex Curtains.
        </p>
        {data.voucherDetails ? (
          <p className="at-fine-print">{data.voucherDetails}</p>
        ) : null}
      </section>
    </article>
  );
}
