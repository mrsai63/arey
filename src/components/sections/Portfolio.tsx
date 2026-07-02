import { motion } from "framer-motion";
import { Header } from "./Services";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCMS } from "@/hooks/useCMS";

export function Portfolio() {
  const { data } = useCMS();
  const portfolio = data.portfolio;
  const projects = portfolio.projects || [];

  return (
    <section className="container-bs py-32" id="portfolio">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Header
            center={false}
            eyebrow={portfolio.eyebrow}
            title={portfolio.title}
          />
        </div>
        <Link to="/portfolio" className="group inline-flex items-center gap-2 text-sm font-medium text-primary">
          View all projects
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px]">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link || "#"}
            target={p.link ? "_blank" : undefined}
            rel={p.link ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className={`group relative overflow-hidden rounded-3xl border border-border bg-surface ${p.span || ""}`}
          >
            {/* If it starts with http/https, it is an image. Otherwise, it is a gradient class string */}
            {p.grad?.startsWith("http") ? (
              <img
                src={p.grad}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${p.grad || "from-zinc-300/30 to-zinc-700/20"}`} />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
            <div className="absolute inset-0 grid place-items-center font-display text-5xl font-bold text-white/10 transition-all duration-700 group-hover:scale-110">
              {p.title.charAt(0)}
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent pt-12">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">{p.tag}</div>
                <div className="mt-1 font-display text-lg font-semibold text-foreground">{p.title}</div>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45 shrink-0">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
