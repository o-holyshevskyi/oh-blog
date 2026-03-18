'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import { siteConfig } from '@/config/site';
import { Link } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { GithubIcon, LinkedInIcon, DevIcon } from '@/components/icons';

export default function ContactSection() {
  const t = useTranslations('contactSection');

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle({ color: 'blue' })}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="max-w-lg mx-auto mt-12">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('subtitle')}</h3>
              <p className="text-default-500 leading-relaxed mb-8">
                {t('description')}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon icon="mdi:email-outline" className="text-primary" width={20} />
                  </div>
                  <div>
                    <p className="text-sm text-default-400">{t('form.emailLabel')}</p>
                    <Link
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm"
                    >
                      {siteConfig.contact.email}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon icon="mdi:phone-outline" className="text-primary" width={20} />
                  </div>
                  <div>
                    <p className="text-sm text-default-400">{t('form.phoneLabel')}</p>
                    <p className="text-sm">{siteConfig.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon icon="mdi:map-marker-outline" className="text-primary" width={20} />
                  </div>
                  <div>
                    <p className="text-sm text-default-400">{t('form.locationLabel')}</p>
                    <p className="text-sm">{siteConfig.contact.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Link isExternal href={siteConfig.links.github} aria-label="GitHub">
                  <GithubIcon className="text-default-500 hover:text-primary transition-colors" />
                </Link>
                <Link isExternal href={siteConfig.links.linkedIn} aria-label="LinkedIn">
                  <LinkedInIcon className="text-default-500 hover:text-primary transition-colors" />
                </Link>
                <Link isExternal href={siteConfig.links.dev} aria-label="Dev.to">
                  <DevIcon className="text-default-500 hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
