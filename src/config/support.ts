/**
 * Central configuration for TWO's support / crowdfunding page.
 * Everything here is safe to edit — no code changes required.
 */

export const SUPPORT_URL = "https://buymeagoddie.vercel.app/wildcrowngames";

/** Funding goal in INR. */
export const FUNDING_GOAL = 200000;

/**
 * Money raised outside Razorpay (e.g. earlier UPI transfers), in INR.
 * The support page adds every paid Razorpay donation on top of this.
 */
export const FUNDING_RAISED_OFFLINE = 0;

/** Donation limits for Razorpay Checkout, in INR. */
export const MIN_DONATION_INR = 10;
export const MAX_DONATION_INR = 500000;

/** Official social + contact links. */
export const LINKS = {
  instagram: "https://www.instagram.com/wildcrowngames/",
  discord: "https://discord.gg/tRcSF7w9W",
  youtube: "https://www.youtube.com/@WildcrownGames",
  steam: "https://store.steampowered.com",
  email: "hello@twogame.in",
};

export function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
