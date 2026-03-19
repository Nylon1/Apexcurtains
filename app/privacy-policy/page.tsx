import InfoPageTemplate from "@/components/layout/InfoPageTemplate";

export default function Page() {
  return (
    <InfoPageTemplate
      title="Privacy Policy"
      breadcrumb="Privacy Policy"
      intro="This page explains how Apex Curtains collects, uses and protects personal information shared through this website."
      section1Title="What we collect"
      section1Text="We may collect contact details, project information, uploaded images and messages submitted through our forms."
      section2Title="How we use it"
      section2Text="We use submitted information to respond to enquiries, provide guidance, improve service and manage legitimate business communication."
      section3Title="Your rights"
      section3Text="You can contact us to request access to, correction of or deletion of your data, subject to applicable law."
    />
  );
}