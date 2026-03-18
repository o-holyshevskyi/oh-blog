'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import CountUp from '@/components/motion/count-up';
import { Card, CardBody } from '@nextui-org/card';

const stats = [
  { value: 7, suffix: '+', labelKey: 'years' },
  { value: 19, suffix: '+', labelKey: 'repos' },
  { value: 'ISTQB', suffix: '', labelKey: 'certified' },
  { value: 4, suffix: '', labelKey: 'languages' },
];

export default function AboutSection() {
  const t = useTranslations('aboutSection');

  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle({ color: 'blue' })}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="mt-12">
          <ScrollReveal>
            <p className="text-default-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
              {t('summary')}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.labelKey} delay={index * 0.1}>
              <Card className="bg-warmgray/30 dark:bg-warmgray/5 border border-warmgray/50 dark:border-warmgray/10 shadow-none">
                <CardBody className="text-center py-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-default-500 text-sm mt-2">
                    {t(`stats.${stat.labelKey}`)}
                  </p>
                </CardBody>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
