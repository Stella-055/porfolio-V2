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
  objective?: string;
  challenge?: string;
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
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Solidity", "Base", "ethers.js", "AI","IPFS"],
    flow: ["User", "Web app", "API", "Database", "Smart contract", "Blockchain"],
    image: "dework",
    result: "A complete marketplace flow with wallet-native identity, job coordination, and verifiable payment rails.",
    objective: "Create a trust-minimized marketplace for autonomous work agreements and transparent settlement.",
    challenge: "Synchronizing offchain workflow state with immutable contract events while preserving a fast product experience.",
    
 
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
     objective: "Reduce the friction between capturing information and turning it into structured, reusable knowledge.",
   challenge: "Designing asynchronous intelligence features that remain responsive, observable, and resilient to model latency.",
   
  },
  {
    id: "Linda Shamba",
    index: "03",
    name: "LINDA SHAMBA",
    kind: "AI × hardware agriculture",
    description:
      "An AI-powered farm protection system that detects potentially crop-threatening wildlife and triggers a physical response.",
    highlight:
      "The system closes the loop between perception and action: a visual signal becomes a safe, deterministic hardware response.",
    technologies: ["Python", "Computer Vision", "ESP32", "Machine Learning", "Robotic Arm", "Embedded Systems"],
    flow: ["Camera", "Image", "Detection model", "Animal identified", "Trigger", "ESP32", "Robotic response"],
    image: "wildlife",
    result: "A physical prototype demonstrating how software, machine learning, electronics, and agriculture can operate as one system.",
    objective: "Reduce crop destruction by automatically detecting potentially harmful wildlife and activating a physical deterrence mechanism in real time.",
   challenge: "Building a responsive pipeline that could process live visual data, distinguish potentially crop-threatening animals from other activity, and reliably trigger the robotic mechanism with minimal delay.",

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
    website: "https://zaphtourss.netlify.app/",
    objective: "Create a polished digital presence for a travel agency that makes destinations and tour experiences easy to explore.",
  challenge: "Translating a travel brand into an engaging visual experience while maintaining responsive layouts and clear conversion paths.",

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
     objective: "Deliver reliable customer answers inside an existing messaging workflow without hallucinating company policy.",
    challenge: "Maintaining grounded answers across multi-turn conversations while controlling response time and retrieval quality.",
 
  },
  
  {
    id: "inventra",
    index: "06",
    name: "INVENTRA",
    kind: "Inventory management system",
    description:
      "A full-stack inventory and asset management platform built to bring stock, tools, and employee accountability into one system.",
    highlight:
     "A TypeScript-based React frontend backed by an Express API, Prisma ORM, and PostgreSQL, with distinct workflows for bulk inventory products and individually serialized assets.",
technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma"],
    flow: ["Question", "Retrieve", "Rank", "Generate", "Respond"],
    image: "graphic",
     objective: "Digitize inventory operations by replacing fragmented stock tracking with a centralized system for managing products, serialized tools, employee assignments, and issue records.",

  challenge: "Designing a flexible inventory model that could handle hundreds of identical products without unnecessary asset records while still providing precise serial-level tracking and accountability for tools.",

  result: "A scalable inventory workflow covering stock management, serialized asset tracking, employee assignments, product issuance, request handling, and operational documentation.",
   website:"https://inventra-nine-roan.vercel.app"
  },
];

export const skillGroups = {
  Languages:[ "TypeScript",
      "JavaScript",
      "Go",
      "Solidity",
      "SQL"],
  Backend: [ "Node.js",
      "Express",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Microservices",],
  Databases: [ "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Redis",
      "SQL",],
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Web3: [ "Solidity",
      "EVM",
      "Base",
      "ethers.js",
      "Smart Contracts",
      "Wallet Integration",],
  AI: ["LLM APIs", "RAG", "LangChain", "Vector Search", "AI Assistants", "Agents"],
  "Cloud / AWS": [ "AWS",
      "S3",
      "EC2",
      "RDS",
      "Lambda",
      "CloudFront",
      "VPC",
      "Load Balancing",],
      DevOps:["Git",
      "GitHub",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Vercel",],
  Systems: [  "System Design",
      "Distributed Systems",
      "Microservices",
      "RabbitMQ",
      "Redis",
      "Reverse Proxy",
      "Load Balancing",
    "Data Structures & Algorithms",
      "API Design",],
  "Soft Skills":[ "Communication",
      "Teamwork",
      "Problem Solving",
      "Time Management",]
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