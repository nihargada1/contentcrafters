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
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface EventData {
  id: string;
  title: string;
  date: string;
  timeSlots: string;
  price: number;
  maxOccupancy: number;
  bookedCount: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    date: "",
    timeSlots: "",
    price: 0,
    maxOccupancy: 0,
  });

  const fetchEvents = async () => {
    try {
      const q = query(collection(db, "events"), orderBy("date", "desc"));
      const snap = await getDocs(q);
      setEvents(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as EventData))
      );
    } catch {
      // Firebase not configured
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, "events", editId), {
          title: form.title,
          date: form.date,
          timeSlots: form.timeSlots,
          price: form.price,
          maxOccupancy: form.maxOccupancy,
        });
      } else {
        await addDoc(collection(db, "events"), {
          ...form,
          bookedCount: 0,
          createdAt: serverTimestamp(),
        });
      }
      setForm({ title: "", date: "", timeSlots: "", price: 0, maxOccupancy: 0 });
      setShowForm(false);
      setEditId(null);
      fetchEvents();
    } catch {
      alert("Error saving event. Make sure Firebase is configured.");
    }
  };

  const handleEdit = (event: EventData) => {
    setForm({
      title: event.title,
      date: event.date,
      timeSlots: event.timeSlots,
      price: event.price,
      maxOccupancy: event.maxOccupancy,
    });
    setEditId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteDoc(doc(db, "events", id));
      fetchEvents();
    } catch {
      alert("Error deleting event.");
    }
  };

  const getOccupancyColor = (booked: number, max: number) => {
    if (max === 0) return "#CBBBA0";
    const ratio = booked / max;
    if (ratio >= 0.9) return "#ef4444";
    if (ratio >= 0.5) return "#f59e0b";
    return "#22c55e";
  };

  const calendarEvents = events.map((e) => ({
    title: e.title,
    date: e.date,
    backgroundColor: getOccupancyColor(e.bookedCount, e.maxOccupancy),
    borderColor: "transparent",
  }));

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-semibold mb-1">Events</h1>
                <p className="text-foreground/50 text-sm">
                  Manage your events and view the calendar
                </p>
              </div>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditId(null);
                  setForm({ title: "", date: "", timeSlots: "", price: 0, maxOccupancy: 0 });
                }}
                className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/85 transition-colors"
              >
                {showForm ? "Cancel" : "+ New Event"}
              </button>
            </div>

            {/* Event Form */}
            {showForm && (
              <div className="bg-white rounded-xl border border-accent/10 p-6 mb-8">
                <h3 className="font-serif text-lg font-medium mb-4">
                  {editId ? "Edit Event" : "Create New Event"}
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">Title</label>
                    <input
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                      placeholder="Event title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">Time Slots</label>
                    <input
                      required
                      value={form.timeSlots}
                      onChange={(e) => setForm({ ...form, timeSlots: e.target.value })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                      placeholder="e.g. 10:00 AM - 2:00 PM, 4:00 PM - 8:00 PM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">Price (INR)</label>
                    <input
                      type="number"
                      required
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">Max Occupancy</label>
                    <input
                      type="number"
                      required
                      value={form.maxOccupancy}
                      onChange={(e) => setForm({ ...form, maxOccupancy: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-secondary/30 border border-accent/20 rounded-lg text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/85 transition-colors"
                    >
                      {editId ? "Update Event" : "Create Event"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Calendar */}
            <div className="bg-white rounded-xl border border-accent/10 p-6 mb-8">
              <h3 className="font-serif text-lg font-medium mb-4">Calendar</h3>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "",
                }}
                height="auto"
              />
            </div>

            {/* Events List */}
            <div className="bg-white rounded-xl border border-accent/10">
              <div className="p-6 border-b border-accent/10">
                <h3 className="font-serif text-lg font-medium">All Events</h3>
              </div>
              {loading ? (
                <div className="p-12 text-center text-foreground/40">Loading...</div>
              ) : events.length === 0 ? (
                <div className="p-12 text-center text-foreground/40">
                  No events yet. Create your first event above.
                </div>
              ) : (
                <div className="divide-y divide-accent/10">
                  {events.map((event) => (
                    <div key={event.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-foreground/40">
                          {event.date} | {event.timeSlots} | INR {event.price?.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {event.bookedCount}/{event.maxOccupancy}
                          </p>
                          <p className="text-xs text-foreground/40">Booked</p>
                        </div>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: getOccupancyColor(event.bookedCount, event.maxOccupancy),
                          }}
                        />
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-xs text-accent-dark hover:text-foreground transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
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
