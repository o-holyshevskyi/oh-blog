import fs from 'fs';
import { Feed } from 'feed';
import { getAllPostsMeta } from './posts';

export default async function generateRssFeed() {
    const allPosts = await getAllPostsMeta();
    const site_url = process.env.DOMAIN as string;

    const feedOptions = {
        title: 'Blog posts | RSS Feed',
        description: 'Welcome to this blog posts!',
        id: site_url,
        link: site_url,
        image: `${site_url}/logo.png`,
        favicon: `${site_url}/favicon.png`,
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
            description,
            date: new Date(post.meta.date),
        })
    });

    fs.writeFileSync('./public/rss.xml', feed.rss2());
}
