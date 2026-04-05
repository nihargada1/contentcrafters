"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Stats {
  totalEvents: number;
  newInquiries: number;
  upcomingEvents: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  eventType: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalEvents: 0,
    newInquiries: 0,
    upcomingEvents: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get total events
        const eventsSnap = await getDocs(collection(db, "events"));
        const totalEvents = eventsSnap.size;

        // Get new inquiries count
        const newInqQuery = query(
          collection(db, "inquiries"),
          where("status", "==", "new")
        );
        const newInqSnap = await getDocs(newInqQuery);
        const newInquiries = newInqSnap.size;

        // Get upcoming events (date >= today)
        const today = new Date().toISOString().split("T")[0];
        const upcomingQuery = query(
          collection(db, "events"),
          where("date", ">=", today)
        );
        const upcomingSnap = await getDocs(upcomingQuery);
        const upcomingEvents = upcomingSnap.size;

        setStats({ totalEvents, newInquiries, upcomingEvents });

        // Get recent inquiries
        const recentQuery = query(
          collection(db, "inquiries"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const recentSnap = await getDocs(recentQuery);
        const inquiries = recentSnap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          eventType: doc.data().eventType,
          status: doc.data().status,
          createdAt: doc.data().createdAt?.toDate?.()?.toLocaleDateString() || "N/A",
        }));
        setRecentInquiries(inquiries);
      } catch {
        // Firebase not configured yet — show empty state
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statCards = [
    { label: "Total Events", value: stats.totalEvents, color: "bg-blue-50 text-blue-700" },
    { label: "New Inquiries", value: stats.newInquiries, color: "bg-amber-50 text-amber-700" },
    { label: "Upcoming Events", value: stats.upcomingEvents, color: "bg-green-50 text-green-700" },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    converted: "bg-green-100 text-green-700",
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <h1 className="font-serif text-3xl font-semibold mb-2">Dashboard</h1>
            <p className="text-foreground/50 text-sm mb-8">
              Overview of your events and inquiries
            </p>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-secondary rounded w-24 mb-3" />
                    <div className="h-8 bg-secondary rounded w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {statCards.map((card) => (
                    <div
                      key={card.label}
                      className="bg-white rounded-xl p-6 border border-accent/10"
                    >
                      <p className="text-sm text-foreground/50 mb-1">{card.label}</p>
                      <p className="text-3xl font-serif font-semibold">{card.value}</p>
                      <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-3 ${card.color}`}>
                        Active
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Inquiries */}
                <div className="bg-white rounded-xl border border-accent/10">
                  <div className="p-6 border-b border-accent/10">
                    <h2 className="font-serif text-xl font-medium">Recent Inquiries</h2>
                  </div>
                  {recentInquiries.length === 0 ? (
                    <div className="p-12 text-center text-foreground/40">
                      <p>No inquiries yet. They will appear here once submitted.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-accent/10">
                      {recentInquiries.map((inq) => (
                        <div key={inq.id} className="px-6 py-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{inq.name}</p>
                            <p className="text-xs text-foreground/40">{inq.eventType}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[inq.status] || "bg-gray-100 text-gray-600"}`}>
                              {inq.status}
                            </span>
                            <span className="text-xs text-foreground/40">{inq.createdAt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
