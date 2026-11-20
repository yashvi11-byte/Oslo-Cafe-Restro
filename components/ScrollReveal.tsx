import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "line-expand";

interface RevealProps {
  children?: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Check if already in viewport or scrolled past on initial mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -36px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (variant === "line-expand") {
    return (
      <div
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={cn(
          "h-px origin-left transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]",
          visible ? "scale-x-100" : "scale-x-0",
          className
        )}
      />
    );
  }

  const hiddenClasses: Record<Exclude<RevealVariant, "line-expand">, string> = {
    "fade-up": "opacity-0 translate-y-7 blur-[3px]",
    "fade-left": "opacity-0 -translate-x-8 blur-[3px]",
    "fade-right": "opacity-0 translate-x-8 blur-[3px]",
    "scale-in": "opacity-0 scale-[0.94] blur-[3px]",
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-750 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,opacity,filter]",
        visible ? "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0" : hiddenClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, window.scrollY / docHeight));
      setProgress(ratio);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-[#631e9f] via-[#8b46c9] to-[#c084fc] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

