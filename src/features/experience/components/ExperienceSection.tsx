"use client";

import { EXPERIENCE } from "@/features/experience/contents/experiences";
import ExperienceItem from "@/features/experience/components/ExperienceItem";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const career = EXPERIENCE.filter((item) => item.type === "work");
  const activities = EXPERIENCE.filter((item) => item.type !== "work");

  return (
    <>
      <ExperienceGroup id="career" label="CAREER" title="경력" items={career} />
      <ExperienceGroup
        id="activities"
        label="OTHER EXPERIENCE"
        title="기타 경험"
        items={activities}
      />
    </>
  );
}

function ExperienceGroup({
  id,
  label,
  title,
  items,
}: {
  id: string;
  label: string;
  title: string;
  items: typeof EXPERIENCE;
}) {
  return (
    <section className="mx-auto mt-24 max-w-5xl md:mt-32" id={id}>
      <header className="mb-8 flex items-end justify-between border-b border-foreground pb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {title}
        </motion.h2>
      </header>

      <div className="flex flex-col">
        {items.map((item, index) => (
          <ExperienceItem key={item.id} {...item} index={index} />
        ))}
      </div>
    </section>
  );
}
