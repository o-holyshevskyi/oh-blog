'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';

export default function DownloadCVButton() {
  const [loading, setLoading] = useState(false);
  const tHero = useTranslations('hero');
  const tExperience = useTranslations('experienceSection');
  const tSkills = useTranslations('skillsSection');
  const tAbout = useTranslations('aboutSection');

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      const { generateCV } = await import('@/app/lib/generate-cv');
      generateCV({
        hero: (key: string) => tHero(key as any),
        experience: (key: string) => tExperience(key as any),
        skills: (key: string) => tSkills(key as any),
        about: (key: string) => tAbout(key as any),
      });
    } finally {
      setLoading(false);
    }
  }, [tHero, tExperience, tSkills, tAbout]);

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-sans font-medium tracking-wide
        text-midgray hover:text-ink dark:hover:text-cream
        border border-warmgray/40 dark:border-warmgray/15 rounded-[4px]
        hover:border-terracotta dark:hover:border-terracotta
        transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
    >
      <Icon
        icon={loading ? 'mdi:loading' : 'mdi:file-download-outline'}
        width={18}
        className={loading ? 'animate-spin' : ''}
      />
      {loading ? 'Generating...' : 'Download CV'}
    </button>
  );
}
