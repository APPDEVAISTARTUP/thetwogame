import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, Mail, legalHead } from "@/components/site/LegalPage";
import { LEGAL, legalOwner } from "@/config/legal";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPage,
  head: () =>
    legalHead(
      "Refund & Cancellation Policy",
      "Refund, cancellation and delivery policy for contributions made on playtwo.in.",
      "/refund-policy",
    ),
});

function RefundPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund & Cancellation Policy"
      intro={
        <p>
          This policy covers contributions made to {legalOwner()} through the{" "}
          <Link to="/support">Support TWO</Link> page.
        </p>
      }
      sections={[
        {
          title: "Contributions are voluntary",
          body: (
            <p>
              Contributions support the independent development of TWO. They are not payment for a
              product or service, so once a contribution is successfully completed it is generally
              non-refundable and cannot be cancelled.
            </p>
          ),
        },
        {
          title: "When we will refund",
          body: (
            <>
              <p>We will refund the full amount if:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>you were charged twice for the same contribution (duplicate payment);</li>
                <li>you paid a wrong amount by mistake (for example an extra zero);</li>
                <li>money was debited but the payment shows as failed; or</li>
                <li>the payment was made without your authorisation.</li>
              </ul>
            </>
          ),
        },
        {
          title: "How to request a refund",
          body: (
            <p>
              Email <Mail /> within {LEGAL.refundRequestDays} days of the payment with your name,
              the amount, the date and the transaction ID shown in your payment confirmation. We
              reply within 3 working days.
            </p>
          ),
        },
        {
          title: "Refund timeline",
          body: (
            <p>
              Approved refunds are issued to the original payment method (UPI,
              card, netbanking or wallet) and usually reach you within {LEGAL.refundProcessingDays}{" "}
              working days, depending on your bank. If money was debited for a failed payment, your
              bank normally reverses it automatically within this time.
            </p>
          ),
        },
        {
          title: "Cancellation",
          body: (
            <p>
              You can cancel at any time before completing payment by closing the payment page.
              Nothing is charged until the payment is confirmed.
            </p>
          ),
        },
        {
          title: "Delivery of supporter rewards",
          body: (
            <p>
              No physical goods are sold or shipped. Supporter rewards are digital (thank-you notes,
              community roles, credits, early demo access) and are delivered by email, Instagram or
              Discord, normally within 14 days of a confirmed contribution, or when the related
              build becomes available.
            </p>
          ),
        },
        {
          title: "Contact",
          body: (
            <p>
              For any payment issue, see <Link to="/contact">Contact Us</Link> or email <Mail />.
            </p>
          ),
        },
      ]}
    />
  );
}
