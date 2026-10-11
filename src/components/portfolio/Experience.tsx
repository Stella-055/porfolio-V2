import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { experience } from "@/data/portfolio";
import { useParallax } from "./useParallax";

export function Experience() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { ref, y } = useParallax<HTMLDivElement>(18);
  const entry = experience[active];
  if (!entry) return null;
  const [year, company, role, description] = entry;
  const select = (index: number) => setActive((index + experience.length) % experience.length);
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % experience.length;
    else if (event.key === "ArrowLeft") next = (index + experience.length - 1) % experience.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = experience.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`career-tab-${next}`)?.focus();
  };

  return <section id="experience" className="section experience-section" aria-labelledby="experience-heading">
    <div className="career-topline"><span>04 / EXPERIENCE</span><span>2022 — PRESENT</span></div>
    <div className="career-heading"><h2 id="experience-heading">Beyond the screen.<br /><em>Into the real world.</em></h2><ArrowUpRight aria-hidden="true" /></div>
    <div className="career-rail" role="tablist" aria-label="Career milestones">
      {experience.map(([date, employer, title], index) => <Button key={`${employer}-${date}`} variant="ghost" role="tab" id={`career-tab-${index}`} aria-label={`${employer}, ${date}, ${title}`} aria-selected={active === index} aria-controls="career-panel" tabIndex={active === index ? 0 : -1} className={`career-stop ${active === index ? "is-active" : ""}`} onClick={() => select(index)} onKeyDown={event => handleKey(event, index)}>
        <span className="career-stop-date">{date}</span><span className="career-node" aria-hidden="true" /><span className="career-stop-company">{employer}</span><span className="career-stop-index">0{index + 1}</span>
      </Button>)}
    </div>
    <div id="career-panel" className="career-spotlight" role="tabpanel" aria-labelledby={`career-tab-${active}`} tabIndex={0}>
      <motion.div ref={ref} style={{ y }} className="career-year" aria-hidden="true"><span>{year.slice(0, 4)}</span><span>{active === 0 ? "IN PROGRESS" : `CHAPTER 0${active + 1}`}</span></motion.div>
      <motion.div key={active} className="career-story" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .3 }}>
        <div className="career-story-meta"><span>{year}</span>{active === 0 && <span className="career-current"><i />CURRENT ROLE</span>}</div>
        <h3>{company}</h3><strong>{role}</strong><p>{description}</p>
      </motion.div>
    </div>
    <div className="career-bottom"><span>0{active + 1} <span>/ 0{experience.length}</span></span><div><Button variant="outline" size="icon" title="Previous role" aria-label="Previous role" onClick={() => select(active - 1)}><ArrowLeft /></Button><Button variant="outline" size="icon" title="Next role" aria-label="Next role" onClick={() => select(active + 1)}><ArrowRight /></Button></div></div>
  </section>;
}