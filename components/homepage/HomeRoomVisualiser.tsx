"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RoomVisualiser = dynamic(() => import("@/components/visualiser/RoomVisualiser"), {
  loading: () => <p role="status">Opening the room visualiser…</p>,
});

export default function HomeRoomVisualiser() {
  const [room, setRoom] = useState("");
  return (
    <section id="room-studio" className="studio-wrap front-room-studio" aria-labelledby="home-room-title">
      <h2 id="home-room-title">The room visualiser</h2>
      {room ? (
        <div className="rv-page rv-embedded">
          <RoomVisualiser embedded initialRoom={room} initialColour="linen" initialDesign={{ wall: "original", floor: "original", furniture: "original", lights: "on" }} />
        </div>
      ) : (
        <div className="front-room-launch">
          <Image src="/visualiser/tall-living-room-mobile.webp" width={720} height={1280} sizes="(max-width: 700px) 92vw, 34vw" alt="Pale curtains framing tall rectangular glazing in the room available to customise" />
          <div>
            <h3>See the fabric in the room</h3>
            <p>Choose a shaped or double-height window. Try Oslo curtains with an optional Tranquil voile, then compare the two layers in your room palette.</p>
            <div className="studio-actions">
              <button type="button" className="studio-button" onClick={() => setRoom("tall-living-room")}>Try tall windows</button>
              <button type="button" className="studio-link" onClick={() => setRoom("double-pinch-gable")}>Try shaped windows</button>
            </div>
            <Link className="studio-link" prefetch={false} href="/room-visualiser">Open the full visualiser ↗</Link>
          </div>
        </div>
      )}
    </section>
  );
}
