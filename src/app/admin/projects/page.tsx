"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from "lucide-react";
import type { Project } from "@/lib/db";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    tags: [],
    liveUrl: "",
    codeUrl: "",
    featured: false,
  });
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(projects[index]);
    setTagsInput(projects[index].tags.join(", "));
  };

  const handleAddNew = () => {
    setEditingIndex(projects.length);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      tags: [],
      liveUrl: "",
      codeUrl: "",
      featured: false,
    });
    setTagsInput("");
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const res = await fetch(`/api/projects?index=${index}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("type", "project");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, image: data.url });
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

    const projectToSave = {
      ...formData,
      tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean),
    };

    try {
      const isNew = editingIndex === projects.length;
      const url = "/api/projects";
      const method = isNew ? "POST" : "PUT";
      const body = isNew 
        ? JSON.stringify(projectToSave)
        : JSON.stringify({ index: editingIndex, project: projectToSave });

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (res.ok) {
        await fetchProjects();
        setEditingIndex(null);
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
          <p className="text-text-secondary mt-1">Manage your portfolio projects</p>
        </div>
        {editingIndex === null && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-dark transition-colors"
          >
            <Plus size={18} />
            Add Project
          </button>
        )}
      </div>

      {editingIndex !== null ? (
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
            <h2 className="font-semibold text-text-primary">
              {editingIndex === projects.length ? "Add New Project" : "Edit Project"}
            </h2>
            <button onClick={handleCancel} className="text-text-secondary hover:text-text-primary p-1">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Subtitle / Role</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={e => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-1">Project Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="h-16 w-16 rounded-lg object-cover border border-border" />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 bg-surface text-text-primary border border-border rounded-xl text-sm font-medium hover:bg-gray-100 cursor-pointer transition-colors">
                    <ImageIcon size={18} />
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                  {/* <span className="text-xs text-text-secondary flex-1 truncate">{formData.image || "No image uploaded"}</span> */}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Live URL (optional)</label>
                <input
                  type="text"
                  value={formData.liveUrl}
                  onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Code URL (optional)</label>
                <input
                  type="text"
                  value={formData.codeUrl}
                  onChange={e => setFormData({...formData, codeUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:border-accent text-sm"
                  placeholder="React, Next.js, Tailwind..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!formData.featured}
                    onChange={e => setFormData({...formData, featured: e.target.checked})}
                    className="w-4 h-4 text-accent border-border rounded focus:ring-accent"
                  />
                  <span className="text-sm font-medium text-text-primary">Featured Project (shows wider on desktop)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-70"
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-border flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                {project.image ? (
                  <img src={project.image} alt="" className="w-16 h-16 rounded-lg object-cover border border-border hidden sm:block" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-surface flex items-center justify-center text-text-secondary hidden sm:flex">
                    <ImageIcon size={24} />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-text-primary flex items-center gap-2">
                    {project.title}
                    {project.featured && <span className="px-2 py-0.5 bg-accent-bg text-accent text-[10px] uppercase font-bold rounded-full">Featured</span>}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-1">{project.subtitle}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleEdit(idx)}
                  className="p-2 text-text-secondary hover:text-accent hover:bg-accent-bg rounded-lg transition-colors"
                  aria-label="Edit project"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete project"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl text-text-secondary">
              No projects yet. Add your first one!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
