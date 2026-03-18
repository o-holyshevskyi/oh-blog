'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import CurrentStatus from '@/components/current-status';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroSection() {
  const t = useTranslations('hero');
  const shouldReduceMotion = useReducedMotion();

  const MotionWrapper = shouldReduceMotion ? 'div' : motion.div;
  const motionProps = shouldReduceMotion ? {} : { variants: container, initial: 'hidden', animate: 'visible' };
  const itemProps = shouldReduceMotion ? {} : { variants: item };

  return (
    <section className="relative flex items-center min-h-screen">
      <div className="section-container w-full relative z-10">
        {/* @ts-ignore */}
        <MotionWrapper {...motionProps} className="max-w-3xl">
          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <CurrentStatus />
          </MotionWrapper>

          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <span className="text-midgray text-xs md:text-sm font-sans font-medium tracking-[0.2em] uppercase mt-6 inline-block">
              {t('greeting')}
            </span>
          </MotionWrapper>

          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-semibold mt-3 tracking-tight text-ink dark:text-cream">
              {t('name')}
            </h1>
          </MotionWrapper>

          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <p className="text-xl sm:text-2xl md:text-3xl mt-4 text-terracotta font-serif">
              {t('roles.role1')}
            </p>
          </MotionWrapper>

          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <p className="text-midgray text-base md:text-lg mt-6 max-w-xl leading-relaxed">
              {t('tagline')}
            </p>
          </MotionWrapper>

          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                as={Link}
                href="#contact"
                color="primary"
                size="lg"
                radius="sm"
                className="font-medium font-sans"
              >
                {t('cta.contact')}
              </Button>
              <Button
                as={Link}
                href="#experience"
                variant="bordered"
                size="lg"
                radius="sm"
                className="font-medium font-sans border-warmgray dark:border-warmgray/30 text-ink dark:text-cream"
              >
                {t('cta.work')}
              </Button>
            </div>
          </MotionWrapper>
        </MotionWrapper>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon icon="mdi:chevron-down" className="text-midgray" width={32} />
        </motion.div>
      </div>
    </section>
  );
}
