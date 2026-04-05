"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Elegant Wedding",
    category: "Wedding",
    span: "col-span-1 md:col-span-2 row-span-2",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Corporate Gala",
    category: "Corporate",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    title: "Birthday Celebration",
    category: "Birthday",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    title: "Brand Launch",
    category: "Corporate",
    span: "col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Engagement Party",
    category: "Engagement",
    span: "col-span-1 md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Fashion Event",
    category: "Fashion",
    span: "col-span-1",
    aspect: "aspect-[4/5]",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 lg:py-40 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-sm font-medium tracking-[0.3em] uppercase text-accent-dark mb-4"
            >
              Our Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight"
            >
              Selected <span className="italic">Projects</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-foreground/50 text-lg max-w-md"
          >
            A curated selection of our finest work, showcasing the breadth of
            our creative capabilities.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`${project.span} group cursor-pointer`}
            >
              <div
                className={`relative ${project.aspect} rounded-xl overflow-hidden bg-secondary`}
              >
                {/* Gradient placeholder */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${135 + i * 30}deg, rgba(203,187,160,0.3), rgba(232,223,209,0.8), rgba(184,164,136,0.2))`,
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-500 flex items-end p-6 md:p-8">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70 mb-2">
                      {project.category}
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl text-white font-medium">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
