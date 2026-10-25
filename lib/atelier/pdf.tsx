import { Fragment } from "react";
import React from "react";
import { selectedTrack } from "./tracks";
import {
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
  Link,
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
  brochureSpecificationSections,
  brochurePalette,
  roomIntroduction,
  paletteSampleNote,
  designStory,
  interiorExample,
  brochureRooms,
  installationGuide,
  apexWebsite,
  homePromise,
  websiteFeatures,
  headingGallery,
} from "./brochure";
import { brochureCareGuide } from "./brochure-care";
import { brochureIcons, type BrochureIconName } from "./brochure-icons";

const C = {
  forest: "#1B3430",
  ink: "#2B4038",
  gold: "#B59B6A",
  paper: "#F7F3EC",
  muted: "#62746A",
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
    backgroundColor: C.forest,
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
    color: C.forest,
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
    color: C.forest,
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
    backgroundColor: C.forest,
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
  illustrations?: Record<string, Buffer>;
  draft?: boolean;
};
const safe = (v: string | number | undefined | null) =>
  String(v ?? "Not yet specified").replace(/[\u0000-\u0008]/g, "");
function Footer({ job, draft }: { job: Job; draft?: boolean }) {
  return (
    <>
      <View fixed style={s.footer}>
        <Text style={{ fontSize: 7.5, lineHeight: 1.2, flex: 1 }}>
          {job.reference} · Version {job.version}
          {draft ? " · DRAFT FOR REVIEW" : ""}
        </Text>
      </View>
      <Text
        fixed
        style={{
          position: "absolute",
          top: 809,
          right: 42,
          fontSize: 8,
          color: C.muted,
        }}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </>
  );
}
function Brand() {
  return (
    <Text fixed style={s.brand}>
      APEX CURTAINS
    </Text>
  );
}
function Motif({ name, size = 25 }: { name: BrochureIconName; size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ marginBottom: 12 }}
    >
      {brochureIcons[name].map((d, i) => (
        <Path
          key={i}
          d={d}
          stroke={C.gold}
          strokeWidth={1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ))}
    </Svg>
  );
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
        src={p.illustrations?.homepage || p.inspiration}
        style={{
          width: 595.28,
          height: 245,
          objectFit: "contain",
          marginLeft: -42,
          marginTop: 12,
        }}
      />
      <Text style={{ fontSize: 7, color: "#C5C7C0", marginTop: 8 }}>
        Our homepage · www.apexcurtains.com
      </Text>
      <Text
        hyphenationCallback={(word) => [word]}
        style={{
          fontFamily: "Times-Roman",
          fontSize: p.job.data.customerName.length > 80 ? 18 : 24,
          lineHeight: 1.2,
          marginTop: 42,
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
function BrochureWindow({
  p,
  w,
  index,
}: {
  p: Props;
  w: SurveyWindow;
  index: number;
}) {
  const palette = brochurePalette(w);
  const track = selectedTrack(w);
  const sitePhoto = p.job.data.photoPermission && imageFor(p, w);
  const fabricPhoto = imageFor(p, w, "fabric");
  const example = interiorExample(w);
  return (
    <>
      <Page size="A4" style={s.page}>
        <Brand />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderColor: C.gold,
            paddingTop: 12,
          }}
        >
          <Text style={s.kicker}>
            THE ROOMS / {String(index).padStart(2, "0")}
          </Text>
          <Text style={s.small}>
            {w.name} · {shapeName(w)}
          </Text>
        </View>
        <Text
          id={`window-${w.id}`}
          style={[s.title, { fontSize: 42, marginBottom: 14 }]}
        >
          {w.room}
        </Text>
        {sitePhoto ? (
          <Image
            src={sitePhoto}
            style={{
              width: "100%",
              height: 235,
              objectFit: sitePhoto ? "contain" : "cover",
              backgroundColor: "#E9E5DD",
            }}
          />
        ) : (
          <View
            style={{
              height: 180,
              padding: 20,
              backgroundColor: "#EDE7DB",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WindowDrawing w={w} compact />
          </View>
        )}
        <Text style={[s.small, { marginTop: 7 }]}>
          {sitePhoto
            ? "Your window · photographed during your consultation"
            : "Your window shape · the chosen design is recorded on the following pages"}
        </Text>
        <Text
          style={[
            s.quote,
            { fontSize: 16, lineHeight: 1.4, marginTop: 12, marginBottom: 14 },
          ]}
        >
          {roomIntroduction(w)}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {designStory(w).map((item, i) => (
            <View
              key={item.label}
              wrap={false}
              style={{
                width: "50%",
                padding: 12,
                borderWidth: 3,
                borderColor: C.paper,
                backgroundColor: i === 0 ? "#E1E7DA" : "#EDF0E7",
              }}
            >
              <Text style={[s.label, { color: C.gold, marginBottom: 6 }]}>
                {item.label}
              </Text>
              <Text style={{ fontSize: 9.2, lineHeight: 1.45 }}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
        <Footer job={p.job} draft={p.draft} />
      </Page>
      <Page size="A4" style={s.page}>
        <Brand />
        <Motif name="scroll" />
        <Text style={s.kicker}>
          {String(index).padStart(2, "0")} / {w.room} / {w.name} / SPECIFICATION
        </Text>
        <Text style={s.title}>Every choice, together.</Text>
        <Text style={s.body}>
          The fabric, proportions and finishing details selected for{" "}
          {w.name.toLowerCase() || "your window"}. Keep this record with your
          collection for future advice and additions.
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 7,
          }}
        >
          {brochureSpecificationSections(w).map((section) => (
            <View
              key={section.id}
              wrap={section.id === "notes"}
              style={{
                width:
                  section.id === "track" || section.id === "notes"
                    ? "100%"
                    : 249,
                padding: 14,
                borderWidth: 0.6,
                borderColor: "#CFD9CB",
                borderTopWidth: 3,
                borderTopColor: C.forest,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Text
                style={{
                  fontFamily: "Times-Roman",
                  fontSize: 19,
                  lineHeight: 1.2,
                  color: C.forest,
                  marginBottom: 10,
                }}
                minPresenceAhead={45}
              >
                {section.title}
              </Text>
              <View
                style={{
                  flexDirection: section.id === "track" ? "row" : "column",
                  gap: section.id === "track" ? 18 : 0,
                }}
              >
                {section.id === "track" &&
                track &&
                p.trackPhotos?.[track.id] ? (
                  <Image
                    src={p.trackPhotos[track.id]}
                    style={{ width: 115, height: 83, objectFit: "contain" }}
                  />
                ) : null}
                <View style={{ flex: section.id === "track" ? 1 : undefined }}>
                  {section.items.map((detail) => (
                    <View key={detail.label} style={{ marginBottom: 8 }}>
                      <Text
                        style={{
                          fontSize: 7,
                          lineHeight: 1.2,
                          textTransform: "uppercase",
                          letterSpacing: 0.4,
                          color: "#62746A",
                          marginBottom: 3,
                        }}
                        minPresenceAhead={20}
                      >
                        {detail.label}
                      </Text>
                      <Text
                        style={{ fontSize: 9.5, lineHeight: 1.4, color: C.ink }}
                      >
                        {detail.value}
                      </Text>
                    </View>
                  ))}
                  {section.id === "track" &&
                  track &&
                  p.trackPhotos?.[track.id] ? (
                    <Text
                      style={{ fontSize: 7, lineHeight: 1.4, color: C.muted }}
                    >
                      {track.caption} Photograph: Forest Group.
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          ))}
        </View>
        {w.type === "apex" && w.apexShape === "other" ? (
          <View style={{ marginTop: 18 }}>
            <Text style={s.h2} minPresenceAhead={45}>
              Your window, in detail.
            </Text>
            <Text style={s.body}>{w.otherShapeMeasurements}</Text>
          </View>
        ) : null}
        <Footer job={p.job} draft={p.draft} />
      </Page>
      <Page size="A4" style={s.page}>
        <Brand />
        <Motif name="palette" />
        <Text style={s.kicker}>
          {String(index).padStart(2, "0")} / {w.room} / {w.name} / COLOUR &
          INTERIORS
        </Text>
        <Text style={s.title}>The room beyond the curtains.</Text>
        <Text style={[s.h2, { marginTop: 0, fontSize: 20 }]}>
          {palette.name}
        </Text>
        <Text style={s.body}>{palette.basis}</Text>
        <View
          style={{ flexDirection: "row", gap: 16, marginVertical: 8 }}
          wrap={false}
        >
          <View style={{ width: "46%" }}>
            {fabricPhoto ? (
              <Image
                src={fabricPhoto}
                style={{
                  width: "100%",
                  height: 115,
                  objectFit: "contain",
                  backgroundColor: "#E9E5DD",
                }}
              />
            ) : (
              <View
                style={{
                  height: 115,
                  padding: 22,
                  backgroundColor: C.forest,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Times-Roman",
                    fontSize: 23,
                    lineHeight: 1.3,
                    color: C.paper,
                  }}
                >
                  {w.fabric || "Your chosen cloth"}
                </Text>
                <Text style={{ color: "#DACCAD", fontSize: 12, marginTop: 14 }}>
                  {w.colour}
                </Text>
              </View>
            )}
            <Text style={[s.label, { marginTop: 10 }]}>
              {fabricPhoto
                ? "YOUR ACTUAL FABRIC PHOTOGRAPH"
                : "YOUR FABRIC SELECTION"}
            </Text>
            <Text style={s.value}>
              {w.fabric} · {w.colour}
            </Text>
            <Text style={s.small}>
              {w.supplier} · {w.fabricCode}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {palette.colours.map((col, i) => (
              <View
                key={col}
                style={{ flexDirection: "row", gap: 12, marginBottom: 7 }}
              >
                <View style={{ width: 58, height: 36, backgroundColor: col }} />
                <View style={{ flex: 1, paddingTop: 3 }}>
                  <Text style={s.value}>{palette.names[i]}</Text>
                  <Text style={s.small}>
                    {
                      [
                        "The backdrop",
                        "The soft layers",
                        "The finishing accent",
                      ][i]
                    }
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <Text
          style={[
            s.quote,
            { fontSize: 13, lineHeight: 1.4, marginTop: 4, marginBottom: 10 },
          ]}
        >
          {palette.advice}
        </Text>
        <View
          wrap={false}
          style={{
            backgroundColor: "#E1E7DA",
            borderLeftWidth: 3,
            borderLeftColor: C.forest,
            padding: 14,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Times-Roman",
              fontSize: 19,
              lineHeight: 1.2,
              color: C.forest,
              marginBottom: 8,
            }}
          >
            {example.title}
          </Text>
          <Text style={{ fontSize: 10, lineHeight: 1.5 }}>{example.text}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
          {[
            { title: "Try it in your light", text: example.light },
            { title: "Connect the finishing details", text: example.finish },
          ].map((item) => (
            <View
              key={item.title}
              wrap={false}
              style={{ width: 249, padding: 12, backgroundColor: "#EDF0E7" }}
            >
              <Text style={[s.label, { color: C.forest, marginBottom: 6 }]}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 9, lineHeight: 1.45 }}>{item.text}</Text>
            </View>
          ))}
        </View>
        <Text style={[s.small, { marginTop: 8 }]}>{paletteSampleNote}</Text>
        <Footer job={p.job} draft={p.draft} />
      </Page>
    </>
  );
}

function Brochure(p: Props) {
  const d = p.job.data;
  const rooms = brochureRooms(d.windows);
  const orderedWindows = rooms.flatMap((room) => room.windows);
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
            marginTop: 10,
            paddingVertical: 18,
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
              { textAlign: "center", fontSize: 32, lineHeight: 1.15 },
            ]}
          >
            Your home.{"\n"}Your collection.
          </Text>
          <Text
            style={[
              s.label,
              { textAlign: "center", marginTop: 8, marginBottom: 10 },
            ]}
          >
            Prepared exclusively for
          </Text>
          <Motif name="scroll" size={28} />
          <Text
            hyphenationCallback={(word) => [word]}
            style={{
              fontFamily: "Times-Roman",
              fontSize: client.value.length > 80 ? 21 : 25,
              lineHeight: 1.2,
              textAlign: "center",
              color: C.forest,
              marginBottom: 18,
            }}
          >
            {client.value}
          </Text>
          <Motif name="home" size={27} />
          <Text
            style={{
              fontSize: 10.5,
              lineHeight: 1.5,
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
              fontSize: 16,
              lineHeight: 1.4,
              textAlign: "center",
              marginTop: 20,
              marginBottom: 16,
            },
          ]}
        >
          A home is made personal by the things chosen with care. This
          collection has been composed for yours, with every fabric, fold and
          finishing touch considered together.
        </Text>
        <Text style={[s.body, { textAlign: "center", marginTop: 22 }]}>
          With warmest wishes,{"\n"}The Apex Curtains team
        </Text>
        <Footer job={p.job} draft={p.draft} />
      </Page>
      <Page size="A4" style={s.page}>
        <Brand />
        <Motif name="cloth" />
        <Text style={s.kicker}>THE LANGUAGE OF FOLDS</Text>
        <Text style={s.title}>
          Three headings. Each with its own character.
        </Text>
        <Text style={s.body}>
          A small guide to the finishing styles on our website. These examples
          illustrate the headings; your selected style, cloth and colour remain
          those recorded in your room specification.
        </Text>
        {headingGallery.map((item, i) => (
          <View
            key={item.id}
            wrap={false}
            style={{
              flexDirection: "row",
              gap: 20,
              paddingVertical: 13,
              borderTopWidth: 0.6,
              borderColor: C.line,
            }}
          >
            {p.illustrations?.[item.id] ? (
              <Image
                src={p.illustrations[item.id]}
                style={{
                  width: 210,
                  height: 130,
                  objectFit: "cover",
                  objectPositionY: item.id === "pencil" ? "70%" : "50%",
                }}
              />
            ) : null}
            <View style={{ flex: 1, paddingTop: 8 }}>
              <Text style={s.label}>0{i + 1} / HEADING STUDY</Text>
              <Text style={[s.h2, { fontSize: 21, marginTop: 6 }]}>
                {item.name}
              </Text>
              <Text style={s.body}>{item.description}</Text>
            </View>
          </View>
        ))}
        <Link
          src={`${apexWebsite}/curtain-headings`}
          style={[s.small, { marginTop: 12, color: C.forest }]}
        >
          Explore the heading guide at apexcurtains.com/curtain-headings
        </Link>
        <Footer job={p.job} draft={p.draft} />
      </Page>
      <Page size="A4" style={s.page}>
        <Brand />
        <View
          style={{
            alignItems: "center",
            marginTop: 30,
            paddingBottom: 26,
            borderBottomWidth: 0.6,
            borderColor: C.gold,
          }}
        >
          <Motif name="home" size={42} />
          <Text style={[s.kicker, { marginTop: 12 }]}>OUR PROMISE TO YOU</Text>
          <Text style={[s.title, { textAlign: "center", fontSize: 44 }]}>
            Respect for{"\n"}your home.
          </Text>
          <Text
            style={[
              s.quote,
              { fontSize: 17, textAlign: "center", marginBottom: 0 },
            ]}
          >
            {homePromise.introduction}
          </Text>
        </View>
        {homePromise.details.map((item, i) => (
          <View
            key={item.label}
            wrap={false}
            style={{ flexDirection: "row", gap: 18, paddingTop: 25 }}
          >
            <Motif name={(["care", "sparkle", "home"] as const)[i]} size={27} />
            <View style={{ flex: 1 }}>
              <Text style={[s.h2, { fontSize: 20, marginTop: 0 }]}>
                {item.label}
              </Text>
              <Text style={s.body}>{item.value}</Text>
            </View>
          </View>
        ))}
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
        {p.illustrations?.swatches ? (
          <Image
            src={p.illustrations.swatches}
            style={{
              width: "100%",
              height: 155,
              objectFit: "cover",
              marginVertical: 12,
            }}
          />
        ) : null}
        {contactDetails.length ? (
          <View style={s.grid}>
            {contactDetails.map((detail) => (
              <Field key={detail.label} {...detail} />
            ))}
          </View>
        ) : null}
        <Footer job={p.job} draft={p.draft} />
      </Page>
      {d.windows.length > 1 ? (
        <Page size="A4" style={s.page}>
          <Brand />
          <Motif name="home" />
          <Text style={s.kicker}>YOUR COLLECTION AT A GLANCE</Text>
          <Text style={s.title}>Your home, room by room.</Text>
          <Text style={s.body}>
            {rooms.length} {rooms.length === 1 ? "room" : "rooms"} ·{" "}
            {d.windows.length} individually considered windows. Select a window
            below to turn to its design, specification and colour advice.
            Aftercare and your voucher follow at the end.
          </Text>
          {rooms.map((room) => (
            <View key={room.room} style={{ marginTop: 10 }}>
              <Text
                style={[s.h2, { marginTop: 0, fontSize: 22 }]}
                minPresenceAhead={70}
              >
                {room.room}
              </Text>
              {room.windows.map((w) => (
                <View
                  key={w.id}
                  wrap={false}
                  style={{
                    backgroundColor: "#E1E7DA",
                    padding: 10,
                    marginBottom: 8,
                    borderLeftWidth: 3,
                    borderLeftColor: C.forest,
                  }}
                >
                  <Link
                    src={`#window-${w.id}`}
                    style={{
                      color: C.forest,
                      fontSize: 14,
                      lineHeight: 1.3,
                      fontFamily: "Times-Roman",
                      textDecoration: "none",
                    }}
                  >
                    {String(
                      orderedWindows.findIndex((item) => item.id === w.id) + 1,
                    ).padStart(2, "0")}{" "}
                    / {w.name}
                  </Link>
                  <Text
                    style={{ fontSize: 8.5, lineHeight: 1.4, marginTop: 5 }}
                  >
                    {shapeName(w)} · {w.fabric} · {w.colour} · {w.heading}
                  </Text>
                </View>
              ))}
            </View>
          ))}
          <Footer job={p.job} draft={p.draft} />
        </Page>
      ) : null}
      {orderedWindows.map((w, index) => (
        <BrochureWindow key={w.id} p={p} w={w} index={index + 1} />
      ))}
      <Page size="A4" style={s.page}>
        <Brand />
        <Motif name="home" />
        <Text style={s.kicker}>FROM OUR WORKROOM TO YOUR HOME</Text>
        <Text style={s.title}>The day it all comes together.</Text>
        <Text style={s.body}>
          {d.fittingDate
            ? `Your recorded installation arrangements: ${d.fittingDate}.`
            : "Your installation arrangements will be confirmed with Apex."}{" "}
          A little preparation makes space for the final details.
        </Text>
        {p.illustrations?.swatches ? (
          <Image
            src={p.illustrations.swatches}
            style={{
              width: "100%",
              height: 165,
              objectFit: "cover",
              marginBottom: 16,
            }}
          />
        ) : null}
        {installationGuide.map((item, i) => (
          <View
            key={item.label}
            wrap={false}
            style={{
              flexDirection: "row",
              gap: 18,
              paddingVertical: 15,
              borderTopWidth: 0.5,
              borderColor: C.line,
            }}
          >
            <Text
              style={{
                fontFamily: "Times-Roman",
                fontSize: 30,
                color: C.gold,
                width: 35,
              }}
            >
              0{i + 1}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={[s.h2, { fontSize: 20, marginTop: 0 }]}>
                {item.label}
              </Text>
              <Text style={[s.body, { marginBottom: 0 }]}>{item.value}</Text>
            </View>
          </View>
        ))}
        <Footer job={p.job} draft={p.draft} />
      </Page>
      {brochureCareGuide.map((group) => (
        <Page size="A4" style={s.page} key={group.id}>
          <Brand />
          <Text style={s.kicker}>{group.eyebrow}</Text>
          <Text style={s.title}>{group.title}</Text>
          <Text style={s.body}>{group.introduction}</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 14,
              marginTop: 12,
            }}
          >
            {group.sections.map((section, index) => (
              <View
                key={section.title}
                wrap={false}
                style={{
                  width: 248,
                  padding: group.id === "living" ? 12 : 18,
                  minHeight: group.id === "living" ? 165 : 245,
                  backgroundColor: index === 0 ? "#E1E7DA" : "#EDF0E7",
                  borderTopWidth: 2,
                  borderColor: C.gold,
                }}
              >
                <Motif
                  name={section.icon}
                  size={group.id === "living" ? 30 : 42}
                />
                <Text
                  style={[
                    s.h2,
                    {
                      fontSize: group.id === "living" ? 16 : 19,
                      marginTop: 2,
                      marginBottom: 9,
                    },
                  ]}
                >
                  {section.title}
                </Text>
                <Text
                  style={{
                    fontSize: group.id === "living" ? 9 : 9.5,
                    lineHeight: 1.5,
                  }}
                >
                  {section.text}
                </Text>
              </View>
            ))}
          </View>
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
        <Motif name="globe" />
        <Text style={s.kicker}>MORE TO DISCOVER ONLINE</Text>
        <Text style={s.title}>Ideas for a home that feels like you.</Text>
        <Text style={s.body}>
          A few pages from our website to return to whenever you are gathering
          ideas. Explore the textures, colours and careful making behind the
          collection.
        </Text>
        {websiteFeatures.map((item) => (
          <View
            key={item.id}
            wrap={false}
            style={{
              flexDirection: "row",
              gap: 20,
              paddingVertical: 16,
              borderTopWidth: 0.6,
              borderColor: C.line,
            }}
          >
            {p.illustrations?.[item.id] ? (
              <Image
                src={p.illustrations[item.id]}
                style={{
                  width: 205,
                  height: 125,
                  objectFit:
                    item.id === "colour" || item.id === "studio"
                      ? "contain"
                      : "cover",
                }}
              />
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={[s.h2, { fontSize: 21, marginTop: 0 }]}>
                {item.title}
              </Text>
              <Text style={[s.body, { fontSize: 9.2 }]}>
                {item.description}
              </Text>
              <Link
                src={`${apexWebsite}${item.path}`}
                style={{ fontSize: 8.5, color: C.forest, marginBottom: 6 }}
              >
                Visit this page
              </Link>
              <Text style={[s.small, { fontSize: 7 }]}>{item.caption}</Text>
            </View>
          </View>
        ))}
        <Footer job={p.job} draft={p.draft} />
      </Page>
      <Page size="A4" style={s.page}>
        <Brand />
        <View style={{ alignItems: "center", marginTop: 12 }}>
          <Motif name="gift" size={30} />
          <Text style={s.kicker}>A LITTLE SOMETHING FOR ANOTHER ROOM</Text>
          <Text style={[s.title, { textAlign: "center", fontSize: 36 }]}>
            Your next beautiful idea.
          </Text>
          <Text style={[s.body, { textAlign: "center", marginBottom: 15 }]}>
            {d.customerName
              ? `${d.customerName}, this is for you.`
              : "A personal gift from Apex."}{" "}
            When another room calls for a little care, we would love to be part
            of its story.
          </Text>
        </View>
        <View wrap={false}>
          {p.illustrations?.voucher ? (
            <Image
              src={p.illustrations.voucher}
              style={{
                width: "100%",
                height: d.voucherDetails.length > 250 ? 190 : 260,
                objectFit: "contain",
              }}
            />
          ) : (
            <Text style={s.title}>10% off any future order</Text>
          )}
          <View
            style={{
              alignItems: "center",
              paddingVertical: 16,
              borderBottomWidth: 0.6,
              borderColor: C.gold,
            }}
          >
            <Text style={s.label}>YOUR PERSONAL VOUCHER CODE</Text>
            <Text style={{ fontSize: 13, letterSpacing: 1, marginTop: 4 }}>
              APEX10-{p.job.reference.replace(/^APX-/, "")}
            </Text>
          </View>
          <Text style={[s.small, { marginTop: 10, textAlign: "center" }]}>
            Quote your code when arranging your next order with Apex Curtains.
          </Text>
        </View>
        {d.voucherDetails ? (
          <Text style={s.small}>{d.voucherDetails}</Text>
        ) : null}
        <View wrap={false} style={{ alignItems: "center", marginTop: 18 }}>
          <Motif name="globe" size={22} />
          <Text
            style={{
              fontFamily: "Times-Roman",
              fontSize: 25,
              lineHeight: 1.3,
              color: C.forest,
              textDecoration: "none",
              marginBottom: 10,
            }}
          >
            <Link
              src={apexWebsite}
              style={{ color: C.forest, textDecoration: "none" }}
            >
              www.apexcurtains.com
            </Link>
          </Text>
          <Text style={s.small}>hello@apexcurtains.com · 0800 772 0367</Text>
        </View>
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
        const notes = [
          w.direction,
          w.patternNotes,
          w.cuttingPlan,
          w.offcutNotes,
          w.measurementNotes,
          w.designNotes,
        ].filter(Boolean);
        const photos = p.assets.filter(
          (a) => a.window_id === w.id && p.photos[a.id],
        );
        const details = [
          [
            "Fabric",
            `${w.supplier} · ${w.fabric} · ${w.fabricCode} · ${w.colour}`,
          ],
          [
            "Heading & panels",
            `${w.heading} · ${w.fullness}× fullness · ${w.panelCount} panel(s) · ${w.opening}`,
          ],
          [
            "Pattern",
            `${w.pattern}; vertical repeat ${w.repeatMm} mm; horizontal ${w.horizontalRepeatMm} mm; motif allowance ${w.motifAllowanceMm} mm${q.manual ? ". Use the approved matching plan in the reference notes." : ""}`,
          ],
          [
            "Width allowances",
            `Side hems ${w.sideHemMm} mm; seams ${w.seamMm} mm; returns ${w.returnsMm} mm; overlap ${w.overlapMm} mm`,
          ],
          [
            "Length & lining",
            `${lengthLabel(w)} · ${w.lining} · ${w.liningCode} · ${w.liningColour}${w.interlining ? ` · Interlining: ${w.interlining}, ${w.interliningMetres} m` : ""}`,
          ],
          [
            "Tiebacks",
            `${w.tiebackCount} × ${w.tiebacks || "None"}${w.tiebackCount ? ` · ${w.tiebackColour}` : ""}${w.tiebackPosition ? ` · ${w.tiebackPosition}` : ""}`,
          ],
          [
            "Hooks / holdbacks",
            `${w.hookCount} × ${w.hooks || "None"}${w.hookCount ? ` · ${w.hookColour}` : ""}`,
          ],
          [
            "Track",
            `${w.track} · ${w.trackColour}${w.trackComponents ? ` · ${w.trackComponents}` : ""}`,
          ],
        ];
        return (
          <Fragment key={w.id}>
            <Page size="A4" style={[s.page, { backgroundColor: "#FFFFFF" }]}>
              <Brand />
              <Text style={s.kicker}>WORKROOM / {w.name}</Text>
              <Text style={[s.title, { fontSize: 28, marginBottom: 12 }]}>
                {w.room}
              </Text>
              <Text style={s.small}>
                {p.job.data.customerName} · {p.job.reference} · All cutting
                dimensions in millimetres
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 14,
                  marginTop: 8,
                  marginBottom: 20,
                }}
              >
                {[
                  {
                    label: "FACE FABRIC",
                    metres: q.fabricMetres,
                    widths: q.widths,
                    cut: q.cutMm,
                    drop: w.longDropMm,
                    allowance: q.hemAllowanceMm,
                    roll: w.fabricWidthMm,
                    extra: w.extraFabricMetres,
                  },
                  {
                    label: "LINING",
                    metres: q.liningMetres,
                    widths: q.liningWidths,
                    cut: q.liningCutMm,
                    drop: q.liningDropMm,
                    allowance: q.liningAllowanceMm,
                    roll: w.liningWidthMm,
                    extra: w.extraLiningMetres,
                  },
                ].map((item) => (
                  <View
                    key={item.label}
                    style={{
                      flex: 1,
                      padding: 17,
                      backgroundColor: "#F4F3EF",
                      borderTopWidth: 2,
                      borderColor: C.gold,
                    }}
                    wrap={false}
                  >
                    <Text style={s.label}>{item.label} / ORDER</Text>
                    <Text
                      style={{
                        fontFamily: "Helvetica-Bold",
                        fontSize: 25,
                        lineHeight: 1.3,
                        marginVertical: 9,
                      }}
                    >
                      {item.metres.toFixed(2)} m
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Helvetica-Bold",
                        marginBottom: 8,
                      }}
                    >
                      {item.widths} widths × {item.cut} mm
                    </Text>
                    <Text style={{ fontSize: 9, lineHeight: 1.6 }}>
                      {`Roll width: ${item.roll} mm\nFinished drop: ${item.drop} mm\nTop + bottom allowance: ${item.allowance} mm\nExtra ordered: ${item.extra} m`}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={s.small}>
                {w.automaticLining
                  ? `Lining order matches face fabric${w.extraLiningMetres ? " plus the recorded extra lining" : ""}. Lining cutting requirement: ${q.liningCuttingMetres.toFixed(2)} m. `
                  : ""}
                Use the longest drop across the full rectangle. Do not deduct
                apex offcuts. Pattern cuts include the recorded matching
                allowance.
              </Text>
              <Text style={[s.h2, { fontSize: 18, marginTop: 12 }]}>
                01 / Window measurements
              </Text>
              <Text style={s.body}>{geometryMeasurements(w)}.</Text>
              <Text style={s.small}>{geometrySlants(w)}</Text>
              <Text style={[s.h2, { fontSize: 18, marginTop: 10 }]}>
                02 / Making & finishing
              </Text>
              {details.map(([label, value]) => (
                <View
                  key={label}
                  wrap={false}
                  style={{
                    flexDirection: "row",
                    paddingVertical: 8,
                    borderBottomWidth: 0.5,
                    borderColor: C.line,
                  }}
                >
                  <Text style={{ width: 120, fontSize: 9, color: C.muted }}>
                    {label}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 10, lineHeight: 1.45 }}>
                    {value}
                  </Text>
                </View>
              ))}
              <Footer job={p.job} draft={p.draft} />
            </Page>
            {notes.length || photos.length || w.apexShape === "other" ? (
              <Page size="A4" style={[s.page, { backgroundColor: "#FFFFFF" }]}>
                <Brand />
                <Text style={s.kicker}>WORKROOM REFERENCE / {w.name}</Text>
                <Text style={[s.title, { fontSize: 28 }]}>
                  {w.room} · notes & photographs
                </Text>
                {w.apexShape === "other" && w.otherShapeMeasurements ? (
                  <View wrap={false}>
                    <Text style={s.h2}>Other shape measurements</Text>
                    <Text style={s.body}>{w.otherShapeMeasurements}</Text>
                  </View>
                ) : null}
                {notes.map((note, i) => (
                  <View
                    key={i}
                    wrap={false}
                    style={{
                      paddingVertical: 12,
                      borderBottomWidth: 0.5,
                      borderColor: C.line,
                    }}
                  >
                    <Text style={s.body}>{note}</Text>
                  </View>
                ))}
                {photos.map((a) => (
                  <View key={a.id} wrap={false} style={{ marginTop: 20 }}>
                    <Text style={s.label}>{a.kind} photograph</Text>
                    <Image
                      src={p.photos[a.id]}
                      style={{
                        width: "100%",
                        height: 230,
                        objectFit: "contain",
                        marginTop: 8,
                      }}
                    />
                    <Text style={s.small}>{a.caption}</Text>
                  </View>
                ))}
                <Footer job={p.job} draft={p.draft} />
              </Page>
            ) : null}
          </Fragment>
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
              value={`${w.accessHeightMm} mm working height; ${w.mountingSurface}`}
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
