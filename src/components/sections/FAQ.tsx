import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "./Services";
import { useCMS } from "@/hooks/useCMS";

export function FAQ() {
  const { data } = useCMS();
  const faqSection = data.faq;
  const faqs = faqSection.items || [];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-bs py-32">
      <Header
        eyebrow={faqSection.eyebrow}
        title={faqSection.title}
      />
      <div className="mx-auto mt-12 max-w-3xl">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-border">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-lg font-medium md:text-xl">{f.q}</span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-all ${isOpen ? "rotate-45 border-primary bg-primary text-primary-foreground" : ""}`}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-12 text-sm text-muted-foreground md:text-base">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
