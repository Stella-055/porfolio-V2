import { motion } from "motion/react";
import { useParallax } from "./useParallax";

export function SectionHeader({ number, label, title }: { number: string; label: string; title: string }) {
  const { ref, y } = useParallax<HTMLElement>(22);
  return (
    <motion.header ref={ref} style={{ y }} className="section-heading">
      <div className="section-kicker"><span>{number}</span><span>{label}</span></div>
      <h2>{title}</h2>
    </motion.header>
  );
}