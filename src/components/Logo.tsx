import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-8 w-auto", showTagline = false }: { className?: string; showTagline?: boolean }) {
  return (
    <Link to="/" aria-label="Brand Shoots — Home" className="inline-flex flex-col leading-none">
      <span className={`font-display font-bold tracking-tight ${className} flex items-baseline`}>
        <span className="text-primary">BRAND</span>
        <span className="text-foreground">SHOOTS</span>
      </span>
      {showTagline && (
        <span className="mt-1 text-[10px] font-medium tracking-[0.25em] text-muted-foreground uppercase">
          Create · Shoot · Grow
        </span>
      )}
    </Link>
  );
}
