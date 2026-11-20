import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

// HD Enhanced Oslo Cafe Photos
import osloCounterHd from "@/assets/oslo-counter-hd.jpg";
import osloBookCornerHd from "@/assets/oslo-book-corner-hd.jpg";
import osloAmbientDiningHd from "@/assets/oslo-ambient-dining-hd.jpg";

// Real Cafe Capture Photos (Uploaded by User)
import osloCounterReal from "@/assets/oslo-counter-real.jpg";
import osloBookCornerReal from "@/assets/oslo-book-corner-real.jpg";
import osloAmbientSeatingReal from "@/assets/oslo-ambient-seating-real.jpg";

// High-End Food & Bakery Photos
import osloGourmetBurger from "@/assets/oslo-gourmet-burger-hd.jpg";
import osloBiscoffDessert from "@/assets/oslo-biscoff-dessert-hd.jpg";
import osloArtisanPizza from "@/assets/oslo-artisan-pizza-hd.jpg";
import chocoLava from "@/assets/choco-lava.jpg";
import waffles from "@/assets/waffles.jpg";
import startersSnacks from "@/assets/starters-snacks.jpg";
import shakesImg from "@/assets/shakes.jpg";
import wrapsImg from "@/assets/wraps.jpg";
import mojito from "@/assets/mojito.jpg";
import cakes from "@/assets/cakes.jpg";
import latteCup from "@/assets/latte-cup.jpg";

