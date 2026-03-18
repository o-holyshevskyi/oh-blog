'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import StaggerContainer, { StaggerItem } from '@/components/motion/stagger-container';
import { skillCategories } from '@/config/data';
import { Tooltip } from '@nextui-org/react';

export default function SkillsSection() {
  const t = useTranslations('skillsSection');

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle()}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={category.translationKey} delay={catIndex * 0.1}>
              <div>
                <h3 className="text-xs font-sans font-medium tracking-[0.15em] uppercase text-terracotta mb-4">
                  {t(`categories.${category.translationKey}`)}
                </h3>
                <div className="w-6 h-px bg-terracotta/40 mb-4" />

                <StaggerContainer className="space-y-0" staggerDelay={0.05} delayChildren={0.1}>
                  {category.skills.map((skill) => (
                    <StaggerItem key={skill.name}>
                      <Tooltip
                        content={t(`skills.${skill.translationKey}`)}
                        placement="bottom"
                        delay={300}
                        classNames={{ content: 'max-w-xs text-sm' }}
                      >
                        <p className="py-1.5 text-sm text-midgray hover:text-ink dark:hover:text-cream transition-colors cursor-default border-b border-warmgray/30 dark:border-warmgray/10 last:border-0">
                          {skill.name}
                        </p>
                      </Tooltip>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
