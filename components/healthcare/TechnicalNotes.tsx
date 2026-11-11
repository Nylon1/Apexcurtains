import Image from "next/image";
export default function TechnicalNotes({ category }: { category?: string }) {
  if (category === "disposable")
    return (
      <section className="hc-section">
        <h2>Sizes and heading systems.</h2>
        <p>
          Current Behrens item finders list 375 × 200 cm and 750 × 200 cm (width
          × drop) in Hospital Blue, Woodland Green, Sky, Cream and Putty across
          the five heading families below. Confirm the exact SKU, pack and
          current technical evidence in your quotation.
        </p>
        <div
          className="hc-table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Disposable heading guide"
        >
          <table>
            <caption>
              Supplier-listed heading families · individual track model approval
              still required
            </caption>
            <thead>
              <tr>
                <th scope="col">Heading</th>
                <th scope="col">Supplier-described connection</th>
                <th scope="col">Forest MTS status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Eyelets", "Uses existing preloaded cubicle hooks", "eyelets"],
                [
                  "Small fixed hooks",
                  "Supplier names Silent Gliss, Goelst, Movatrack and Antiference families",
                  "sfh-hooks",
                ],
                [
                  "Large fixed hooks",
                  "Current finder names Movatrack and CS Supertrak; older divisional information differs",
                  "lfh-hooks",
                ],
                [
                  "U-shaped fixed hooks",
                  "Supplier names metal Marlux and plastic adapta-track families",
                  "ufh-hooks",
                ],
                [
                  "EasyClick",
                  "Proprietary connection; supplier names Silent Gliss and Goelst families",
                  "easyclick-hooks",
                ],
              ].map(([name, description, slug]) => (
                <tr key={slug}>
                  <th scope="row">
                    <a
                      href={`https://behrens.co.uk/products/hospital-blue-fr-disposable-curtain-${slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {name} ↗
                    </a>
                  </th>
                  <td>{description}</td>
                  <td>Awaiting technical confirmation</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="hc-small">
          Supplier quantity tables list packs of 12 for 375 cm and 6 for 750 cm
          eyelet, small-hook and large-hook curtains. Confirm U-shaped and
          EasyClick 375 cm order units directly. Material is listed as 100%
          polypropylene; current SKU-specific fire evidence, antimicrobial
          properties and handling instructions remain available on request.
        </p>
        <p>
          Printed options vary by heading and size. Request an exact design
          rather than assuming every print is available on every hook.{" "}
          <a
            className="hc-text-link"
            href="https://divisions.behrens.co.uk/product/bespoke-size-disposable-curtains/"
            target="_blank"
            rel="noreferrer"
          >
            Behrens bespoke sizing information ↗
          </a>
        </p>
      </section>
    );
  if (category === "tracks")
    return (
      <section className="hc-section">
        <div className="hc-detail-grid">
          <div>
            <h2>The complete track assembly.</h2>
            <p>
              Specify carriers, end stops and support components with the chosen
              profile. Forest’s January 2026 brochure lists carrier 4510101000
              for all three MTS profiles, with wall brackets and end caps
              specific to each profile.
            </p>
            <p>
              Suspension references 4518201000 (10–100 cm) and 4518201500
              (100–150 cm) are listed. Length alone does not establish an
              acceptable fixing arrangement: confirm the substrate, load,
              brackets and spacing for the site.
            </p>
            <a
              className="hc-text-link"
              href="https://www.forestgroup.com/user_files/download_files/download_2090_FOREST_MTS_EN_120126_WEB.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View Forest’s component drawings and ordering table ↗
            </a>
          </div>
          <figure>
            <Image
              src="/healthcare/forest/mts-system-overview.png"
              alt="Forest supplier illustration comparing the Standard, Flat and Round MTS track systems"
              width={590}
              height={479}
              sizes="(max-width:800px) 90vw, 45vw"
              style={{ width: "100%", height: "auto" }}
            />
            <figcaption className="hc-small">
              Forest system illustration. Final fixings and suspension are
              project-specific.
            </figcaption>
          </figure>
        </div>
      </section>
    );
  return null;
}
