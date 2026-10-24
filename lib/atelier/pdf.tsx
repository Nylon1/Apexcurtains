import React from "react";
import { selectedTrack } from "./tracks";
import {
  careGuide,
  standardCareSummary,
  careHandover,
  additionalCareWindows,
} from "./care";
import {
  shapeName,
  windowOutline,
  geometryMeasurements,
  geometrySlants,
} from "./geometry";
/* React PDF images are not HTML elements. */
/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  renderToBuffer,
  Svg,
  Path,
  Line,
} from "@react-pdf/renderer";
import {
  calculateWindow,
  selectedFabricPhoto,
  lengthLabel,
  checklist,
  type Job,
  type Asset,
  type DocumentKind,
  type SurveyWindow,
} from "./model";

import {
  customerDetails,
  brochureSpecification,
  brochurePalette,
  roomIntroduction,
  paletteSampleNote,
} from "./brochure";

const C = {
  navy: "#102C3B",
  ink: "#263C43",
  gold: "#B59B6A",
  paper: "#F7F3EC",
  muted: "#667271",
  line: "#DED8CD",
};
const s = StyleSheet.create({
  page: {
    backgroundColor: C.paper,
    padding: 42,
    paddingBottom: 58,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: C.ink,
    lineHeight: 1.5,
  },
  cover: {
    backgroundColor: C.navy,
    padding: 42,
    color: C.paper,
    fontFamily: "Helvetica",
  },
  brand: {
    fontSize: 10,
    lineHeight: 1.2,
    letterSpacing: 3,
    marginBottom: 20,
    color: C.gold,
  },
  kicker: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: C.muted,
    marginBottom: 12,
  },
  title: {
    fontFamily: "Times-Roman",
    fontSize: 34,
    lineHeight: 1.08,
    marginBottom: 18,
    color: C.navy,
  },
  heroTitle: {
    fontFamily: "Times-Roman",
    fontSize: 47,
    lineHeight: 1.02,
    color: C.paper,
    marginTop: 22,
    marginBottom: 17,
  },
  h2: {
    fontFamily: "Times-Roman",
    fontSize: 23,
    lineHeight: 1.2,
    marginTop: 14,
    marginBottom: 8,
    color: C.navy,
  },
  body: { fontSize: 10, lineHeight: 1.5, marginBottom: 12 },
  small: { fontSize: 8, color: C.muted, lineHeight: 1.5, marginBottom: 8 },
  photo: { width: "100%", height: 200, objectFit: "cover", marginBottom: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 0.6,
    borderColor: C.line,
    marginTop: 12,
  },
  cell: {
    width: "50%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    borderBottomWidth: 0.6,
    borderColor: C.line,
  },
  label: {
    fontSize: 7.5,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 3,
  },
  value: { fontSize: 10, color: C.ink },
  footer: {
    position: "absolute",
    top: 800,
    height: 22,
    left: 42,
    right: 42,
    borderTopWidth: 0.5,
    borderColor: C.line,
    paddingTop: 9,
    fontSize: 7.5,
    lineHeight: 1.2,
    color: C.muted,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: C.navy,
    color: C.paper,
    padding: 8,
    fontSize: 8,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: C.line,
    padding: 8,
    fontSize: 9,
  },
  swatches: { flexDirection: "row", gap: 10, marginTop: 10, marginBottom: 10 },
  swatch: { width: 85, height: 50, marginBottom: 7 },
  check: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 3,
    fontSize: 9,
    lineHeight: 1.3,
  },
  square: { width: 8, height: 8, borderWidth: 0.7, borderColor: C.gold },
  voucher: {
    borderWidth: 0.7,
    borderColor: C.gold,
    padding: 22,
    marginTop: 16,
    marginBottom: 16,
  },
  quote: {
    fontFamily: "Times-Italic",
    fontSize: 19,
    lineHeight: 1.45,
    marginTop: 8,
    marginBottom: 20,
  },
});
type Photos = Record<string, Buffer>;
type Props = {
  job: Job;
  assets: Asset[];
  photos: Photos;
  inspiration: Buffer;
  trackPhotos?: Record<string, Buffer>;
  draft?: boolean;
};
const safe = (v: string | number | undefined | null) =>
  String(v ?? "Not yet specified").replace(/[\u0000-\u0008]/g, "");
