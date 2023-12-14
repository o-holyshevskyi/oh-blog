
import { Post, getAllPostsMetaWithLang } from "@/app/lib/posts";
import RecentPostsWrapper from "./recent-posts-wrapper";
import { useLocale } from "next-intl";

export default async function RecentPosts() {
    const locale = useLocale();
    const posts: Post[] = await getAllPostsMetaWithLang(locale);

    return (
        <RecentPostsWrapper posts={posts}/>
    )
}
