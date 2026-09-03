"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}


export default function Projects({ projects }: { projects: Project[] }) {
  const { ref, isVisible } = useReveal();

  return (
    <section id="projects" className="section-padding bg-surface/50">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 reveal ${isVisible ? "visible" : ""}`}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase mb-3">
            Featured Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-5">
            Projects I&apos;ve built
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Real-world applications focused on solving genuine problems with
            clean architecture and modern technologies.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              <div
                className={`group bg-white rounded-3xl border border-border overflow-hidden hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 ${
                  project.featured
                    ? "grid lg:grid-cols-2"
                    : "grid lg:grid-cols-5"
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    project.featured
                      ? "h-64 sm:h-72 lg:h-auto"
                      : "h-64 sm:h-72 lg:h-auto lg:col-span-2"
                  } ${i % 2 !== 0 && project.featured ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.subtitle}`}
                    fill
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div
                  className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-center ${
                    !project.featured ? "lg:col-span-3" : ""
                  }`}
                >
                  <p className="text-[11px] font-semibold tracking-[0.15em] text-accent uppercase mb-2">
                    {project.subtitle}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-[15px] leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-surface text-xs font-medium text-text-secondary rounded-lg border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark transition-colors group/link"
                      >
                        Live Demo
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors group/link"
                      >
                        <GithubIcon size={14} />
                        View Code
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
