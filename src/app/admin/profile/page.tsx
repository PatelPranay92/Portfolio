"use client";

import { useState, useEffect } from "react";
import { Save, Image as ImageIcon } from "lucide-react";
import type { Profile } from "@/lib/db";

export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    role: "",
    tagline: "",
    description: "",
    image: "",
    availability: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.profile) setProfile(data.profile);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("type", "profile");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setProfile({ ...profile, image: data.url });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Profile</h1>
        <p className="text-text-secondary mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">Portrait Image</label>
              <div className="flex items-center gap-4">
                {profile.image && (
                  <img src={profile.image} alt="Preview" className="h-20 w-20 rounded-xl object-cover border border-border" />
                )}
                <label className="flex items-center gap-2 px-4 py-2 bg-surface text-text-primary border border-border rounded-xl text-sm font-medium hover:bg-gray-100 cursor-pointer transition-colors">
                  <ImageIcon size={18} />
                  {uploading ? "Uploading..." : "Upload New Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                </label>
                <span className="text-xs text-text-secondary flex-1 truncate">{profile.image || "No image uploaded"}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Role / Title</label>
              <input
                type="text"
                required
                value={profile.role}
                onChange={e => setProfile({...profile, role: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">Primary Tagline (Hero)</label>
              <input
                type="text"
                required
                value={profile.tagline}
                onChange={e => setProfile({...profile, tagline: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">About Description</label>
              <textarea
                required
                rows={4}
                value={profile.description}
                onChange={e => setProfile({...profile, description: e.target.value})}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={profile.availability}
                  onChange={e => setProfile({...profile, availability: e.target.checked})}
                  className="w-4 h-4 text-accent border-border rounded focus:ring-accent"
                />
                <span className="text-sm font-medium text-text-primary">Available for work (shows green pulsing dot)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-70"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
