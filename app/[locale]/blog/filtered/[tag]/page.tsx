import { getPostsByTag } from "@/app/lib/posts";
import FilteredPostsWrapper from "@/components/filtered-posts-wrapper";
import { getTranslator, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params } : { params: { tag: string; locale: string; } }) {
	const t = await getTranslator(params.locale, "metadata");
    return { title: t("filteredPage", { tag: params.tag }) };
}

export default async function FilteredPostsByTag({ params } : { params: { tag: string; locale: string } }) {
    unstable_setRequestLocale(params.locale);
    const filteredPosts = await getPostsByTag(params.tag, params.locale);

    return (
        <FilteredPostsWrapper 
            filteredPosts={filteredPosts}
            tag={params.tag}
            locale={params.locale}
        />
    );
}