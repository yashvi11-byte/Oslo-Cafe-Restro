import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Coffee,
  Heart,
  MapPin,
  Phone,
  Smile,
  Star,
  Utensils,
  Wallet,
} from "lucide-react";
import { useState } from "react";

import cafeInterior from "@/assets/cafe-interior.jpg";
import latteCup from "@/assets/latte-cup.jpg";
import pastrySlice from "@/assets/pastry-slice.jpg";
import shakesImg from "@/assets/shakes.jpg";
import wafflesImg from "@/assets/waffles.jpg";
import burgerPizza from "@/assets/burger-pizza.jpg";
import startersSnacks from "@/assets/starters-snacks.jpg";
import sandwich from "@/assets/sandwich.jpg";
import chocoLava from "@/assets/choco-lava.jpg";

import osloCounterHd from "@/assets/oslo-counter-hd.jpg";
import osloBookCornerHd from "@/assets/oslo-book-corner-hd.jpg";
import osloAmbientDiningHd from "@/assets/oslo-ambient-dining-hd.jpg";
import osloGourmetBurger from "@/assets/oslo-gourmet-burger-hd.jpg";
import osloBiscoffDessert from "@/assets/oslo-biscoff-dessert-hd.jpg";
import osloArtisanPizza from "@/assets/oslo-artisan-pizza-hd.jpg";

