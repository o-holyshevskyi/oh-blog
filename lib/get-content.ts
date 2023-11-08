import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
import { postProcess, preProcess } from './rehype-pre-raw';

export async function getContent(
    postData: {
        date: string;
        title: string;
        tags: string[];
        img: string;
        id: string;
        contentHtml: string;
    }
) {
    return serialize(postData.contentHtml, { mdxOptions: {
        rehypePlugins: [
          preProcess,
          rehypeCodeTitles,
          rehypePrism as any,
          postProcess,
        ]
    }});
}