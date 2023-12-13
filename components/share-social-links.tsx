'use client';

import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/react';

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

export default function ShareSocialLinks({ slug, title, domain, description } : { slug: string; title: string; domain: string; description: string }) {    
    const url = `${domain}/blog/${slug}` + '\n';
    
    return (
        <div className='flex justify-center items-center gap-2'>
            {sharedLinks.map((link, index) => (
                <Tooltip content={`Share with ${link.provider}`} key={index}>
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
        </div>
    )

    /*return (
        <div className='flex justify-center items-center gap-2'>
            {sharedLinks.map((link, index) => (
                <Tooltip content={`Share with ${link.provider}`} key={index}>
                    <Button
                        isIconOnly
                        variant='faded'
                    >
                        <link.shareButton
                            url={url}
                            title={title}
                        >
                            <Icon icon={link.icon} fontSize={28} />
                        </link.shareButton>
                    </Button>
                </Tooltip>
            ))}
        </div>
    );*/
}