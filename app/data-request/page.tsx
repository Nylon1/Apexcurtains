import InfoPageTemplate from "@/components/layout/InfoPageTemplate";

export default function Page() {
  return (
    <InfoPageTemplate
      title="Data Subject Request"
      breadcrumb="Data Subject Request"
      intro="If you want to access, correct, delete or otherwise request information about your personal data, you can use this page as the starting point."
      section1Title="Types of request"
      section1Text="Common requests include access to stored data, correction of inaccurate data, deletion requests and general privacy-related enquiries."
      section2Title="What to include"
      section2Text="Please include your name, contact details and enough context for us to identify the enquiry safely and respond appropriately."
      section3Title="Response process"
      section3Text="We aim to review requests promptly and respond in line with applicable data protection requirements."
    />
  );
}