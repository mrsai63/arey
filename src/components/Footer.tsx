import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border/60 bg-[radial-gradient(ellipse_at_top,rgba(10,132,255,0.18),transparent_60%)]">
      <div className="container-bs grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="text-2xl" showTagline />
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">
            A creative & performance studio building powerful brands and high-converting marketing
            campaigns. Rajahmundry · Vijayawada · Across India.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 transition-all hover:border-primary hover:text-primary hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Services", "/services"],
              ["Industries", "/industries"],
              ["Portfolio", "/portfolio"],
              ["Contact", "/contact"],
            ].map(([l, h]) => (
              <li key={l}>
                <Link to={h} className="group inline-flex items-center gap-1 text-foreground/80 hover:text-primary">
                  {l}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 text-foreground/80">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              Rajahmundry · Vijayawada · India
            </li>
            <li className="flex items-center gap-3 text-foreground/80">
              <Mail className="h-4 w-4 text-primary" />
              hello@brandshoots.in
            </li>
            <li className="flex items-center gap-3 text-foreground/80">
              <Phone className="h-4 w-4 text-primary" />
              +91 00000 00000
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-bs flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Brand Shoots. All rights reserved.</p>
          <p className="font-display tracking-[0.3em]">CREATE · SHOOT · GROW 🚀</p>
        </div>
      </div>
    </footer>
  );
}
