"use client";

import { useEffect, useRef, useState, useId } from "react";
import Image from "next/image";
import type { ProjectMedia } from "@/lib/portfolio-types";

function EnlargedPhoto({ photo, onClose }: { photo: ProjectMedia; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  useEffect(() => { dialog.current?.showModal(); }, []);
  return <dialog ref={dialog} className="portfolio-lightbox" aria-label="Enlarged project photograph" aria-describedby={captionId} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
    <button type="button" className="portfolio-close" onClick={() => dialog.current?.close()} autoFocus>Close photograph ×</button>
    <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="95vw" unoptimized={photo.src.startsWith("http")} />
    <p id={captionId}>{photo.caption}</p>
  </dialog>;
}

export default function ProjectPhotograph({ photo, hero = false }: { photo: ProjectMedia; hero?: boolean }) {
  const [open, setOpen] = useState(false);
  return <figure className={`portfolio-photograph${hero ? " portfolio-photograph-hero" : ""}`}>
    <button type="button" className="portfolio-enlarge" aria-label={`Enlarge photograph: ${photo.caption}`} onClick={() => setOpen(true)}>
      <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={hero ? "(max-width: 850px) 90vw, 55vw" : "(max-width: 650px) 90vw, 44vw"} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : undefined} unoptimized={photo.src.startsWith("http")} />
      <span>Enlarge photograph</span>
    </button>
    <figcaption>{photo.caption}</figcaption>
    {open && <EnlargedPhoto photo={photo} onClose={() => setOpen(false)} />}
  </figure>;
}
