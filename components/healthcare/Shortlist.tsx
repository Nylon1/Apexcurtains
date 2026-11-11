"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Link from "next/link";
import { HEALTHCARE_ROOT, getProduct } from "@/lib/healthcare/catalogue";

export type Selection = { id: string; quantity: number; sample: boolean };
const Context = createContext<{
  items: Selection[];
  setItems: (items: Selection[]) => void;
  ready: boolean;
}>({ items: [], setItems: () => {}, ready: false });
const EMPTY: Selection[] = [];
let cached: Selection[] = EMPTY;
let lastRaw: string | null | undefined;
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener("apex-shortlist", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("apex-shortlist", listener);
  };
}
function snapshot() {
  try {
    const raw = localStorage.getItem("apex-healthcare-shortlist-v1");
    if (raw !== lastRaw) {
      lastRaw = raw;
      const data: unknown = JSON.parse(raw || "[]");
      cached = Array.isArray(data)
        ? data
            .filter(
              (v) =>
                v &&
                typeof v.id === "string" &&
                getProduct(v.id) &&
                Number.isInteger(v.quantity) &&
                v.quantity > 0 &&
                v.quantity <= 10000 &&
                typeof v.sample === "boolean",
            )
            .slice(0, 40)
        : EMPTY;
    }
  } catch {
    /* Use the session cache when storage is unavailable. */
  }
  return cached;
}
const serverSnapshot = () => EMPTY;
export function ShortlistProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const setItems = (next: Selection[]) => {
    cached = next;
    try {
      lastRaw = JSON.stringify(next);
      localStorage.setItem("apex-healthcare-shortlist-v1", lastRaw);
    } catch {
      /* Session-only shortlist when storage is unavailable. */
    }
    window.dispatchEvent(new Event("apex-shortlist"));
  };
  return (
    <Context.Provider value={{ items, setItems, ready }}>
      {children}
    </Context.Provider>
  );
}
export const useShortlist = () => useContext(Context);
export function ShortlistLink() {
  const { items } = useShortlist();
  return (
    <Link href={`${HEALTHCARE_ROOT}/quotation`}>
      Your project <span className="hc-count">{items.length}</span>
    </Link>
  );
}
export function AddSelection({
  id,
  sample = false,
}: {
  id: string;
  sample?: boolean;
}) {
  const { items, setItems, ready } = useShortlist();
  const selected = items.some((i) => i.id === id && i.sample === sample);
  const [message, setMessage] = useState("");
  return (
    <>
      <button
        type="button"
        className={sample ? "hc-button hc-button-outline" : "hc-button"}
        disabled={!ready || selected}
        onClick={() => {
          if (items.length >= 40) {
            setMessage(
              "Your shortlist holds up to 40 selections. Please review your project.",
            );
            return;
          }
          setItems([...items, { id, quantity: 1, sample }]);
          setMessage(
            sample
              ? "Sample request added to your project."
              : "Added to your project.",
          );
        }}
      >
        {selected
          ? sample
            ? "Sample requested"
            : "Added to project"
          : sample
            ? "Request a sample"
            : "Add to project"}
      </button>
      <span className="hc-sr-only" role="status">
        {message}
      </span>
    </>
  );
}
