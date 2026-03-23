

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: number;
  title: string;
  location: string;
  category: string;
  room: string;
  heading: string;
  lining: string;
  image: string;
  summary: string;
  brief: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
};

export default function GalleryPage() {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("gallery_projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const mapped: Project[] = (data || []).map((item: any) => ({
          id: Number(item.id),
          title: item.title || "",
          location: item.location || "",
          category: item.category || "",
          room: item.room || "",
          heading: item.heading || "",
          lining: item.lining || "",
          image: item.image_url || "",
          summary: item.summary || "",
          brief: item.brief || "",
          challenge: item.challenge || "",
          solution: item.solution || "",
          result: item.result || "",
          tags: Array.isArray(item.tags) ? item.tags : [],
        }));

        setProjects(mapped);
      } catch (error) {
        console.error("Error loading gallery projects:", error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[8%] top-[8%] h-[320px] w-[320px] rounded-full bg-[#f5d38a]/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[22%] h-[280px] w-[280px] rounded-full bg-sky-400/10 blur-[120px]" />
        <div className="absolute bottom-[8%] left-[35%] h-[260px] w-[260px] rounded-full bg-[#f5d38a]/8 blur-[120px]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f5d38a]/20 bg-[#f5d38a]/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#f5d38a]">
            <Sparkles className="h-4 w-4" />
            Gallery
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
            Architectural curtain projects
            <span className="bg-gradient-to-r from-[#f5d38a] via-white to-[#f5d38a] bg-clip-text text-transparent">
              {" "}presented like case studies
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            Explore apex, triangular, barn conversion and large-window curtain installations across the UK.
            Each project is presented as a visual story, not a basic gallery tile.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              reverse={index % 2 === 1}
              featured={index === 0}
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function ProjectShowcase({
  project,
  reverse,
  featured,
  onOpen,
}: {
  project: Project;
  reverse?: boolean;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
    >
      <div
        className={`grid lg:grid-cols-[1.08fr_0.92fr] ${
          reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
        }`}
      >
        <div className="relative min-h-[380px] lg:min-h-[680px]">
          <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5d38a]/15 via-transparent to-[#f5d38a]/15 blur-3xl" />
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority={featured}
              unoptimized
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

          <div className="absolute inset-0 overflow-hidden opacity-0 transition duration-700 group-hover:opacity-100">
            <div className="absolute -left-[120%] top-0 h-full w-[120%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shine_1.4s]" />
          </div>

          <div className="absolute bottom-0 left-0 z-10 max-w-2xl p-6 sm:p-8 lg:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/75">
              {featured ? "Featured Project" : "Project Case Study"}
            </div>

            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/start-designing"
                className="inline-flex items-center gap-2 rounded-full bg-[#f5d38a] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e6c476]"
              >
                Start designing
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={onOpen}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/85 transition hover:bg-white/10"
              >
                View project
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-white/40">
              Project details
            </div>

            <div className="mt-8 space-y-6">
              <DetailRow label="Location" value={project.location} />
              <DetailRow label="Window type" value={project.category} />
              <DetailRow label="Room" value={project.room} />
              <DetailRow label="Heading" value={project.heading} />
              <DetailRow label="Lining" value={project.lining} />
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-black/20 p-6">
            <div className="text-sm text-white/50">Need something similar?</div>

            <p className="mt-3 text-sm leading-7 text-white/70">
              Start your own design journey and upload a photo of your window to receive tailored advice.
            </p>

            <Link
              href="/start-designing"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#f5d38a]/25 bg-[#f5d38a]/10 px-4 py-2 text-sm text-[#f5d38a] transition hover:bg-[#f5d38a]/15"
            >
              Start designing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] overflow-y-auto bg-black/85 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="mx-auto flex min-h-screen max-w-7xl items-start justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative my-8 w-full overflow-hidden rounded-[34px] border border-white/10 bg-[#0d0d11] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/80 transition hover:bg-black/50"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative flex items-center justify-center py-4 lg:py-6">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 z-10 max-w-2xl p-6 sm:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/80">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </div>

                <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  {project.title}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                  {project.summary}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f5d38a]">
                Project story
              </div>

              <div className="mt-6 space-y-5">
                <StoryBlock
                  label="The Brief"
                  text={project.brief || "The client wanted a bespoke curtain solution that felt luxurious, architectural and fully in keeping with the shape of the space."}
                />

                <StoryBlock
                  label="The Challenge"
                  text={project.challenge || "Unusual apex and angled windows are difficult to dress with ordinary off-the-shelf solutions, especially where privacy, light control and elegance all matter."}
                />

                <StoryBlock
                  label="The Solution"
                  text={project.solution || "We designed and installed a bespoke curtain system tailored to the proportions and angle of the window."}
                />

                <StoryBlock
                  label="The Result"
                  text={project.result || "The completed installation softened the room beautifully, improved comfort and privacy, and turned the window into a true focal point."}
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoCard label="Window type" value={project.category} />
                <InfoCard label="Room" value={project.room} />
                <InfoCard label="Heading" value={project.heading} />
                <InfoCard label="Lining" value={project.lining} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                <div className="text-sm text-white/50">Inspired by this project?</div>

                <p className="mt-3 text-sm leading-7 text-white/72">
                  Start your own curtain design journey and upload a photo of your window for tailored advice from Apex Curtains.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/start-designing"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f5d38a] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e6c476]"
                  >
                    Start designing
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/85 transition hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5 text-sm text-white/55">
                  Have a similar apex or angled window? We can advise on headings, linings and the most suitable curtain system.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 pb-4">
      <div className="text-xs uppercase tracking-[0.18em] text-white/40">
        {label}
      </div>
      <div className="mt-2 text-lg text-white">{value}</div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/25 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </div>
      <div className="mt-3 text-lg font-medium text-white">
        {value}
      </div>
    </div>
  );
}

function StoryBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-xs uppercase tracking-[0.2em] text-[#f5d38a]">
        {label}
      </div>
      <p className="mt-3 text-sm leading-8 text-white/72 sm:text-base">
        {text}
      </p>
    </div>
  );
}