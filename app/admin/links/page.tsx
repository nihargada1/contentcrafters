"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface LinkData {
  id: string;
  slug: string;
  instagramUrl: string;
  thumbnail: string;
  title: string;
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    slug: "",
    instagramUrl: "",
    thumbnail: "",
    title: "",
  });

  const fetchLinks = async () => {
    try {
      const q = query(collection(db, "links"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setLinks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as LinkData)));
    } catch {
      // Firebase not configured
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "links", editId), { ...form });
      } else {
        await addDoc(collection(db, "links"), {
          ...form,
          createdAt: serverTimestamp(),
        });
      }
      setForm({ slug: "", instagramUrl: "", thumbnail: "", title: "" });
      setShowForm(false);
      setEditId(null);
      fetchLinks();
    } catch {
      alert("Error saving link. Make sure Firebase is configured.");
    }
  };

  const handleEdit = (link: LinkData) => {
    setForm({
      slug: link.slug,
      instagramUrl: link.instagramUrl,
      thumbnail: link.thumbnail,
      title: link.title,
    });
    setEditId(link.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    try {
      await deleteDoc(doc(db, "links", id));
      fetchLinks();
    } catch {
      alert("Error deleting link.");
    }
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-semibold mb-1">
                  Instagram Links
                </h1>
                <p className="text-foreground/50 text-sm">
                  Manage redirect links with OG previews
                </p>
              </div>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditId(null);
                  setForm({ slug: "", instagramUrl: "", thumbnail: "", title: "" });
                }}
                className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/85 transition-colors"
              >
                {showForm ? "Cancel" : "+ New Link"}
              </button>
            </div>

            {/* Form */}
            {showForm && (
              <div className="bg-white rounded-xl border border-accent/10 p-6 mb-8">
                <h3 className="font-serif text-lg font-medium mb-4">
                  {editId ? "Edit Link" : "Create New Link"}
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">
                      Slug
                    </label>
                    <input
                      required
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                      placeholder="wedding-shoot-1"
                    />
                    <p className="text-xs text-foreground/40 mt-1">
                      URL: /r/{form.slug || "your-slug"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">
                      Title
                    </label>
                    <input
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                      placeholder="Wedding Reel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">
                      Instagram URL
                    </label>
                    <input
                      required
                      type="url"
                      value={form.instagramUrl}
                      onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                      placeholder="https://instagram.com/reel/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">
                      Thumbnail URL
                    </label>
                    <input
                      required
                      type="url"
                      value={form.thumbnail}
                      onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/85 transition-colors"
                    >
                      {editId ? "Update Link" : "Create Link"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Links list */}
            <div className="bg-white rounded-xl border border-accent/10">
              <div className="p-6 border-b border-accent/10">
                <h3 className="font-serif text-lg font-medium">All Links</h3>
              </div>
              {loading ? (
                <div className="p-12 text-center text-foreground/40">Loading...</div>
              ) : links.length === 0 ? (
                <div className="p-12 text-center text-foreground/40">
                  No links yet. Create your first redirect link above.
                </div>
              ) : (
                <div className="divide-y divide-accent/10">
                  {links.map((link) => (
                    <div key={link.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{link.title}</p>
                        <p className="text-xs text-foreground/40 truncate">
                          /r/{link.slug} &rarr; {link.instagramUrl}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/r/${link.slug}`
                            );
                            alert("Link copied!");
                          }}
                          className="text-xs text-accent-dark hover:text-foreground transition-colors"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => handleEdit(link)}
                          className="text-xs text-accent-dark hover:text-foreground transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
