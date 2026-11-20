import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  MessageSquare,
  Phone,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/ui-kit";
import { Reveal } from "@/components/ScrollReveal";
import { trackCallClick } from "@/lib/analytics";
import {
  MENU,
  MENU_SECTIONS,
  MenuItem,
  MenuSectionConfig,
} from "@/lib/menu";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/menu")({
  validateSearch: (s: Record<string, unknown>): {
    c?: string | undefined;
    sc?: string | undefined;
    d?: string | undefined;
    v?: string | undefined;
  } => ({
    c: typeof s["c"] === "string" ? (s["c"] as string) : undefined,
    sc: typeof s["sc"] === "string" ? (s["sc"] as string) : undefined,
    d: typeof s["d"] === "string" ? (s["d"] as string) : undefined,
    v: typeof s["v"] === "string" ? (s["v"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Menu | OSLO CAFE & RESTRO, Moga" },
      {
        name: "description",
        content:
          "Explore the complete minimalist menu of Oslo Cafe & Restro in Moga with category filters, portion sizes, and prices.",
      },
      { property: "og:title", content: "Menu | OSLO CAFE & RESTRO, Moga" },
      {
        property: "og:description",
        content:
          "Coffee, bakery desserts, stone-baked pizzas, gourmet burgers, and café plates at Oslo Cafe & Restro.",
      },
    ],
  }),
  component: MenuPage,
});

