
import { Post, getAllPostsMeta } from "@/app/lib/posts";
import RecentPostsWrapper from "./recent-posts-wrapper";

export default async function RecentPosts() {
    const posts: Post[] = await getAllPostsMeta();

    return (
        <RecentPostsWrapper posts={posts}/>
    )
}