function Footer({ job, draft }: { job: Job; draft?: boolean }) {
  return (
    <>
      <View fixed style={s.footer}>
        <Text
          style={{ fontSize: 7.5, lineHeight: 1.2, height: 12, width: 440 }}
        >
          {job.reference} · Version {job.version}
          {draft ? " · DRAFT FOR REVIEW" : ""}
        </Text>
      </View>
      <Text
        fixed
        style={{
          fontSize: 7.5,
          lineHeight: 1.2,
          height: 12,
          width: 65,
          textAlign: "right",
          position: "absolute",
          top: 809,
          right: 42,
        }}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </>
  );
}
function Brand() {
  return <Text style={s.brand}>APEX CURTAINS</Text>;
}
function AdditionalPhotos({ p, w }: { p: Props; w: SurveyWindow }) {
  const first = p.assets.find(
    (a) => a.window_id === w.id && a.kind === "window",
  );
  return (
    <>
      {p.assets
        .filter(
          (a) => a.window_id === w.id && a.id !== first?.id && p.photos[a.id],
        )
        .map((a) => (
          <View key={a.id} wrap={false} style={{ marginTop: 18 }}>
            <Text style={s.small}>
              {w.room} · {w.name} · {a.kind} photograph
            </Text>
            <Image
              src={p.photos[a.id]}
              style={{ width: "100%", height: 210, objectFit: "contain" }}
            />
            <Text style={[s.small, { marginTop: 8 }]}>{a.caption}</Text>
          </View>
        ))}
    </>
  );
}
function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={s.cell} wrap={false}>
      <Text style={s.label}>{label}</Text>
      <Text style={s.value}>{safe(value) || "Not yet specified"}</Text>
    </View>
  );
}
function WindowDrawing({
  w,
  compact = false,
}: {
  w: SurveyWindow;
  compact?: boolean;
}) {
  const outline = windowOutline(w);
  const path =
    outline
      ?.map(([x, y], i) => `${i ? "L" : "M"}${30 + x * 180} ${15 + y * 100}`)
      .join(" ") + " Z";
  return (
    <View style={{ marginTop: 10, marginBottom: 12 }}>
      {outline ? (
        <Svg width="240" height={compact ? "105" : "135"} viewBox="0 0 240 135">
          <Path d={path} stroke={C.gold} strokeWidth="1.4" fill="none" />
          <Line
            x1="120"
            y1="20"
            x2="120"
            y2="115"
            stroke={C.line}
            strokeWidth="1"
          />
        </Svg>
      ) : (
        <Text style={s.body}>
          Custom shape: refer to the typed measurements and site photographs.
        </Text>
      )}
      <Text style={s.small}>
        {shapeName(w)} · shape guide only · use the recorded site dimensions
      </Text>
    </View>
  );
}
function imageFor(p: Props, w: SurveyWindow, kind = "window") {
  const a =
    kind === "fabric"
      ? selectedFabricPhoto(p.assets, w.id)
      : p.assets.find((a) => a.window_id === w.id && a.kind === kind);
  return a ? p.photos[a.id] : undefined;
}
function IntroPage(p: Props) {
  return (
    <Page size="A4" style={s.cover}>
      <Brand />
      <Text style={{ fontSize: 9, letterSpacing: 2, color: C.paper }}>
        A PERSONAL COLLECTION
      </Text>
      <Text style={s.heroTitle}>A home,{"\n"}beautifully considered.</Text>
      <Text style={{ fontSize: 12, color: "#D7D7CC", marginBottom: 25 }}>
        {safe(p.job.data.title)}
      </Text>
      <Image
        src={p.inspiration}
        style={{ width: "100%", height: 290, objectFit: "cover" }}
      />
      <Text style={{ fontSize: 7, color: "#C5C7C0", marginTop: 8 }}>
        Interior inspiration from the Apex collection
      </Text>
      <Text
        style={{
          fontFamily: "Times-Roman",
          fontSize: 24,
          lineHeight: 1.2,
          marginTop: 24,
        }}
      >
        Prepared exclusively for {safe(p.job.data.customerName) || "you"}
      </Text>
      <Text style={{ fontSize: 9, color: "#C5C7C0", marginTop: 10 }}>
        {p.job.reference} · Version {p.job.version}
        {p.draft ? " · DRAFT FOR REVIEW" : ""}
      </Text>
    </Page>
  );
}
function BrochureWindow({ p, w }: { p: Props; w: SurveyWindow }) {
  const palette = brochurePalette(w);
  const track = selectedTrack(w);
  const sitePhoto = p.job.data.photoPermission && imageFor(p, w);
  return (
    <>
      <Page size="A4" style={s.page}>
        <Brand />
        <Text style={s.kicker}>
          {w.name} · {shapeName(w)}
        </Text>
        <Text style={s.title}>{w.room}</Text>
        <Image
          src={sitePhoto || p.inspiration}
          style={{ ...s.photo, height: 180 }}
        />
        {!sitePhoto ? (
          <Text style={s.small}>
            Interior inspiration · not your completed installation
          </Text>
        ) : null}
        <Text style={s.h2}>{palette.name}</Text>
        <Text style={s.body}>{palette.basis}</Text>
        <View style={[s.swatches, { gap: 14 }]} wrap={false}>
          {palette.colours.map((col, i) => (
            <View key={col} style={{ width: "31%" }}>
              <View
                style={[
                  s.swatch,
                  { width: "100%", height: 62, backgroundColor: col },
                ]}
              />
              <Text style={s.value}>{palette.names[i]}</Text>
              <Text style={s.small}>
                {
                  [
                    "Walls & larger surfaces",
                    "Upholstery & soft layers",
                    "Accents & small details",
                  ][i]
                }
              </Text>
            </View>
          ))}
        </View>
        <Text style={s.body}>{palette.advice}</Text>
        <Text style={s.body}>{palette.finishingAdvice}</Text>
        <Text style={s.small}>{paletteSampleNote}</Text>
        <Footer job={p.job} draft={p.draft} />
      </Page>
      <Page size="A4" style={s.page}>
        <Brand />
        <Text style={s.kicker}>
          {w.room} · {w.name}
        </Text>
        <Text style={s.title}>Your chosen details.</Text>
        <Text style={s.body}>{roomIntroduction(w)}</Text>
        <View style={s.grid}>
          {brochureSpecification(w).map((detail) => (
            <Field key={detail.label} {...detail} />
          ))}
        </View>
        {imageFor(p, w, "fabric") ? (
          <View
            style={{ flexDirection: "row", gap: 12, marginTop: 18 }}
            wrap={false}
          >
            <Image
              src={imageFor(p, w, "fabric")!}
              style={{ width: 110, height: 110, objectFit: "contain" }}
            />
            <Text style={[s.body, { width: 340, marginTop: 10 }]}>
              {w.fabric} · {w.colour}
              {"\n"}
              {w.fabricCode}
              {"\n"}Your physical fabric sample is the closest guide to colour
              and texture.
            </Text>
          </View>
        ) : null}
        {track && p.trackPhotos?.[track.id] && !imageFor(p, w, "fabric") ? (
          <View
            wrap={false}
            style={{
              flexDirection: "row",
              gap: 16,
              marginTop: 16,
              padding: 14,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image
              src={p.trackPhotos[track.id]}
              style={{ width: 130, height: 100, objectFit: "contain" }}
            />
            <View style={{ width: 325 }}>
              <Text
                style={[s.h2, { marginTop: 5, fontSize: 17, lineHeight: 1.2 }]}
              >
                {track.name}
              </Text>
              <Text style={s.body}>
                Your chosen finish: {w.trackColour || "To be confirmed"}
              </Text>
              <Text style={s.small}>
                {track.caption} Photograph: Forest Group.
              </Text>
            </View>
          </View>
        ) : null}
        <Footer job={p.job} draft={p.draft} />
      </Page>
      {w.type === "apex" && w.apexShape === "other" ? (
        <Page size="A4" style={s.page}>
          <Brand />
          <Text style={s.kicker}>
            {w.room} · {w.name}
          </Text>
          <Text style={s.title}>Your window, in detail.</Text>
          <Text style={s.body}>
            The individual proportions recorded for your bespoke window.
          </Text>
          <Text style={s.h2} minPresenceAhead={40}>
            Other shape measurements
          </Text>
          <Text style={s.body}>{w.otherShapeMeasurements}</Text>
          <Footer job={p.job} draft={p.draft} />
        </Page>
      ) : null}
      {track && p.trackPhotos?.[track.id] && imageFor(p, w, "fabric") ? (
        <Page size="A4" style={s.page}>
          <Brand />
          <Text style={s.kicker}>
            {w.room} · {w.name}
          </Text>
          <Text style={s.title}>The finishing touch.</Text>
          <Text style={s.body}>
            A considered detail, chosen to complement the fall of your curtains.
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: 24,
              marginVertical: 26,
            }}
          >
            <Image
              src={p.trackPhotos[track.id]}
              style={{ width: "100%", height: 310, objectFit: "contain" }}
            />
          </View>
          <Text style={[s.h2, { fontSize: 24, lineHeight: 1.2 }]}>
            {track.name}
          </Text>
          <Text style={s.body}>
            Your chosen finish: {w.trackColour || "To be confirmed"}
          </Text>
          <Text style={s.small}>{track.caption} Photograph: Forest Group.</Text>
          <Footer job={p.job} draft={p.draft} />
        </Page>
      ) : null}
    </>
  );
}

