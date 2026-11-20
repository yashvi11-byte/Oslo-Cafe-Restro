import { Link } from "@tanstack/react-router";
import { Clock, Instagram, Lock, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { trackCallClick } from "@/lib/analytics";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  const linkCls = "text-white/75 transition-colors hover:text-white";
  return (
    <footer className="border-t border-white/15 bg-[#22073a] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Wordmark light />
          <p className="mt-4 text-xs leading-relaxed text-white/70 max-w-xs">
            A cozy coffee roastery, artisan bakery, and kitchen in Moga — crafted for warm conversations and unhurried dining.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#e9d5ff]">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs">
            {([
              ["/", "Home"],
              ["/menu", "Menu"],
              ["/about", "Our Story"],
              ["/gallery", "Gallery"],
              ["/contact", "Visit & Contact"],
            ] as const).map(([to, label]) => (
              <li key={to}>
                <Link to={to} className={linkCls}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#e9d5ff]">
            Visit &amp; Contact
          </h3>
          <div className="mt-4 space-y-3 text-xs text-white/75">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#d8b4fe]" />
              <address className="not-italic leading-relaxed">
                {SITE.address}
              </address>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="size-3.5 shrink-0 text-[#d8b4fe]" />
              <a
                href={SITE.phoneHref}
                onClick={() => trackCallClick("Footer Call Link", SITE.phoneDisplay)}
                className={linkCls}
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Hours & Social */}
        <div>
          <h3 className="font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#e9d5ff]">
            Hours
          </h3>
          <div className="mt-4 space-y-4 text-xs text-white/75">
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-3.5 shrink-0 text-[#d8b4fe]" />
              <div>
                <p className="font-medium text-white">Open Daily</p>
                <p className="mt-0.5 text-white/70">10:30 AM – 10:30 PM</p>
                <p className="mt-1 text-white/55">Dine-in · Takeaway · Delivery</p>
              </div>
            </div>

            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @oslocaferestro"
              className="inline-flex items-center gap-2 border border-white/25 px-3.5 py-1.5 text-xs text-white/90 transition-colors hover:border-[#e9d5ff] hover:text-white"
            >
              <Instagram className="size-3.5 text-[#e9d5ff]" />
              <span>@oslocaferestro</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-[11px] text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} OSLO CAFE &amp; RESTRO. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <span className="text-white/20">·</span>
            <Link to="/admin" className="inline-flex items-center gap-1 transition-colors hover:text-[#e9d5ff]">
              <Lock className="size-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
