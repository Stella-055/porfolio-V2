import { motion, useReducedMotion } from "motion/react";

const nodes = [
  { x: "12%", y: "30%", label: "API" },
  { x: "42%", y: "13%", label: "AI" },
  { x: "78%", y: "27%", label: "EVM" },
  { x: "68%", y: "70%", label: "DATA" },
  { x: "25%", y: "76%", label: "I/O" },
];

export function SystemVisual() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="system-visual"
      aria-hidden="true"
      initial={false}
      animate={{ rotate: reduced ? 0 : [0, 0.4, 0] }}
      transition={{ duration: reduced ? 0 : 8, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
    >
      <div className="system-orbit system-orbit-a" />
      <div className="system-orbit system-orbit-b" />
      <div className="system-core"><span>SYSTEM</span><strong>STELLA</strong><i>ONLINE</i></div>
      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="system-node"
          style={{ left: node.x, top: node.y }}
          animate={{ scale: reduced ? 1 : [1, 1.18, 1] }}
          transition={{ duration: reduced ? 0 : 2.8, delay: index * 0.35, repeat: reduced ? 0 : Infinity }}
        ><span>{node.label}</span></motion.div>
      ))}
    </motion.div>
  );
}