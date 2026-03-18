'use client';

import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import { siteConfig } from '@/config/site';
import { Icon } from '@iconify/react';

export default function ContactSection() {
  const t = useTranslations('contactSection');

  return (
    <section id="contact" className="section-padding min-h-[80vh] flex items-start">
      <div className="section-container w-full">
        <ScrollReveal>
          <h2 className={sectionTitle()}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="max-w-lg mx-auto mt-16">
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-xl font-serif font-semibold text-ink dark:text-cream mb-3">
                {t('subtitle')}
              </h3>
              <p className="text-midgray text-sm leading-relaxed mb-10">
                {t('description')}
              </p>

              <div className="space-y-6">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-warmgray/40 dark:border-warmgray/15 flex items-center justify-center shrink-0 group-hover:border-terracotta transition-colors">
                    <Icon icon="mdi:email-outline" className="text-midgray group-hover:text-terracotta transition-colors" width={18} />
                  </div>
                  <div>
                    <p className="text-xs font-sans tracking-wide uppercase text-midgray">{t('form.emailLabel')}</p>
                    <p className="text-sm text-ink dark:text-cream group-hover:text-terracotta transition-colors">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-warmgray/40 dark:border-warmgray/15 flex items-center justify-center shrink-0">
                    <Icon icon="mdi:phone-outline" className="text-midgray" width={18} />
                  </div>
                  <div>
                    <p className="text-xs font-sans tracking-wide uppercase text-midgray">{t('form.phoneLabel')}</p>
                    <p className="text-sm text-ink dark:text-cream">{siteConfig.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-warmgray/40 dark:border-warmgray/15 flex items-center justify-center shrink-0">
                    <Icon icon="mdi:map-marker-outline" className="text-midgray" width={18} />
                  </div>
                  <div>
                    <p className="text-xs font-sans tracking-wide uppercase text-midgray">{t('form.locationLabel')}</p>
                    <p className="text-sm text-ink dark:text-cream">{siteConfig.contact.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10 pt-8 border-t border-warmgray/30 dark:border-warmgray/10">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-midgray hover:text-ink dark:hover:text-cream transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a href={siteConfig.links.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-midgray hover:text-ink dark:hover:text-cream transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href={siteConfig.links.dev} target="_blank" rel="noopener noreferrer" aria-label="Dev.to" className="text-midgray hover:text-ink dark:hover:text-cream transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    <path d="M7 8v8" />
                    <path d="M12 8l-2 4 2 4" />
                    <path d="M17 8l-2 4 2 4" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
