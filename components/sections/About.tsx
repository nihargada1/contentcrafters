"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8 },
};

export default function About() {
  return (
    <section id="about" className="py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Text Content - 60% */}
          <div className="lg:col-span-7 lg:pr-12">
            <motion.p
              {...fadeInUp}
              className="text-sm font-medium tracking-[0.3em] uppercase text-accent-dark mb-6"
            >
              About Us
            </motion.p>

            <motion.h2
              {...fadeInUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight mb-10"
            >
              Where Creativity
              <br />
              Meets <span className="italic">Precision</span>
            </motion.h2>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-foreground/60 text-lg leading-relaxed"
            >
              <p>
                At Content Crafters, we believe every event tells a story.
                Founded with a passion for creating extraordinary moments, we
                specialize in transforming your ideas into immersive experiences
                that leave lasting impressions.
              </p>
              <p>
                Our team of dedicated professionals brings together expertise in
                event planning, content creation, and brand storytelling to
                deliver seamless, memorable occasions — from intimate workshops
                to large-scale celebrations.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-8 mt-14 pt-14 border-t border-accent/30"
            >
              {[
                { number: "150+", label: "Events Hosted" },
                { number: "50+", label: "Happy Clients" },
                { number: "3+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                    {stat.number}
                  </p>
                  <p className="text-sm text-foreground/50 mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image Collage - 40% */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              {/* Main image */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-secondary to-accent-dark/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-serif text-xl text-foreground/30 italic">
                    About Image
                  </p>
                </div>
              </div>

              {/* Overlapping smaller image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-8 -left-8 w-2/3 aspect-square rounded-xl overflow-hidden bg-accent/20 border-4 border-background shadow-xl"
              >
                <div className="w-full h-full bg-gradient-to-tr from-accent-dark/20 to-secondary flex items-center justify-center">
                  <p className="font-serif text-lg text-foreground/30 italic">
                    Detail Image
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
