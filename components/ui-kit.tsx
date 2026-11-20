import { Link } from "@tanstack/react-router";
import { MapPin, Utensils } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DIRECTIONS_URL } from "@/lib/site";

const base =
  "group relative inline-flex min-h-10 items-center justify-center gap-2 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer select-none";

export const btn = {
  primary: cn(
    base,
    "bg-primary text-primary-foreground border border-primary hover:bg-deep"
  ),
  order: cn(
    base,
    "bg-primary text-primary-foreground border border-primary hover:bg-deep"
  ),
  outline: cn(
    base,
    "border border-border bg-white text-foreground hover:border-primary hover:text-primary hover:bg-soft"
  ),
  direction: cn(
    base,
    "border border-border bg-white text-foreground hover:border-primary hover:text-primary hover:bg-soft"
  ),
  light: cn(
    base,
    "bg-white text-[#280745] border border-white hover:bg-[#f3eafb] hover:border-[#f3eafb]"
  ),
  ghostLight: cn(
    base,
    "border border-white/45 bg-transparent text-white hover:border-white hover:bg-white/10"
  ),
  amber: cn(
    base,
    "bg-foreground text-background hover:bg-deep"
  ),
};

export function ButtonLink({
  to,
  variant = "primary",
  className,
  children,
}: {
  to: string;
  variant?: keyof typeof btn;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={cn(btn[variant], className)}>
      {children}
    </Link>
  );
}

export function Ext({
  href,
  variant = "primary",
  className,
  children,
  onClick,
}: {
  href: string;
  variant?: keyof typeof btn;
  className?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(btn[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function OrderOnlineButton({
  href,
  to = "/menu",
  className,
  children = "Order Online",
}: {
  href?: string | undefined;
  to?: string | undefined;
  className?: string | undefined;
  children?: ReactNode;
}) {
  const content = (
    <>
      <Utensils className="size-3.5 shrink-0" />
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(btn.order, className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={cn(btn.order, className)}>
      {content}
    </Link>
  );
}

export function GetDirectionsButton({
  href = DIRECTIONS_URL,
  variant = "outline",
  className,
  children = "Get Directions",
}: {
  href?: string;
  variant?: keyof typeof btn;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(btn[variant], className)}
    >
      <MapPin className="size-3.5 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
  center,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2.5 text-3xl leading-tight text-foreground md:text-4xl">{title}</h2>
      {children && <p className="mt-3.5 text-base leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border/80 bg-gradient-to-br from-[#faf6fd] via-white to-[#f5eefc]">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16 reveal">
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-primary" />
          <p className="eyebrow">{eyebrow}</p>
        </div>
        <h1 className="mt-3 max-w-3xl text-3xl leading-tight text-foreground md:text-5xl">{title}</h1>
        {children && <p className="mt-3.5 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">{children}</p>}
      </div>
    </section>
  );
}
