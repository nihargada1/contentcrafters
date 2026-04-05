"use client";

import { motion } from "framer-motion";

export default function Statement() {
  return (
    <section className="py-32 lg:py-44 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent-dark mb-10">
            Our Philosophy
          </p>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.2] tracking-tight">
            &ldquo;Every detail matters.
            <br />
            Every moment is{" "}
            <span className="italic text-accent-dark">crafted</span>
            <br />
            with intention.&rdquo;
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-20 h-0.5 bg-accent mx-auto mt-12"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-foreground/50 text-lg mt-8 max-w-xl mx-auto leading-relaxed"
          >
            We don&apos;t just plan events — we architect experiences. From
            concept to execution, every element is thoughtfully designed to
            create something truly extraordinary.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
