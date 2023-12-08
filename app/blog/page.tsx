import { title } from "@/components/primitives";
import BlogItems from "@/components/blog-items/blog-items";
import Search from "@/components/blog-items/search";
import { Suspense } from "react";
import RecentPostSkeleton from "@/components/skeleton/recent-posts-skeleton/recent-posts-skeleton";

export function generateMetadata() {
	return { title: 'Blog' };
}

export default function BlogPage({
	searchParams
} : {
	searchParams: {
		query: string;
		page: number;
	}
}) {
	const query = searchParams?.query || '';
	const page = searchParams.page || 1;

	return (
		<div className="lg:w-full">
			<section className="flex justify-center">
				<p className={title({ color: "blue", size: 'md' })}>B</p>
				<p className={title({ size: 'md' })}>log</p>
				<Search />
			</section>
			<Suspense key={query} fallback={<RecentPostSkeleton />}>
				<BlogItems
					query={query}
					page={page}
				/>
        	</Suspense>
		</div>
	);
}
