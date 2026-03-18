'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import { experienceData } from '@/config/data';
import DateComponent from '@/components/date/date';
import DateDifference from '@/components/date/date-difference';
import getCurrentDate from '@/app/lib/date';

interface ExperienceTimelineProps {
  locale: string;
}

export default function ExperienceTimeline({ locale }: ExperienceTimelineProps) {
  const t = useTranslations('experienceSection');

  return (
    <section id="experience" className="section-padding bg-warmgray/20 dark:bg-warmgray/5">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle()}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto mt-16 space-y-0">
          {experienceData.map((exp, index) => {
            const endDate = exp.endDate || getCurrentDate();
            const isLast = index === experienceData.length - 1;

            return (
              <ScrollReveal key={exp.translationKey} delay={index * 0.1}>
                <div className="relative pl-8 md:pl-10">
                  {/* Timeline line */}
                  {!isLast && (
                    <div className="absolute left-[5px] md:left-[7px] top-3 bottom-0 w-px bg-warmgray/60 dark:bg-warmgray/15" />
                  )}

                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-[1px] top-[6px] w-[11px] h-[11px] rounded-full border-2 ${
                    !exp.endDate
                      ? 'bg-terracotta border-terracotta'
                      : 'bg-cream dark:bg-[#1a1918] border-midgray'
                  }`} />

                  <div className="pb-10 md:pb-12">
                    {/* Date & duration */}
                    <div className="flex flex-wrap items-center gap-x-2 text-xs font-sans tracking-wide uppercase text-midgray">
                      <DateComponent dateString={exp.startDate} locale={locale} />
                      <span>&mdash;</span>
                      {exp.endDate ? (
                        <DateComponent dateString={exp.endDate} locale={locale} />
                      ) : (
                        <span className="text-terracotta font-medium">{t('present')}</span>
                      )}
                      <span className="text-warmgray dark:text-warmgray/30">/</span>
                      <DateDifference
                        dateFromString={exp.startDate}
                        dateToString={endDate}
                        locale={locale}
                      />
                    </div>

                    {/* Company & role */}
                    <h3 className="text-lg md:text-xl font-serif font-semibold mt-2 text-ink dark:text-cream">
                      {t(`companies.${exp.translationKey}.role`)}
                    </h3>
                    <p className="text-sm text-terracotta font-sans font-medium mt-0.5">
                      {t(`companies.${exp.translationKey}.company`)}
                    </p>

                    {/* Description */}
                    <p className="text-midgray text-sm mt-3 leading-relaxed max-w-xl">
                      {t(`companies.${exp.translationKey}.description`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
