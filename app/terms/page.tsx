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
      section3Title="Limitations"
      section3Text="We aim to provide clear and accurate information, but bespoke projects vary and final outcomes depend on confirmed details."
    />
  );
}