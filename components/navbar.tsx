import React from "react";
import { Post, getAllPostsMetaWithLang } from "@/app/lib/posts";
import NavbarWrapper from "./navbar-wrapper";
import { useLocale } from "next-intl";

const getDaysDifference = (posts: Post[]): number => {
    const latestPost = posts.reduce((prev, current) =>
        new Date(current.meta.date) > new Date(prev.meta.date) ? current : prev
    );
    const currentDate = new Date();
    const latestPostDate = new Date(latestPost.meta.date);
    const daysDifference = Math.floor(
        (currentDate.getTime() - latestPostDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return daysDifference;
}

export default async function Navbar() {	
    const locale = useLocale();
	const posts = await getAllPostsMetaWithLang(locale);
	const daysDifference = getDaysDifference(posts);
	
	return (
		<NavbarWrapper 
			daysDifference={daysDifference}
			posts={posts}
		/>
	)
};
