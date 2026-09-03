"use client";

import Image from "next/image";
import { ArrowRight, Download, Code2, Sparkles } from "lucide-react";
import type { Profile } from "@/lib/db";

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "Express.js", icon: "⚡" },
  { name: "MongoDB", icon: "🍃" },
  { name: "MySQL", icon: "🐬" },
  { name: "Tailwind", icon: "🎨" },
];

export default function Hero({ profile, resume }: { profile: Profile; resume: string }) {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-20 pb-12 section-padding"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="order-2 lg:order-1">
            {/* Greeting */}
            <div
              className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 bg-accent-bg rounded-full mb-6"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <span className="text-sm font-medium text-accent">
                Hi, I&apos;m {profile.name.split(' ')[0]} 👋
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <span className="text-accent">{profile.role.split(' ')[0]} {profile.role.split(' ')[1]}</span> {profile.role.split(' ').slice(2).join(' ')}
              <br />
              <span className="text-text-primary">
                {profile.tagline}
              </span>
            </h1>

            {/* Description */}
            <p
              className="animate-fade-in-up text-text-secondary text-lg leading-relaxed max-w-lg mb-8"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              {profile.description}
            </p>

            {/* Buttons */}
            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-3 mb-8"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold text-[15px] rounded-xl hover:bg-accent-dark transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 group"
              >
                View My Work
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={resume || "/resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface text-text-primary font-semibold text-[15px] rounded-xl border border-border hover:bg-surface-hover transition-all duration-200 hover:-translate-y-0.5 group"
              >
                Download Resume
                <Download
                  size={16}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
            </div>

            {profile.availability && (
              <div
                className="animate-fade-in-up flex items-center gap-2.5"
                style={{ animationDelay: "0.5s", animationFillMode: "both" }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-text-secondary font-medium">
                  Available for Freelance Projects
                </span>
              </div>
            )}
          </div>

          {/* Right Column - Portrait */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-accent/10 rounded-3xl blur-3xl scale-110 animate-pulse-glow"></div>

              {/* Dotted Pattern */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-accent) 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              ></div>

              {/* Main Portrait */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-[360px] lg:w-[340px] lg:h-[400px] rounded-3xl overflow-hidden border-2 border-border bg-surface">
                <Image
                  src={profile.image || "/images/portrait.png"}
                  alt={profile.name}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 340px"
                />
              </div>

              {/* Floating Code Badge */}
              <div className="absolute -top-3 -left-3 animate-float">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg shadow-black/5 border border-border">
                  <Code2 size={16} className="text-accent" />
                  <span className="text-xs font-bold font-mono text-text-primary">
                    &lt;/&gt;
                  </span>
                </div>
              </div>

              {/* Floating Availability Card */}
              <div
                className="absolute -bottom-3 -right-3 animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg shadow-black/5 border border-border">
                  <Sparkles size={14} className="text-accent" />
                  <span className="text-xs font-semibold text-text-primary">
                    Open to Work
                  </span>
                </div>
              </div>

              {/* Decorative corner element */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-2 border-accent/20 rounded-lg rotate-12"></div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div
          className="animate-fade-in-up mt-16 lg:mt-20"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-text-tertiary uppercase mb-5">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-4 py-2.5 bg-surface rounded-xl border border-border hover:border-accent/30 hover:bg-accent-bg transition-all duration-200 cursor-default group"
              >
                <span className="text-sm">{tech.icon}</span>
                <span className="text-[13px] font-medium text-text-secondary group-hover:text-accent transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div
          className="animate-fade-in-up mt-10"
          style={{ animationDelay: "0.7s", animationFillMode: "both" }}
        >
          <div className="inline-flex items-center gap-8 px-6 py-4 bg-surface rounded-2xl border border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">5+</div>
              <div className="text-xs text-text-tertiary font-medium mt-0.5">
                Projects Completed
              </div>
            </div>
            <div className="w-px h-10 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">1+</div>
              <div className="text-xs text-text-tertiary font-medium mt-0.5">
                Years Experience
              </div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block"></div>
            <div className="text-center hidden sm:block">
              <div className="text-2xl font-bold text-text-primary">10+</div>
              <div className="text-xs text-text-tertiary font-medium mt-0.5">
                Technologies
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