import { PageHero } from "@/components/ui-kit";
import { Reveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | OSLO CAFE & RESTRO, Moga" },
      {
        name: "description",
        content:
          "Explore the authentic ambiance, real cafe interiors, barista counter, delicious gourmet burgers, artisan pizzas, and bakery desserts at OSLO CAFE & RESTRO in Moga.",
      },
      { property: "og:title", content: "Gallery — OSLO CAFE & RESTRO" },
      {
        property: "og:description",
        content: "Discover our real cafe moments, cozy book corner, coffee, and gourmet food.",
      },
    ],
  }),
  component: Gallery,
});

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "all" | "ambiance" | "food" | "dessert" | "drinks";
  badge?: string;
  badgeType?: "hd" | "real" | "bestseller" | "fresh";
  desc: string;
  cls?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // --- REAL & HD CAFE INTERIORS ---
  {
    id: "counter-hd",
    src: osloCounterHd,
    title: "Front Barista & Pastry Counter",
    category: "ambiance",
    badge: "Cafe Interior",
    badgeType: "hd",
    desc: "The heart of Oslo — handcrafted wooden counter, professional Italian espresso bar, illuminated Oslo logo, and fresh bakery display.",
    cls: "md:col-span-2 md:row-span-2",
  },
  {
    id: "gourmet-burger-hd",
    src: osloGourmetBurger,
    title: "Signature Gourmet Burger & Crispy Fries",
    category: "food",
    badge: "Bestseller",
    badgeType: "bestseller",
    desc: "Flame-grilled juicy patty, melted golden cheddar, fresh crisp veggies, served on dark slate with crispy peri-peri fries and house sauces.",
    cls: "md:col-span-1 md:row-span-2",
  },
  {
    id: "book-corner-hd",
    src: osloBookCornerHd,
    title: "The Book & Coffee Corner",
    category: "ambiance",
    badge: "Signature Vibe",
    badgeType: "hd",
    desc: "'Happiness is a cup of coffee & a good book' — our beloved reading nook with mint wood divider, curated bookshelves, and cozy seating.",
    cls: "md:col-span-1",
  },
  {
    id: "biscoff-dessert-hd",
    src: osloBiscoffDessert,
    title: "Artisan Lotus Biscoff Cheesecake",
    category: "dessert",
    badge: "Must Try",
    badgeType: "bestseller",
    desc: "Thick caramelized speculoos cookie crust, creamy velvety cheesecake, warm Biscoff spread drip, paired with hot artisan latte art.",
    cls: "md:col-span-1",
  },
  {
    id: "ambient-dining-hd",
    src: osloAmbientDiningHd,
    title: "Ambient Evening Dining & Ivy Ceiling",
    category: "ambiance",
    badge: "Cozy Ambiance",
    badgeType: "hd",
    desc: "Stunning mint-green geometric ceiling with lush climbing ivy vines and glowing geometric Edison pendant lights.",
    cls: "md:col-span-2",
  },
  {
    id: "artisan-pizza-hd",
    src: osloArtisanPizza,
    title: "Fresh Handcrafted Stone-Baked Pizza",
    category: "food",
    badge: "Chef's Special",
    badgeType: "fresh",
    desc: "Crispy leopard-spotted crust, rich tomato sauce, melted stretchy mozzarella, fresh basil, paneer and cherry tomatoes.",
    cls: "md:col-span-1",
  },
  {
    id: "counter-real",
    src: osloCounterReal,
    title: "Barista Counter & Oslo Sign",
    category: "ambiance",
    badge: "Original Cafe Photo",
    badgeType: "real",
    desc: "Real photograph of our Oslo service counter, pastry display, and colorful art wall near D.M. College, Moga.",
    cls: "md:col-span-1",
  },
  {
    id: "book-corner-real",
    src: osloBookCornerReal,
    title: "Original Reading & Dining Nook",
    category: "ambiance",
    badge: "Original Cafe Photo",
    badgeType: "real",
    desc: "Authentic view of the dining tables and book partition wall in Oslo Restro & Cafe.",
    cls: "md:col-span-1",
  },
  {
    id: "ambient-seating-real",
    src: osloAmbientSeatingReal,
    title: "Cozy Ceiling Ivy & Warm Lights",
    category: "ambiance",
    badge: "Original Cafe Photo",
    badgeType: "real",
    desc: "Real perspective of the greenery-filled ceiling lattice and ambient evening cafe lighting.",
    cls: "md:col-span-1",
  },
  {
    id: "choco-lava",
    src: chocoLava,
    title: "Molten Chocolate Lava Cake",
    category: "dessert",
    badge: "Dessert",
    badgeType: "bestseller",
    desc: "Warm baked dark chocolate cake with a rich molten center that flows with every spoonful.",
    cls: "md:col-span-1",
  },
  {
    id: "shakes",
    src: shakesImg,
    title: "Artisanal Thick Shakes & Coolers",
    category: "drinks",
    badge: "Thick Shake",
    badgeType: "fresh",
    desc: "Rich chocolate Oreo and KitKat ice cream shakes crowned with whipped cream and drizzle.",
    cls: "md:col-span-1",
  },
  {
    id: "wraps",
    src: wrapsImg,
    title: "Grilled Gourmet Tortilla Wraps",
    category: "food",
    badge: "Hot Bites",
    badgeType: "fresh",
    desc: "Crispy grilled wraps bursting with spiced cottage cheese, grilled veggies, and creamy mint mayo.",
    cls: "md:col-span-1",
  },
  {
    id: "waffles",
    src: waffles,
    title: "Golden Belgian Waffles",
    category: "dessert",
    badge: "Sweet Tooth",
    badgeType: "bestseller",
    desc: "Freshly pressed crispy Belgian waffles with chocolate hazelnut drizzle and whipped topping.",
    cls: "md:col-span-1",
  },
  {
    id: "mojito",
    src: mojito,
    title: "Classic Sparkling Virgin Mojito",
    category: "drinks",
    badge: "Chilled",
    badgeType: "fresh",
    desc: "Muddled fresh mint leaves, zesty lime wedges, sparkling soda, and crushed ice.",
    cls: "md:col-span-1",
  },
  {
    id: "latte-art",
    src: latteCup,
    title: "Specialty Espresso & Latte Art",
    category: "drinks",
    badge: "Brewed Fresh",
    badgeType: "fresh",
    desc: "Freshly roasted Arabica espresso beans pulled to perfection with velvety micro-foam latte art.",
    cls: "md:col-span-1",
  },
  {
    id: "starters-snacks",
    src: startersSnacks,
    title: "Crispy Starters & Loaded Platters",
    category: "food",
    badge: "Snacks",
    badgeType: "fresh",
    desc: "Crunchy cafe bites and finger food ideal for sharing with friends and family.",
    cls: "md:col-span-1",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "ambiance", label: "Cafe Vibes & Decor" },
  { id: "food", label: "Burgers, Pizzas & Bites" },
  { id: "dessert", label: "Cakes & Desserts" },
  { id: "drinks", label: "Coffee & Drinks" },
] as const;