function DietaryPill({ dietary }: { dietary: MenuItem["dietary"] }) {
  const styles =
    dietary === "veg"
      ? "border-[#cce0d0] bg-[#edf5ef] text-[#2d663e]"
      : dietary === "egg"
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : "border-rose-200 bg-rose-50 text-rose-700";

  const label =
    dietary === "veg"
      ? "VEG"
      : dietary === "egg"
      ? "EGG"
      : "NON-VEG";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-[1px] text-[9px] font-semibold uppercase tracking-[0.12em] leading-tight ${styles}`}
    >
      {label}
    </span>
  );
}

function MenuCornerSketches() {
  return (
    <>
      {/* Subtle bottom-left artisan coffee line-art accent */}
      <svg
        aria-hidden="true"
        viewBox="0 0 96 96"
        className="pointer-events-none select-none mt-10 hidden size-20 text-primary/[0.08] md:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 44h38v18a19 19 0 0 1-38 0V44Z" />
        <path d="M62 48h8a6 6 0 0 1 0 12h-8" />
        <path d="M18 81h50" />
        <path d="M35 34c-2-5 3-8 1-13" />
        <path d="M46 34c-2-5 3-8 1-13" />
      </svg>

      {/* Subtle bottom-right minimalist roastery stamp */}
      <svg
        aria-hidden="true"
        viewBox="0 0 96 96"
        className="pointer-events-none select-none mt-10 hidden size-20 text-primary/[0.08] md:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="48" cy="48" r="36" />
        <circle cx="48" cy="48" r="24" />
        <path d="M48 12v72M12 48h72" />
        <path d="M32 32l32 32M64 32L32 64" />
      </svg>
    </>
  );
}

function MenuLedgerItem({ item }: { item: MenuItem }) {
  const hasMultipleSizes = Boolean(item.sizes && item.sizes.length > 1);
  const priceDisplay = hasMultipleSizes
    ? `₹${item.sizes![0]!.price}–${item.sizes![item.sizes!.length - 1]!.price}`
    : `₹${item.price}`;

  const highlightTag = item.badge
    ? item.badge
    : item.isBestseller
    ? "Popular"
    : undefined;

  return (
    <article className="group py-1">
      {/* Row 1: Dish Title + Minimalist Pills + Dashed Leader + Price */}
      <div className="flex items-baseline gap-2.5">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 min-w-0">
          <h3 className="font-display text-[1.12rem] sm:text-[1.2rem] font-normal leading-snug tracking-[-0.01em] text-[#1e142b] transition-colors group-hover:text-primary">
            {item.name}
          </h3>

          <DietaryPill dietary={item.dietary} />

          {highlightTag && (
            <span className="inline-flex shrink-0 items-center rounded-full border border-[#e3d2f6] bg-[#f4eefb] px-2 py-[1px] text-[9px] font-semibold uppercase tracking-[0.12em] leading-tight text-primary">
              {highlightTag}
            </span>
          )}
        </div>

        {/* Dashed Editorial Leader Line */}
        <span
          aria-hidden="true"
          className="flex-1 min-w-[18px] self-center translate-y-[1px] border-b border-dashed border-[#dfd2ef]"
        />

        {/* Crisp Right-Aligned Price */}
        <span className="shrink-0 font-display text-[1.06rem] font-normal tabular-nums text-[#1e142b]">
          {priceDisplay}
        </span>
      </div>

      {/* Row 2: Clean 1–2 Line Description */}
      <p className="mt-2 text-[0.8125rem] leading-[1.6] text-[#6d617d]">
        {item.description}
      </p>

      {/* Optional Minimalist Portion / Piece Metadata Line */}
      {(hasMultipleSizes || item.pieces || item.comboAvailable) && (
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#7a6c8b]">
          {hasMultipleSizes && (
            <span className="tabular-nums">
              {item.sizes!.map((sz) => `${sz.label} ₹${sz.price}`).join(" · ")}
            </span>
          )}
          {item.pieces && <span>Portion: {item.pieces}</span>}
          {item.comboAvailable && (
            <span className="text-primary/85">Meal combo upgrade +₹70</span>
          )}
        </div>
      )}
    </article>
  );
}

function SectionAddonsBar({ section }: { section: MenuSectionConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!section.addonGroups || section.addonGroups.length === 0) return null;

  return (
    <div className="mt-4 rounded-xl border border-border/80 bg-soft/60 px-4 py-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-xs font-medium text-foreground hover:text-primary cursor-pointer"
      >
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="size-3.5 text-primary" />
          <span>Optional Customizations &amp; Add-Ons</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          {isOpen ? "Hide" : "View"}
          {isOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2.5 border-t border-border/70 pt-3">
          {section.addonGroups.map((group) => (
            <div key={group.title} className="text-xs">
              <span className="font-medium text-foreground">{group.title}:</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {group.items.map((addon) => (
                  <span
                    key={addon.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    <span className="text-foreground">{addon.name}</span>
                    <span className="tabular-nums font-semibold text-primary">+₹{addon.price}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuPage() {
  const { c, sc, d, v } = Route.useSearch();
  const navigate = useNavigate({ from: "/menu" });

  const activeDietary = d === "veg" || d === "non-veg" ? d : "all";
  const [searchQuery, setSearchQuery] = useState("");

  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    if (c) {
      const match = MENU_SECTIONS.find(
        (s) =>
          s.id.toLowerCase() === c.toLowerCase() ||
          s.category.toLowerCase() === c.toLowerCase() ||
          s.shortTitle.toLowerCase().includes(c.toLowerCase())
      );
      if (match) return match.id;
    }
    return MENU_SECTIONS[0]?.id ?? "hot-coffee-tea";
  });

  const [activeSubcategory, setActiveSubcategory] = useState<string>(sc || "All");

  // View mode: 'focused' (selected category sheet) or 'full' (entire printed menu)
  const [viewMode, setViewMode] = useState<"focused" | "full">(
    v === "full" || v === "accordion" ? "full" : "focused"
  );

  // Sync URL search params
  useEffect(() => {
    if (c) {
      const match = MENU_SECTIONS.find(
        (s) =>
          s.id.toLowerCase() === c.toLowerCase() ||
          s.category.toLowerCase() === c.toLowerCase() ||
          s.shortTitle.toLowerCase().includes(c.toLowerCase())
      );
      if (match) {
        setActiveSectionId(match.id);
      }
    } else {
      setActiveSectionId(MENU_SECTIONS[0]?.id ?? "hot-coffee-tea");
    }
    setActiveSubcategory(sc || "All");
    setViewMode(v === "full" || v === "accordion" ? "full" : "focused");
  }, [c, sc, v]);

  const selectCategory = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setActiveSubcategory("All");

    const targetSection = MENU_SECTIONS.find((s) => s.id === sectionId);
    const targetCat = targetSection ? targetSection.category : undefined;
    const catItems = targetCat ? MENU.filter((i) => i.category === targetCat) : [];
    const hasNonVeg = catItems.some((i) => i.dietary !== "veg");
    const nextDietary = activeDietary === "non-veg" && !hasNonVeg ? "all" : activeDietary;

    if (viewMode === "full" && !searchQuery.trim()) {
      navigate({
        search: {
          c: sectionId,
          sc: undefined,
          d: nextDietary === "all" ? undefined : nextDietary,
          v: "full",
        },
        replace: true,
      });
      setTimeout(() => {
        const el = document.getElementById(`section-${sectionId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
      return;
    }

    setViewMode("focused");
    navigate({
      search: {
        c: sectionId,
        sc: undefined,
        d: nextDietary === "all" ? undefined : nextDietary,
        v: undefined,
      },
      replace: true,
    });

    setTimeout(() => {
      const el = document.getElementById("menu-ledger-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  const switchViewMode = (mode: "focused" | "full") => {
    setViewMode(mode);
    navigate({
      search: {
        c: activeSectionId,
        sc: mode === "focused" && activeSubcategory !== "All" ? activeSubcategory : undefined,
        d: activeDietary === "all" ? undefined : activeDietary,
        v: mode === "full" ? "full" : undefined,
      },
      replace: true,
    });
  };

  const selectSubcategory = (subcat: string) => {
    setActiveSubcategory(subcat);
    navigate({
      search: {
        c: activeSectionId,
        sc: subcat === "All" ? undefined : subcat,
        d: activeDietary === "all" ? undefined : activeDietary,
        v: viewMode === "full" ? "full" : undefined,
      },
      replace: true,
    });
  };

  const updateDietaryFilter = (newDiet: string) => {
    navigate({
      search: {
        c: activeSectionId,
        sc: activeSubcategory === "All" ? undefined : activeSubcategory,
        d: newDiet === "all" ? undefined : newDiet,
        v: viewMode === "full" ? "full" : undefined,
      },
      replace: true,
    });
  };

  const activeSection: MenuSectionConfig = useMemo(() => {
    const found = MENU_SECTIONS.find((s) => s.id === activeSectionId);
    return found ?? (MENU_SECTIONS[0] as MenuSectionConfig);
  }, [activeSectionId]);

  const activeSectionIdx = useMemo(
    () => MENU_SECTIONS.findIndex((s) => s.id === activeSection.id),
    [activeSection]
  );

  const { prevSection, nextSection } = useMemo(() => {
    const prev = activeSectionIdx > 0 ? MENU_SECTIONS[activeSectionIdx - 1] : undefined;
    const next =
      activeSectionIdx < MENU_SECTIONS.length - 1
        ? MENU_SECTIONS[activeSectionIdx + 1]
        : undefined;
    return { prevSection: prev, nextSection: next };
  }, [activeSectionIdx]);

  const activeSectionSubcategories = useMemo(() => {
    const items = MENU.filter((item) => item.category === activeSection.category);
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.subcategory) set.add(i.subcategory);
    });
    return Array.from(set);
  }, [activeSection]);

  const filteredActiveItems = useMemo(() => {
    return MENU.filter((item) => {
      if (item.category !== activeSection.category) return false;

      const catHasNonVeg = MENU.some(
        (i) => i.category === activeSection.category && i.dietary !== "veg"
      );
      if (activeDietary === "veg" && item.dietary !== "veg") return false;
      if (activeDietary === "non-veg" && catHasNonVeg && item.dietary === "veg") return false;

      if (activeSubcategory !== "All" && item.subcategory !== activeSubcategory) {
        return false;
      }

      return true;
    });
  }, [activeSection, activeDietary, activeSubcategory]);

  const allSectionsWithItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return MENU_SECTIONS.map((sec) => {
      const items = MENU.filter((item) => {
        if (item.category !== sec.category) return false;
        if (activeDietary === "veg" && item.dietary !== "veg") return false;
        if (activeDietary === "non-veg" && item.dietary === "veg") return false;
        if (q) {
          const matchesName = item.name.toLowerCase().includes(q);
          const matchesDesc = item.description.toLowerCase().includes(q);
          const matchesSubcat = item.subcategory?.toLowerCase().includes(q);
          const matchesSizes = item.sizes?.some((s) => s.label.toLowerCase().includes(q));
          return matchesName || matchesDesc || matchesSubcat || matchesSizes;
        }
        return true;
      });

      return {
        ...sec,
        items,
      };
    });
  }, [searchQuery, activeDietary]);

  const totalFilteredCount = useMemo(
    () => allSectionsWithItems.reduce((acc, s) => acc + s.items.length, 0),
    [allSectionsWithItems]
  );

  // When searching, show all matching sections across the menu automatically
  const isSearching = searchQuery.trim().length > 0;
  const effectiveView = isSearching || viewMode === "full" ? "full" : "focused";

  return (
    <>
      <PageHero eyebrow="Oslo Kitchen & Espresso Bar" title="Menu">
        Prepared fresh to order — coffee, artisan bakes, burgers, stone-baked pizzas, and café plates.
      </PageHero>

      {/* Subtle Utility Info Strip */}
      <section className="border-b border-border/70 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
              <Clock className="size-3.5 text-primary" />
              Kitchen 09:00 AM – 11:00 PM
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-600" />
              Vegetarian
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-rose-600" />
              Non-Vegetarian
            </span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="hidden md:inline text-muted-foreground">
              Meal Combo (+₹70) available on Burgers, Hot Dogs, Wraps & Sandwiches
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Dine-in · Takeaway · Freshly Prepared</span>
          </div>
        </div>
      </section>

      {/* Sticky Search & Filter Controls */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/95 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Minimal Search */}
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, pizza, burger, cake..."
              className="h-9 w-full rounded-full border border-border bg-white pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:justify-end">
            {/* Dietary Filter */}
            <div className="inline-flex items-center rounded-full border border-border bg-white p-0.5 text-xs">
              {(
                [
                  { id: "all", label: "All" },
                  { id: "veg", label: "Veg" },
                  { id: "non-veg", label: "Non-Veg" },
                ] as const
              ).map((opt) => {
                const active = activeDietary === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateDietaryFilter(opt.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.id !== "all" && (
                      <span
                        className={`size-1.5 rounded-full ${
                          opt.id === "veg" ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                    )}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Toggle: By Category vs Full Menu */}
            <div className="inline-flex items-center rounded-full border border-border bg-white p-0.5 text-xs">
              <button
                type="button"
                onClick={() => switchViewMode("focused")}
                className={`rounded-full px-3 py-1 font-medium transition-colors cursor-pointer ${
                  viewMode === "focused" && !isSearching
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                By Category
              </button>
              <button
                type="button"
                onClick={() => switchViewMode("full")}
                className={`rounded-full px-3 py-1 font-medium transition-colors cursor-pointer ${
                  viewMode === "full" || isSearching
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Full Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile / Tablet Picture-Free Horizontal Category Bar */}
      <nav
        aria-label="Menu categories"
        className="border-b border-border/70 bg-soft/40 lg:hidden"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-5 py-3 no-scrollbar">
          {MENU_SECTIONS.map((sec, idx) => {
            const isSelected = activeSection.id === sec.id && effectiveView === "focused";
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => selectCategory(sec.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-foreground hover:border-primary/40"
                }`}
              >
                <span className="mr-1.5 opacity-60 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {sec.shortTitle}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Minimalist Two-Column Editorial Menu Layout */}
      <main id="menu-ledger-top" className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:items-start">
          {/* Desktop Picture-Free Sticky Sidebar Directory */}
          <aside className="hidden lg:block lg:sticky lg:top-34">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Categories
            </p>
            <nav aria-label="Menu sections" className="divide-y divide-border/50 border-y border-border/70">
              {MENU_SECTIONS.map((sec, idx) => {
                const count = MENU.filter((i) => i.category === sec.category).length;
                const isSelected = activeSection.id === sec.id && effectiveView === "focused";

                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => selectCategory(sec.id)}
                    className={`group flex w-full items-center justify-between py-2.5 pl-3 pr-2 text-left text-xs transition-colors border-l-2 cursor-pointer ${
                      isSelected
                        ? "border-primary bg-soft/70 font-semibold text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-soft/30"
                    }`}
                  >
                    <span className="flex items-baseline gap-2.5 truncate">
                      <span className="text-[10px] tabular-nums opacity-55">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate">{sec.shortTitle}</span>
                    </span>
                    <span className="ml-2 text-[10px] tabular-nums opacity-60">
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 rounded-xl border border-border/80 bg-soft/60 p-4 text-xs">
              <p className="font-medium text-foreground">Tables &amp; Takeaway</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Call our counter directly for table reservations or takeaway orders in Moga.
              </p>
              <a
                href={SITE.phoneHref}
                onClick={() => trackCallClick("Menu Sidebar Call Link", SITE.phoneDisplay)}
                className="mt-2.5 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                <Phone className="size-3" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </aside>

          {/* Right Panel: Picture-Free Menu Sheet */}
          <div className="min-w-0">
            {/* Active Search / Filter Notice */}
            {(isSearching || activeDietary !== "all") && (
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 text-xs text-muted-foreground">
                <span>
                  Showing <strong className="text-foreground">{totalFilteredCount}</strong> items
                  {activeDietary !== "all" && (
                    <> ({activeDietary === "veg" ? "Vegetarian" : "Non-Vegetarian"})</>
                  )}
                  {isSearching && <> matching &ldquo;{searchQuery}&rdquo;</>}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    updateDietaryFilter("all");
                  }}
                  className="font-medium text-primary underline underline-offset-4 hover:text-deep cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* MODE 1: FOCUSED SINGLE CATEGORY LEDGER */}
            {effectiveView === "focused" && (
              <section key={`${activeSection.id}-${activeSubcategory}-${activeDietary}`} className="reveal">
                <header className="border-b border-border pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      Section {String(activeSectionIdx + 1).padStart(2, "0")} of {MENU_SECTIONS.length}
                    </span>
                    <span className="text-[11px] text-muted-foreground tabular-nums">
                      {filteredActiveItems.length} items
                    </span>
                  </div>

                  <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                    {activeSection.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    {activeSection.subtitle}
                  </p>
                </header>

                {/* Optional Section Customizations */}
                <SectionAddonsBar section={activeSection} />

                {/* Subcategory Filter Chips */}
                {activeSectionSubcategories.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => selectSubcategory("All")}
                      className={`rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
                        activeSubcategory === "All"
                          ? "bg-primary text-white font-medium"
                          : "border border-border bg-white text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      All ({MENU.filter((i) => i.category === activeSection.category).length})
                    </button>

                    {activeSectionSubcategories.map((subcat) => {
                      const isSubSelected = activeSubcategory === subcat;
                      const count = MENU.filter(
                        (i) => i.category === activeSection.category && i.subcategory === subcat
                      ).length;

                      return (
                        <button
                          key={subcat}
                          type="button"
                          onClick={() => selectSubcategory(subcat)}
                          className={`rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
                            isSubSelected
                              ? "bg-primary text-white font-medium"
                              : "border border-border bg-white text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {subcat} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Picture-Free Editorial Items Grid */}
                {filteredActiveItems.length === 0 ? (
                  <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
                    <p className="text-sm font-medium text-foreground">
                      No dishes match your current filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        updateDietaryFilter("all");
                        setActiveSubcategory("All");
                      }}
                      className="mt-4 inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-primary hover:border-primary cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  <div className="relative mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8">
                    {filteredActiveItems.map((item, itemIdx) => (
                      <Reveal key={item.id} delay={(itemIdx % 6) * 35}>
                        <MenuLedgerItem item={item} />
                      </Reveal>
                    ))}
                  </div>
                )}

                {/* Subtle Menu Footer Sketch Motif */}
                <div className="flex items-center justify-between">
                  <MenuCornerSketches />
                </div>

                {/* Minimal Prev / Next Section Navigation */}
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-6">
                  {prevSection ? (
                    <button
                      type="button"
                      onClick={() => selectCategory(prevSection.id)}
                      className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
                    >
                      <ArrowLeft className="size-3.5" />
                      <span>{prevSection.shortTitle}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextSection ? (
                    <button
                      type="button"
                      onClick={() => selectCategory(nextSection.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer"
                    >
                      <span>Next: {nextSection.shortTitle}</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
              </section>
            )}

            {/* MODE 2: FULL MENU BOOK / SEARCH RESULTS */}
            {effectiveView === "full" && (
              <div className="space-y-16">
                {totalFilteredCount === 0 ? (
                  <div className="rounded-xl border border-dashed border-border p-12 text-center">
                    <p className="text-sm font-medium text-foreground">
                      No menu items match &ldquo;{searchQuery}&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        updateDietaryFilter("all");
                      }}
                      className="mt-4 inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-primary hover:border-primary cursor-pointer"
                    >
                      Show full menu
                    </button>
                  </div>
                ) : (
                  allSectionsWithItems.map((sec, idx) => {
                    if (sec.items.length === 0) return null;

                    return (
                      <Reveal key={sec.id}>
                        <section id={`section-${sec.id}`} className="scroll-mt-36">
                          <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                            <div>
                              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                                {sec.title}
                              </h2>
                            </div>
                            <span className="text-xs text-muted-foreground tabular-nums">
                              {sec.items.length} items
                            </span>
                          </header>

                          <SectionAddonsBar section={sec} />

                          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8">
                            {sec.items.map((item) => (
                              <MenuLedgerItem key={item.id} item={item} />
                            ))}
                          </div>
                        </section>
                      </Reveal>
                    );
                  })
                )}

                <div className="flex items-center justify-between">
                  <MenuCornerSketches />
                </div>
              </div>
            )}

            {/* Quiet Hospitality Bottom Strip */}
            <section className="mt-16 border-t border-border pt-10">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="max-w-lg">
                  <p className="eyebrow">Table Enquiries &amp; Takeaway</p>
                  <h2 className="mt-1.5 font-display text-2xl font-semibold text-foreground">
                    Visit Oslo or call our counter
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Everything is prepared fresh in New Town, Moga. Call {SITE.phoneDisplay} or reach us on WhatsApp for table bookings and café enquiries.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <a
                    href={SITE.phoneHref}
                    onClick={() => trackCallClick("Menu Page Footer Call", SITE.phoneDisplay)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-deep"
                  >
                    <Phone className="size-3.5" />
                    <span>Call Café</span>
                  </a>
                  <a
                    href="https://wa.me/919334000029?text=Hello%20Oslo%20Cafe!%20I%20would%20like%20to%20enquire%20about%20the%20menu."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <MessageSquare className="size-3.5 text-emerald-700" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
