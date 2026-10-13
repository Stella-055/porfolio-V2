import certificateGraduation from "@/assets/certificate-graduation.jpg";
import Ava from "@/assets/ava.jpg";
import mlsa from "@/assets/mlsa.jpg";
import nolongting from "@/assets/nolongting.jpg";
import origin from "@/assets/origin.jpg";
import summit from "@/assets/summit.jpg";
import t2g from "@/assets/t2g.jpg";
import tharaka from "@/assets/Tharaka.jpg";

export const aboutProfile = {
  name: "Stella",
  role: "Software Engineer",
  location: "Nairobi, Kenya",
  education: "Software Engineering — Murang'a University of Technology",
  introduction: "Curious about what’s underneath. Intentional about what’s on top.",
  description: "I’m a software engineer interested in what happens behind the interface. My work sits between software engineering, emerging technology, and experimentation.",
  interests: [
    { name: "Backend", detail: "APIs, databases & architecture", description: "I enjoy building APIs, working with databases and cloud infrastructure, and designing the backend systems that hold a product together." },
    { name: "Applied AI", detail: "Intelligence with a purpose", description: "I’m interested in integrating AI into useful products — connecting models, business knowledge, and thoughtful interfaces to solve real problems." },
    { name: "Web3", detail: "Trust built into the system", description: "I explore smart contracts and decentralized applications, where software makes the rules of trust and ownership explicit." },
    { name: "Smart systems", detail: "Software meets the physical world", description: "My experience extends beyond the screen, into IoT, building automation, and systems that connect software with the physical world." },
  ],
};

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  description: string;
  highlight: string;
  technologies: string[];
  flow: string[];
  image: string;
  website?: string;
  result: string;
};

export const projects: Project[] = [
  {
    id: "de-work",
    index: "01",
    name: "DE—WORK",
    kind: "Decentralized job marketplace",
    description:
      "A Web3 marketplace connecting clients and freelancers through decentralized workflows, reputation, staking, and juror-based dispute resolution.",
    highlight:
      "Smart contracts coordinate trust, while a reputation layer and juror workflow handle the edge cases conventional marketplaces centralize.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Solidity", "Base", "ethers.js", "AI"],
    flow: ["User", "Web app", "API", "Database", "Smart contract", "Blockchain"],
    image: "dework",
    result: "A full marketplace architecture spanning product interface, backend services, identity, and on-chain settlement.",
  },
  {
    id: "notely",
    index: "02",
    name: "NOTELY",
    kind: "AI-powered notes platform",
    description:
      "A full-stack notes platform where users can create, organize, search, and enhance their notes using AI.",
    highlight:
      "Authentication, structured data, media handling, semantic search, generation, and summarization are designed as one coherent product system.",
    technologies: ["React", "Express", "PostgreSQL", "Prisma", "Cloudinary", "LLM APIs"],
    flow: ["Capture", "Organize", "Index", "Retrieve", "Enhance"],
    image: "notely",
    website: "https://notesli.netlify.app/",
    result: "A working notes environment where AI supports the user’s thinking instead of becoming the interface itself.",
  },
  
  {
    id: "wildlife-guard",
    index: "03",
    name: "WILDLIFE GUARD",
    kind: "AI × hardware agriculture",
    description:
      "An AI-powered farm protection system that detects potentially crop-threatening wildlife and triggers a physical response.",
    highlight:
      "The system closes the loop between perception and action: a visual signal becomes a safe, deterministic hardware response.",
    technologies: ["Python", "Computer Vision", "ESP32", "Machine Learning", "Robotic Arm", "Embedded Systems"],
    flow: ["Camera", "Image", "Detection model", "Animal identified", "Trigger", "ESP32", "Robotic response"],
    image: "wildlife",
    result: "A physical prototype demonstrating how software, machine learning, electronics, and agriculture can operate as one system.",
  },
  {
    id: "zaph-tours",
    index: "04",
    name: "ZAPH TOURS",
    kind: "Travel experience",
    description:
      "A responsive travel experience designed to present destinations and tour offerings through a modern visual interface.",
    highlight:
      "A visual product exercise in hierarchy, destination storytelling, responsive composition, and frictionless browsing.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Responsive Design"],
    flow: ["Discover", "Compare", "Explore", "Choose"],
    image: "graphic",
    result: "A polished front-end demonstrating product thinking and visual craft across screen sizes.",
  },
  {
    id: "whatsapp-ai",
    index: "05",
    name: "AI WHATSAPP ASSISTANT",
    kind: "2nd place · AI hackathon",
    description:
      "A WhatsApp-based customer assistant for SMEs using retrieval-augmented generation to answer from business knowledge.",
    highlight:
      "Business documents become grounded, relevant responses inside a channel customers already understand.",
    technologies: ["Node.js", "LangChain", "RAG", "ChromaDB", "Sentence Transformers", "WhatsApp"],
    flow: ["Question", "Retrieve", "Rank", "Generate", "Respond"],
    image: "graphic",
    result: "Awarded second place for a practical AI system built around real customer-support constraints.",
  },
  {
    id: "Inventra",
    index: "06",
    name: "INVENTRA",
    kind: "INVENTORY MANAGEMENT SYSTEM",
    description:
      "A full-stack products and tools management system where users can add and manage products, track inventory,  generate reports, generate delivery notes and manage employees.",
    highlight:
      "",
    technologies: ["React", "Express", "PostgreSQL", "Prisma", "LLM APIs"],
    flow: ["Capture", "Organize", "Index", "Retrieve", "Enhance"],
    image: "graphic",
    website: "https://notesli.netlify.app/",
    result: "A working notes environment where AI supports the user’s thinking instead of becoming the interface itself.",
  },
];

