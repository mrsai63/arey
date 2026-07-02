import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(tick);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-cursor='hover']"));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    const r = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(r);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-primary"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[200] rounded-full border border-primary/70 transition-[width,height,background-color] duration-200 ${
          hover ? "h-12 w-12 bg-primary/15" : "h-8 w-8"
        }`}
      />
    </>
  );
}
