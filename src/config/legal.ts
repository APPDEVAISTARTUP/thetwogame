/**
 * Business details shown on the Terms, Privacy, Refund and Contact pages.
 * Payment gateways (Razorpay) check that these match your KYC, so keep them accurate.
 * Empty strings are hidden from the pages.
 */
export const LEGAL = {
  /** Public brand name. */
  brand: "Wildcrown Games",
  /** Legal name of the person or business that receives payments (as in Razorpay KYC). */
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
