'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import StaggerContainer, { StaggerItem } from '@/components/motion/stagger-container';
import { skillCategories } from '@/config/data';
import { Card, CardBody } from '@nextui-org/card';
import { Icon } from '@iconify/react';
import { Tooltip } from '@nextui-org/react';

export default function SkillsSection() {
  const t = useTranslations('skillsSection');

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle({ color: 'blue' })}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={category.translationKey} delay={catIndex * 0.1}>
              <Card className="h-full">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon icon={category.icon} className="text-primary" width={20} />
                    </div>
                    <h3 className="font-semibold text-sm">
                      {t(`categories.${category.translationKey}`)}
                    </h3>
                  </div>

                  <StaggerContainer className="space-y-2" staggerDelay={0.05} delayChildren={0.1}>
                    {category.skills.map((skill) => (
                      <StaggerItem key={skill.name}>
                        <Tooltip
                          content={t(`skills.${skill.translationKey}`)}
                          placement="bottom"
                          delay={300}
                          classNames={{ content: 'max-w-xs text-sm' }}
                        >
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50/50 transition-colors cursor-default group">
                            <Icon
                              icon={skill.icon}
                              width={28}
                              className="shrink-0 group-hover:scale-110 transition-transform"
                            />
                            <span className="text-sm text-default-600 group-hover:text-foreground transition-colors">
                              {skill.name}
                            </span>
                          </div>
                        </Tooltip>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </CardBody>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
