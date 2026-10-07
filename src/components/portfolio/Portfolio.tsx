import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowRight, ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/lib/contact.functions";
import { experience, projects, skillGroups, specialties, type Project } from "@/data/portfolio";
import deworkImage from "@/assets/dework-system.jpg";
import notelyImage from "@/assets/notely-system.jpg";
import wildlifeImage from "@/assets/wildlife-system.jpg";
import { SectionHeader } from "./SectionHeader";
import { SystemVisual } from "./SystemVisual";

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
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: reduced ? 0 : .65, ease: [0.2, 0.8, 0.2, 1] }}>{children}</motion.div>;
}

function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span>Software engineer</span><span>Nairobi · KE</span></div>
          <h1><span>STELLA</span><em>ENGINEERS</em><span>SYSTEMS.</span></h1>
          <p>Building software across backend systems, applied AI, Web3, and connected technologies.</p>
          <p className="hero-note">I like understanding how systems work beneath the interface — then building them better.</p>
          <div className="hero-actions">
            <Button size="lg" onClick={() => scrollTo("work")}>View my work <ArrowDown /></Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("contact")}>Get in touch <ArrowRight /></Button>
          </div>
        </div>
        <SystemVisual />
      </div>
      <div className="hero-meta"><span>BACKEND / AI / WEB3</span><span>SMART SYSTEMS / IOT</span><span>SCROLL TO TRACE THE SYSTEM ↓</span></div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <SectionHeader number="01" label="About" title="Behind the interface." />
      <Reveal className="about-layout">
        <div className="about-copy">
          <p>I’m a software engineer interested in what happens behind the interface.</p>
          <p>I enjoy building APIs, working with databases and cloud infrastructure, designing backend systems, and integrating AI into useful products. I’m also interested in Web3 and systems that connect software with the physical world.</p>
          <p>My work sits somewhere between software engineering, emerging technology, and experimentation.</p>
        </div>
        <aside className="profile-sheet">
          {[["Role", "Software Engineer"], ["Focus", "Backend / AI / Web3"], ["Location", "Nairobi, Kenya"], ["Education", "Software Engineering — Murang'a University of Technology"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          <Button variant="outline" disabled>CV available soon</Button>
        </aside>
      </Reveal>
    </section>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  const src = project.image === "graphic" ? undefined : images[project.image as keyof typeof images];
  if (src) return <img src={src} alt={`Abstract system artwork for ${project.name}`} loading="lazy" width={1400} height={1100} />;
  return <div className="project-graphic" aria-hidden="true"><span>{project.index}</span><div className="graphic-track">{project.flow.map(item => <i key={item} />)}</div><strong>{project.name.slice(0, 2)}</strong></div>;
}

function ProjectShowcase({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <section id="work" className="section work-section">
      <SectionHeader number="02" label="Selected work" title="Built from the system outward." />
      <div className="projects-list">
        {projects.map((project, index) => (
          <Reveal key={project.id} className={`project-row project-row-${index + 1}`}>
            <button className="project-visual-wrap" onClick={() => onSelect(project)} aria-label={`View ${project.name} project details`}><ProjectVisual project={project} /><span className="view-project">Open case file <ArrowRight /></span></button>
            <div className="project-copy"><span className="project-number">{project.index} / 05</span><p className="project-kind">{project.kind}</p><h3>{project.name}</h3><p>{project.description}</p><div className="tech-line">{project.technologies.slice(0, 5).map(tech => <span key={tech}>{tech}</span>)}</div><Button variant="ghost" onClick={() => onSelect(project)}>Inspect system <ArrowRight /></Button></div>
          </Reveal>
        ))}
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

function Experience() {
  return <section id="experience" className="section experience-section"><SectionHeader number="04" label="Experience" title="Software, systems, and the physical world." /><div className="timeline">{experience.map(([year, company, role, text], i) => <Reveal className="timeline-row" key={`${company}-${year}`}><span>{String(i + 1).padStart(2, "0")}</span><time>{year}</time><div><h3>{company}</h3><strong>{role}</strong></div><p>{text}</p></Reveal>)}</div></section>;
}

function Specialization() {
  return <section id="focus" className="section focus-section"><SectionHeader number="05" label="What I build" title="Four connected practices." /><div className="specialty-grid">{specialties.map(([number, name, copy]) => <Reveal className="specialty" key={number}><span>{number}</span><div><h3>{name}</h3><p>{copy}</p></div></Reveal>)}</div></section>;
}

const highlights = [["01", "Software engineering graduation", "Murang'a University of Technology · Class of 2026", "GRAD / 26"], ["02", "AI hackathon · 2nd place", "AI WhatsApp Customer Assistant", "02 / PLACE"], ["03", "Teach2Give", "Software Engineering Program · 2025", "T2G / 25"]] as const;
function Highlights() {
  const [active, setActive] = useState<number | null>(null);
  const activeHighlight = active === null ? undefined : highlights[active];
  return <section id="highlights" className="section highlights-section"><SectionHeader number="06" label="Highlights" title="Milestones beyond the commit history." /><p className="photo-note">Personal photography will live here — the frames are ready for your graduation, hackathon, and certificate images.</p><div className="highlight-grid">{highlights.map(([number, title, caption, mark], i) => <button key={number} onClick={() => setActive(i)} className={`highlight highlight-${i + 1}`}><div className="photo-placeholder"><span>{mark}</span><i /></div><span>{number}</span><h3>{title}</h3><p>{caption}</p></button>)}</div><AnimatePresence>{activeHighlight && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={activeHighlight[1]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}><Button variant="ghost" size="icon" aria-label="Close image"><X /></Button><div className="lightbox-frame"><div className="photo-placeholder"><span>{activeHighlight[3]}</span><i /></div><h3>{activeHighlight[1]}</h3><p>{activeHighlight[2]}</p></div></motion.div>}</AnimatePresence></section>;
}

function Contact() {
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
    <h2>LET’S BUILD<br /><em>SOMETHING.</em></h2>
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
    <footer><strong>STELLA.</strong><span>SOFTWARE ENGINEER</span><span>NAIROBI, KENYA</span><span>© 2026</span></footer>
  </section>;
}

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll();
  return <main className="portfolio"><motion.div className="progress" style={{ scaleX: scrollYProgress }} /><Navigation /><Hero /><About /><ProjectShowcase onSelect={setSelected} /><SkillMatrix /><Experience /><Specialization /><Highlights /><Contact /><AnimatePresence>{selected && <ProjectDetail project={selected} close={() => setSelected(null)} />}</AnimatePresence></main>;
}