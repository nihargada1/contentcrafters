"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const eventTypes = [
  "Wedding",
  "Engagement",
  "Birthday",
  "Corporate Event",
  "Brand Launch",
  "Fashion Show",
  "Workshop",
  "Other",
];

export default function Inquiry() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Dynamic import of Firebase to avoid SSR issues
      const { collection, addDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      const { db } = await import("@/lib/firebase");

      // Save to Firestore
      await addDoc(collection(db, "inquiries"), {
        name: formData.name,
        phone: formData.phone,
        eventType: formData.eventType,
        message: formData.message,
        status: "new",
        createdAt: serverTimestamp(),
      });

      // Open WhatsApp
      const whatsappMessage = encodeURIComponent(
        `Hello Content Crafters! I'm ${formData.name}. I'm interested in your services for a ${formData.eventType}. ${formData.message}`
      );
      window.open(
        `https://wa.me/9809096979?text=${whatsappMessage}`,
        "_blank"
      );

      setSubmitted(true);
      setFormData({ name: "", phone: "", eventType: "", message: "" });
    } catch {
      // If Firebase is not configured yet, still open WhatsApp
      const whatsappMessage = encodeURIComponent(
        `Hello Content Crafters! I'm ${formData.name}. I'm interested in your services for a ${formData.eventType}. ${formData.message}`
      );
      window.open(
        `https://wa.me/9809096979?text=${whatsappMessage}`,
        "_blank"
      );
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-32 lg:py-40 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left text */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-sm font-medium tracking-[0.3em] uppercase text-accent-dark mb-6"
            >
              Get in Touch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight mb-8"
            >
              Let&apos;s Create
              <br />
              Something <span className="italic">Beautiful</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-foreground/50 text-lg leading-relaxed mb-10"
            >
              Ready to bring your vision to life? Fill out the form and
              we&apos;ll connect with you on WhatsApp to discuss the details.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-4 text-foreground/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm">
                  @
                </div>
                <span>hello@contentcrafters.in</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm">
                  #
                </div>
                <span>@contentcrafters</span>
              </div>
            </motion.div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-background rounded-2xl p-8 md:p-10 shadow-lg"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-3">
                    Thank You!
                  </h3>
                  <p className="text-foreground/50">
                    We&apos;ll be in touch soon. Check your WhatsApp!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-accent-dark hover:text-foreground transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">
                      Event Type
                    </label>
                    <select
                      required
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData({ ...formData, eventType: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-secondary/50 border border-accent/20 rounded-lg text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us about your event..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-foreground text-background text-sm font-medium tracking-wide rounded-lg hover:bg-foreground/85 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Inquiry via WhatsApp"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
