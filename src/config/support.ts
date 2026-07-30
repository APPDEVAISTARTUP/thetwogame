/**
 * Central configuration for TWO's support / crowdfunding page.
 * Everything here is safe to edit — no code changes required.
 */

/** UPI ID that receives donations. Replace with your real VPA. */
export const UPI_ID = "shadestudios@upi";

/** Name shown inside the UPI app when a supporter pays. */
export const UPI_PAYEE_NAME = "Shade Studios";

/** Funding goal in INR. */
export const FUNDING_GOAL = 200000;

/** Amount raised so far in INR. Update this as donations come in. */
export const FUNDING_RAISED = 18500;

/** Official social + contact links. */
export const LINKS = {
  instagram: "https://www.instagram.com/shadestudios.in",
  discord: "https://discord.gg/two",
  youtube: "https://youtube.com",
  steam: "https://store.steampowered.com",
  email: "hello@twogame.in",
};

export function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

/** Builds a UPI deep link that opens GPay / PhonePe / Paytm / BHIM. */
export function buildUpiLink(amount?: number) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    cu: "INR",
    tn: "Support TWO",
  });
  if (amount && amount > 0) params.set("am", String(amount));
  return `upi://pay?${params.toString()}`;
}