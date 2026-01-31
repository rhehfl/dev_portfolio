'use client';

import CredentialItem from '@/features/credential/components/CredentialItem';
import { CREDENTIAL_ITEM_DATA } from '@/features/credential/contents/CredentialItemData';
import { motion } from 'framer-motion';

export default function CredentialsSection() {
  return (
    <section
      className="grid grid-cols-12 gap-6 auto-rows mb-24"
      id="credentials"
    >
      <header className="col-span-10 col-start-2 mt-20 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight"
        >
          __Credentials
        </motion.h2>
      </header>

      <div className="col-span-12 md:col-span-10 md:col-start-2 flex flex-col">
        {CREDENTIAL_ITEM_DATA.map((item, index) => (
          <CredentialItem key={item.id} {...item} index={index} />
        ))}
      </div>
    </section>
  );
}
