"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderGit2, User, Link as LinkIcon, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    hasResume: false,
    name: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, profileRes, resumeRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/profile"),
          fetch("/api/resume")
        ]);
        
        const projectsData = await projectsRes.json();
        const profileData = await profileRes.json();
        const resumeData = await resumeRes.json();
        
        setStats({
          projectsCount: projectsData.projects?.length || 0,
          hasResume: !!resumeData.resume,
          name: profileData.profile?.name || "Developer",
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Projects",
      value: stats.projectsCount.toString(),
      icon: FolderGit2,
      href: "/admin/projects",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Profile",
      value: "Manage Info",
      icon: User,
      href: "/admin/profile",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      title: "Social Links",
      value: "Manage Links",
      icon: LinkIcon,
      href: "/admin/social",
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      title: "Resume",
      value: stats.hasResume ? "Uploaded" : "Missing",
      icon: FileText,
      href: "/admin/resume",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  if (loading) {
    return <div className="animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Welcome back, {stats.name}</h1>
        <p className="text-text-secondary mt-1">Here's an overview of your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {card.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