export const skillGroups = {
  Backend: ["Node.js", "Express", "TypeScript", "REST APIs", "GraphQL", "WebSockets", "Microservices"],
  Databases: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Web3: ["Solidity", "EVM", "Base", "ethers.js", "Smart Contracts", "Wallet Integration"],
  AI: ["LLM APIs", "RAG", "LangChain", "Vector Search", "AI Assistants", "Agents"],
  "Cloud / DevOps": ["AWS", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Vercel"],
  Systems: ["System Design", "Distributed Systems", "RabbitMQ", "Reverse Proxy", "Load Balancing", "API Design"],
};

export const experience = [
  ["2026 — PRESENT", "ASSORTICA", "Smart Systems / Software & Automation", "IoT, KNX building automation, fire alarm panel programming, system configuration, technical surveys, and connected systems."],
  ["2026", "AFRICA DIGITALISER", "Software Engineering Intern", "Contributed to software projects and gained practical experience in a production environment."],
  ["2025", "TEACH2GIVE", "Software Engineering Program", "Intensive full-stack engineering across TypeScript, React, Node.js, Express, PostgreSQL, Prisma, and Git."],
  ["2025", "ORIGINLABS", "Contract Developer", "Worked on an educational interactive VR experience using Unity."],
  ["2022", "ASSORTICA", "Software Engineering Intern", "Built the company website and developed an inventory system."],
] as const;

export const specialties = [
  ["01", "BACKEND SYSTEMS", "APIs, databases, services, architecture, scalability."],
  ["02", "APPLIED AI", "LLM APIs, RAG, vector search, assistants, agents, automation."],
  ["03", "WEB3", "Solidity, EVM, smart contracts, wallets, decentralized applications."],
  ["04", "SMART SYSTEMS", "IoT, KNX, automation, ESP32, connected building systems."],
] as const;

export const focusDetails = [
  { headline: "Structure beneath every interaction.", description: "APIs, data, and services designed to work together — from the first request to the architecture behind it.", flow: ["REQUEST", "API", "SERVICES", "DATABASE"], project: "DE—WORK / NOTELY" },
  { headline: "Intelligence, grounded in something real.", description: "Connecting models to useful knowledge and real workflows through retrieval, assistants, and thoughtful automation.", flow: ["QUESTION", "RETRIEVE", "MODEL", "RESPONSE"], project: "AI WHATSAPP ASSISTANT" },
  { headline: "Trust becomes part of the architecture.", description: "Smart contracts and decentralized applications that connect wallets, ownership, and on-chain workflows.", flow: ["WALLET", "CONTRACT", "CONSENSUS", "SETTLEMENT"], project: "DE—WORK" },
  { headline: "Beyond the screen. Into the world.", description: "Bringing software, sensors, and automation together — building systems that perceive, connect, and respond.", flow: ["SENSOR", "DETECT", "CONTROLLER", "ACTION"], project: "WILDLIFE GUARD / ASSORTICA" },
] as const;

export const contactLinks = [
  { id: "github", label: "GitHub", handle: "Stella-055", href: "https://github.com/Stella-055" },
  { id: "linkedin", label: "LinkedIn", handle: "stella-stephanie-09954129a", href: "https://www.linkedin.com/in/stella-stephanie-09954129a" },
  { id: "whatsapp", label: "WhatsApp", handle: "+254 712 999 125", href: "https://wa.me/254712999125" },
] as const;

export const highlights = [
  { index: "01", title: "Software engineering graduation", caption: "Murang'a University of Technology · Class of 2026", mark: "GRAD / 26", image: "graduation" },
  { index: "02", title: "AI hackathon · 2nd place", caption: "AI WhatsApp Customer Assistant", mark: "02 / PLACE", image: "hackathon" },
  { index: "03", title: "Teach2Give", caption: "Software Engineering Program · 2025", mark: "T2G / 25", image: "certificate" },
] as const;

export const certifications = [
  
  { title: "BSc Software Engineering", issuer: "Murang'a University of Technology", year: "2026", image: certificateGraduation  },
  { title: "Software Engineering Program", issuer: "Teach2Give", year: "2025", image: t2g },
  { title: "AI Summit Hackathon", issuer: "3rd Place", year: "2025", image: summit },
  { title: "AR/VR Hackathon", issuer: "Origin Labs", year: "2025", image: origin },
  { title: "Blockchain Fundamentals", issuer: "No Long Ting Group", year: "2025", image: nolongting },
  { title: "Git and GitHub", issuer: "Microsoft Student Ambassadors", year: "2025", image: mlsa },
  { title: "AI Hackathon", issuer: "Tharaka Nithi university", year: "2026", image: tharaka },
  { title: "Blockchain Foundations", issuer: "Avalanche Academy", year: "2025", image: Ava },
 

] as const;
