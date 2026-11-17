/**
 * Business details shown on the Terms, Privacy, Refund and Contact pages.
 * Keep these accurate: they are shown on the Contact and legal pages.
 * Empty strings are hidden from the pages.
 */
export const LEGAL = {
  /** Public brand name. */
  brand: "Wildcrown Games",
  /** Legal name of the person or business that receives contributions. */
  operator: "",
  /** Registered / correspondence address. */
  address: "",
  /** Support phone number. */
  phone: "",
  /** Support email. */
  email: "progamedev@gmail.com",
  /** Website these policies apply to. */
  website: "https://www.playtwo.in",
  /** Shown at the top of every policy. */
  lastUpdated: "16 November 2026",
  /** Days within which refund requests for wrong / duplicate payments are accepted. */
  refundRequestDays: 7,
  /** Working days for an approved refund to reach the original payment method. */
  refundProcessingDays: "5–7",
};

export const legalOwner = () =>
  LEGAL.operator ? `${LEGAL.brand} (operated by ${LEGAL.operator})` : LEGAL.brand;
