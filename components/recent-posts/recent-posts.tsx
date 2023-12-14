
import { Post, getAllPostsMetaWithLang } from "@/app/lib/posts";
import RecentPostsWrapper from "./recent-posts-wrapper";

export default async function RecentPosts() {
    const posts: Post[] = await getAllPostsMetaWithLang();

    return (
        <RecentPostsWrapper posts={posts}/>
    )
}
