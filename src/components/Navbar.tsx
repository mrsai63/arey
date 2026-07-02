import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass flex w-full max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500 ${
          scrolled ? "py-2 shadow-[0_10px_40px_-20px_rgba(10,132,255,0.4)]" : "py-3"
        }`}
      >
        <Logo className={scrolled ? "text-base" : "text-lg"} />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group relative rounded-full px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden font-button items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_10px_30px_-10px_rgba(10,132,255,0.7)] md:inline-flex"
          >
            Let's Grow
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute top-20 mx-4 w-[calc(100%-2rem)] rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block rounded-lg px-3 py-3 text-base text-foreground/90 hover:bg-white/5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  to="/contact"
                  className="block rounded-full bg-primary px-4 py-3 text-center font-button font-semibold text-primary-foreground"
                >
                  Let's Grow
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
