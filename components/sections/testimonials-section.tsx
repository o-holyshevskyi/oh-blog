'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import { recommendationsData } from '@/config/data';
import { Card, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import DateComponent from '@/components/date/date';
import { Icon } from '@iconify/react';

interface TestimonialsSectionProps {
  locale: string;
}

export default function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % recommendationsData.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + recommendationsData.length) % recommendationsData.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const rec = recommendationsData[current];

  return (
    <section id="testimonials" className="section-padding bg-default-50/50 dark:bg-default-100/20">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle({ color: 'blue' })}>{t('heading')}</h2>
        </ScrollReveal>

        <div
          className="mt-12 max-w-3xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative overflow-visible">
                <CardBody className="p-6 md:p-8">
                  <Icon
                    icon="mdi:format-quote-open"
                    className="text-primary/20 absolute -top-4 left-4"
                    width={48}
                  />
                  <p className="text-default-600 leading-relaxed text-sm md:text-base mt-4 line-clamp-6">
                    {t(`recommendations.${rec.translationKey}.text`)}
                  </p>
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-divider">
                    <Avatar
                      src={rec.avatar}
                      size="md"
                      isBordered
                      color="primary"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {t(`recommendations.${rec.translationKey}.name`)}
                      </p>
                      <p className="text-default-400 text-xs">
                        {t(`recommendations.${rec.translationKey}.position`)}
                      </p>
                      <DateComponent
                        dateString={rec.date}
                        locale={locale}
                        formatDate="LLLL yyyy"
                        className="text-default-400 text-xs"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full hover:bg-default-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <Icon icon="mdi:chevron-left" width={24} className="text-default-500" />
            </button>
            <div className="flex gap-2">
              {recommendationsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current
                      ? 'bg-primary w-6'
                      : 'bg-default-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-default-100 transition-colors"
              aria-label="Next testimonial"
            >
              <Icon icon="mdi:chevron-right" width={24} className="text-default-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
