import fs from 'fs';
import { Feed } from 'feed';
import { getAllPostsMetaWithLang } from './posts';

export default async function generateRssFeed(locale: string) {
    const allPosts = await getAllPostsMetaWithLang(locale);
    const site_url = 'https://oholsyhevskyi.com';

    const feedOptions = {
        title: 'Blog posts | RSS Feed',
        description: 'Welcome to my blog posts',
        id: site_url,
        link: site_url,
        image: `https://o-holyshevskyi.github.io/blog-pic/images/posts/api-testing.png`,
        favicon: `/vercel.svg`,
        copyright: `All rights reserved ${new Date().getFullYear()}, Oleksandr Holyshevskyi`,
        generator: 'Feed for Node.js',
        feedLinks: {
            rss2: `${site_url}/rss.xml`,
        },
    };

    const feed = new Feed(feedOptions);

    allPosts.map((post) => {
        const startIndex = post.fileContent.indexOf('---', post.fileContent.indexOf('---') + 3);
        const description = post.fileContent.substring(startIndex)
            .split('\n')
            .filter(line => !line.trim().startsWith('#'))
            .join('\n')
            .replace(/---/g, '');

        feed.addItem({
            title: post.meta.title,
            id: `${site_url}/blog/${post.meta.slug}`,
            link: `${site_url}/blog/${post.meta.slug}`,
            description: description,
            date: new Date(post.meta.date),
        })
    });

    fs.writeFileSync('./public/rss.xml', feed.rss2());
}
