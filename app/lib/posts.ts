import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export interface Post {
  meta: PostMeta;
  fileContent: string;
  description: string;
}

export interface PostMeta {
  slug: string;
  date: string;
  title: string;
  tags: string[];
  img: string;
}

const postsDirectory = path.join(process.cwd(), 'app', 'posts');

export const getPostBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(postsDirectory, `${realSlug}.mdx`);

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true }
  });

  const description = getDescription(fileContent)

  return { meta: { ...frontmatter as { date: string; title: string; tags: string[]; img: string }, slug: realSlug }, content, fileContent, description };
}

export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(postsDirectory);

  let posts = [];

  for (const file of files) {
    const { meta, fileContent, description } = await getPostBySlug(file);
    const postsMeta = {
      meta,
      fileContent,
      description
    }
    posts.push(postsMeta);
  }

  return posts.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export const getPostsByTag = async (postTag: string) => {
  const allPostsMeta = await getAllPostsMeta();
  const postsByTag: {
    meta: PostMeta;
    fileContent: string;
    description: string;
  }[] = [];

  for (const postMeta of allPostsMeta) {
    postMeta.meta.tags.map((t) => {
      const tag = t.replace('#', '').toLowerCase();

      if (tag === postTag) {
        postsByTag.push(postMeta);
      }
    });
  }

  return postsByTag;
}

export const getRelatedPosts = async (slug: string, numberOfRelatedPosts: number = 3) => {
  const { meta: currentPostMeta } = await getPostBySlug(slug);

  const allPostsMeta = await getAllPostsMeta();

  const relatedPosts = allPostsMeta.filter((postMeta) => {
    if (postMeta.meta.slug === slug) {
      return false;
    }

    const commonTags = postMeta.meta.tags.filter((tag) =>
      currentPostMeta.tags.includes(tag)
    );

    return commonTags.length > 0;
  });

  relatedPosts.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    } else {
      return -1;
    }
  });
  
  const limitedRelatedPosts = relatedPosts.slice(0, numberOfRelatedPosts);

  return limitedRelatedPosts;
};

const getDescription = (fileContent: string) => {
  const startIndex = fileContent.indexOf('---', fileContent.indexOf('---') + 3);
  const descriptionWithHtml = fileContent
    .substring(startIndex)
    .split('\n')
    .filter(line => !line.trim().startsWith('#') && !line.trim().startsWith('---'))
    .join(' ')
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace('**', '')
    .replace('**', '')
    .substring(0, 300); 
  
  const descriptionWithoutHtml = descriptionWithHtml.replace(/<[^>]*>/g, '');

  return descriptionWithoutHtml + '...';
}