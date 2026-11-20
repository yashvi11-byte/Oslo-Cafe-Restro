import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Lock, Mail, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui-kit";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | OSLO CAFE & RESTRO, Moga" },
      {
        name: "description",
        content:
          "Privacy Policy for OSLO CAFE & RESTRO in Moga, Punjab. Learn how we collect, use, and protect your personal data.",
      },
      { property: "og:title", content: "Privacy Policy | OSLO CAFE & RESTRO" },
      {
        property: "og:description",
        content: "Our commitment to protecting your personal information and privacy.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const lastUpdated = "October 2025";

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy">
        Your privacy matters to us. Learn how OSLO CAFE & RESTRO collects, protects, and handles your information.
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
              <ShieldCheck className="size-4 text-primary" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          <div className="space-y-12 leading-relaxed text-muted-foreground">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
              <p>
                Welcome to <strong>{SITE.name}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We operate the
                café, bakery, and dining establishment located at {SITE.address}, as well as this official website.
              </p>
              <p>
                We respect your personal privacy and are committed to safeguarding any information you share with us when you
                visit our premises, place an order for dine-in, takeaway, or delivery, or interact with our website and customer
                service channels.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
              <p>Depending on your interaction with Oslo Cafe & Restro, we may collect the following types of information:</p>
              <ul className="grid gap-3 pt-2 md:grid-cols-2">
                {[
                  {
                    title: "Contact Details",
                    desc: "Name, phone number, email address, and delivery address provided during reservations or orders.",
                  },
                  {
                    title: "Order & Dietary Preferences",
                    desc: "Items ordered, special dietary requests, allergen notices, and custom bakery/cake instructions.",
                  },
                  {
                    title: "Transaction Records",
                    desc: "Payment status, invoice amounts, and date/time of service (we do not store sensitive payment card details).",
                  },
                  {
                    title: "Feedback & Correspondence",
                    desc: "Feedback, reviews, questions, or requests sent to us via text message, phone calls, or social media.",
                  },
                ].map((item) => (
                  <li key={item.title} className="rounded-xl border border-border bg-soft p-5">
                    <div className="flex items-center gap-2 font-semibold text-foreground">
                      <CheckCircle2 className="size-4 text-primary shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="mt-2 text-sm leading-normal">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
              <p>We use the collected information solely for legitimate restaurant and customer service purposes, including:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Processing and fulfilling your dine-in table reservations, takeaway orders, and home deliveries.</li>
                <li>Communicating with you regarding order confirmations, preparation delays, or updates.</li>
                <li>Addressing customer support inquiries, feedback, and special requests.</li>
                <li>Maintaining food quality, health safety standards, and accommodating allergen sensitivities.</li>
                <li>Improving our culinary offerings, service speed, and website usability.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Information Sharing & Third Parties</h2>
              <p>
                <strong>We do not sell, rent, or trade your personal information</strong> to third parties for marketing purposes.
              </p>
              <p>
                Your information may only be shared with trusted service providers strictly necessary to fulfill your dining or
                delivery experience (such as local delivery drivers or authorized payment gateway providers), or when required by
                applicable laws or regulatory authorities.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Data Security</h2>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-soft p-6">
                <Lock className="size-6 text-primary shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <h3 className="font-semibold text-foreground">Protecting Your Details</h3>
                  <p>
                    We implement physical, technical, and administrative safeguards to protect your personal information from
                    unauthorized access, disclosure, or loss. While no transmission method over the internet is 100% secure, we
                    strive to use commercially acceptable means to protect your data.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. Cookies and Website Analytics</h2>
              <p>
                Our website may utilize standard session cookies and browser storage to optimize site speed, remember interface
                preferences, and compile anonymous statistical analytics about visitor traffic patterns. You can choose to disable
                cookies in your browser settings at any time.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. Your Rights</h2>
              <p>
                You have the right to request access to the personal data we hold about you, request corrections to inaccurate
                information, or request the deletion of your contact records from our direct messaging lists. To exercise any of
                these rights, please reach out to us using the contact details below.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">8. Contact Us Regarding Privacy</h2>
              <p>
                If you have questions, feedback, or concerns regarding this Privacy Policy, please get in touch with our team:
              </p>
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
                    <Mail className="size-4" />
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
