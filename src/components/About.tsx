"use client";

import { useReveal } from "@/hooks/useReveal";
import {
  Code2,
  Server,
  Database,
  Palette,
  ShieldCheck,
  Zap,
} from "lucide-react";

const highlights = [
  {
    icon: <Palette size={18} />,
    title: "Frontend Development",
    desc: "Crafting responsive, intuitive interfaces with React, Next.js, and modern CSS frameworks.",
  },
  {
    icon: <Server size={18} />,
    title: "Backend Development",
    desc: "Building robust APIs and server-side logic with Node.js, Express.js, and scalable architectures.",
  },
  {
    icon: <Database size={18} />,
    title: "Database Design",
    desc: "Designing efficient data models with MongoDB and MySQL for optimal query performance.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Authentication & Security",
    desc: "Implementing JWT authentication, OAuth, and secure payment integrations like Razorpay.",
  },
  {
    icon: <Code2 size={18} />,
    title: "API Development",
    desc: "Creating RESTful APIs with clean architecture, proper error handling, and documentation.",
  },
  {
    icon: <Zap size={18} />,
    title: "Performance Optimization",
    desc: "Ensuring fast load times with code splitting, lazy loading, and SEO best practices.",
  },
];

export default function About() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="about" className="section-padding bg-surface/50">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <div
          className={`max-w-2xl mb-16 reveal ${isVisible ? "visible" : ""}`}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase mb-3">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-5">
            Passionate about building
            <br />
            <span className="text-accent">production-ready</span> applications.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Full Stack Developer with hands-on experience developing scalable web and mobile applications using
            React.js, Node.js, Express.js, MongoDB, MySQL, and Flutter. Skilled in building RESTful APIs, JWT-based
            authentication, database integration, third-party API integration, and responsive user interfaces. Strong
            understanding of full-stack application development, security best practices, and user-focused design.
            Passionate about developing reliable, scalable, and secure applications that solve real-world problems.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              className={`reveal p-6 bg-white rounded-2xl border border-border hover:border-accent/20 hover:shadow-md hover:shadow-accent/5 transition-all duration-300 group ${
                isVisible ? "visible" : ""
              }`}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent-bg flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
