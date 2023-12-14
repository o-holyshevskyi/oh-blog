'use client';

import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

const TwitterShareButton = ({ title, url, children } : { title: string; url: string; children: JSX.Element }) => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  
    return (
      <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
};

const TelegramShareButton = ({ title, url, children } : { title: string; url: string; children: JSX.Element }) => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  
    return (
      <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
};

const LinkedInShareButton = ({ title, summary, url, children } : { title: string; url: string; children: JSX.Element; summary: string }) => {
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(url)}\n\r${encodeURIComponent(title)}\n\r${summary}`;
    return (
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
};

const sharedLinks = [
    {
        provider: 'Telegram',
        icon: 'basil:telegram-solid',
        shareButton: TelegramShareButton
    },
    {
        provider: 'X',
        icon: 'pajamas:twitter',
        shareButton: TwitterShareButton
    },
    {
        provider: 'LinkedIn',
        icon: 'mingcute:linkedin-line',
        shareButton: LinkedInShareButton
    },
]

export default function ShareSocialLinks({ 
    slug, 
    title, 
    domain, 
    description,
} : { 
    slug: string; 
    title: string; 
    domain: string; 
    description: string;
}) {    
    const locale = useLocale();
    const url = `${domain}/${locale}/blog/${slug}` + '\n';
    
    const t = useTranslations("postPage");

    const [copySuccess, setCopySuccess] = useState(false);

    const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);

          setTimeout(() => setCopySuccess(false), 1000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          setCopySuccess(false);
        }
    };
    
    return (
        <div className='flex justify-center items-center gap-2'>
            {sharedLinks.map((link, index) => (
                <Tooltip content={`${t("sharedLinks")} ${link.provider}`} key={index}>
                    <Button
                        isIconOnly
                        variant='faded'
                    >
                        <link.shareButton
                            url={url}
                            title={title}
                            summary={description}
                        >
                            <Icon icon={link.icon} fontSize={28} />
                        </link.shareButton>
                    </Button>
                </Tooltip>
            ))}
            <Tooltip content={t("copyLink")}>
                    <Button
                        isIconOnly
                        variant={copySuccess ? 'solid' : 'faded'}
                        color={copySuccess ? 'success' : 'default'}
                        onClick={copyToClipboard}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                    </Button>
            </Tooltip>
            
        </div>
    );
}