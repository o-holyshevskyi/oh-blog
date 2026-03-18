'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import { experienceData } from '@/config/data';
import { Card, CardBody } from '@nextui-org/card';
import { Icon } from '@iconify/react';
import DateComponent from '@/components/date/date';
import DateDifference from '@/components/date/date-difference';
import getCurrentDate from '@/app/lib/date';

interface ExperienceTimelineProps {
  locale: string;
}

export default function ExperienceTimeline({ locale }: ExperienceTimelineProps) {
  const t = useTranslations('experienceSection');

  return (
    <section id="experience" className="section-padding bg-default-50/50 dark:bg-default-100/20">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle({ color: 'blue' })}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30 md:-translate-x-px" />

          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const endDate = exp.endDate || getCurrentDate();

            return (
              <ScrollReveal
                key={exp.translationKey}
                direction={isLeft ? 'left' : 'right'}
                delay={index * 0.15}
              >
                <div className={`relative flex items-start mb-10 md:mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-[5px] md:-translate-x-1.5 mt-6 z-10" />

                  {/* Spacer for mobile offset */}
                  <div className="w-10 md:hidden shrink-0" />

                  {/* Card */}
                  <div className={`flex-1 md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardBody className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <Icon icon={exp.icon} className="text-primary" width={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {t(`companies.${exp.translationKey}.company`)}
                            </h3>
                            <p className="text-primary text-sm font-medium">
                              {t(`companies.${exp.translationKey}.role`)}
                            </p>
                            <div className="flex flex-wrap items-center gap-1 text-xs text-default-400 mt-1">
                              <DateComponent dateString={exp.startDate} locale={locale} />
                              <span>-</span>
                              {exp.endDate ? (
                                <DateComponent dateString={exp.endDate} locale={locale} />
                              ) : (
                                <span>{t('present')}</span>
                              )}
                              <span className="mx-1">|</span>
                              <DateDifference
                                dateFromString={exp.startDate}
                                dateToString={endDate}
                                locale={locale}
                              />
                            </div>
                            <p className="text-default-500 text-sm mt-3 leading-relaxed">
                              {t(`companies.${exp.translationKey}.description`)}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Spacer for desktop alignment */}
                  <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
