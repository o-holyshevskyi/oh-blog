'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import { projectsData } from '@/config/data';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Icon } from '@iconify/react';

export default function ProjectsSection() {
  const t = useTranslations('projectsSection');

  return (
    <section id="projects" className="section-padding bg-default-50/50 dark:bg-default-100/20">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle({ color: 'blue' })}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projectsData.map((project, index) => (
            <ScrollReveal key={project.name} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader className="pb-0 pt-5 px-5">
                  <div className="w-full">
                    <div className="w-full h-32 rounded-lg bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5 flex items-center justify-center">
                      <Icon icon="mdi:code-braces-box" className="text-primary/40" width={48} />
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-5 pt-4">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-default-500 text-sm mt-2 leading-relaxed">
                    {t(`projects.${project.translationKey}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.techStack.map((tech) => (
                      <Chip key={tech} size="sm" variant="flat" color="primary" className="text-xs">
                        {tech}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
                <CardFooter className="px-5 pb-5 gap-2">
                  <Button
                    as={Link}
                    href={project.githubUrl}
                    isExternal
                    size="sm"
                    variant="flat"
                    startContent={<Icon icon="mdi:github" width={18} />}
                  >
                    {t('viewCode')}
                  </Button>
                  {project.liveUrl && (
                    <Button
                      as={Link}
                      href={project.liveUrl}
                      isExternal
                      size="sm"
                      variant="flat"
                      color="primary"
                      startContent={<Icon icon="mdi:open-in-new" width={18} />}
                    >
                      {t('liveDemo')}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
