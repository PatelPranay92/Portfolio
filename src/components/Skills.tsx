"use client";

import { useReveal } from "@/hooks/useReveal";

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      "React.js",
      "Next.js",
      "Flutter",
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    icon: "🛠️",
    skills: ["Git", "GitHub", "Firebase", "Postman", "VS Code"],
  },
];

export default function Skills() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 reveal ${isVisible ? "visible" : ""}`}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase mb-3">
            Skills & Technologies
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-5">
            Technologies I work with
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            A curated set of modern technologies and tools I use to build
            full-stack applications.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid sm:grid-cols-2 gap-5">
          {categories.map((category, i) => (
            <div
              key={category.title}
              className={`reveal p-6 lg:p-8 bg-white rounded-2xl border border-border hover:border-accent/20 hover:shadow-md hover:shadow-accent/5 transition-all duration-300 ${
                isVisible ? "visible" : ""
              }`}
              style={{ transitionDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">{category.icon}</span>
                <h3 className="text-lg font-semibold text-text-primary">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-2 bg-surface text-[13px] font-medium text-text-secondary rounded-xl border border-border hover:border-accent/30 hover:bg-accent-bg hover:text-accent transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
