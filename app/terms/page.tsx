import InfoPageTemplate from "@/components/layout/InfoPageTemplate";

export default function Page() {
  return (
    <InfoPageTemplate
      title="Terms and Conditions"
      breadcrumb="Terms and Conditions"
      intro="These terms explain the basis on which Apex Curtains provides website information, guidance and related services."
      section1Title="General use"
      section1Text="Website content is provided for general guidance and may be updated over time. Final specifications and quotations depend on the actual project."
      section2Title="Quotations and advice"
      section2Text="Indicative guidance does not replace a full assessment. Final recommendations may change depending on measurements, window conditions and client choices."
      section3Title="Made-to-measure orders and consumer rights"
      section3Text="Bespoke curtain orders are governed by the specific written quotation, agreed window specifications and the customer terms supplied before an order is confirmed. Please tell us promptly about any concerns after installation so we can investigate. No 48-hour reporting deadline limits your statutory rights to satisfactory goods and services performed with reasonable care and skill."
    />
  );
}