"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import type { Social } from "@/lib/db";

export default function SocialAdmin() {
  const [social, setSocial] = useState<Social>({
    email: "",
    github: "",
    linkedin: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSocial();
  }, []);

  const fetchSocial = async () => {
    try {
      const res = await fetch("/api/social");
      const data = await res.json();
      if (data.social) setSocial(data.social);
    } catch (error) {
      console.error("Failed to fetch social links:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(social),
      });
      if (res.ok) alert("Social links updated successfully!");
    } catch (error) {
      console.error("Failed to update social links:", error);
      alert("Failed to update social links.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Social Links</h1>
        <p className="text-text-secondary mt-1">Manage your contact information and social profiles</p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email Address</label>
              <input
                type="email"
                required
                value={social.email}
                onChange={e => setSocial({...social, email: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Location</label>
              <input
                type="text"
                required
                value={social.location}
                onChange={e => setSocial({...social, location: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">GitHub URL</label>
              <input
                type="url"
                required
                value={social.github}
                onChange={e => setSocial({...social, github: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">LinkedIn URL</label>
              <input
                type="url"
                required
                value={social.linkedin}
                onChange={e => setSocial({...social, linkedin: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
                placeholder="https://linkedin.com/in/yourusername"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-70"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Links"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
