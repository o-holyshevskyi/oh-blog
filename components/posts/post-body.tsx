'use client';

import { timeToRead } from '@/app/lib/time-to-read';
import Date from '../date/date';
import { ReactElement, JSXElementConstructor } from 'react';
import { PostMeta } from '@/app/lib/posts';
import TOCComponent from './table-of-contents';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';

export default function PostBody({
    content,
    meta,
    fileContent,
    nodes,
    locale,
    views
} : {
    content: ReactElement<any, string | JSXElementConstructor<any>>;
    meta: PostMeta;
    fileContent: string;
    nodes: any;
    locale: string;
    views: number;
}) {
    const t = useTranslations("postCards");

    const timeToReadValue = timeToRead(fileContent);

    return (
        <div className='w-full'>
            {/* Post header */}
            <header className="mb-10">
                <h1 className="text-3xl md:text-4xl font-serif font-semibold text-ink dark:text-cream tracking-tight leading-tight">
                    {meta.title}
                </h1>
                <div className='flex flex-wrap items-center gap-4 mt-4 text-xs font-sans tracking-wide uppercase text-midgray'>
                    <span className="flex items-center gap-1.5">
                        <Icon icon="material-symbols:date-range-outline" width={14} />
                        <Date
                            dateString={meta.date}
                            formatDate='LLLL d, yyyy'
                            locale={locale}
                        />
                    </span>
                    <span className="w-1 h-1 rounded-full bg-warmgray" />
                    <span className="flex items-center gap-1.5">
                        <Icon icon="mdi:book-open-outline" width={14} />
                        {timeToReadValue} {t("minRead")}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-warmgray" />
                    <span className="flex items-center gap-1.5">
                        <Icon icon="carbon:view" width={14} />
                        {views} {views === 1 ? t("views.single") : t("views.plural")}
                    </span>
                </div>
            </header>

            {/* Post image */}
            {meta.img && (
                <div className='w-full mb-10 rounded-sm overflow-hidden'>
                    <img
                        src={meta.img}
                        alt={meta.title}
                        className="w-full object-cover"
                    />
                </div>
            )}

            {/* Content + sticky TOC */}
            <div className='flex justify-start w-full gap-10'>
                <div className='prose dark:prose-invert prose-lg max-w-none flex-1 min-w-0
                    prose-headings:font-serif prose-headings:text-ink dark:prose-headings:text-cream
                    prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline
                    prose-code:text-sm prose-code:bg-warmgray/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-blockquote:border-terracotta prose-blockquote:text-midgray
                    prose-img:rounded-sm'>
                    {content}
                </div>
                {nodes.length > 0 && (
                    <aside className='hidden lg:block w-64 shrink-0'>
                        <div className="sticky top-20">
                            <TOCComponent headings={nodes} />
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
}
