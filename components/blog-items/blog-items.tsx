import { getAllPostsMeta } from "@/app/lib/posts";
import BlogTags from "./blog-tags";

export default async function BlogItems({
    query,
    page
} : {
    query: string;
    page: number;
}) {
    const allPosts = await getAllPostsMeta();

    const filterPostsByTitle = (posts: any, title: string) => {
        if (!title) {
            return posts;
        } else if (title.length < 4) {
            return posts;
        }

        const lowerCaseTitle = title.toLowerCase();
        return posts.filter((post: any) => post.meta.title.toLowerCase().includes(lowerCaseTitle));
    };

    const filteredPosts = filterPostsByTitle(allPosts, query);

    let allTags = new Set();
	filteredPosts.forEach((postsData: any) => {
        postsData.meta.tags.forEach((tag: any) => {
            allTags.add(tag);
        })
    });

    const uniqueTags = [...allTags] as string[];
    uniqueTags.push('All');
    
    return (
        <div>
            <BlogTags allPosts={filteredPosts} page={page} />
        </div>
    )
}