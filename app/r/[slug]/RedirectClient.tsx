"use client";

import { useEffect } from "react";

export default function RedirectClient({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 1500);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h1 className="font-serif text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-foreground/50 text-sm">
          Redirecting to Instagram...
        </p>
      </div>
    </div>
  );
}
