import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    let p = 0;
    const tick = () => {
      p = Math.min(100, p + Math.random() * 6 + 2);
      setProgress(Math.floor(p));
      if (p < 100) raf = window.setTimeout(tick, 70);
      else window.setTimeout(() => setDone(true), 500);
    };
    raf = window.setTimeout(tick, 200);
    return () => window.clearTimeout(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,132,255,0.25),transparent_55%)]" />

          <div className="relative flex flex-col items-center gap-8">
            <div className="relative grid place-items-center">
              <div className="absolute h-40 w-40 animate-spin-slow rounded-full border border-transparent [background:conic-gradient(from_0deg,transparent,rgba(10,132,255,0.9),transparent_60%)] [mask:radial-gradient(circle,transparent_64%,#000_65%)]" />
              <div className="absolute h-40 w-40 rounded-full border border-primary/20" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <Logo className="text-xl" showTagline />
              </motion.div>
            </div>

            <div className="flex w-64 flex-col items-center gap-2">
              <div className="h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-white"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="flex w-full justify-between font-display text-xs tracking-widest text-muted-foreground">
                <span>LOADING</span>
                <span>{progress.toString().padStart(3, "0")}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
