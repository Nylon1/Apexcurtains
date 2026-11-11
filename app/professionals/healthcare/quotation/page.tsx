import EnquiryForm from "@/components/healthcare/EnquiryForm";
import {
  Breadcrumbs,
  healthcareMetadata,
} from "@/components/healthcare/HealthcareShell";
export const metadata = healthcareMetadata(
  "Healthcare Project Quotation",
  "Request a healthcare screening quotation with multiple curtains, tracks, blinds and disposable products. Share plans, sizes and your preferred supply or installation service.",
  "/quotation",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ setting?: string }>;
}) {
  const { setting } = await searchParams;
  return (
    <>
      <div className="hc-page-header">
        <Breadcrumbs current="Project quotation" path="quotation" />
        <p className="hc-eyebrow">A conversation, with the details in place</p>
        <h1>Tell us about your space.</h1>
        <p className="hc-lede">
          Bring your products, room requirements and plans together in one
          enquiry. We’ll help turn the brief into a clear specification and
          quotation.
        </p>
      </div>
      <div className="hc-form-wrap">
        <EnquiryForm
          setting={
            typeof setting === "string" ? setting.slice(0, 300) : undefined
          }
        />
      </div>
    </>
  );
}
