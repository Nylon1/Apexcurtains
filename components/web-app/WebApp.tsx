"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { Download, Smartphone, WifiOff, X } from "lucide-react";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};
type AppKind = "public" | "admin";
const AppContext = createContext<{
  kind: AppKind;
  prompt: InstallEvent | null;
  clearPrompt: () => void;
  installed: boolean;
}>({ kind: "public", prompt: null, clearPrompt: () => {}, installed: false });

function subscribeOnline(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}
const onlineSnapshot = () => navigator.onLine;
const serverOnlineSnapshot = () => true;

export function WebAppProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const kind =
    path === "/admin" || path.startsWith("/admin/") ? "admin" : "public";
  // An install offer belongs to the manifest active when the browser created it.
  return (
    <AppSession key={kind} kind={kind}>
      {children}
    </AppSession>
  );
}

function AppSession({
  children,
  kind,
}: {
  children: React.ReactNode;
  kind: AppKind;
}) {
  const [prompt, setPrompt] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    function offer(event: Event) {
      event.preventDefault();
      setPrompt(event as InstallEvent);
    }
    function complete() {
      setPrompt(null);
      setInstalled(true);
    }
    window.addEventListener("beforeinstallprompt", offer);
    window.addEventListener("appinstalled", complete);
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker
        .register("/apex-sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => {
          // The online site remains usable when a browser blocks service workers.
        });
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", offer);
      window.removeEventListener("appinstalled", complete);
    };
  }, []);
  return (
    <AppContext.Provider
      value={{ kind, prompt, clearPrompt: () => setPrompt(null), installed }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function InstallApp({ kind }: { kind: AppKind }) {
  const app = useContext(AppContext);
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  if (app.kind !== kind || app.installed) return null;
  const name = kind === "admin" ? "Apex Admin" : "Apex Curtains";
  async function install() {
    const offer = app.prompt;
    if (!offer) return;
    setBusy(true);
    setMessage("");
    try {
      await offer.prompt();
      const result = await offer.userChoice;
      if (result.outcome === "accepted") dialog.current?.close();
      else setMessage("You can add the app later from your browser menu.");
    } catch {
      setMessage(
        "Use your browser menu to add the app, following the steps below.",
      );
    } finally {
      app.clearPrompt();
      setBusy(false);
    }
  }
  return (
    <div className="apx-install">
      <button
        type="button"
        className="apx-install-trigger"
        onClick={() => dialog.current?.showModal()}
      >
        <Smartphone size={17} aria-hidden="true" /> Install{" "}
        {kind === "admin" ? "admin app" : "Apex app"}
      </button>
      <dialog
        ref={dialog}
        className="apx-install-dialog"
        aria-labelledby={`install-${kind}-title`}
      >
        <button
          type="button"
          className="apx-install-close"
          aria-label="Close installation guide"
          onClick={() => dialog.current?.close()}
        >
          <X size={21} />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/web-apps/${kind}-192.png`}
          width={72}
          height={72}
          alt=""
          className="apx-install-icon"
        />
        <p className="apx-install-eyebrow">{name}</p>
        <h2 id={`install-${kind}-title`}>
          {kind === "admin"
            ? "Your workspace, one tap away."
            : "Inspiration, always close to home."}
        </h2>
        <p>
          {kind === "admin"
            ? "Surveys, client collections, gallery projects and advice posts, together in one app. Sign in with your existing Apex account."
            : "Keep our fabrics, colour ideas, gallery and curtain guides on your home screen."}
        </p>
        {app.prompt ? (
          <button
            type="button"
            className="apx-install-primary"
            disabled={busy}
            onClick={() => void install()}
          >
            <Download size={18} aria-hidden="true" />
            {busy ? "Opening installation…" : `Install ${name}`}
          </button>
        ) : null}
        <div className="apx-install-steps">
          <section>
            <h3>iPhone & iPad</h3>
            <p>
              Open this page in Safari. Tap <strong>Share</strong> (or the page
              menu, then Share), choose <strong>Add to Home Screen</strong>,
              keep <strong>Open as Web App</strong> on if shown, then tap{" "}
              <strong>Add</strong>.
            </p>
          </section>
          <section>
            <h3>Android</h3>
            <p>
              Open this page in Chrome. In the browser menu, choose{" "}
              <strong>Install app</strong> or{" "}
              <strong>Add to Home screen</strong>, then confirm.
            </p>
          </section>
          <section>
            <h3>Computer</h3>
            <p>
              Use the install icon in Chrome or Edge’s address bar, or the
              browser menu’s app installation option. In Safari on Mac, choose{" "}
              <strong>File → Add to Dock</strong>.
            </p>
          </section>
        </div>
        <p className="apx-install-online">
          Internet is required.{" "}
          {kind === "admin"
            ? "Wait for your changes to save before closing the app. Photos and documents also need a connection."
            : "Connect to browse the website, use the visualiser and send enquiries."}
        </p>
        {message ? (
          <p role="status" className="apx-install-status">
            {message}
          </p>
        ) : null}
      </dialog>
    </div>
  );
}

export function AdminConnectionNotice() {
  const online = useSyncExternalStore(
    subscribeOnline,
    onlineSnapshot,
    serverOnlineSnapshot,
  );
  if (online) return null;
  return (
    <div className="apx-connection" role="status">
      <WifiOff size={20} aria-hidden="true" />
      <p>
        <strong>You’re offline.</strong> Keep this screen open and reconnect
        before continuing. Changes are not saved until the app confirms they are
        saved. In the Atelier, use Save changes after reconnecting. Photos and
        documents need internet too.
      </p>
    </div>
  );
}
