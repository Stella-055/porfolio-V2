import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github, Linkedin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/lib/contact.functions";
import { certifications, contactLinks, highlights, projects, skillGroups, type Project } from "@/data/portfolio";
import deworkImage from "@/assets/dework-system.jpg";
import notelyImage from "@/assets/notely-system.jpg";
import wildlifeImage from "@/assets/wildlife-system.jpg";
import graduationImage from "@/assets/milestone-graduation.jpeg";
import hackathonImage from "@/assets/milestone-hackathon.jpeg";
import certificateImage from "@/assets/milestone-certificate.jpg";
import certificateGraduationImage from "@/assets/certificate-graduation.jpeg";
import certificateHackathonImage from "@/assets/certificate-hackathon.jpg";
import certificateProgramImage from "@/assets/certificate-program.jpg";
import { SectionHeader } from "./SectionHeader";
import { SystemVisual } from "./SystemVisual";
import { About } from "./About";
import { useParallax } from "./useParallax";
import { Focus } from "./Focus";
import { Experience } from "./Experience";

const images = { dework: deworkImage, notely: notelyImage, wildlife: wildlifeImage };
const navItems = ["about", "work", "experience", "focus", "highlights", "contact"];

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <button className="wordmark" onClick={() => navigate("top")} aria-label="Go to top">STELLA<span>.</span></button>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => <button key={item} onClick={() => navigate(item)}>{item}</button>)}
      </nav>
      <div className="availability"><i />Available</div>
      <Button variant="ghost" size="icon" className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button>
      <AnimatePresence>{open && (
        <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          {navItems.map((item, i) => <button key={item} onClick={() => navigate(item)}><span>0{i + 1}</span>{item}</button>)}
        </motion.nav>
      )}</AnimatePresence>
    </header>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const { ref, y } = useParallax<HTMLDivElement>(18);
  return <motion.div ref={ref} style={{ y }} className={className} initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: reduced ? 0 : .65, ease: [0.2, 0.8, 0.2, 1] }}>{children}</motion.div>;
}

function Hero() {
  const { ref, y } = useParallax<HTMLDivElement>(-25);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <motion.div ref={ref} style={{ y }} className="hero-copy">
          <div className="eyebrow"><span>Software engineer</span><span>Nairobi · KE</span></div>
          <h1><span>STELLA</span><em>ENGINEERS</em><span>SYSTEMS.</span></h1>
          <p>Building software across backend systems, applied AI, Web3, and connected technologies.</p>
          <p className="hero-note">I like understanding how systems work beneath the interface — then building them better.</p>
          <div className="hero-actions">
            <Button size="lg" onClick={() => scrollTo("work")}>View my work <ArrowDown /></Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("contact")}>Get in touch <ArrowRight /></Button>
          </div>
        </motion.div>
        <SystemVisual />
      </div>
      <div className="hero-meta"><span>BACKEND / AI / WEB3</span><span>SMART SYSTEMS / IOT</span><span>SCROLL TO TRACE THE SYSTEM ↓</span></div>
    </section>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  const { ref, y } = useParallax<HTMLDivElement>(38);
  return <motion.div ref={ref} style={{ y, scale: 1.15 }} className="parallax-project-art"><ProjectArtwork project={project} /></motion.div>;
}

function ProjectArtwork({ project }: { project: Project }) {
  const src = project.image === "graphic" ? undefined : images[project.image as keyof typeof images];
  if (src) return <img src={src} alt={`Abstract system artwork for ${project.name}`} loading="lazy" width={1400} height={1100} />;
  return <div className="project-graphic" aria-hidden="true"><span>{project.index}</span><div className="graphic-track">{project.flow.map(item => <i key={item} />)}</div><strong>{project.name.slice(0, 2)}</strong></div>;
}

