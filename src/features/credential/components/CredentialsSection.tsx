"use client";

import CredentialItem from "@/features/credential/components/CredentialItem";
import { CREDENTIAL_ITEM_DATA } from "@/features/credential/contents/CredentialItemData";
import { motion } from "framer-motion";

const GROUPS = [
  {
    heading: "학력 & 자격증",
    types: ["education", "certificate"],
  },
  {
    heading: "수상 & 발표",
    types: ["award", "talk"],
  },
] as const;

export default function CredentialsSection() {
  return (
    <section className="mx-auto mt-24 max-w-5xl pb-8 md:mt-32" id="credentials">
      <header className="mb-10 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          학력 및 활동
        </motion.h2>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {GROUPS.map((group) => (
          <article
            key={group.heading}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h4 className="mb-4 text-lg font-bold">{group.heading}</h4>
            <ul className="flex flex-col gap-4">
              {CREDENTIAL_ITEM_DATA.filter((item) =>
                (group.types as readonly string[]).includes(item.type),
              ).map((item) => (
                <CredentialItem key={item.id} {...item} />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
