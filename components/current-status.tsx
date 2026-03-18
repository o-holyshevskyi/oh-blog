'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { experienceData } from '@/config/data';

export default function CurrentStatus() {
  const t = useTranslations('experienceSection');

  const currentJob = experienceData.find((exp) => exp.endDate === null);

  if (!currentJob) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warmgray/30 dark:bg-warmgray/5 border border-warmgray/50 dark:border-warmgray/10">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
      </span>
      <span className="text-sm text-sage font-medium font-sans">
        {t('currentlyWorking')}
      </span>
      <Icon icon={currentJob.icon} className="text-midgray" width={16} />
      <span className="text-sm text-midgray">
        {t(`companies.${currentJob.translationKey}.role`)} @ {t(`companies.${currentJob.translationKey}.company`)}
      </span>
    </div>
  );
}
