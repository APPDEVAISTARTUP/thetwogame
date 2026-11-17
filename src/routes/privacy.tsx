import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, Mail, legalHead } from "@/components/site/LegalPage";
import { LEGAL, legalOwner } from "@/config/legal";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    legalHead(
      "Privacy Policy",
      "How playtwo.in collects, uses and protects your information.",
      "/privacy",
    ),
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={
        <p>
          This policy explains what information {legalOwner()} collects on{" "}
          {LEGAL.website.replace("https://", "")}, why, and the choices you have. We collect as
          little as possible and never sell your data.
        </p>
      }
      sections={[
        {
          title: "Information we collect",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Waitlist:</strong> your name and email address.
              </li>
              <li>
                <strong className="text-foreground">Contributions:</strong> contributions are
                made on Buy Me a Goodie, which shares with us only the details you choose to give
                there (such as your name, amount and message).
              </li>
              <li>
                <strong className="text-foreground">Usage data:</strong> anonymous, aggregated page
                views and performance metrics (Vercel Analytics), without advertising cookies.
              </li>
            </ul>
          ),
        },
        {
          title: "Payment information",
          body: (
            <p>
              We do not take payments on this Website. Contributions are made on Buy Me a Goodie,
              and card numbers, UPI PINs and bank credentials never reach our servers. That service
              processes them under its own privacy policy.
            </p>
          ),
        },
        {
          title: "How we use it",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>To contact waitlist members about TWO, demo access and development updates.</li>
              <li>To record, confirm and, if needed, refund contributions.</li>
              <li>
                To show supporter names and messages on the Website, only if you allowed it.
              </li>
              <li>To keep the Website secure and prevent spam or fraud.</li>
            </ul>
          ),
        },
        {
          title: "Where it is stored and who processes it",
          body: (
            <p>
              Data is stored in a secured database hosted by Supabase and the Website runs on
              Vercel. Contributions are processed by Buy Me a Goodie. These providers act on our behalf and only
              process data to provide their service. We do not sell or rent your information.
            </p>
          ),
        },
        {
          title: "Retention",
          body: (
            <p>
              Waitlist entries are kept until the game launches or until you ask us to remove them.
              Contribution records are kept as long as needed for accounting and legal obligations.
            </p>
          ),
        },
        {
          title: "Your choices",
          body: (
            <p>
              You can ask to see, correct or delete your information, unsubscribe from emails, or
              hide your name from the supporters wall by writing to <Mail />. We respond within 7
              working days.
            </p>
          ),
        },
        {
          title: "Children",
          body: (
            <p>
              The Website is not directed at children under 13. If you are under 18, please get a
              parent or guardian&rsquo;s permission before making a contribution.
            </p>
          ),
        },
        {
          title: "Changes and contact",
          body: (
            <p>
              We may update this policy; the date above shows the latest version. Questions? See{" "}
              <Link to="/contact">Contact Us</Link> or email <Mail />.
            </p>
          ),
        },
      ]}
    />
  );
}
