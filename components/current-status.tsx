'use client';

import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { experienceData } from '@/config/data';

export default function CurrentStatus() {
  const t = useTranslations('experienceSection');

  const currentJob = experienceData.find((exp) => exp.endDate === null);

  if (!currentJob) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-50/80 dark:bg-success-100/10 border border-success-200 dark:border-success-200/20 backdrop-blur-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500" />
      </span>
      <span className="text-sm text-success-700 dark:text-success-400 font-medium">
        {t('currentlyWorking')}
      </span>
      <Icon icon={currentJob.icon} className="text-success-600 dark:text-success-400" width={16} />
      <span className="text-sm text-default-600 dark:text-default-400">
        {t(`companies.${currentJob.translationKey}.role`)} @ {t(`companies.${currentJob.translationKey}.company`)}
      </span>
    </div>
  );
}
