import { useState } from "react";
import { ArrowRight, MapPin, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aboutProfile } from "@/data/portfolio";
import { motion } from "motion/react";
import { useParallax } from "./useParallax";

export function About() {
  const [active, setActive] = useState(0);
  const interest = aboutProfile.interests[active];
  const { ref, y } = useParallax<HTMLDivElement>(35);

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="about-topline"><span>01 / ABOUT</span><span>THE PERSON BEHIND THE SYSTEMS</span></div>
      <div className="about-layout">
        <aside className="about-identity">
          <motion.div ref={ref} style={{ y }} className="about-monogram" aria-hidden="true"><span>S.</span><MoveUpRight /></motion.div>
          <h3>{aboutProfile.name}<span>{aboutProfile.role}</span></h3>
          <p className="about-location"><MapPin size={14} />{aboutProfile.location}</p>
          <div className="about-education"><span>EDUCATION</span><p>{aboutProfile.education}</p></div>
          <Button variant="outline" disabled className="about-cv">CV available soon <ArrowRight /></Button>
        </aside>
        <div className="about-story">
          <h2 id="about-title">Curious about what’s <em>underneath.</em><br />Intentional about what’s on top.</h2>
          <p className="about-description">{aboutProfile.description}</p>
          <div className="about-interests" role="tablist" aria-label="Engineering interests">
            {aboutProfile.interests.map((item, index) => (
              <Button key={item.name} variant="ghost" role="tab" id={`about-tab-${index}`} aria-selected={active === index} aria-controls="about-interest-panel" className={`about-interest ${active === index ? "is-active" : ""}`} onClick={() => setActive(index)}>
                <span className="about-interest-number">0{index + 1}</span><span className="about-interest-name">{item.name}</span><span className="about-interest-detail">{item.detail}</span><ArrowRight />
              </Button>
            ))}
          </div>
          <div className="about-interest-panel" id="about-interest-panel" role="tabpanel" aria-labelledby={`about-tab-${active}`} tabIndex={0}><p>{interest?.description}</p></div>
        </div>
      </div>
    </section>
  );
}