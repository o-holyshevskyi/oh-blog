import { getAllPostsMetaWithLang } from "@/app/lib/posts";
import BlogTags from "./blog-tags";
import generateRssFeed from "@/app/lib/generateRSSFeed";
import { useLocale, useTranslations } from "next-intl";

export default async function BlogItems({
    query,
    page
} : {
    query: string;
    page: number;
}) {
    const t = useTranslations("blogPage");
    const locale = useLocale();
    const allPosts = await getAllPostsMetaWithLang(locale);
    //await generateRssFeed(locale);

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
    uniqueTags.push(t("all"));
    
    return (
        <div>
            <BlogTags allPosts={filteredPosts} page={page} />
        </div>
    )
}