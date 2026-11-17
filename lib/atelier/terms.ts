/**
 * Consumer-facing made-to-measure order terms.
 * Copy these into each new job at creation: approved job revisions must retain
 * the exact wording shown to that customer even when the template is updated.
 * Legal review is required before staff use this as a binding contract.
 */
export const atelierTermsVersion = "2026-11-17";

export const atelierTermsClauses = [
  {
    title: "Your made-to-measure order",
    body: "Your order is made individually to the agreed measurements and written specification in your Apex Curtains collection, including window shapes, fabric, lining, heading, tracks, opening arrangement and accessories. Please check those details before authorising production and tell us promptly about any correction required. An illustrative image or design suggestion does not replace the agreed written specification.",
  },
  {
    title: "Natural fabric and made-to-measure characteristics",
    body: "Fabric colour can look different under daylight, artificial light and screen settings. The pile, weave, texture, drape and folds may vary with viewing angle, natural light, fabric weight and settling after installation. Pattern placement, joins and folds depend on the fabric and the dimensions ordered. We will identify material restrictions or conspicuous limitations before you approve an order. This paragraph does not excuse defects, a material mismatch with an agreed sample or a failure to meet the agreed specification.",
  },
  {
    title: "Apex, triangular and gable-end windows",
    body: "Shaped glazing, angled tracks, unusually high windows and differing drops can affect the way curtains gather, stack back, meet the floor and move. Some shaped installations require fixed sections or a particular opening direction. The actual movement, coverage, tieback positions and any known practical restriction should be recorded in your specification before production. We do not promise a perfectly symmetrical drape where the agreed window geometry is asymmetrical.",
  },
  {
    title: "Blackout lining and light control",
    body: "Blackout lining is designed to reduce light transmission through the lined fabric. Unless a specific light-sealing system and performance standard are expressly included in the written order, some daylight may remain around curtain edges, above the track, at joins and where curtains meet walls or floors, particularly in strong sunlight or on complex apex glazing. We will supply the lining and coverage stated in the agreed specification; this explanation does not excuse defective materials or fitting.",
  },
  {
    title: "Price and payments",
    body: "The agreed total, payments received and remaining balance are shown in your project summary. Our usual arrangement is a 50% deposit to confirm the order and the remainder on installation, unless a different schedule is agreed in writing. We will provide a record of payments. Additional products or work will be charged only if you agree their scope and price in advance. Your legal rights concerning defective goods or services are unaffected.",
  },
  {
    title: "Changes and cancellation",
    body: "Please request changes in writing as soon as possible. Once fabric, materials or manufacture have been committed, changes may involve a revised quotation and reasonable, evidenced costs, which we will explain before proceeding. Where the law provides a change-of-mind cancellation right, it remains available. Truly made-to-your-specification goods are normally excluded from the standard 14-day cancellation right for distance and off-premises sales; this exception does not remove your rights if goods are faulty, misdescribed or the service is not performed with reasonable care and skill. Any agreed discretionary cancellation charge will reflect reasonable losses and costs, not an automatic forfeiture of the whole deposit.",
  },
  {
    title: "Survey, structure and safe fitting",
    body: "Our fitting is based on the accessible conditions observed during the survey. Concealed structures, unsafe access, inadequate fixing support or unforeseen obstructions may require further assessment or a revised fitting method. We will explain the issue and seek your agreement to any additional charge or material change before undertaking it. We remain responsible for exercising reasonable care and skill in assessing and carrying out the contracted work.",
  },
  {
    title: "Lead times, appointments and access",
    body: "Lead times given as estimates may be affected by manufacturing and supplier availability; any expressly agreed firm date remains subject to your legal rights. We will tell you about material delays and discuss reasonable options. Please arrange safe access, clear working space and an authorised person for the agreed visit. Any charge for a missed appointment must be reasonable, notified in advance where practicable, and based on the circumstances and actual loss.",
  },
  {
    title: "Installation, dressing and aftercare",
    body: "At handover we will demonstrate operation and discuss care, curtain dressing and any outstanding snags. Curtains may need careful dressing and time to settle into their natural folds. Follow the sewn-in care labels and the aftercare guide; contact us before attempting an unsuitable cleaning or alteration. We welcome prompt reports of concerns, ideally with photographs, so they can be assessed efficiently. No short reporting period or handover sign-off removes your statutory rights.",
  },
  {
    title: "Concerns, remedies and statutory rights",
    body: "If anything appears wrong, contact hello@apexcurtains.com with your project reference and a description or photographs. We will investigate and arrange an appropriate response. Under the Consumer Rights Act 2015, goods must be of satisfactory quality, fit for purpose and as described; installation services must be performed with reasonable care and skill. Nothing in these terms excludes or restricts your statutory remedies for defects, inadequate services or other legal rights.",
  },
] as const;

export const atelierTermsText = atelierTermsClauses
  .map((clause, i) => `${i + 1}. ${clause.title}\n${clause.body}`)
  .join("\n\n");
