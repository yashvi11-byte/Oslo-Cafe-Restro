import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bike,
  BookOpen,
  Cake,
  Clock,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import osloCounterHd from "@/assets/oslo-counter-hd.jpg";
import osloBookCornerHd from "@/assets/oslo-book-corner-hd.jpg";
import { ButtonLink, PageHero, SectionHead } from "@/components/ui-kit";
import { Reveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | OSLO CAFE & RESTRO, Moga" },
      { name: "description", content: "OSLO CAFE & RESTRO is a café, bakery and restaurant in New Town, Moga, offering dine-in, takeaway and delivery." },
      { property: "og:title", content: "About OSLO CAFE & RESTRO" },
      { property: "og:description", content: "A place for good food and better moments in Moga, Punjab." },
    ],
  }),
  component: About,
});

function About() {
  const amenities = [
    {
      icon: BookOpen,
      title: "Reading & Book Corner",
      desc: "Immerse yourself in our curated book collection with comfortable seating and soft lighting.",
    },
    {
      icon: Wifi,
      title: "Free High-Speed Wi-Fi",
      desc: "Perfect for working remotely, studying, catching up on projects, or sharing your café moments.",
    },
    {
      icon: Cake,
      title: "Handcrafted Bakery",
      desc: "Daily fresh cheesecakes, artisan pastries, muffins, and custom party cakes made to order.",
    },
    {
      icon: Clock,
      title: "Open Daily 10:30 AM – 10:30 PM",
      desc: "Consistent, welcoming service every day of the week for morning coffee through late dinner.",
    },
    {
      icon: Sparkles,
      title: "Cozy Aesthetic Ambiance",
      desc: "Lush ivy ceiling canopy, warm ambient pendant lamps, and comfortable purple dining seating.",
    },
    {
      icon: ShieldCheck,
      title: "Highest Hygiene Standards",
      desc: "Clean open kitchen, premium ingredients, and freshly prepared orders every single time.",
    },
  ];

  return (
    <>
      <PageHero eyebrow="About us" title="A Place for Good Food and Better Moments.">
        OSLO CAFE & RESTRO is a cozy boutique café, bakery and restaurant near D.M. College in New Town, Moga.
      </PageHero>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <Reveal variant="fade-left" className="overflow-hidden border border-border bg-white p-2 shadow-soft">
          <img src={osloCounterHd} alt="OSLO CAFE & RESTRO barista counter and pastry bar" loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
        </Reveal>
        <Reveal variant="fade-right" delay={100}>
          <SectionHead eyebrow="What we offer" title="Coffee, bakes and café favourites.">
            From fresh cakes, pastries and cookies to gourmet burgers, stone-baked pizzas, our signature Lotus Biscoff Cheesecake and crisp Virgin Mojitos — Oslo brings together café comfort and bakery treats under one warm roof.
          </SectionHead>
        </Reveal>
      </section>

      <section className="border-y border-border bg-soft py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHead eyebrow="Your way" title="Stay, take away, or have it delivered." center />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: UtensilsCrossed, t: "Dine-in", d: "Settle in with a hot coffee, great bites, and a good book." },
              { icon: ShoppingBag, t: "Takeaway", d: "Pick up your favourite burgers, drinks, and bakes on the go." },
              { icon: Bike, t: "Delivery", d: "Enjoy Oslo at home — call us directly to arrange quick delivery." },
            ].map(({ icon: I, t, d }, idx) => (
              <Reveal key={t} delay={idx * 90}>
                <div className="h-full border border-border bg-background p-7 transition-colors hover:border-primary">
                  <I className="size-6 text-primary" />
                  <h3 className="mt-4 text-2xl text-foreground">{t}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <Reveal variant="fade-left">
          <SectionHead eyebrow="Our story" title="Born from a Passion for Great Moments.">
            Created in New Town, Moga, OSLO CAFE & RESTRO was founded to be more than just a restaurant — a warm sanctuary where friends gather over artisan coffee, gourmet burgers, and handcrafted bakery desserts. Under our green ivy canopy and amidst the aroma of fresh bakes, every visit feels like home.
          </SectionHead>
          <div className="mt-8"><ButtonLink to="/menu">Explore the Menu <ArrowRight className="size-4 btn-icon-arrow" /></ButtonLink></div>
        </Reveal>
        <Reveal variant="fade-right" delay={120} className="overflow-hidden border border-border bg-white p-2 shadow-soft">
          <img src={osloBookCornerHd} alt="Reading and coffee corner at OSLO CAFE" loading="lazy" width={1408} height={1008} className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
        </Reveal>
      </section>

      {/* Amenities & Experience Highlights */}
      <section className="border-t border-border bg-soft py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHead eyebrow="Why You'll Love Oslo" title="Designed for Your Comfort & Delight." center>
              Every detail at OSLO CAFE & RESTRO is crafted to make your visit special.
            </SectionHead>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map(({ icon: Icon, title, desc }, idx) => (
              <Reveal key={title} delay={(idx % 3) * 80}>
                <div className="h-full border border-border bg-background p-6 transition-colors hover:border-primary">
                  <Icon className="size-5 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
