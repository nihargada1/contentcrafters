"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/admin");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-semibold mb-2">
            Content Crafters
          </h1>
          <p className="text-foreground/50 text-sm">Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="font-serif text-2xl font-medium mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-secondary/30 border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@contentcrafters.in"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-secondary/30 border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/85 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-foreground/30 mt-8">
          Protected area. Authorized access only.
        </p>
      </div>
    </div>
  );
}
