import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, Mail, legalHead } from "@/components/site/LegalPage";
import { LEGAL, legalOwner } from "@/config/legal";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    legalHead(
      "Terms & Conditions",
      "Terms and conditions for using playtwo.in and supporting the development of TWO.",
      "/terms",
    ),
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro={
        <p>
          These terms apply to {LEGAL.website.replace("https://", "")} (the &ldquo;Website&rdquo;),
          run by {legalOwner()} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the Website, joining
          the waitlist or making a contribution, you agree to these terms.
        </p>
      }
      sections={[
        {
          title: "About TWO",
          body: (
            <p>
              TWO is an upcoming zombie survival game in development by {LEGAL.brand}. The Website
              shares news about the game, lets you join a waitlist and lets you voluntarily support
              its development. The game is not yet released; features, timelines and platforms may
              change.
            </p>
          ),
        },
        {
          title: "Contributions (donations)",
          body: (
            <>
              <p>
                Contributions made on the <Link to="/support">Support</Link> page are voluntary
                payments to support independent development. A contribution is not a purchase of the
                game, a pre-order, an investment or a share in any business, and it does not create
                any ownership or profit right.
              </p>
              <p>
                Supporter rewards (thank-you notes, community roles, credits or early demo access)
                are given as a token of appreciation, are digital only and may change. No physical
                goods are shipped.
              </p>
              <p>
                Contributions are generally non-refundable. Wrong, duplicate or unauthorised
                payments are handled under our{" "}
                <Link to="/refund-policy">Refund &amp; Cancellation Policy</Link>.
              </p>
            </>
          ),
        },
        {
          title: "Payments",
          body: (
            <p>
              Contributions are made through Buy Me a Goodie using UPI, cards, netbanking or
              wallets. We never see or store your card or bank details. All amounts are in Indian
              Rupees (INR). You are responsible for any charges your bank or payment provider
              applies.
            </p>
          ),
        },
        {
          title: "Waitlist",
          body: (
            <p>
              Joining the waitlist only registers your interest. It does not guarantee access to any
              demo or beta. We may contact you at the email you give about TWO, and you can ask to
              be removed at any time by writing to <Mail />.
            </p>
          ),
        },
        {
          title: "Acceptable use",
          body: (
            <p>
              Do not misuse the Website: no spam or fake sign-ups, no attempts to break, overload or
              gain unauthorised access to it, and no offensive or unlawful content in names or
              messages. Supporter names and messages may be edited or removed at our discretion.
            </p>
          ),
        },
        {
          title: "Intellectual property",
          body: (
            <p>
              The name TWO, its logo, artwork, story, screenshots, videos and all Website content
              belong to {LEGAL.brand} unless stated otherwise. You may share links and official
              media for non-commercial purposes, but may not copy, sell or reuse them without
              written permission.
            </p>
          ),
        },
        {
          title: "Disclaimer and liability",
          body: (
            <p>
              The Website and any demo builds are provided &ldquo;as is&rdquo;. To the extent
              permitted by law, we are not liable for indirect or consequential losses arising from
              your use of the Website. Our total liability for any claim relating to a contribution
              is limited to the amount you paid.
            </p>
          ),
        },
        {
          title: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of India. Disputes are subject to the
              jurisdiction of the courts of India.
            </p>
          ),
        },
        {
          title: "Changes and contact",
          body: (
            <p>
              We may update these terms; the date above shows the latest version. Questions? See{" "}
              <Link to="/contact">Contact Us</Link> or email <Mail />.
            </p>
          ),
        },
      ]}
    />
  );
}
