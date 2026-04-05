"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface InquiryData {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  message: string;
  status: string;
  createdAt: string;
}

const statusOptions = ["new", "contacted", "converted"];
const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchInquiries = async () => {
    try {
      const q = query(
        collection(db, "inquiries"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setInquiries(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt:
            d.data().createdAt?.toDate?.()?.toLocaleDateString() || "N/A",
        })) as InquiryData[]
      );
    } catch {
      // Firebase not configured
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "inquiries", id), { status });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
    } catch {
      alert("Error updating status.");
    }
  };

  const filtered =
    filter === "all"
      ? inquiries
      : inquiries.filter((i) => i.status === filter);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl">
            <h1 className="font-serif text-3xl font-semibold mb-1">
              Inquiries
            </h1>
            <p className="text-foreground/50 text-sm mb-8">
              Manage leads and customer inquiries
            </p>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
              {["all", ...statusOptions].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                    filter === status
                      ? "bg-foreground text-background"
                      : "bg-white text-foreground/60 hover:bg-secondary/50"
                  }`}
                >
                  {status}
                  {status !== "all" && (
                    <span className="ml-1.5 text-xs opacity-60">
                      ({inquiries.filter((i) => i.status === status).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Inquiries table */}
            <div className="bg-white rounded-xl border border-accent/10">
              {loading ? (
                <div className="p-12 text-center text-foreground/40">
                  Loading...
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-12 text-center text-foreground/40">
                  No inquiries found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-accent/10">
                        <th className="text-left text-xs font-medium text-foreground/40 uppercase tracking-wide px-6 py-4">
                          Name
                        </th>
                        <th className="text-left text-xs font-medium text-foreground/40 uppercase tracking-wide px-6 py-4">
                          Phone
                        </th>
                        <th className="text-left text-xs font-medium text-foreground/40 uppercase tracking-wide px-6 py-4">
                          Event Type
                        </th>
                        <th className="text-left text-xs font-medium text-foreground/40 uppercase tracking-wide px-6 py-4">
                          Message
                        </th>
                        <th className="text-left text-xs font-medium text-foreground/40 uppercase tracking-wide px-6 py-4">
                          Status
                        </th>
                        <th className="text-left text-xs font-medium text-foreground/40 uppercase tracking-wide px-6 py-4">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-accent/10">
                      {filtered.map((inq) => (
                        <tr key={inq.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium">
                            {inq.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground/60">
                            <a
                              href={`https://wa.me/${inq.phone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-foreground transition-colors"
                            >
                              {inq.phone}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground/60">
                            {inq.eventType}
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground/60 max-w-xs truncate">
                            {inq.message}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                updateStatus(inq.id, e.target.value)
                              }
                              className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${
                                statusColors[inq.status] || "bg-gray-100"
                              }`}
                            >
                              {statusOptions.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 text-xs text-foreground/40">
                            {inq.createdAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
