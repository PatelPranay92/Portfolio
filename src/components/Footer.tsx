import { Mail, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import type { Social } from "@/lib/db";

export default function Footer({ social }: { social: Social }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left - Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white">
              <Code2 size={14} strokeWidth={2.5} />
            </div>
            <span className="text-sm text-text-secondary">
              © {currentYear} Pranay Patel. All rights reserved.
            </span>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-2">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-tertiary hover:text-accent hover:bg-accent-bg transition-all duration-200"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-tertiary hover:text-accent hover:bg-accent-bg transition-all duration-200"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${social.email}`}
              aria-label="Send Email"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-tertiary hover:text-accent hover:bg-accent-bg transition-all duration-200"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