function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const move = useCallback(
    (dir: number) => {
      setActiveIdx((curr) => {
        if (curr === null) return null;
        return (curr + dir + filteredItems.length) % filteredItems.length;
      });
    },
    [filteredItems.length]
  );

  useEffect(() => {
    if (activeIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeIdx, move]);

  return (
    <>
      <PageHero eyebrow="Oslo Cafe Gallery" title="Moments, Ambiance & Flavours.">
        Experience the authentic warm vibes of OSLO CAFE & RESTRO in Moga — from our cozy reading book corner and ivy-lined ceilings to mouthwatering burgers, stone-baked pizzas, and bakery treats.
      </PageHero>

      {/* CATEGORY FILTER TABS */}
      <section className="border-b border-border sticky top-16 z-20 backdrop-blur-md bg-background/95">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-5 py-3 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((i) => i.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveIdx(null);
                }}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white text-muted-foreground border border-border hover:text-foreground hover:border-primary/40"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] tabular-nums ${
                    isActive ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* GALLERY GRID */}
      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[280px]">
          {filteredItems.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 3) * 70} className={item.cls || ""}>
              <div
                onClick={() => setActiveIdx(idx)}
                className="group relative h-full overflow-hidden border border-border bg-white p-1.5 shadow-2xs cursor-pointer transition-shadow duration-300 hover:shadow-soft"
              >
                <div className="relative h-full w-full overflow-hidden bg-soft">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Subtle Minimal Badge */}
                  {item.badge && (
                    <div className="absolute left-3 top-3 z-10">
                      <span className="inline-flex items-center bg-white/95 px-2.5 py-0.5 text-[10px] font-medium tracking-[0.18em] uppercase text-[#280745] backdrop-blur-sm">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Bottom Gradient Overlay & Title */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#22073a]/90 via-[#22073a]/30 to-transparent p-4 text-white opacity-95 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base font-bold leading-snug">
                        {item.title}
                      </h3>
                      <div className="rounded-full bg-white/15 p-1.5 text-white backdrop-blur-xs transition-transform group-hover:scale-110">
                        <ZoomIn className="size-4" />
                      </div>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-white/80">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeIdx !== null && filteredItems[activeIdx] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={filteredItems[activeIdx]!.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveIdx(null)}
        >
          <div
            className="relative flex flex-col items-center max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black">
              <img
                src={filteredItems[activeIdx]!.src}
                alt={filteredItems[activeIdx]!.title}
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Caption Bar */}
              <div className="p-4 bg-[#22073a]/95 text-white border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#e9d5ff]">
                      {filteredItems[activeIdx]!.badge || "OSLO CAFE"}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-xs text-white/60">
                      Photo {activeIdx + 1} of {filteredItems.length}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-white mt-0.5">
                    {filteredItems[activeIdx]!.title}
                  </h2>
                  <p className="text-xs text-white/80 mt-1 max-w-xl">
                    {filteredItems[activeIdx]!.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              autoFocus
              aria-label="Close image"
              onClick={() => setActiveIdx(null)}
              className="absolute -top-12 right-0 rounded-full bg-white/20 hover:bg-white/30 p-2.5 text-white backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {/* Prev Button */}
            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/35 p-3 text-white backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next Button */}
            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/35 p-3 text-white backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
