import InfoPageTemplate from "@/components/layout/InfoPageTemplate";

export const metadata = {
  title: "Privacy Policy",
  description: "How Apex Curtains uses information supplied through website enquiries, including contact details and project information.",
  alternates: { canonical: "https://www.apexcurtains.com/privacy-policy" },
};

export default function Page() {
  return (
    <InfoPageTemplate
      title="Privacy Policy"
      breadcrumb="Privacy Policy"
      intro="This page explains how Apex Curtains collects, uses and protects personal information shared through this website."
      section1Title="What we collect"
      section1Text="We may collect contact details, project information, uploaded images and messages submitted through our forms. Healthcare enquiries include practice details, room dimensions, product selections and supporting plans or photographs. Please do not send patient-identifiable information."
      section2Title="How we use it"
      section2Text="We use submitted information to respond to enquiries, prepare quotations and manage legitimate business communication. Healthcare enquiries and uploads are stored privately with access restricted to authorised Apex staff; our hosting, storage and email providers process them for this purpose. With your agreement, we can retain subsequently approved room and track specifications for repeat quotations. Product shortlists are saved on your device and can be cleared in the healthcare enquiry form. Contact Apex about retention or deletion of an enquiry."
      section3Title="Your rights"
      section3Text="You can contact us to request access to, correction of or deletion of your data, subject to applicable law."
    />
  );
}
