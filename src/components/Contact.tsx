"use client";

import { useReveal } from "@/hooks/useReveal";
import {
  Send,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useState, FormEvent } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import type { Social } from "@/lib/db";

export default function Contact({ social }: { social: Social }) {
  const { ref, isVisible } = useReveal();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(data.message || "Failed to send message.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: social.email,
      href: `mailto:${social.email}`,
    },
    {
      icon: <GithubIcon size={18} />,
      label: "GitHub",
      value: social.github.replace("https://", ""),
      href: social.github,
    },
    {
      icon: <LinkedinIcon size={18} />,
      label: "LinkedIn",
      value: social.linkedin.replace("https://", ""),
      href: social.linkedin,
    },
    {
      icon: <MapPin size={18} />,
      label: "Location",
      value: social.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 reveal ${isVisible ? "visible" : ""}`}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-5">
            Let&apos;s Build Something
            <br />
            <span className="text-accent">Great Together.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Have a project, idea, or opportunity? Let&apos;s talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div
            className={`lg:col-span-3 reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "100ms" }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-border"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="Project inquiry"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white font-semibold text-[15px] rounded-xl hover:bg-accent-dark transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    ✓ Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`lg:col-span-2 reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:border-accent/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-bg flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-tertiary font-medium">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-text-primary hover:text-accent transition-colors flex items-center gap-1 truncate"
                      >
                        {info.value}
                        <ArrowUpRight size={12} className="shrink-0" />
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-text-primary">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