function Brochure(p: Props) {
  const d = p.job.data;
  const [client, address, ...contactDetails] = customerDetails(d);
  return (
    <Document
      title={`${d.title} — Your Apex Curtains Collection`}
      author="Apex Curtains"
      language="en-GB"
    >
      <IntroPage {...p} />
      <Page size="A4" style={s.page}>
        <Brand />
        <View
          style={{
            marginTop: 38,
            paddingVertical: 30,
            borderTopWidth: 0.6,
            borderBottomWidth: 0.6,
            borderColor: C.gold,
            alignItems: "center",
          }}
        >
          <Text style={[s.kicker, { textAlign: "center" }]}>
            An individual commission
          </Text>
          <Text
            style={[
              s.title,
              { textAlign: "center", fontSize: 40, lineHeight: 1.1 },
            ]}
          >
            Your home.{"\n"}Your collection.
          </Text>
          <Text
            style={[
              s.label,
              { textAlign: "center", marginTop: 14, marginBottom: 12 },
            ]}
          >
            Prepared exclusively for
          </Text>
          <Text
            style={{
              fontFamily: "Times-Roman",
              fontSize: 27,
              lineHeight: 1.25,
              textAlign: "center",
              color: C.navy,
              marginBottom: 18,
            }}
          >
            {client.value}
          </Text>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 1.7,
              textAlign: "center",
              color: C.muted,
            }}
          >
            {address.value}
          </Text>
        </View>
        <Text
          style={[
            s.quote,
            {
              fontSize: 17,
              lineHeight: 1.5,
              textAlign: "center",
              marginTop: 28,
              marginBottom: 16,
            },
          ]}
        >
          A home is made personal by the things chosen with care. This
          collection has been composed for yours, with every fabric, fold and
          finishing touch considered together.
        </Text>
        {contactDetails.length ? (
          <View style={s.grid}>
            {contactDetails.map((detail) => (
              <Field key={detail.label} {...detail} />
            ))}
          </View>
        ) : null}
        <Text style={[s.body, { textAlign: "center", marginTop: 22 }]}>
          With warmest wishes,{"\n"}The Apex Curtains team
        </Text>
        <Footer job={p.job} draft={p.draft} />
      </Page>
      <Page size="A4" style={s.page}>
        <Brand />
        <Text style={s.kicker}>A note for your home</Text>
        <Text style={s.title}>Every detail,{"\n"}chosen with intention.</Text>
        <Text style={s.quote}>
          {d.welcomeNote ||
            "The most inviting rooms are shaped by thoughtful details: the fall of a fabric, the warmth of a colour, the way light moves through a window."}
        </Text>
        <Text style={s.body}>
          Your curtain collection brings those details together. These pages
          record the choices made for your home, with a little inspiration to
          help you carry the look into the rest of the room.
        </Text>
        <Text style={s.h2} minPresenceAhead={70}>
          Your rooms
        </Text>
        {d.windows.map((w) => (
          <View
            key={w.id}
            style={{
              paddingVertical: 12,
              borderBottomWidth: 0.5,
              borderColor: C.line,
            }}
            wrap={false}
          >
            <Text
              style={{
                fontFamily: "Times-Roman",
                fontSize: 19,
                lineHeight: 1.2,
              }}
            >
              {w.room}
            </Text>
            <Text style={s.small}>
              {w.name} · {shapeName(w)} · {w.colour}
            </Text>
          </View>
        ))}
        <Footer job={p.job} draft={p.draft} />
      </Page>
      {d.windows.map((w) => (
        <BrochureWindow key={w.id} p={p} w={w} />
      ))}
      {careGuide.map((group) => (
        <Page size="A4" style={s.page} key={group.id}>
          <Brand />
          <Text style={s.kicker}>{group.eyebrow}</Text>
          <Text style={s.title}>{group.title}</Text>
          <Text style={s.body}>{group.introduction}</Text>
          {group.sections.map((section, index) => (
            <View
              key={section.title}
              wrap={false}
              style={{
                marginTop: 10,
                paddingTop: 12,
                borderTopWidth: 0.6,
                borderColor: C.line,
                ...(group.id === "cleaning" && index === 0
                  ? { padding: 17, backgroundColor: "#EDE7DB", marginBottom: 4 }
                  : {}),
              }}
            >
              <Text
                style={[s.h2, { fontSize: 19, marginTop: 0, marginBottom: 7 }]}
              >
                {section.title}
              </Text>
              <Text style={[s.body, { marginBottom: 5 }]}>{section.text}</Text>
            </View>
          ))}
          {group.id === "living" ? (
            <Text style={[s.small, { marginTop: 18 }]}>
              Here when you need us: hello@apexcurtains.com · 0800 772 0367
            </Text>
          ) : null}
          <Footer job={p.job} draft={p.draft} />
        </Page>
      ))}
      {additionalCareWindows(d.windows).length ? (
        <Page size="A4" style={s.page}>
          <Brand />
          <Text style={s.kicker}>NOTES FOR YOUR COLLECTION</Text>
          <Text style={s.title}>A little more detail.</Text>
          <Text style={s.body}>
            The following notes have been recorded for individual windows. If
            any instruction differs from the standard guide or a sewn-in label,
            ask Apex before treatment.
          </Text>
          {additionalCareWindows(d.windows).map((w) => (
            <View key={w.id}>
              <Text style={s.h2} minPresenceAhead={60}>
                {w.room} · {w.name}
              </Text>
              {w.careInstructions ? (
                <Text style={s.body}>{w.careInstructions}</Text>
              ) : null}
              {w.careSource ? (
                <Text style={s.small}>Care reference: {w.careSource}</Text>
              ) : null}
            </View>
          ))}
          <Footer job={p.job} draft={p.draft} />
        </Page>
      ) : null}
      <Page size="A4" style={s.page}>
        <Brand />
        <Image
          src={p.inspiration}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            marginBottom: 26,
          }}
        />
        <Text style={s.kicker}>With our thanks</Text>
        <Text style={s.title}>For the next chapter{"\n"}of your home.</Text>
        <Text style={s.body}>
          {d.customerName ? `${d.customerName}, thank you` : "Thank you"} for
          choosing Apex Curtains. Whether you are finishing another room or
          returning with a new idea, we would love to help.
        </Text>
        <View style={s.voucher}>
          <Text
            style={{
              fontFamily: "Times-Roman",
              fontSize: 57,
              lineHeight: 1.1,
              color: C.navy,
            }}
          >
            10% off
          </Text>
          <Text
            style={{
              fontFamily: "Times-Roman",
              fontSize: 24,
              lineHeight: 1.2,
              marginBottom: 17,
            }}
          >
            any future order
          </Text>
          <Text style={s.label}>Your personal voucher code</Text>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 1.3,
              letterSpacing: 1,
              color: C.navy,
            }}
          >
            APEX10-{p.job.reference.replace(/^APX-/, "")}
          </Text>
        </View>
        <Text style={s.body}>
          Quote your voucher code when contacting Apex Curtains to arrange your
          future order. Our team will apply your 10% discount.
        </Text>
        {d.voucherDetails ? (
          <Text style={s.small}>{d.voucherDetails}</Text>
        ) : null}
        <Text style={s.small}>hello@apexcurtains.com · 0800 772 0367</Text>
        <Text style={s.small}>
          Image: interior inspiration from the Apex collection.
        </Text>
        <Footer job={p.job} draft={p.draft} />
      </Page>
    </Document>
  );
}
function Workroom(p: Props) {
  const d = p.job.data;
  return (
    <Document
      title={`${p.job.reference} Workroom sheet`}
      author="Apex Curtains"
    >
      <Page size="A4" style={s.page}>
        <Brand />
        <Text style={s.kicker}>Production schedule</Text>
        <Text style={s.title}>The workroom collection.</Text>
        <Text style={s.body}>
          {d.title} · {d.customerName}
          {"\n"}
          {p.job.reference} · {d.windows.length} windows
        </Text>
        <Text style={s.body}>
          Apex allowance: every cut width uses the window&apos;s longest
          finished drop, as a full rectangle. No triangular offcuts are
          deducted. Quantities include the recorded extra allowance; suitable
          offcuts may be used for tiebacks after checking grain, pattern and
          size.
        </Text>
        <View style={s.tableHead}>
          <Text style={{ width: "48%" }}>ROOM AND WINDOW</Text>
          <Text style={{ width: "26%" }}>FACE FABRIC</Text>
          <Text style={{ width: "26%" }}>LINING</Text>
        </View>
        {d.windows.map((w) => {
          const q = calculateWindow(w);
          return (
            <View style={s.row} key={w.id} wrap={false}>
              <Text style={{ width: "48%" }}>
                {w.room} · {w.name}
              </Text>
              <Text style={{ width: "26%" }}>
                {q.fabricMetres.toFixed(2)} m
              </Text>
              <Text style={{ width: "26%" }}>
                {q.liningMetres.toFixed(2)} m
              </Text>
            </View>
          );
        })}
        <Text style={s.h2}>Material order summary</Text>
        {materialTotals(d.windows).map((t) => (
          <View key={t.key} style={s.row} wrap={false}>
            <Text style={{ width: "78%" }}>{t.label}</Text>
            <Text style={{ width: "22%" }}>{t.metres.toFixed(2)} m</Text>
          </View>
        ))}
        <Text style={[s.small, { marginTop: 16 }]}>
          Confirm supplier order increments, required batch and availability
          before ordering. Full-width panel allocation is conservative; any
          alternative layout must be reviewed by the workroom.
        </Text>
        <View wrap={false}>
          <Text style={s.h2}>Standard curtain care</Text>
          <Text style={s.body}>{standardCareSummary}</Text>
        </View>
        <Footer job={p.job} draft={p.draft} />
      </Page>
      {d.windows.map((w) => {
        const q = calculateWindow(w);
        return (
          <Page size="A4" style={s.page} key={w.id}>
            <Brand />
            <Text style={s.kicker}>
              {w.type} · {w.id.slice(0, 8)}
            </Text>
            <Text style={s.title}>
              {w.room}
              {"\n"}
              {w.name}
            </Text>
            {imageFor(p, w) ? (
              <Image
                src={imageFor(p, w)!}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "contain",
                  marginBottom: 12,
                }}
              />
            ) : (
              <WindowDrawing w={w} compact />
            )}
            <View style={s.grid}>
              <Field
                label="Coverage and finished drops"
                value={geometryMeasurements(w)}
              />
              <Field
                label="Slants and track"
                value={`${geometrySlants(w)} ${w.track} · ${w.trackColour || "Track colour to be confirmed"}`}
              />
              <Field
                label="Fabric"
                value={`${w.supplier} · ${w.fabric} · ${w.fabricCode} · ${w.colour}; roll ${w.fabricWidthMm} mm`}
              />
              <Field
                label="Heading and fullness"
                value={`${w.heading} · ${w.fullness}× · ${w.panelCount} panel(s) · ${w.opening}`}
              />
              <Field
                label="Face fabric cutting"
                value={`${q.widths} widths × ${q.cutMm} mm; ${q.fabricMetres.toFixed(2)} m total${q.manual ? " · approved matching plan" : ""}`}
              />
              <Field
                label="Pattern"
                value={`${w.pattern}; vertical ${w.repeatMm} mm; horizontal ${w.horizontalRepeatMm} mm; motif allowance ${w.motifAllowanceMm} mm`}
              />
              <Field
                label="Making allowances"
                value={`Heading and hem: ${q.hemAllowanceMm} mm total per fabric width. Side hem ${w.sideHemMm}; seam ${w.seamMm} mm. Returns ${w.returnsMm}; overlap ${w.overlapMm} mm. Extra face fabric ${w.extraFabricMetres} m.`}
              />
              <Field
                label="Lining"
                value={
                  w.lining === "none"
                    ? "None"
                    : `${w.lining} · ${w.liningCode} · ${w.liningColour}; roll ${w.liningWidthMm} mm; ${q.liningWidths} widths × ${q.liningCutMm} mm; ${q.liningMetres.toFixed(2)} m. Finished drop ${w.liningDropMm} + allowance ${w.liningAllowanceMm} mm; extra ${w.extraLiningMetres} m.`
                }
              />
              <Field
                label="Length and interlining"
                value={`${lengthLabel(w)}; ${w.interlining ? `${w.interlining} · ${w.interliningMetres} m` : "No interlining"}`}
              />
              <Field
                label="Tiebacks and hooks"
                value={`${w.tiebackCount} × ${w.tiebacks} ${w.tiebackColour}; ${w.hookCount} × ${w.hooks} ${w.hookColour}`}
              />
            </View>
            {w.type === "apex" && w.apexShape === "other" ? (
              <>
                <Text style={s.h2} minPresenceAhead={40}>
                  Other shape measurements
                </Text>
                <Text style={s.body}>{w.otherShapeMeasurements}</Text>
              </>
            ) : null}
            {[
              w.direction,
              w.patternNotes,
              w.cuttingPlan,
              w.offcutNotes,
              w.measurementNotes,
              w.designNotes,
            ]
              .filter(Boolean)
              .map((t, i) => (
                <Text key={i} style={[s.body, { marginTop: 10 }]}>
                  {t}
                </Text>
              ))}
            <AdditionalPhotos p={p} w={w} />
            <Footer job={p.job} draft={p.draft} />
          </Page>
        );
      })}
    </Document>
  );
}
function Fitter(p: Props) {
  const d = p.job.data;
  return (
    <Document
      title={`${p.job.reference} Fitter worksheet`}
      author="Apex Curtains"
    >
      <Page size="A4" style={s.page}>
        <Brand />
        <Text style={s.kicker}>Installation pack</Text>
        <Text style={s.title}>Ready for a beautiful finish.</Text>
        <Text style={s.body}>
          {d.customerName} · {d.phone}
          {"\n"}
          {d.address}
          {"\n"}Appointment: {d.fittingDate || "To be confirmed"}
        </Text>
        <Text style={s.body}>
          {d.accessNotes || "Confirm access arrangements with the customer."}
        </Text>
        <Text style={s.h2}>Pack and check</Text>
        {checklist(d).map((t) => (
          <View key={t} style={s.check} wrap={false}>
            <View style={s.square} />
            <Text>{t}</Text>
          </View>
        ))}
        <View wrap={false}>
          <Text style={[s.h2, { fontSize: 19 }]}>Care at handover</Text>
          <Text style={s.body}>{careHandover}</Text>
        </View>
        <Footer job={p.job} draft={p.draft} />
      </Page>
      {d.windows.map((w) => (
        <Page size="A4" style={s.page} key={w.id}>
          <Brand />
          <Text style={s.kicker}>
            {w.type} · panel labels {w.id.slice(0, 8)}
          </Text>
          <Text style={s.title}>
            {w.room}
            {"\n"}
            {w.name}
          </Text>
          {imageFor(p, w) ? (
            <Image src={imageFor(p, w)!} style={s.photo} />
          ) : (
            <WindowDrawing w={w} />
          )}
          <View style={s.grid}>
            <Field
              label="Track and opening"
              value={`${w.track} · ${w.trackColour || "Track colour to be confirmed"} · ${w.opening}`}
            />
            <Field
              label="Dimensions"
              value={`${geometryMeasurements(w)}. ${geometrySlants(w)}`}
            />
            <Field
              label="Access and fixings"
              value={`${w.accessHeightMm} mm working height; track height ${w.trackHeightMm || "confirm onsite"} mm; ${w.mountingSurface}`}
            />
            <Field
              label="Curtains"
              value={`${w.fabric} · ${w.colour} · ${w.panelCount} panel(s) · ${w.heading}`}
            />
            <Field label="Finish" value={lengthLabel(w)} />
            <Field
              label="Tiebacks and hooks"
              value={`${w.tiebackCount} × ${w.tiebacks} ${w.tiebackColour}; ${w.hookCount} × ${w.hooks} ${w.hookColour}`}
            />
          </View>
          <Text style={s.h2}>Window instructions</Text>
          {w.type === "apex" && w.apexShape === "other" ? (
            <>
              <Text style={s.h2} minPresenceAhead={40}>
                Other shape measurements
              </Text>
              <Text style={s.body}>{w.otherShapeMeasurements}</Text>
            </>
          ) : null}
          <Text style={s.body}>
            {[
              w.trackComponents,
              w.fittingNotes,
              w.tiebackPosition,
              w.measurementNotes,
            ]
              .filter(Boolean)
              .join("\n") ||
              "Confirm final mounting and fitting details onsite."}
          </Text>
          <Text style={s.small}>
            Fitter checks: packed ______ installed ______ operation checked
            ______{"\n"}Outstanding details
            ________________________________________
          </Text>
          <AdditionalPhotos p={p} w={w} />
          <Footer job={p.job} draft={p.draft} />
        </Page>
      ))}
    </Document>
  );
}
export function materialTotals(windows: SurveyWindow[]) {
  const map = new Map<string, { key: string; label: string; metres: number }>();
  for (const w of windows) {
    const q = calculateWindow(w);
    for (const [type, ref, colour, metres] of [
      [
        "Fabric",
        `${w.supplier} ${w.fabricCode} / ${w.fabricWidthMm} mm roll`,
        w.colour,
        q.fabricMetres,
      ],
      [
        "Lining",
        `${w.liningCode} / ${w.liningWidthMm} mm roll`,
        w.liningColour,
        q.liningMetres,
      ],
      ["Interlining", w.interlining, "", w.interliningMetres],
    ] as const) {
      if (!metres) continue;
      const key = JSON.stringify([type, ref, colour]);
      const prev = map.get(key);
      map.set(key, {
        key,
        label: `${type} · ${ref} · ${colour}`,
        metres: (prev?.metres ?? 0) + metres,
      });
    }
  }
  return [...map.values()];
}
export async function renderJobPdf(kind: DocumentKind, props: Props) {
  return renderToBuffer(
    kind === "brochure" ? (
      <Brochure {...props} />
    ) : kind === "workroom" ? (
      <Workroom {...props} />
    ) : (
      <Fitter {...props} />
    ),
  );
}
