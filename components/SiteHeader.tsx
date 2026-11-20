import { Link, useLocation } from "@tanstack/react-router";
import { Instagram, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { trackCallClick } from "@/lib/analytics";

const LEFT_NAV = [
  { to: "/about", label: "STORY" },
  { to: "/menu", label: "MENU" },
  { to: "/", hash: "popular-items", label: "POPULAR" },
  { to: "/gallery", label: "GALLERY" },
  { to: "/contact", label: "VISIT" },
] as const;

const ALL_NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Story" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Visit & Contact" },
] as const;

export function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <span className="relative inline-flex flex-col items-center leading-none select-none group">
      <span className="relative inline-block">
        <span
          className={`font-script text-[2.05rem] font-semibold leading-none tracking-wide ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          Oslo
        </span>
        {/* Delicate floral/coffee botanical flourish top-right of script mark */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 20"
          className={`absolute -right-4 -top-1 h-4 w-5 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${
            light ? "text-[#e9d5ff]" : "text-primary"
          }`}
          fill="none"
        >
          <path
            d="M3 16C8 12 13 8 19 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="11" cy="6" r="2.1" fill="#c084fc" />
          <circle cx="17.5" cy="10.5" r="1.8" fill="#e9d5ff" />
          <path
            d="M14 5C15.5 2.5 18 2 20 3C19 5 16.5 5.5 14 5Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      </span>
      <span
        className={`mt-0.5 text-[0.5rem] font-medium uppercase tracking-[0.38em] ${
          light ? "text-[#d8b4fe]" : "text-primary"
        }`}
      >
        Cafe &amp; Restro
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // On Home top: transparent dark royal purple floating cleanly over full-bleed hero
  const solidHeader = !isHome || scrolled || open;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        solidHeader
          ? "border-b border-white/15 bg-[#280745]/95 backdrop-blur-md shadow-[0_8px_28px_rgba(38,7,66,0.28)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5">
        {/* Left Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-5 lg:gap-7 md:flex" aria-label="Main">
          {LEFT_NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              {...("hash" in n ? { hash: n.hash } : {})}
              className="relative py-1 text-[11px] font-medium tracking-[0.22em] text-white/80 transition-colors duration-200 hover:text-white"
              activeProps={{
                className:
                  "text-[#e9d5ff] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[#d8b4fe]",
              }}
              activeOptions={{ exact: true, includeHash: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="rounded border border-white/25 p-1.5 text-white transition-colors hover:bg-white/10 cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>

        {/* Center Wordmark */}
        <Link
          to="/"
          aria-label="OSLO CAFE & RESTRO home"
          onClick={() => setOpen(false)}
          className="justify-self-center"
        >
          <Wordmark light />
        </Link>

        {/* Right Controls (Desktop) */}
        <div className="hidden items-center justify-end gap-5 md:flex">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @oslocaferestro"
            className="text-white/80 transition-colors hover:text-[#e9d5ff]"
          >
            <Instagram className="size-3.5" />
          </a>

          <Link
            to="/menu"
            search={{ v: "full" }}
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 transition-colors hover:text-white"
          >
            FULL MENU
          </Link>

          <Link
            to="/contact"
            className="border border-white/45 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-[#280745]"
          >
            RESERVE
          </Link>
        </div>

        {/* Mobile Quick Menu Link */}
        <div className="flex items-center justify-end md:hidden">
          <Link
            to="/menu"
            className="border border-white/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white"
          >
            MENU
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <nav
          className="border-t border-white/15 bg-[#280745] px-5 pb-6 md:hidden animate-in fade-in slide-in-from-top-1 duration-200"
          aria-label="Mobile"
        >
          {ALL_NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-3.5 text-xs uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-[#e9d5ff]"
              activeProps={{ className: "text-[#e9d5ff] font-semibold" }}
              activeOptions={{ exact: true }}
            >
              <span>{n.label}</span>
              <span className="text-[10px] text-white/45">→</span>
            </Link>
          ))}

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <a
              href={SITE.phoneHref}
              onClick={() => trackCallClick("Mobile Menu Call Button", SITE.phoneDisplay)}
              className="inline-flex items-center justify-center gap-2 border border-white/35 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
            >
              <Phone className="size-3.5 text-[#e9d5ff]" />
              <span>Call Café</span>
            </a>

            <Link
              to="/menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center bg-white py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#280745]"
            >
              View Menu
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
