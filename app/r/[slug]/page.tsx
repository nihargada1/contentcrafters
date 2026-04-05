import { collection, getDocs, query, where } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import type { Metadata } from "next";
import RedirectClient from "./RedirectClient";

// Server-side Firebase init for metadata generation
function getServerDb() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  return getFirestore(app);
}

async function getLinkData(slug: string) {
  try {
    const db = getServerDb();
    const q = query(collection(db, "links"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].data() as {
      slug: string;
      instagramUrl: string;
      thumbnail: string;
      title: string;
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const link = await getLinkData(slug);

  if (!link) {
    return { title: "Content Crafters" };
  }

  return {
    title: `${link.title} | Content Crafters`,
    description: `Watch ${link.title} by Content Crafters`,
    openGraph: {
      title: link.title,
      description: `Watch ${link.title} by Content Crafters`,
      images: [{ url: link.thumbnail, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: link.title,
      description: `Watch ${link.title} by Content Crafters`,
      images: [link.thumbnail],
    },
  };
}

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const link = await getLinkData(slug);

  if (!link) {
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

  return <RedirectClient url={link.instagramUrl} title={link.title} />;
}
