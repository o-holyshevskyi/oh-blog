'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import CountUp from '@/components/motion/count-up';
import DownloadCv from '@/components/about/download-cv/download-cv';
import { Avatar } from '@nextui-org/react';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
          <ScrollReveal direction="left">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-50" />
                <Avatar
                  src="/avatars/avatar-3.jfif"
                  className="w-48 h-48 md:w-64 md:h-64 relative"
                  isBordered
                  color="primary"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <p className="text-default-600 text-base md:text-lg leading-relaxed">
                {t('summary')}
              </p>
              <div className="mt-6">
                <DownloadCv />
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.labelKey} delay={index * 0.1}>
              <Card className="bg-default-50 dark:bg-default-100/50">
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
