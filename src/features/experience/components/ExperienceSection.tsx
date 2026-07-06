'use client';

import { EXPERIENCE } from '@/features/experience/contents/experiences';
import ExperienceItem from '@/features/experience/components/ExperienceItem';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  return (
    <section
      className="grid grid-cols-12 gap-6 auto-rows mb-24"
      id="experience"
    >
      <header className="col-span-10 col-start-2 mt-16 md:mt-24 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-foreground"
        >
          <span className="text-primary" aria-hidden="true">✦</span> Experience
        </motion.h2>
      </header>

      <div className="col-span-12 md:col-span-10 md:col-start-2 flex flex-col ">
        {EXPERIENCE.map((item, index) => (
          <ExperienceItem key={item.id} {...item} index={index} />
        ))}
      </div>
    </section>
  );
}
