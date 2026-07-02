import { motion } from "framer-motion";
import { Header } from "./Services";
import { useCMS } from "@/hooks/useCMS";

export function Process() {
  const { data } = useCMS();
  const process = data.process;
  const steps = process.steps || [];

  return (
    <section className="container-bs py-32" id="process">
      <Header
        eyebrow={process.eyebrow}
        title={process.title}
        sub={process.sub}
      />

      <div className="relative mt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
        <ul className="space-y-12 md:space-y-20">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className={`${i % 2 ? "md:text-left md:pl-16" : "md:text-right md:pr-16"}`}>
                <div className="font-display text-6xl font-bold text-primary/30 md:text-7xl">{s.n}</div>
                <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base md:inline-block">{s.desc}</p>
              </div>
              <div className="hidden md:block">
                <div className="absolute left-1/2 top-1/2 grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary bg-background">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
