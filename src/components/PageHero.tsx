import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40vmax] w-[40vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.25),transparent_65%)] blur-3xl" />
      </div>
      <div className="container-bs text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-foreground/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl"
        >
          {typeof title === "string" ? (
            <span dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            title
          )}
        </motion.h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}
