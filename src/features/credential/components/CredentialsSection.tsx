'use client';

import CredentialItem from '@/features/credential/components/CredentialItem';
import { CREDENTIAL_ITEM_DATA } from '@/features/credential/contents/CredentialItemData';
import { motion } from 'framer-motion';

const GROUPS = [
  {
    heading: '학력 & 자격증',
    types: ['education', 'certificate'],
  },
  {
    heading: '수상 & 발표',
    types: ['award', 'talk'],
  },
] as const;

export default function CredentialsSection() {
  return (
    <section className="grid grid-cols-12 gap-6 mb-24" id="credentials">
      <header className="col-span-10 col-start-2 mt-16 md:mt-24 mb-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          <span className="text-primary" aria-hidden="true">✦</span> Credentials
        </motion.h2>
      </header>

      <div className="col-span-12 grid grid-cols-1 gap-6 md:col-span-10 md:col-start-2 md:grid-cols-2 md:gap-8">
        {GROUPS.map((group) => (
          <article
            key={group.heading}
            className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-hard"
          >
            <h4 className="mb-4 text-lg font-bold">
              <span className="text-primary" aria-hidden="true">★</span>{' '}
              {group.heading}
            </h4>
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
