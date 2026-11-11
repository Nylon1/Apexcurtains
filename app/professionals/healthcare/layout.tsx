import Link from "next/link";
import {
  ShortlistProvider,
  ShortlistLink,
} from "@/components/healthcare/Shortlist";
import { HEALTHCARE_ROOT } from "@/lib/healthcare/catalogue";
import "./healthcare.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ShortlistProvider>
      <main className="healthcare">
        <div className="hc-subnav">
          <Link className="hc-wordmark" href={HEALTHCARE_ROOT}>
            APEX <span>HEALTHCARE</span>
          </Link>
          <nav aria-label="Healthcare">
            <Link href={`${HEALTHCARE_ROOT}#solutions`}>Solutions</Link>
            <Link href={`${HEALTHCARE_ROOT}/fabrics`}>Fabric collection</Link>
            <Link href={`${HEALTHCARE_ROOT}#settings`}>Clinical settings</Link>
            <Link href={`${HEALTHCARE_ROOT}/survey-installation`}>
              Our service
            </Link>
            <ShortlistLink />
          </nav>
        </div>
        {children}
        <div className="hc-footnote">
          Product selection is subject to the facility’s infection-control,
          fire-safety and operational requirements. Final supply, compatibility
          and installation details are confirmed for each project.
        </div>
      </main>
    </ShortlistProvider>
  );
}
