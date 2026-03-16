import { getAllPostsMetaWithLang } from '@/app/lib/posts';
import { getTranslator } from 'next-intl/server';
import BlogPreviewClient from './blog-preview-client';

interface BlogPreviewSectionProps {
  locale: string;
}

export default async function BlogPreviewSection({ locale }: BlogPreviewSectionProps) {
  const posts = await getAllPostsMetaWithLang(locale);
  const latestPosts = posts.slice(0, 3);
  const t = await getTranslator(locale, 'blogPreview');

  const postsData = latestPosts.map((post) => ({
    slug: post.meta.slug,
    title: post.meta.title,
    description: post.meta.description,
    date: post.meta.date,
    tags: post.meta.tags,
    timeToRead: post.meta.timeToRead,
  }));

  return (
    <BlogPreviewClient
      posts={postsData}
      heading={t('heading')}
      viewAll={t('viewAll')}
      minRead={t('minRead')}
      locale={locale}
    />
  );
}
