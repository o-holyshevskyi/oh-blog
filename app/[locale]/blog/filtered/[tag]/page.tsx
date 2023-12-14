import { getPostsByTag } from "@/app/lib/posts";
import FilteredPostsWrapper from "@/components/filtered-posts-wrapper";

export async function generateMetadata({ params } : { params: { tag: string } }) {
	return { title: `All by - '${params.tag}'` };
}

export default async function FilteredPostsByTag({ params } : { params: { tag: string } }) {
    const filteredPosts = await getPostsByTag(params.tag);

    return (
        <FilteredPostsWrapper 
            filteredPosts={filteredPosts}
            tag={params.tag}
        />
    );
}