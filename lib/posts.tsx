import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const contentHtml = matterResult.content;

    return {
      id,
      contentHtml,
      ...(matterResult.data as { date: string; title: string; }),
    };
  });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export function getAllTags() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      ...(matterResult.data as { tags: string[]; }),
    };
  });

  let allTags = new Set();

  for (let i = 0; i < allPostsData.length; i++) {
    const postsData = allPostsData[i];
    for (let f = 0; f < postsData.tags.length; f++) {
      const tag = postsData.tags[f];
      allTags.add(tag);
    }
  }

  const uniqueTags = [...allTags] as string[];
  return uniqueTags.map((tag) => {
    return {
      params: {
        tag: tag.replace('#', '').toLowerCase()
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const contentHtml = matterResult.content;

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; tags: string[]; img: string; }),
  };
}

export async function getFilteredPosts(tag: string) {
  const fileNames = fs.readdirSync(postsDirectory);
  const filteredPosts = [];

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const id = fileName.replace(/\.mdx$/, '');

    const contentHtml = matterResult.content;

    matterResult.data.tags.map((t) => {
      const tt = t.replace('#', '').toLowerCase();
      if (tt === tag) {
        filteredPosts.push({
          id,
          tag,
          contentHtml,
          ...(matterResult.data as { date: string; title: string; tags: string[]; }),
        });
      }
    });
  }

  filteredPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return filteredPosts;
}