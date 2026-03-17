'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { useTranslations } from 'next-intl';
import { Typewriter } from 'react-simple-typewriter';
import { Icon } from '@iconify/react';

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

  const roles = [
    t('roles.role1'),
    t('roles.role2'),
    t('roles.role3'),
  ];

  const MotionWrapper = shouldReduceMotion ? 'div' : motion.div;
  const motionProps = shouldReduceMotion ? {} : { variants: container, initial: 'hidden', animate: 'visible' };
  const itemProps = shouldReduceMotion ? {} : { variants: item };

  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-primary/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="section-container w-full relative z-10">
        {/* @ts-ignore */}
        <MotionWrapper {...motionProps} className="max-w-3xl">
          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <span className="text-primary text-sm md:text-base font-medium tracking-wider uppercase">
              {t('greeting')}
            </span>
          </MotionWrapper>

          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-3 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5EA2EF] to-[#0072F5]">
                {t('name')}
              </span>
            </h1>
          </MotionWrapper>

          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <div className="text-xl sm:text-2xl md:text-3xl mt-4 text-default-600 font-medium h-10">
              <Typewriter
                words={roles}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </div>
          </MotionWrapper>

          {/* @ts-ignore */}
          <MotionWrapper {...itemProps}>
            <p className="text-default-500 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
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
                radius="full"
                className="font-medium"
              >
                {t('cta.contact')}
              </Button>
              <Button
                as={Link}
                href="#experience"
                variant="bordered"
                size="lg"
                radius="full"
                className="font-medium"
              >
                {t('cta.work')}
              </Button>
            </div>
          </MotionWrapper>
        </MotionWrapper>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon icon="mdi:chevron-down" className="text-default-400" width={32} />
        </motion.div>
      </div>
    </section>
  );
}
