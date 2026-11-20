import { ArrowUp, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { DIRECTIONS_URL, SITE } from "@/lib/site";
import { trackCallClick } from "@/lib/analytics";

export function QuickFloatingWidget() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 380);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Quick contact and navigation"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5"
    >
      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="grid size-9 place-items-center rounded-full border border-white/25 bg-[#280745]/95 text-white shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e9d5ff] hover:text-[#e9d5ff] animate-in fade-in zoom-in-75 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="size-4" />
        </button>
      )}

      <div className="flex items-center gap-1.5 rounded-full border border-white/25 bg-[#280745]/95 p-1 shadow-[0_10px_28px_rgba(40,7,69,0.35)] backdrop-blur-md">
        <a
          href={SITE.phoneHref}
          onClick={() => trackCallClick("Floating Quick Widget", SITE.phoneDisplay)}
          aria-label={`Call Oslo Cafe at ${SITE.phoneDisplay}`}
          className="grid size-9 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-[#e9d5ff]"
          title="Call Café"
        >
          <Phone className="size-4" />
        </a>

        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get Directions on Google Maps"
          className="grid size-9 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-[#e9d5ff]"
          title="Get Directions"
        >
          <MapPin className="size-4" />
        </a>

        <a
          href="https://wa.me/919334000029?text=Hello%20OSLO%20CAFE%20%26%20RESTRO!%20I%20have%20a%20quick%20question."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid size-10 place-items-center rounded-full bg-[#25d366] text-white shadow-sm transition-transform duration-200 hover:scale-105"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="size-5 fill-white/15" />
        </a>
      </div>
    </aside>
  );
}
