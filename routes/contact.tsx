import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, MessageSquare, Phone, Utensils } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Ext, GetDirectionsButton, PageHero, btn } from "@/components/ui-kit";
import { Reveal } from "@/components/ScrollReveal";
import { MAP_EMBED_URL, SITE } from "@/lib/site";
import { trackCallClick } from "@/lib/analytics";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location | OSLO CAFE & RESTRO, Moga" },
      { name: "description", content: "Find OSLO CAFE & RESTRO near D.M. College, New Town, Moga. Call +91 93340 00029 or get directions." },
      { property: "og:title", content: "Visit OSLO CAFE & RESTRO in Moga" },
      { property: "og:description", content: "Address, phone and directions for OSLO CAFE & RESTRO." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const contact = String(f.get("contact") || "").trim();
    const message = String(f.get("message") || "").trim();
    const errs: Record<string, string> = {};
    if (!name) errs["name"] = "Please enter your name.";
    if (!contact) errs["contact"] = "Please add a phone number or email.";
    if (message.length < 5) errs["message"] = "Please write a short message.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const body = encodeURIComponent(`Hi Oslo, I'm ${name} (${contact}). ${message}`);
    window.location.href = `${SITE.smsHref}?body=${body}`;
  }

  const field = "mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary";

  return (
    <>
      <PageHero eyebrow="Contact" title="Come Find Your Happy Place.">Call ahead, plan your visit or send us a message.</PageHero>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
        <Reveal variant="fade-left" className="space-y-6">
          <h2 className="text-3xl text-foreground">{SITE.name}</h2>
          <div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-primary" /><address className="not-italic leading-relaxed text-muted-foreground">{SITE.address}</address></div>
          <div className="flex gap-4"><Clock className="mt-1 size-5 shrink-0 text-primary" /><p className="text-muted-foreground"><span className="font-semibold text-foreground">Open Daily:</span> 10:30 AM – 10:30 PM</p></div>
          <div className="flex gap-4"><Phone className="mt-1 size-5 shrink-0 text-primary" /><a href={SITE.phoneHref} onClick={() => trackCallClick("Contact Page Phone Link", SITE.phoneDisplay)} className="font-medium text-foreground hover:text-primary">{SITE.phoneDisplay}</a></div>
          <div className="flex gap-4"><Utensils className="mt-1 size-5 shrink-0 text-primary" /><p className="text-muted-foreground">Dine-in, takeaway and delivery</p></div>
          <div className="flex flex-wrap gap-3">
            <GetDirectionsButton variant="primary" />
            <Ext href={SITE.phoneHref} onClick={() => trackCallClick("Contact Page Call Button", SITE.phoneDisplay)} variant="outline"><Phone className="size-4 text-primary" /> Call Now</Ext>
            <Ext href={SITE.instagramUrl} variant="outline"><Instagram className="size-4 text-primary" /> Instagram</Ext>
          </div>
          <iframe title="Map to OSLO CAFE & RESTRO" src={MAP_EMBED_URL} loading="lazy" className="h-72 w-full border border-border" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>

        <Reveal variant="fade-right" delay={120}>
          <form noValidate onSubmit={onSubmit} className="h-fit border border-border bg-white p-7 md:p-9">
            <h2 className="text-2xl text-foreground">Send an enquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">This opens a text message to the café on your phone with your details filled in.</p>
            {[
              { n: "name", l: "Your name", t: "text", a: "name" },
              { n: "contact", l: "Phone or email", t: "text", a: "tel" },
            ].map((x) => (
              <div key={x.n} className="mt-5">
                <label htmlFor={x.n} className="text-sm font-medium">{x.l}</label>
                <input id={x.n} name={x.n} type={x.t} autoComplete={x.a} aria-invalid={!!errors[x.n]} aria-describedby={`${x.n}-err`} className={field} />
                {errors[x.n] && <p id={`${x.n}-err`} className="mt-1 text-xs text-destructive">{errors[x.n]}</p>}
              </div>
            ))}
            <div className="mt-5">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={4} aria-invalid={!!errors["message"]} aria-describedby="message-err" className={`${field} h-auto py-2`} />
              {errors["message"] && <p id="message-err" className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
            </div>
            <button type="submit" className={`${btn.primary} mt-6 w-full`}><MessageSquare className="size-4" /> Send via Text Message</button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
