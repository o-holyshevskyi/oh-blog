import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import withNextIntl from 'next-intl/plugin';

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
    }
});

const withIntl = withNextIntl('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: true,
    },
}

export default withIntl(withMDX(nextConfig));
