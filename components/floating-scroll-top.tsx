'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function FloatingScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const snapMain = document.querySelector('main.snap-scroll');

    const handleScroll = () => {
      const scrollTarget = snapMain && snapMain.scrollHeight > window.innerHeight
        ? snapMain
        : document.documentElement;
      setVisible(scrollTarget.scrollTop > 400);
    };

    if (snapMain) {
      snapMain.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (snapMain) {
        snapMain.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const snapMain = document.querySelector('main.snap-scroll');
    if (snapMain && snapMain.scrollHeight > window.innerHeight) {
      snapMain.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:shadow-xl hover:scale-110 transition-transform"
        >
          <Icon icon="mdi:chevron-up" width={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