function ProjectShowcase({ onSelect }: { onSelect: (project: Project) => void }) {
  const reduced = useReducedMotion();
  const [viewportRef, carousel] = useEmblaCarousel({ loop: true, duration: reduced ? 0 : 25 });
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!carousel) return;
    const update = () => setActive(carousel.selectedScrollSnap());
    update();
    carousel.on("select", update).on("reInit", update);
    return () => { carousel.off("select", update).off("reInit", update); };
  }, [carousel]);
  return (
    <section id="work" className="section work-section">
      <SectionHeader number="02" label="Selected work" title="Built from the system outward." />
      <div className="work-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects" onKeyDown={event => {
        if (event.key === "ArrowLeft") { event.preventDefault(); carousel?.scrollPrev(); }
        if (event.key === "ArrowRight") { event.preventDefault(); carousel?.scrollNext(); }
      }}>
        <div className="work-viewport" ref={viewportRef}>
          <div className="work-track">
            {projects.map((project, index) => (
              <article key={project.id} className="work-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.name}`} aria-hidden={active !== index} inert={active !== index}>
                <Button variant="ghost" className="project-visual-wrap" onClick={() => onSelect(project)} aria-label={`View ${project.name} project details`}><ProjectVisual project={project} /><span className="view-project">Open case file <ArrowRight /></span></Button>
                <div className="project-copy"><span className="project-number">{project.index} / {String(projects.length).padStart(2, "0")}</span><p className="project-kind">{project.kind}</p><h3>{project.name}</h3><p>{project.description}</p><div className="tech-line">{project.technologies.slice(0, 5).map(tech => <span key={tech}>{tech}</span>)}</div><Button variant="ghost" onClick={() => onSelect(project)}>Inspect system <ArrowRight /></Button></div>
              </article>
            ))}
          </div>
        </div>
        <div className="work-controls">
          <span className="work-count" role="status" aria-live="polite">{String(active + 1).padStart(2, "0")} <span>/ {String(projects.length).padStart(2, "0")}</span></span>
          <div className="work-pagination" aria-label="Choose a project">{projects.map((project, index) => <Button key={project.id} variant="ghost" size="icon" aria-label={`Show ${project.name}`} aria-current={active === index ? "true" : undefined} title={project.name} className={active === index ? "is-active" : ""} onClick={() => carousel?.scrollTo(index)}><span /></Button>)}</div>
          <div className="work-arrows"><Button variant="outline" size="icon" aria-label="Previous project" title="Previous project" onClick={() => carousel?.scrollPrev()}><ArrowLeft /></Button><Button variant="outline" size="icon" aria-label="Next project" title="Next project" onClick={() => carousel?.scrollNext()}><ArrowRight /></Button></div>
        </div>
      </div>
    </section>
  );
}

function ProjectDetail({ project, close }: { project: Project; close: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("modal-open"); window.removeEventListener("keydown", onKey); };
  }, [close]);
  return (
    <motion.div className="project-modal" role="dialog" aria-modal="true" aria-label={`${project.name} project details`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.article initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}>
        <Button variant="ghost" size="icon" className="modal-close" onClick={close} aria-label="Close project details"><X /></Button>
        <div className="modal-index">CASE / {project.index}</div><h2>{project.name}</h2><p className="modal-lede">{project.description}</p>
        <div className="modal-grid"><div><h3>Problem → solution</h3><p>{project.highlight}</p><h3>Result</h3><p>{project.result}</p></div><div><h3>Technology</h3><div className="tech-stack">{project.technologies.map(item => <span key={item}>{item}</span>)}</div>{project.website && <a href={project.website} target="_blank" rel="noreferrer">Visit live product <ExternalLink /></a>}</div></div>
        <div className="flow"><span>HOW IT WORKS</span><div>{project.flow.map((item, i) => <div key={item}><b>{String(i + 1).padStart(2, "0")}</b><strong>{item}</strong>{i < project.flow.length - 1 && <i />}</div>)}</div></div>
      </motion.article>
    </motion.div>
  );
}

function SkillMatrix() {
  const groups = Object.keys(skillGroups) as Array<keyof typeof skillGroups>;
  const [active, setActive] = useState<(typeof groups)[number]>("Backend");
  return (
    <section className="section skill-section">
      <SectionHeader number="03" label="Technical range" title="Tools in context, not isolation." />
      <div className="skill-layout"><div className="skill-tabs" role="tablist" aria-label="Skill groups">{groups.map((group, index) => <button role="tab" aria-selected={active === group} className={active === group ? "active" : ""} onClick={() => setActive(group)} key={group}><span>0{index + 1}</span>{group}</button>)}</div><AnimatePresence mode="wait"><motion.div className="skill-field" key={active} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}><span className="skill-title">{active}</span>{skillGroups[active].map((skill, i) => <div className="skill-item" key={skill}><i style={{ opacity: 1 - i * .08 }} />{skill}</div>)}</motion.div></AnimatePresence></div>
    </section>
  );
}

