import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";

/** Element-local depth without changing document flow or scroll behavior. */
export function useParallax<T extends HTMLElement>(distance = 28) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 900px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travel = reduced ? 0 : distance * (compact ? .4 : 1);
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);
  return { ref, y };
}