/* Photographs are served through the staff-checked asset endpoint. */
/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import { selectedTrack } from "@/lib/atelier/tracks";
import { careGuide, additionalCareWindows } from "@/lib/atelier/care";
import { shapeName, windowOutline } from "@/lib/atelier/geometry";
import {
  brochureIcons,
  type BrochureIconName,
} from "@/lib/atelier/brochure-icons";
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
  designStory,
  interiorGuide,
  installationGuide,
  apexWebsite,
  brochureImages,
  homePromise,
  websiteFeatures,
  headingGallery,
  type BrochureDetail,
} from "@/lib/atelier/brochure";

function Motif({ name }: { name: BrochureIconName }) {
  return (
    <svg
      className="at-brochure-icon"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {brochureIcons[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

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
          src={brochureImages.swatches}
          alt="An editorial arrangement of curtain fabric swatches in soft neutrals, sage and navy"
        />
        <small>FABRIC INSPIRATION · TEXTURES TO BEGIN A CONVERSATION</small>
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
          <Motif name="scroll" />
          <h4>{client.value}</h4>
          <Motif name="home" />
          <address>{address.value}</address>
        </div>
        <p className="at-brochure-intro">
          A home is made personal by the things chosen with care. This
          collection has been composed for yours, with every fabric, fold and
          finishing touch considered together.
        </p>
        <p className="at-brochure-signature">
          With warmest wishes,
          <br />
          <em>The Apex Curtains team</em>
        </p>
      </section>
      <section className="at-brochure-page at-brochure-promise">
        <Motif name="home" />
        <span className="at-eyebrow">OUR PROMISE TO YOU</span>
        <h3>
          Respect for
          <br />
          <em>your home.</em>
        </h3>
        <p className="at-brochure-intro">{homePromise.introduction}</p>
        <div className="at-brochure-promises">
          {homePromise.details.map((item, i) => (
            <div key={item.label}>
              <Motif name={(["care", "sparkle", "home"] as const)[i]} />
              <div>
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="at-brochure-page">
        <Motif name="scroll" />
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
        {contactDetails.length ? <Details items={contactDetails} /> : null}
      </section>
      {data.windows.map((w, index) => {
        const palette = brochurePalette(w);
        const photo =
          data.photoPermission &&
          assets.find((a) => a.window_id === w.id && a.kind === "window");
        const fabric = selectedFabricPhoto(assets, w.id);
        const track = selectedTrack(w);
        return (
          <Fragment key={w.id}>
            <section
              className="at-brochure-page at-brochure-window at-brochure-story"
              id={`brochure-${w.id}`}
            >
              <div className="at-brochure-chapter">
                <span>THE ROOMS / {String(index + 1).padStart(2, "0")}</span>
                <span>
                  {w.name} · {shapeName(w)}
                </span>
              </div>
              <h3>{w.room || "Your room"}</h3>
              <figure className="at-brochure-room-figure">
                {photo ? (
                  <img
                    className={`at-brochure-room ${photo ? "at-site-photograph" : ""}`}
                    src={
                      photo
                        ? `/api/atelier/photos/${photo.id}`
                        : "/visualiser/double-pinch-gable-desktop.webp"
                    }
                    alt={
                      photo
                        ? `${w.room} · ${w.name}`
                        : "Apex interior inspiration"
                    }
                    loading="lazy"
                  />
                ) : (
                  <div className="at-brochure-window-drawing">
                    {windowOutline(w) ? (
                      <svg
                        viewBox="0 0 240 150"
                        role="img"
                        aria-label={`${shapeName(w)} shape guide`}
                      >
                        <path
                          d={
                            windowOutline(w)!
                              .map(
                                ([x, y], i) =>
                                  `${i ? "L" : "M"}${30 + x * 180} ${15 + y * 110}`,
                              )
                              .join(" ") + " Z"
                          }
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    ) : (
                      <Motif name="home" />
                    )}
                    <span>{shapeName(w)}</span>
                  </div>
                )}
                <figcaption>
                  {photo
                    ? "Your window · photographed during your consultation"
                    : "Your window shape · your chosen design is recorded on the following pages"}
                </figcaption>
              </figure>
              <p className="at-brochure-intro">{roomIntroduction(w)}</p>
              <div className="at-brochure-design-story">
                {designStory(w).map((item) => (
                  <div key={item.label}>
                    <h4>{item.label}</h4>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="at-brochure-page at-brochure-record">
              <Motif name="scroll" />
              <span className="at-eyebrow">
                {w.room} / THE INDIVIDUAL SPECIFICATION
              </span>
              <h3>Every choice, together.</h3>
              <p>
                The fabric, proportions and finishing details selected for{" "}
                {w.name.toLowerCase() || "your window"}. Keep this record with
                your collection for future advice and additions.
              </p>
              <Details items={brochureSpecification(w)} />
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
              {w.type === "apex" && w.apexShape === "other" ? (
                <div className="at-custom-shape-notes">
                  <span className="at-eyebrow">
                    YOUR WINDOW · RECORDED MEASUREMENTS
                  </span>
                  <p>{w.otherShapeMeasurements}</p>
                </div>
              ) : null}
            </section>
            <section className="at-brochure-page at-brochure-mood">
              <Motif name="palette" />
              <span className="at-eyebrow">
                {w.room} / COLOUR, TEXTURE & ATMOSPHERE
              </span>
              <h3>
                The room beyond
                <br />
                <em>the curtains.</em>
              </h3>
              <h4 className="at-palette-title">{palette.name}</h4>
              <p>{palette.basis}</p>
              <div className="at-brochure-moodboard">
                <figure className="at-brochure-cloth">
                  {fabric ? (
                    <img
                      src={`/api/atelier/photos/${fabric.id}`}
                      alt={`Chosen fabric: ${w.fabric} in ${w.colour}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="at-brochure-cloth-label">
                      <strong>{w.fabric || "Your chosen cloth"}</strong>
                      <span>{w.colour}</span>
                    </div>
                  )}
                  <figcaption>
                    <span className="at-eyebrow">
                      {fabric
                        ? "YOUR ACTUAL FABRIC PHOTOGRAPH"
                        : "YOUR FABRIC SELECTION"}
                    </span>
                    <b>
                      {w.fabric} · {w.colour}
                    </b>
                    <small>
                      {w.supplier} · {w.fabricCode}
                    </small>
                  </figcaption>
                </figure>
                <div className="at-brochure-palette-strips">
                  {palette.colours.map((colour, i) => (
                    <div key={colour}>
                      <span style={{ background: colour }} />
                      <div>
                        <b>{palette.names[i]}</b>
                        <small>
                          {
                            [
                              "The backdrop",
                              "The soft layers",
                              "The finishing accent",
                            ][i]
                          }
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="at-brochure-intro">{palette.advice}</p>
              <div className="at-interior-guide">
                {interiorGuide(w).map((item) => (
                  <div key={item.label}>
                    <h4>{item.label}</h4>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="at-fine-print">{paletteSampleNote}</p>
            </section>
          </Fragment>
        );
      })}
      <section className="at-brochure-page at-brochure-arrival">
        <Motif name="home" />
        <span className="at-eyebrow">FROM OUR WORKROOM TO YOUR HOME</span>
        <h3>
          The day it all
          <br />
          <em>comes together.</em>
        </h3>
        <p>
          {data.fittingDate
            ? `Your recorded installation arrangements: ${data.fittingDate}.`
            : "Your installation arrangements will be confirmed with Apex."}{" "}
          A little preparation makes space for the final details.
        </p>
        {installationGuide.map((item, i) => (
          <div className="at-arrival-step" key={item.label}>
            <span>0{i + 1}</span>
            <div>
              <h4>{item.label}</h4>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </section>
      {careGuide.map((group) => (
        <section className="at-brochure-page" key={group.id}>
          <Motif name={group.id === "cleaning" ? "care" : "cloth"} />
          <span className="at-eyebrow">{group.eyebrow}</span>
          <h3>{group.title}</h3>
          <p>{group.introduction}</p>
          {group.sections.map((section, index) => (
            <div
              className={`at-brochure-care ${group.id === "cleaning" && index === 0 ? "at-care-highlight" : ""}`}
              key={section.title}
            >
              <h4>{section.title}</h4>
              <p>{section.text}</p>
            </div>
          ))}
        </section>
      ))}
      {additionalCareWindows(data.windows).length ? (
        <section className="at-brochure-page">
          <span className="at-eyebrow">NOTES FOR YOUR COLLECTION</span>
          <h3>A little more detail.</h3>
          <p>
            The following notes have been recorded for individual windows. If
            any instruction differs from the standard guide or a sewn-in label,
            ask Apex before treatment.
          </p>
          {additionalCareWindows(data.windows).map((w) => (
            <div className="at-brochure-care" key={w.id}>
              <h4>
                {w.room} · {w.name}
              </h4>
              {w.careInstructions ? <p>{w.careInstructions}</p> : null}
              {w.careSource ? (
                <small>Care reference: {w.careSource}</small>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}
      <section className="at-brochure-page at-brochure-headings">
        <Motif name="cloth" />
        <span className="at-eyebrow">THE LANGUAGE OF FOLDS</span>
        <h3>
          Three headings.
          <br />
          <em>Each with its own character.</em>
        </h3>
        <p>
          A small guide to the finishing styles on our website. These examples
          illustrate the headings; your selected style, cloth and colour remain
          those recorded in your room specification.
        </p>
        {headingGallery.map((item, i) => (
          <figure className="at-brochure-feature" key={item.id}>
            <img
              src={item.image}
              alt={`${item.name} curtain heading example`}
              loading="lazy"
              style={{
                objectPosition: item.id === "pencil" ? "50% 70%" : undefined,
              }}
            />
            <figcaption>
              <span className="at-eyebrow">0{i + 1} / HEADING STUDY</span>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </figcaption>
          </figure>
        ))}
        <a
          href={`${apexWebsite}/curtain-headings`}
          target="_blank"
          rel="noreferrer"
        >
          Explore our heading guide
        </a>
      </section>
      <section className="at-brochure-page at-brochure-discover">
        <Motif name="globe" />
        <span className="at-eyebrow">MORE TO DISCOVER ONLINE</span>
        <h3>
          Ideas for a home
          <br />
          <em>that feels like you.</em>
        </h3>
        <p>
          A few pages from our website to return to whenever you are gathering
          ideas. Explore the textures, colours and careful making behind the
          collection.
        </p>
        {websiteFeatures.map((item) => (
          <figure className="at-brochure-feature" key={item.id}>
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              style={{ objectFit: item.id === "colour" ? "contain" : "cover" }}
            />
            <figcaption>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <a
                href={`${apexWebsite}${item.path}`}
                target="_blank"
                rel="noreferrer"
              >
                Visit this page
              </a>
              <small>{item.caption}</small>
            </figcaption>
          </figure>
        ))}
      </section>
      <section className="at-brochure-page at-brochure-ending">
        <Motif name="gift" />
        <span className="at-eyebrow">A LITTLE SOMETHING FOR ANOTHER ROOM</span>
        <h3>
          Your next
          <br />
          <em>beautiful idea.</em>
        </h3>
        <p>
          {data.customerName
            ? `${data.customerName}, this is for you.`
            : "A personal gift from Apex."}{" "}
          When another room calls for a little care, we would love to be part of
          its story.
        </p>
        <figure className="at-brochure-voucher-picture">
          <img
            src={brochureImages.voucher}
            alt="Apex Curtains voucher: 10% off any future order, with our compliments"
            loading="lazy"
          />
          <figcaption>
            <span className="at-eyebrow">YOUR PERSONAL VOUCHER CODE</span>
            <strong>APEX10-{reference.replace(/^APX-/, "")}</strong>
          </figcaption>
        </figure>
        <p>
          Quote your code when arranging your next order with Apex Curtains.
        </p>
        {data.voucherDetails ? (
          <p className="at-fine-print">{data.voucherDetails}</p>
        ) : null}
        <div className="at-brochure-website">
          <Motif name="globe" />
          <a href={apexWebsite} target="_blank" rel="noreferrer">
            www.apexcurtains.com
          </a>
          <p>hello@apexcurtains.com · 0800 772 0367</p>
        </div>
      </section>
    </article>
  );
}
