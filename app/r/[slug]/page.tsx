"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";

interface LinkData {
  instagramUrl: string;
  thumbnail: string;
  title: string;
}

export default function RedirectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [link, setLink] = useState<LinkData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchLink() {
      try {
        const q = query(collection(db, "links"), where("slug", "==", slug));
        const snap = await getDocs(q);
        if (snap.empty) {
          setNotFound(true);
          return;
        }
        const data = snap.docs[0].data() as LinkData;
        setLink(data);

        // Update page title
        document.title = `${data.title} | Content Crafters`;

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = data.instagramUrl;
        }, 1500);
      } catch {
        setNotFound(true);
      }
    }

    if (slug) fetchLink();
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold mb-4">
            Link Not Found
          </h1>
          <p className="text-foreground/50 mb-6">
            This redirect link doesn&apos;t exist.
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h1 className="font-serif text-2xl font-semibold mb-2">
          {link?.title || "Loading..."}
        </h1>
        {link?.thumbnail && (
          <img
            src={link.thumbnail}
            alt={link.title}
            className="w-64 h-40 object-cover rounded-xl mx-auto mt-4 mb-4"
          />
        )}
        <p className="text-foreground/50 text-sm">
          Redirecting to Instagram...
        </p>
      </div>
    </div>
  );
}