const milestoneImages = { graduation: graduationImage, hackathon: hackathonImage, certificate: certificateImage } as const;
function HighlightMark({ mark }: { mark: string }) {
  const { ref, y } = useParallax<HTMLSpanElement>(30);
  return <motion.span ref={ref} style={{ y }} className="photo-mark">{mark}</motion.span>;
}
const certImages = { graduation: certificateGraduationImage, hackathon: certificateHackathonImage, program: certificateProgramImage } as const;
function Highlights() {
  const [active, setActive] = useState<number | null>(null);
  const activeHighlight = active === null ? undefined : highlights[active];
  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
  return (
    <section id="highlights" className="section highlights-section">
      <SectionHeader number="06" label="Highlights" title="Milestones beyond the commit history." />
      <p className="photo-note">Placeholder artwork for now — your graduation, hackathon, and certificate photography drops straight into these frames.</p>
      <div className="highlight-grid">
        {highlights.map((item, i) => (
          <button key={item.index} onClick={() => setActive(i)} className={`highlight highlight-${i + 1}`}>
            <div className="photo-placeholder"><img src={milestoneImages[item.image]} alt={`${item.title} — placeholder artwork`} loading="lazy" width={1200} height={900} /><HighlightMark mark={item.mark} /><i /></div>
            <span>{item.index}</span>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
          </button>
        ))}
      </div>
      <div className="cert-band">
        <span className="cert-label">Certifications</span>
        <div className="cert-viewport" role="region" aria-label="Certifications">
          <div className="cert-track">
            {[0, 1, 2].map(copy => (
              <ul className="cert-row" key={copy} aria-hidden={copy > 0}>
                {certifications.map((cert, i) => (
                  <li key={cert.title}>
                    <figure className="cert-card">
                      <img src={certImages[cert.image]} alt={`${cert.title} — placeholder artwork`} loading="lazy" width={1024} height={768} />
                      <figcaption><i aria-hidden="true">{String(i + 1).padStart(2, "0")}</i><strong>{cert.title}</strong><span>{cert.issuer} · {cert.year}</span></figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <p className="cert-note">Scan placeholders for now — your certificate photography drops straight into these frames.</p>
      <AnimatePresence>
        {activeHighlight && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={activeHighlight.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <Button variant="ghost" size="icon" aria-label="Close image"><X /></Button>
            <div className="lightbox-frame">
              <div className="photo-placeholder"><img src={milestoneImages[activeHighlight.image]} alt={`${activeHighlight.title} — placeholder artwork`} width={1200} height={900} /><span className="photo-mark">{activeHighlight.mark}</span><i /></div>
              <h3>{activeHighlight.title}</h3>
              <p>{activeHighlight.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SocialGlyph({ id }: { id: string }) {
  if (id === "github") return <Github aria-hidden="true" />;
  if (id === "linkedin") return <Linkedin aria-hidden="true" />;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34M12.05 21.8h-.01c-1.8 0-3.56-.49-5.1-1.4l-.36-.2-3.74.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41" />
    </svg>
  );
}

function Contact() {
  const { ref, y } = useParallax<HTMLHeadingElement>(24);
  const submit = useServerFn(submitContactMessage);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    const result = await submit({
      data: {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
        company: String(data.get("company") ?? ""),
      },
    });
    if (result.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
      setError(result.error);
    }
  };
  return <section id="contact" className="contact-section">
    <div className="contact-label">07 / CONTACT</div>
    <motion.h2 ref={ref} style={{ y }}>LET’S BUILD<br /><em>SOMETHING.</em></motion.h2>
    <p>I’m interested in software engineering opportunities, backend development, Web3, applied AI, and technically challenging products.</p>
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-legend"><span>Contact form</span><span>All fields required</span></div>
      <div className="form-row">
        <label><span className="field-label"><i aria-hidden="true">01</i>Name</span><input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" /></label>
        <label><span className="field-label"><i aria-hidden="true">02</i>Email</span><input name="email" type="email" required maxLength={255} autoComplete="email" placeholder="you@company.com" /></label>
      </div>
      <label><span className="field-label"><i aria-hidden="true">03</i>Message</span><textarea name="message" required maxLength={2000} rows={5} placeholder="What are you building?" /></label>
      <input type="text" name="company" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-actions">
        <Button size="lg" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending" : "Send message"} <ArrowRight /></Button>
        <p className={`form-note ${status === "sent" ? "ok" : status === "error" ? "err" : "idle"}`} role={status === "idle" ? undefined : status === "error" ? "alert" : "status"}>{status === "sent" ? "Message received — thank you. I’ll get back to you soon." : status === "error" ? error : "Ready to collaborate — tell me what you’re building."}</p>
      </div>
    </form>
    <div className="contact-socials">
      <span className="contact-socials-label">Or reach me directly</span>
      <div className="contact-social-list">
        {contactLinks.map((link, i) => (
          <a key={link.id} className="contact-social" href={link.href} target="_blank" rel="noreferrer noopener">
            <span className="contact-social-icon"><SocialGlyph id={link.id} /></span>
            <span className="contact-social-copy">
              <span className="contact-social-name"><i aria-hidden="true">{String(i + 1).padStart(2, "0")}</i>{link.label}</span>
              <span className="contact-social-handle">{link.handle}</span>
            </span>
            <ArrowUpRight className="contact-social-arrow" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
    <footer><strong>STELLA.</strong><span>SOFTWARE ENGINEER</span><span>NAIROBI, KENYA</span><span>© 2026</span></footer>
  </section>;
}

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll();
  return <main className="portfolio"><motion.div className="progress" style={{ scaleX: scrollYProgress }} /><Navigation /><Hero /><About /><ProjectShowcase onSelect={setSelected} /><SkillMatrix /><Experience /><Focus /><Highlights /><Contact /><AnimatePresence>{selected && <ProjectDetail project={selected} close={() => setSelected(null)} />}</AnimatePresence></main>;
}