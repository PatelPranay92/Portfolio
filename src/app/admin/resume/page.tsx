"use client";

import { useState, useEffect } from "react";
import { FileText, Upload } from "lucide-react";

export default function ResumeAdmin() {
  const [resumePath, setResumePath] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await fetch("/api/resume");
      const data = await res.json();
      if (data.resume) setResumePath(data.resume);
    } catch (error) {
      console.error("Failed to fetch resume:", error);
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
    form.append("type", "resume");

    try {
      // 1. Upload the file
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const uploadData = await uploadRes.json();
      
      if (uploadData.success) {
        // 2. Save the path to the DB
        const saveRes = await fetch("/api/resume", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resume: uploadData.url }),
        });
        
        if (saveRes.ok) {
          setResumePath(uploadData.url);
          alert("Resume uploaded successfully!");
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Resume</h1>
        <p className="text-text-secondary mt-1">Upload and manage your CV/Resume</p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-8 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText size={32} className="text-accent" />
        </div>
        
        <h2 className="text-xl font-bold text-text-primary mb-2">Current Resume</h2>
        {resumePath ? (
          <div className="mb-8">
            {/* <p className="text-text-secondary mb-4">
              Your resume is currently available at: <br/>
              <code className="bg-surface px-2 py-1 rounded text-sm mt-2 inline-block">{resumePath}</code>
            </p> */}
            <a 
              href={resumePath} 
              target="_blank" 
              rel="noreferrer"
              className="text-accent hover:underline font-medium text-sm"
            >
              View current file
            </a>
          </div>
        ) : (
          <p className="text-text-secondary mb-8">No resume uploaded yet.</p>
        )}

        <div className="border-t border-border pt-8">
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors cursor-pointer">
            <Upload size={20} />
            {uploading ? "Uploading..." : "Upload PDF"}
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={uploading} 
            />
          </label>
          <p className="text-xs text-text-secondary mt-3">Supports PDF format (max 5MB)</p>
        </div>
      </div>
    </div>
  );
}
