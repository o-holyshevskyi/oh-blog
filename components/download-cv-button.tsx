'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/button';
import { Icon } from '@iconify/react';

export default function DownloadCVButton() {
  const [loading, setLoading] = useState(false);
  const tHero = useTranslations('hero');
  const tExperience = useTranslations('experienceSection');
  const tSkills = useTranslations('skillsSection');
  const tAboutSection = useTranslations('aboutSection');
  const tAbout = useTranslations('about');

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      const { generateCV } = await import('@/app/lib/generate-cv');
      generateCV({
        hero: (key: string) => tHero(key as any),
        experience: (key: string) => tExperience(key as any),
        skills: (key: string) => tSkills(key as any),
        aboutSection: (key: string) => tAboutSection(key as any),
        about: (key: string) => tAbout(key as any),
      });
    } finally {
      setLoading(false);
    }
  }, [tHero, tExperience, tSkills, tAboutSection, tAbout]);

  return (
    <Button
      onClick={handleDownload}
      isLoading={loading}
      variant="bordered"
      size="lg"
      radius="sm"
      className="font-medium font-sans border-warmgray dark:border-warmgray/30 text-ink dark:text-cream"
      startContent={!loading && <Icon icon="mdi:file-download-outline" width={18} />}
    >
      {loading ? 'Generating...' : 'Download CV'}
    </Button>
  );
}
