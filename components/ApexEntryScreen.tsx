"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ApexEntryScreen() {
  const [showEntry, setShowEntry] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const hasSeenEntry = sessionStorage.getItem("apex-entry-seen");

    if (hasSeenEntry) {
      setShowEntry(false);
    }
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem("apex-entry-seen", "true");
    setShowEntry(false);
  };

  return (
    <AnimatePresence>
      {showEntry && (
        <motion.section
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-black text-white"
        >
          {/* Poster image loads immediately */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/apex-entry-poster.jpeg')",
            }}
          />

          {/* Video fades in only when ready */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/videos/apex-entry.mp4" type="video/mp4" />
          </video>

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,176,109,0.10),transparent_45%)]" />

          {/* Subtle glow */}
          <motion.div
            animate={{ opacity: [0.16, 0.3, 0.16], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6b06d]/10 blur-3xl"
          />

          {/* Main content */}
          <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
            <div className="mx-auto -mt-6 flex max-w-[860px] flex-col items-center text-center sm:-mt-8">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-6 flex flex-col items-center"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center border border-[#d6b06d]/70 text-2xl font-light text-[#d6b06d]">
                  A
                </div>

                <p className="font-serif text-[2rem] leading-none tracking-[0.18em] text-white sm:text-[2.35rem]">
                  APEX
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.45em] text-[#d6b06d] sm:text-xs">
                  Curtains
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-6 max-w-[700px] text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d6b06d] sm:text-xs md:text-sm"
              >
                Award-Winning Specialist Curtains Company
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-[760px] font-serif text-5xl leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                <span className="block">Bespoke Curtains</span>
                <span className="block italic text-[#d6b06d]">
                  for Extraordinary
                </span>
                <span className="block">Windows</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-6 max-w-[640px] text-sm leading-7 text-white/78 sm:text-base sm:leading-8 md:text-lg"
              >
                Beautiful made-to-measure curtains for extraordinary windows
                across the UK.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8"
              >
                <button
                  onClick={handleEnter}
                  className="inline-flex min-w-[220px] items-center justify-center gap-3 bg-gradient-to-r from-[#d6b06d] to-[#efd49f] px-10 py-4 text-xs font-semibold uppercase tracking-[0.30em] text-black shadow-[0_0_40px_rgba(214,176,109,0.20)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(214,176,109,0.32)] sm:text-sm"
                >
                  Enter Site
                  <span>→</span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}