import { Reveal } from "@/components/ScrollReveal";
import { ButtonLink, Ext, GetDirectionsButton } from "@/components/ui-kit";
import { MENU, MENU_SECTIONS } from "@/lib/menu";
import { SITE } from "@/lib/site";
import { trackCallClick } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OSLO CAFE & RESTRO | Café, Cakes & Coffee in Moga, Punjab" },
      {
        name: "description",
        content:
          "Specialty coffee, handcrafted cheesecakes, stone-baked pizzas and warm café dining near D.M. College, New Town, Moga.",
      },
      { property: "og:title", content: "OSLO CAFE & RESTRO — Café in Moga" },
      {
        property: "og:description",
        content: "Coffee, cakes, desserts and café bites near D.M. College, New Town, Moga.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [popularTab, setPopularTab] = useState<"all" | "burgers" | "pizzas" | "desserts">("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const scrollToHeritage = () => {
    const el = document.getElementById("heritage-strip");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const popularFoods = [
    {
      name: "Lotus Biscoff Cheesecake",
      desc: "Rich, velvety cream cheesecake layered over caramelized speculoos cookie crust with crumble.",
      price: "₹195",
      category: "bakery-desserts",
      tab: "desserts" as const,
      dietary: "veg" as const,
      tag: "Oslo Signature",
      image: osloBiscoffDessert,
    },
    {
      name: "Signature Chicken Burger",
      desc: "Marinated grilled chicken fillet with melted cheese and caramelized onions in toasted brioche.",
      price: "₹180",
      category: "burgers",
      tab: "burgers" as const,
      dietary: "non-veg" as const,
      tag: "Most Popular",
      image: osloGourmetBurger,
    },
    {
      name: "Margarita Stone Pizza",
      desc: "Hand-stretched artisan stone-baked crust topped with rich tomato herb sauce and melted mozzarella.",
      price: "₹170",
      category: "stone-baked-pizzas",
      tab: "pizzas" as const,
      dietary: "veg" as const,
      tag: "Bestseller",
      image: osloArtisanPizza,
    },
    {
      name: "Crispy Paneer Burger",
      desc: "Golden crumb-fried cottage cheese steak layered with Oslo herb spread and crisp greens.",
      price: "₹130",
      category: "burgers",
      tab: "burgers" as const,
      dietary: "veg" as const,
      tag: "Bestseller",
      image: burgerPizza,
    },
    {
      name: "Loaded Nachos",
      desc: "Crispy tortilla chips loaded with molten cheddar cheese sauce, jalapenos, salsa, and sour cream.",
      price: "₹250",
      category: "wraps-chef-special",
      tab: "pizzas" as const,
      dietary: "veg" as const,
      tag: "Chef's Special",
      image: startersSnacks,
    },
    {
      name: "Paneer Tikka Sandwich",
      desc: "Tandoori marinated cottage cheese cubes with bell peppers and mint chutney in toasted brown bread.",
      price: "₹180",
      category: "sandwiches-sandoz",
      tab: "burgers" as const,
      dietary: "veg" as const,
      tag: "Bestseller",
      image: sandwich,
    },
    {
      name: "Nutella Belgian Waffle",
      desc: "Crisp honeycomb waffle iron cake drenched in warm Italian hazelnut Nutella chocolate spread.",
      price: "₹280",
      category: "waffles-quick-bites",
      tab: "desserts" as const,
      dietary: "veg" as const,
      tag: "Most Loved",
      image: wafflesImg,
    },
    {
      name: "Lotus Biscoff Shake",
      desc: "Thick velvety milkshake spun with caramelized Lotus Biscoff spread and crushed speculoos crumbs.",
      price: "₹260",
      category: "shakes-ice-cream",
      tab: "desserts" as const,
      dietary: "veg" as const,
      tag: "Popular Drink",
      image: shakesImg,
    },
    {
      name: "Warm Choco Lava Cake",
      desc: "Freshly baked dark chocolate sponge cake with an irresistible warm molten ganache center.",
      price: "₹110",
      category: "bakery-desserts",
      tab: "desserts" as const,
      dietary: "veg" as const,
      tag: "Bakery Hot",
      image: chocoLava,
    },
  ];

  const visiblePopularFoods =
    popularTab === "all"
      ? popularFoods
      : popularFoods.filter((item) => item.tab === popularTab);

  const marqueeItems = [
    "Stone-Baked Pizzas",
    "Lotus Biscoff Cheesecake",
    "Gourmet Burgers",
    "Artisan Espresso Bar",
    "Belgian Waffles",
    "Loaded Nachos & Pasta",
    "Freshly Baked Daily in Moga",
  ];

  const spaces = [
    {
      title: "Barista & Pastry Bar",
      subtitle: "Fresh artisan bakes, espresso pulls & warm counter service.",
      img: osloCounterHd,
    },
    {
      title: "The Book Corner",
      subtitle: "A quiet mint-wood reading nook designed for unhurried coffee.",
      img: osloBookCornerHd,
    },
    {
      title: "Ambient Evening Dining",
      subtitle: "Ivy lattice canopy and warm Edison lighting for relaxed evenings.",
      img: osloAmbientDiningHd,
    },
  ];

  return (
    <div className="overflow-x-clip">
      {/* =====================================================================
          1. FULL-BLEED EDITORIAL ROYAL PURPLE & WHITE HERO
          ===================================================================== */}
      <section className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden bg-[#2b0748] pt-24 pb-16 text-white lg:min-h-[840px]">
        {/* Atmospheric Background Photography with Slow Ken Burns */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <img
            src={osloAmbientDiningHd}
            alt=""
            className="h-full w-full object-cover opacity-40 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#24053e]/94 via-[#451078]/76 to-[#2c074b]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f0436] via-transparent to-[#200438]/75" />
          {/* Soft ambient violet glow */}
          <div className="absolute -left-24 top-1/3 size-[420px] rounded-full bg-[#9333ea]/20 blur-[110px]" />
          <div className="absolute right-0 bottom-0 size-[380px] rounded-full bg-[#c084fc]/15 blur-[100px]" />
        </div>

        {/* Main Hero Content Grid */}
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.12fr_0.92fr]">
          {/* Left Typography & Editorial Actions */}
          <div>
            <div className="hero-stagger-1 flex items-center gap-3.5">
              <span className="h-px w-8 bg-[#e9d5ff]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#e9d5ff]">
                Coffee Roasters &amp; Kitchen · Moga
              </span>
            </div>

            <h1 className="hero-stagger-2 relative mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.8rem] xl:text-[4.2rem]">
              A quiet corner{" "}
              <span className="relative inline-block">
                of{" "}
                <span className="italic font-normal text-[#f3e8ff]">Oslo,</span>
                {/* Delicate animated orbital spark ornament */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  className="animate-orbit-spin pointer-events-none absolute -right-5 -top-4 size-10 text-[#e9d5ff]/55"
                  fill="none"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    strokeDasharray="3 4"
                  />
                  <path d="M24 2v8M24 38v8M2 24h8M38 24h8" stroke="currentColor" strokeWidth="1" />
                </svg>
              </span>
              <br />
              brewed in-house.
            </h1>

            <div className="hero-stagger-3 mt-10 flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-9">
              <p className="max-w-[240px] text-xs leading-[1.78] text-white/85">
                Specialty coffee, lotus biscoff cheesecakes, stone-baked pizzas and the warm spirit of café dining.
              </p>

              <div className="hero-stagger-4 flex flex-col items-start">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-3 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2c084c] outline outline-1 outline-white/40 outline-offset-4 transition-all duration-300 hover:bg-[#f3eafb] hover:shadow-[0_14px_32px_rgba(255,255,255,0.22)] hover:outline-[#e9d5ff]/75"
                >
                  <span>Reserve A Table</span>
                  <ArrowRight className="size-3.5 btn-icon-arrow" />
                </Link>

                <Link
                  to="/menu"
                  className="group mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-white/85 transition-colors hover:text-[#e9d5ff]"
                >
                  <span>Explore The Menu</span>
                  <ArrowDownRight className="size-3.5 text-[#e9d5ff] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Overlapping Tilted Crisp White Polaroids with Ambient Float */}
          <div className="relative mx-auto flex h-[320px] w-full max-w-[450px] items-center justify-center sm:h-[390px] lg:max-w-none">
            {/* Top-Right Location Tag */}
            <span className="hero-stagger-3 absolute right-3 top-0 z-10 hidden text-[10px] uppercase tracking-[0.26em] text-[#e9d5ff]/90 sm:block">
              Oslo Cafe · Moga
            </span>

            {/* Back Tilted White-Mounted Polaroid */}
            <div className="animate-polaroid-back absolute right-2 top-5 sm:right-4 sm:top-6">
              <div className="animate-float-reverse bg-white p-2 sm:p-2.5 shadow-[0_24px_55px_rgba(25,5,44,0.52)] transition-transform duration-500 hover:z-30 hover:rotate-0 hover:scale-[1.04]">
                <img
                  src={osloBookCornerHd}
                  alt="Oslo reading and coffee nook in Moga"
                  className="aspect-[4/3] w-48 object-cover sm:w-60 md:w-64"
                />
              </div>
            </div>

            {/* Front Overlapping Tilted White-Mounted Polaroid */}
            <div className="animate-polaroid-front relative z-20 -translate-x-6 translate-y-6 sm:-translate-x-10 sm:translate-y-8">
              <div className="animate-float-gentle bg-white p-2.5 sm:p-3 shadow-[0_28px_70px_rgba(19,3,35,0.62)] transition-transform duration-500 hover:rotate-[1deg] hover:scale-[1.04]">
                <img
                  src={osloCounterHd}
                  alt="OSLO CAFE & RESTRO illuminated barista and pastry bar"
                  fetchPriority="high"
                  className="aspect-[4/3] w-56 object-cover sm:w-72 md:w-[315px]"
                />
              </div>
            </div>

            {/* Bottom-Left Location Frame Caption */}
            <span className="hero-stagger-4 absolute -bottom-1 left-2 z-20 text-[10px] uppercase tracking-[0.28em] text-[#e9d5ff]/90 sm:left-4">
              New Town · D.M. College Road
            </span>
          </div>
        </div>

        {/* Right Edge Vertical Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToHeritage}
          aria-label="Scroll down to explore"
          className="hero-stagger-4 absolute bottom-10 right-6 z-20 hidden flex-col items-center gap-3 text-[#e9d5ff]/90 transition-colors hover:text-white md:flex cursor-pointer"
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.36em] [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative h-14 w-px overflow-hidden bg-white/25">
            <span className="animate-scroll-drop absolute inset-x-0 top-0 h-6 bg-[#e9d5ff]" />
          </span>
        </button>
      </section>

      {/* =====================================================================
          2. HERITAGE / TRUST STRIP + KINETIC ANIMATED MARQUEE
          ===================================================================== */}
      <section
        id="heritage-strip"
        className="scroll-mt-16 border-b border-border bg-soft/80"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border/80 px-5 sm:grid-cols-2 sm:divide-y-0 sm:divide-x md:grid-cols-4">
          <Reveal delay={0} className="flex items-start gap-3 py-6 sm:pr-5">
            <Star className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="text-xs">
              <p className="font-semibold text-foreground">4.2 / 5 Rating</p>
              <p className="mt-0.5 text-muted-foreground">241 Google reviews</p>
            </div>
          </Reveal>

          <Reveal delay={80} className="flex items-start gap-3 py-6 sm:px-5">
            <Utensils className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="text-xs">
              <p className="font-semibold text-foreground">Kitchen &amp; Bakery</p>
              <p className="mt-0.5 text-muted-foreground">Dine-in, Takeaway &amp; Delivery</p>
            </div>
          </Reveal>

          <Reveal delay={160} className="flex items-start gap-3 py-6 sm:px-5">
            <Wallet className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="text-xs">
              <p className="font-semibold text-foreground">₹200 – ₹400</p>
              <p className="mt-0.5 text-muted-foreground">Average spend per guest</p>
            </div>
          </Reveal>

          <Reveal delay={240} className="flex items-start gap-3 py-6 sm:pl-5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="text-xs">
              <p className="font-semibold text-foreground">New Town, Moga</p>
              <p className="mt-0.5 text-muted-foreground">Open Daily 10:30 AM – 10:30 PM</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Continuous Animated Oslo Highlights Ticker */}
      <div className="marquee-wrapper overflow-hidden border-b border-primary/15 bg-primary py-2.5 text-white select-none">
        <div className="animate-marquee items-center">
          {[...marqueeItems, ...marqueeItems].map((label, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/90 whitespace-nowrap"
            >
              <span>{label}</span>
              <span className="size-1 rounded-full bg-[#e9d5ff]" />
            </span>
          ))}
        </div>
      </div>

      {/* =====================================================================
          3. MOST POPULAR FOOD ITEMS SHOWCASE (ANIMATED + FILTERABLE)
          ===================================================================== */}
      <section id="popular-items" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">Crowd Favourites</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                Most Popular <span className="italic font-normal text-primary">Food Items</span>
              </h2>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm">
                Oslo&apos;s top-ordered cheesecakes, gourmet burgers, stone-baked pizzas, and café plates loved across Moga.
              </p>
            </div>

            <Link
              to="/menu"
              className="group inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary hover:text-deep"
            >
              <span>Browse Full Menu</span>
              <ArrowRight className="size-3.5 btn-icon-arrow" />
            </Link>
          </div>
        </Reveal>

        <Reveal variant="line-expand" className="mt-6 w-full bg-border" />

        {/* Interactive Category Tabs */}
        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {(
              [
                { id: "all", label: "All Popular (9)" },
                { id: "burgers", label: "Burgers & Sandwiches" },
                { id: "pizzas", label: "Pizzas & Loaded Bites" },
                { id: "desserts", label: "Desserts & Shakes" },
              ] as const
            ).map((tab) => {
              const active = popularTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPopularTab(tab.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "border border-border bg-white text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePopularFoods.map((item, idx) => (
            <Reveal key={`${popularTab}-${item.name}`} variant="scale-in" delay={(idx % 3) * 75}>
              <Link
                to="/menu"
                search={{ c: item.category }}
                className="group card-lift flex h-full flex-col border border-border bg-white p-3"
              >
                <div className="relative overflow-hidden bg-soft">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* Animated Top Tag + Dietary Indicator */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] shadow-xs backdrop-blur-sm ${
                        item.dietary === "veg"
                          ? "bg-[#edf5ef]/95 text-[#2d663e]"
                          : "bg-rose-50/95 text-rose-700"
                      }`}
                    >
                      {item.dietary === "veg" ? "VEG" : "NON-VEG"}
                    </span>
                    <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between pt-4 px-1 pb-1">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {item.name}
                      </h3>
                      <span className="shrink-0 font-display text-base font-semibold tabular-nums text-primary">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    <span>View in Menu</span>
                    <ArrowRight className="size-3.5 btn-icon-arrow" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. PICTURE-FREE MENU DIRECTORY
          ===================================================================== */}
      <section className="border-y border-border bg-soft/60 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">Menu Ledger</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Explore by <span className="italic font-normal text-primary">Category</span>
                </h2>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
                Select any chapter to open our clean picture-free menu with exact prices and portions.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {MENU_SECTIONS.map((sec, idx) => {
              const count = MENU.filter((i) => i.category === sec.category).length;
              return (
                <Reveal key={sec.id} delay={(idx % 6) * 45}>
                  <Link
                    to="/menu"
                    search={{ c: sec.id }}
                    className="group flex items-center justify-between border-b border-border/80 py-4 transition-colors hover:border-primary"
                  >
                    <div className="flex min-w-0 items-baseline gap-3.5">
                      <span className="text-[11px] font-semibold tabular-nums text-primary">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <span className="block truncate font-display text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                          {sec.shortTitle}
                        </span>
                        <span className="block truncate text-[11px] text-muted-foreground">
                          {count} dishes &amp; drinks
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. THE OSLO STORY (SPLIT ANIMATED CHAPTER)
          ===================================================================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variant="fade-left">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="overflow-hidden border border-border bg-white p-2 shadow-2xs">
                <img
                  src={cafeInterior}
                  alt="Cozy interior of OSLO CAFE with seating and warm lights"
                  loading="lazy"
                  className="h-full min-h-[280px] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="overflow-hidden border border-border bg-white p-2 shadow-2xs">
                  <img
                    src={latteCup}
                    alt="Latte art in cup"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <div className="overflow-hidden border border-border bg-white p-2 shadow-2xs">
                  <img
                    src={pastrySlice}
                    alt="Delicate layered cake slice"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fade-right" delay={120} className="lg:pl-6">
            <p className="eyebrow">The Oslo Story</p>
            <h2 className="mt-2.5 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Your Calm Corner <span className="italic font-normal text-primary">in Moga</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Whether you drop in for a quick morning espresso, unwind with a good book and warm cheesecake, or linger over dinner with friends, Oslo offers unhurried hospitality.
            </p>

            <Reveal variant="line-expand" delay={180} className="mt-8 w-full bg-border" />

            <div className="grid grid-cols-3 divide-x divide-border pt-6">
              <div className="pr-4">
                <Coffee className="size-4 text-primary" />
                <p className="mt-2.5 text-xs font-medium leading-snug text-foreground">
                  Espresso &amp; Kitchen
                </p>
              </div>
              <div className="px-4">
                <Heart className="size-4 text-primary" />
                <p className="mt-2.5 text-xs font-medium leading-snug text-foreground">
                  Warm Hospitality
                </p>
              </div>
              <div className="pl-4">
                <Smile className="size-4 text-primary" />
                <p className="mt-2.5 text-xs font-medium leading-snug text-foreground">
                  Quiet Book Nook
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          6. CAFE AMBIANCE SPACES
          ===================================================================== */}
      <section className="border-y border-border bg-soft/75 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">Spaces</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                  Step Inside <span className="italic font-normal text-primary">Oslo</span>
                </h2>
              </div>
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary hover:text-deep"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="size-3.5 btn-icon-arrow" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-7 sm:grid-cols-3">
            {spaces.map((space, idx) => (
              <Reveal key={space.title} delay={idx * 100}>
                <Link to="/gallery" className="group block">
                  <div className="overflow-hidden border border-border bg-white p-2 shadow-2xs transition-shadow duration-300 group-hover:shadow-soft">
                    <div className="overflow-hidden bg-soft">
                      <img
                        src={space.img}
                        alt={space.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <h3 className="mt-3.5 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {space.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {space.subtitle}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. VISIT & MESSAGE SECTION
          ===================================================================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-3">
          <Reveal delay={0}>
            <p className="eyebrow">Visit Oslo</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
              Find Us in New Town
            </h2>

            <div className="mt-6 space-y-4 text-xs text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <address className="not-italic leading-relaxed">{SITE.address}</address>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <a
                  href={SITE.phoneHref}
                  onClick={() => trackCallClick("Home Contact Section Phone Link", SITE.phoneDisplay)}
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <GetDirectionsButton variant="primary" />
              <Ext
                href={SITE.phoneHref}
                onClick={() => trackCallClick("Home Contact Section Call Button", SITE.phoneDisplay)}
                variant="outline"
              >
                <Phone className="size-3.5 text-primary" />
                <span>Call Now</span>
              </Ext>
            </div>
          </Reveal>

          <Reveal delay={100} className="min-h-[260px] overflow-hidden border border-border bg-white p-1.5 shadow-2xs">
            <iframe
              title="Map to OSLO CAFE & RESTRO"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "OSLO CAFE & RESTRO, D.M. College, New Town, Moga"
              )}&output=embed`}
              loading="lazy"
              className="h-full min-h-[260px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal delay={200} className="border border-border bg-white p-6">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Send a Note
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Questions or table requests? Leave us a message.
            </p>

            {formSent ? (
              <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
                <div className="grid size-10 place-items-center bg-soft text-primary">
                  <Check className="size-5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">Thank you</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your message has been received.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Your message *"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 bg-primary px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-deep cursor-pointer"
                >
                  <span>Send Message</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          8. EDITORIAL CLOSING CHAPTER
          ===================================================================== */}
      <section className="bg-gradient-to-r from-[#280745] via-[#3d1066] to-[#22073a] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-16 sm:flex-row">
          <Reveal variant="fade-left" className="max-w-lg text-center sm:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e9d5ff]">
              OSLO CAFE &amp; RESTRO
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold text-white">
              Ready when you <span className="italic font-normal text-[#f3e8ff]">are.</span>
            </h2>
            <p className="mt-1.5 text-sm text-white/75">
              Drop by in New Town, Moga or call us ahead for tables and freshly prepared takeaway.
            </p>
          </Reveal>

          <Reveal variant="fade-right" className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <ButtonLink to="/menu" variant="light">
              View Menu <ArrowRight className="size-3.5 btn-icon-arrow" />
            </ButtonLink>
            <GetDirectionsButton variant="ghostLight" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
