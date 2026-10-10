import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { focusDetails, specialties } from "@/data/portfolio";
import { useParallax } from "./useParallax";

function FocusDiagram({ active }: { active: number }) {
  const reduced = useReducedMotion();
  const shapes = [
    ["M70 150 L210 80 L350 150 L210 220 Z", "M70 190 L210 120 L350 190 L210 260 Z", "M70 230 L210 160 L350 230 L210 300 Z"],
    ["M80 100 L210 70 L340 100 L340 280 L210 310 L80 280 Z", "M80 100 L210 190 L340 100 M80 280 L210 190 L340 280 M210 70 L210 310", "M80 190 L340 190"],
    ["M210 55 L330 125 L330 265 L210 335 L90 265 L90 125 Z", "M210 55 L210 195 L90 265 M210 195 L330 265 M90 125 L210 195 L330 125", "M155 160 L210 128 L265 160 L265 225 L210 257 L155 225 Z"],
    ["M85 85 H335 V305 H85 Z", "M140 140 H280 V250 H140 Z", "M40 140 H140 M40 250 H140 M280 140 H380 M280 250 H380 M155 40 V140 M265 40 V140 M155 250 V350 M265 250 V350"],
  ];
  return <svg viewBox="0 0 420 390" className="focus-diagram" aria-hidden="true">
    <path className="focus-guide" d="M0 195H420 M210 0V390" />
    {shapes[active]?.map((path, i) => <motion.path key={`${active}-${i}`} d={path} className={i === 1 ? "focus-path-accent" : "focus-path"} initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : i * .12 }} />)}
    <motion.circle className="focus-pulse" cx="210" cy="195" r="6" animate={{ r: reduced ? 6 : [5, 8, 5] }} transition={{ duration: 3, repeat: reduced ? 0 : Infinity }} />
    <circle className="focus-anchor" cx="85" cy="85" r="3" /><circle className="focus-anchor" cx="335" cy="305" r="3" />
  </svg>;
}

export function Focus() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { ref, y } = useParallax<HTMLDivElement>(25);
  const detail = focusDetails[active];
  const specialty = specialties[active];
  if (!detail || !specialty) return null;
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % specialties.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + specialties.length - 1) % specialties.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = specialties.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`focus-tab-${next}`)?.focus();
  };
  return <section id="focus" className="section focus-section" aria-labelledby="focus-heading">
    <div className="focus-topline"><span>05 / WHAT I BUILD</span><span>FOUR PRACTICES. ONE SYSTEMS MINDSET.</span></div>
    <div className="focus-intro"><h2 id="focus-heading">Different layers.<br /><em>Same curiosity.</em></h2><p>From the architecture beneath a product to the intelligence inside it — and the world beyond the screen.</p></div>
    <div className="focus-layout">
      <div className="focus-tabs" role="tablist" aria-label="Engineering practices" aria-orientation="vertical">
        {specialties.map(([number, name, copy], index) => <Button variant="ghost" key={number} id={`focus-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="focus-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => handleKey(event, index)} className={`focus-tab ${index === active ? "is-active" : ""}`}><span className="focus-number">{number}</span><span className="focus-tab-copy"><strong>{name}</strong><span>{copy}</span></span><ArrowUpRight /></Button>)}
      </div>
      <div id="focus-panel" className="focus-panel" role="tabpanel" aria-labelledby={`focus-tab-${active}`} tabIndex={0}>
        <div className="focus-panel-meta"><span>{specialty[1]}</span><span>{specialty[0]} / 04</span></div>
        <motion.div ref={ref} style={{ y }} className="focus-art"><FocusDiagram active={active} /></motion.div>
        <AnimatePresence mode="wait"><motion.div key={active} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }} className="focus-panel-copy"><h3>{detail.headline}</h3><p>{detail.description}</p><div className="focus-flow">{detail.flow.map((step, i) => <span key={step}>{step}{i < detail.flow.length - 1 && <i aria-hidden="true">→</i>}</span>)}</div><div className="focus-proof"><span>IN PRACTICE</span><strong>{detail.project}</strong></div></motion.div></AnimatePresence>
      </div>
    </div>
  </section>;
}