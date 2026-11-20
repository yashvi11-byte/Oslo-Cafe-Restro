import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, FileText, Phone, Scale, Utensils } from "lucide-react";
import { PageHero } from "@/components/ui-kit";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | OSLO CAFE & RESTRO, Moga" },
      {
        name: "description",
        content:
          "Terms and Conditions governing orders, reservations, takeaway, and dining at OSLO CAFE & RESTRO in Moga, Punjab.",
      },
      { property: "og:title", content: "Terms & Conditions | OSLO CAFE & RESTRO" },
      {
        property: "og:description",
        content: "Terms of service and dining policies for OSLO CAFE & RESTRO.",
      },
    ],
  }),
  component: TermsAndConditions,
});

function TermsAndConditions() {
  const lastUpdated = "October 2025";

  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions">
        Please review the rules and guidelines governing dining, orders, and services at OSLO CAFE & RESTRO.
      </PageHero>

      <div className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-5">
          {/* Top navigation breadcrumb / meta */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="size-4 text-primary" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          <div className="space-y-12 leading-relaxed text-muted-foreground">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing this website, placing an order, booking a table, or dining at <strong>{SITE.name}</strong>, you
                agree to be bound by these Terms and Conditions and all applicable regulations in India. If you disagree with
                any part of these terms, please contact us or refrain from utilizing our services.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Dine-In & Table Reservations</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Walk-ins:</strong> Walk-in guests are welcome subject to seating availability, especially during peak
                  evening and weekend hours.
                </li>
                <li>
                  <strong>Reservations:</strong> For gatherings, celebrations, or party bookings, we advise reserving at least
                  24 hours in advance by calling {SITE.phoneDisplay}.
                </li>
                <li>
                  <strong>Holding Period:</strong> Reserved tables will be held for up to 15 minutes past the scheduled booking
                  time before being released to waiting guests if no prior notice is given.
                </li>
                <li>
                  <strong>Guest Etiquette:</strong> We take pride in maintaining a family-friendly, comfortable sanctuary. We
                  reserve the right to refuse service or ask individuals displaying disruptive or abusive behavior to leave.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Takeaway & Food Delivery</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Delivery is offered within our designated service coverage areas in and around Moga, Punjab.
                </li>
                <li>
                  Delivery times provided are reasonable estimates. Traffic, adverse weather, or peak kitchen hours may
                  occasionally cause unforeseen delays.
                </li>
                <li>
                  Customers are responsible for providing accurate delivery addresses and reachable phone numbers when ordering.
                </li>
                <li>
                  Food is prepared fresh to order. For quality and food safety, we advise consuming orders promptly upon delivery
                  or pickup.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Pricing, Taxes & Payment Methods</h2>
              <p>
                All prices on our menu are quoted in Indian Rupees (₹ INR). Prices are subject to revision without prior notice,
                though confirmed orders will be charged at the rate active when the order was placed.
              </p>
              <p>
                We accept cash, UPI payments (PhonePe, Google Pay, Paytm, BHIM), and major debit/credit cards. Full payment is
                expected upon receipt of food or at billing time.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Cancellations, Modifications & Refunds</h2>
              <div className="rounded-xl border border-border bg-soft p-6">
                <h3 className="font-semibold text-foreground">Perishable Food Policy</h3>
                <p className="mt-2 text-sm leading-relaxed">
                  Due to the freshly prepared and perishable nature of our café food and bakery items:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-6 text-sm">
                  <li>Orders already dispatched or in preparation cannot be cancelled or modified.</li>
                  <li>
                    Custom celebration cakes or bulk event catering require at least 24 hours&apos; notice for modifications or
                    cancellations.
                  </li>
                  <li>
                    If you receive an incorrect or damaged item, please contact our counter staff or call us immediately so we
                    can replace the item or make it right.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. Food Allergens & Dietary Notice</h2>
              <div className="flex items-start gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
                <AlertCircle className="size-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <h3 className="font-semibold text-foreground">Allergen Advisory</h3>
                  <p>
                    Our kitchen handles dairy, nuts, gluten, soy, eggs, and other common food allergens. While we take utmost care
                    to prevent cross-contamination, we cannot guarantee that any menu item is 100% free of allergen traces. Please
                    notify our servers of any food allergies or severe dietary restrictions prior to placing your order.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. Intellectual Property</h2>
              <p>
                All branding, trademarks, logos, photographs, menus, and site graphics associated with {SITE.name} are the
                intellectual property of OSLO CAFE & RESTRO and may not be reproduced, copied, or utilized without our express
                written permission.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">8. Governing Law & Jurisdiction</h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes
                arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts in
                Moga, Punjab.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">9. Contact & Inquiries</h2>
              <p>For any questions regarding our terms, services, or dining policies, please reach out to us:</p>
              <div className="mt-4 rounded-xl border border-border bg-soft p-6">
                <h3 className="font-semibold text-foreground">{SITE.name}</h3>
                <p className="mt-2 text-sm">{SITE.address}</p>
                <div className="mt-4 flex flex-wrap gap-6 text-sm">
                  <a
                    href={SITE.phoneHref}
                    className="flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Phone className="size-4" />
                    <span>{SITE.phoneDisplay}</span>
                  </a>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Utensils className="size-4" />
                    <span>Contact & Location Page</span>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
