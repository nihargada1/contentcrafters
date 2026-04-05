"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content - Asymmetric left */}
          <div className="lg:col-span-5 lg:col-start-1 z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm font-medium tracking-[0.3em] uppercase text-accent-dark mb-6"
            >
              Premium Content & Events
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-8"
            >
              We Craft
              <br />
              <span className="italic text-accent-dark">Unforgettable</span>
              <br />
              Experiences
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-lg text-foreground/60 max-w-md leading-relaxed mb-10"
            >
              From intimate gatherings to grand celebrations, we bring your
              vision to life with meticulous attention to detail and creative
              excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex items-center gap-6"
            >
              <a
                href="#inquiry"
                className="group px-8 py-4 bg-foreground text-background text-sm font-medium tracking-wide rounded-full hover:bg-foreground/85 transition-all duration-500 hover:shadow-lg"
              >
                Book a Consultation
              </a>
              <a
                href="#work"
                className="text-sm font-medium tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-300 border-b border-foreground/20 hover:border-foreground/60 pb-1"
              >
                View Our Work
              </a>
            </motion.div>
          </div>

          {/* Hero Image - Offset right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-7 lg:col-start-6 relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
              {/* Placeholder gradient for hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-secondary to-accent-dark/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-serif text-2xl text-foreground/30 italic">
                  Hero Image
                </p>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute -bottom-6 -left-8 lg:-left-16 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            >
              <p className="font-serif text-3xl font-semibold text-foreground">
                150+
              </p>
              <p className="text-sm text-foreground/50 mt-1">
                Events Crafted
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background decorative element */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
