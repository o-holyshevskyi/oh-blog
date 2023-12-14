
import { Post, getAllPostsMetaWithLang } from "@/app/lib/posts";
import RecentPostsWrapper from "./recent-posts-wrapper";

export default async function RecentPosts({ locale } : { locale: string; }) {
    const posts: Post[] = await getAllPostsMetaWithLang(locale);

    return (
        <RecentPostsWrapper 
            posts={posts}
            locale={locale}
        />
    )
}
