"use client";

import { EXPERIENCE } from "@/features/experience/contents/experiences";
import ExperienceItem from "@/features/experience/components/ExperienceItem";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section className="mx-auto mt-24 max-w-5xl md:mt-32" id="experience">
      <header className="mb-8 flex items-end justify-between border-b border-foreground pb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
          EXPERIENCE LOG
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          경험
        </motion.h2>
      </header>

      <div className="flex flex-col">
        {EXPERIENCE.map((item, index) => (
          <ExperienceItem key={item.id} {...item} index={index} />
        ))}
      </div>
    </section>
  );
}
