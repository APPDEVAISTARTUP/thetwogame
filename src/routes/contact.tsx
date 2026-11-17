import { createFileRoute } from "@tanstack/react-router";
import { Mail as MailIcon, MapPin, Phone } from "lucide-react";
import { LegalPage, Mail, legalHead } from "@/components/site/LegalPage";
import { InstagramIcon } from "@/components/site/icons";
import { LEGAL, legalOwner } from "@/config/legal";
import { LINKS } from "@/config/support";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    legalHead(
      "Contact Us",
      "Contact Wildcrown Games about TWO, payments, refunds, press or collaborations.",
      "/contact",
    ),
});

function ContactPage() {
  const rows = [
    { icon: MailIcon, label: "Email", value: <Mail /> },
    LEGAL.phone
      ? {
          icon: Phone,
          label: "Phone",
          value: (
            <a href={`tel:${LEGAL.phone.replace(/\s/g, "")}`} className="text-foreground">
              {LEGAL.phone}
            </a>
          ),
        }
      : null,
    LEGAL.address
      ? {
          icon: MapPin,
          label: "Address",
          value: <span className="text-foreground">{LEGAL.address}</span>,
        }
      : null,
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: (
        <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="text-foreground">
          @wildcrowngames
        </a>
      ),
    },
  ].filter((r) => r !== null);

  return (
    <LegalPage
      eyebrow="Support"
      title="Contact Us"
      intro={
        <p>
          TWO is developed by {legalOwner()}. For payments, refunds, the waitlist, press or
          collaborations, get in touch below. We reply within 2–3 working days.
        </p>
      }
      sections={[
        {
          title: "Reach us",
          body: (
            <dl className="grid gap-px border border-border bg-border">
              {rows.map((r) => (
                <div key={r.label} className="flex items-start gap-4 bg-background p-5">
                  <r.icon size={18} className="mt-0.5 shrink-0 text-blood-bright" />
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.24em]">{r.label}</dt>
                    <dd className="mt-1 text-sm md:text-base">{r.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          ),
        },
        {
          title: "Payment or refund issues",
          body: (
            <p>
              Include your name, the amount, the date and the transaction ID so we can find your
              contribution quickly.
            </p>
          ),
        },
      ]}
    />
  );
}
