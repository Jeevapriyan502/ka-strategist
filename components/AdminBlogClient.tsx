"use client";

import { Loader2, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { BlogPostRecord } from "@/lib/blog";
import { slugify } from "@/lib/blog";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author: "KA Strategist Team",
  cover_image: "",
  published_at: new Date().toISOString().slice(0, 10),
};

export default function AdminBlogClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const checkSession = useCallback(async () => {
    const res = await fetch("/api/admin/session");
    const data = await res.json();
    setAuthenticated(data.authenticated);
    return data.authenticated as boolean;
  }, []);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession().then((ok) => {
      if (ok) loadPosts();
    });
  }, [checkSession, loadPosts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Wrong password");
      return;
    }
    setAuthenticated(true);
    setPassword("");
    loadPosts();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setPosts([]);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const openNewPost = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      published_at: new Date().toISOString().slice(0, 10),
    });
    setShowForm(true);
    setSuccess("");
    setError("");
  };

  const openEdit = (post: BlogPostRecord) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      cover_image: post.cover_image ?? "",
      published_at: post.published_at.slice(0, 10),
    });
    setShowForm(true);
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      published_at: new Date(form.published_at).toISOString(),
      cover_image: form.cover_image || null,
    };

    try {
      const url = editingId ? `/api/admin/blog/${editingId}` : "/api/admin/blog";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setSuccess(editingId ? "Post updated." : "Post published.");
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Delete failed");
      return;
    }
    setSuccess("Post deleted.");
    loadPosts();
  };

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-site-bg">
        <Loader2 className="animate-spin text-site-accent" size={32} />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-site-bg px-4">
        <div className="card w-full max-w-md">
          <h1 className="heading-md mb-2">KA Strategist Blog Admin</h1>
          <p className="mb-6 text-sm text-site-muted">
            Sign in to publish daily blog posts.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Admin password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-modern"
                required
              />
            </div>
            {loginError && <p className="text-sm text-red-400">{loginError}</p>}
            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-site-bg">
      <header className="border-b border-site-border bg-black px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-site-text">
              Blog Admin
            </h1>
            <p className="text-sm text-site-muted">KA Strategist · Daily posts</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/blog" className="btn-secondary px-4 py-2 text-xs">
              View blog
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-lg border border-site-border px-3 py-2 text-xs text-site-muted hover:text-site-text"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-site-accent/30 bg-site-accent/10 px-4 py-3 text-sm text-site-accent">
            {success}
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-site-text">All posts</h2>
          <button onClick={openNewPost} className="btn-primary gap-2 px-4 py-2 text-xs">
            <Plus size={16} />
            Publish today&apos;s post
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="card mb-8 space-y-4">
            <h3 className="font-semibold text-site-text">
              {editingId ? "Edit post" : "New post"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Title *</label>
                <input
                  className="input-modern"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      title: e.target.value,
                      slug: editingId ? f.slug : slugify(e.target.value),
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">URL slug</label>
                <input
                  className="input-modern"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Publish date</label>
                <input
                  type="date"
                  className="input-modern"
                  value={form.published_at}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, published_at: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Short excerpt *</label>
                <textarea
                  className="input-modern resize-none"
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Full article *</label>
                <textarea
                  className="input-modern resize-y"
                  rows={12}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Write your daily blog post here. Separate paragraphs with a blank line."
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Author</label>
                <input
                  className="input-modern"
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Cover image URL</label>
                <input
                  className="input-modern"
                  value={form.cover_image}
                  onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="submit" disabled={saving} className="btn-primary gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editingId ? "Update post" : "Publish post"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-site-accent" size={28} />
          </div>
        ) : posts.length === 0 ? (
          <div className="card text-center text-site-muted">
            No posts yet. Click &quot;Publish today&apos;s post&quot; to add your first article.
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-site-text">{post.title}</h3>
                  <p className="text-xs text-site-subtle">
                    {new Date(post.published_at).toLocaleDateString("en-IN")} · /blog/{post.slug}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="btn-secondary px-3 py-1.5 text-xs"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => openEdit(post)}
                    className="inline-flex items-center gap-1 rounded-lg border border-site-border px-3 py-1.5 text-xs text-site-muted hover:text-site-text"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
