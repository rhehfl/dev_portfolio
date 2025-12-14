'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Modal from '@/components/common/view/Modal';
import SideDrawer from '@/components/common/view/SideDrawer';

export default function DetailOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsModal((prev) => !prev);

  const onExitComplete = () => {
    router.back();
  };

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && (
        <>
          {isModal ? (
            <Modal onClose={handleClose} onToggleMode={handleToggle}>
              {children}
            </Modal>
          ) : (
            <SideDrawer onClose={handleClose} onToggleMode={handleToggle}>
              {children}
            </SideDrawer>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
