'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { sectionTitle } from '@/components/primitives';
import ScrollReveal from '@/components/motion/scroll-reveal';
import { siteConfig } from '@/config/site';
import { Card, CardBody } from '@nextui-org/card';
import { Input, Textarea, Button, Link } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { GithubIcon, LinkedInIcon, DevIcon } from '@/components/icons';

export default function ContactSection() {
  const t = useTranslations('contactSection');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hi Oleksandr,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}\n${email}`;
    const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <h2 className={sectionTitle({ color: 'blue' })}>{t('heading')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
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

          <ScrollReveal direction="right">
            <Card>
              <CardBody className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label={t('form.name')}
                    value={name}
                    onValueChange={setName}
                    isRequired
                    variant="bordered"
                  />
                  <Input
                    label={t('form.email')}
                    type="email"
                    value={email}
                    onValueChange={setEmail}
                    isRequired
                    variant="bordered"
                  />
                  <Input
                    label={t('form.subject')}
                    value={subject}
                    onValueChange={setSubject}
                    isRequired
                    variant="bordered"
                  />
                  <Textarea
                    label={t('form.message')}
                    value={message}
                    onValueChange={setMessage}
                    isRequired
                    variant="bordered"
                    minRows={4}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full font-medium"
                    radius="full"
                    endContent={<Icon icon="mdi:send" width={18} />}
                  >
                    {t('form.submit')}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
