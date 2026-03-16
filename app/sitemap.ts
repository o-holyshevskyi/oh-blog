import { MetadataRoute } from 'next';
import { locales } from '@/i18nconfig';
import { getAllPostsMetaWithLang } from './lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://oholyshevskyi.com';

  const staticPages = ['', '/blog'];
  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'monthly' as const : 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    try {
      const posts = await getAllPostsMetaWithLang(locale);
      for (const post of posts) {
        blogEntries.push({
          url: `${baseUrl}/${locale}/blog/${post.meta.slug}`,
          lastModified: new Date(post.meta.date),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    } catch {
      // Skip if posts can't be loaded for a locale
    }
  }

  return [...staticEntries, ...blogEntries];
}
