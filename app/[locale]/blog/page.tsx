import { title } from "@/components/primitives";
import BlogItems from "@/components/blog-items/blog-items";
import Search from "@/components/blog-items/search";
import { Suspense } from "react";
import RecentPostSkeleton from "@/components/skeleton/recent-posts-skeleton/recent-posts-skeleton";
import { useTranslations } from "next-intl";

interface BlogPageProps {
	searchParams: {
		query: string;
		page: number;
	},
	params: {
		lang: string;
	}
}

export function generateMetadata() {
	return { title: 'Blog' };
}

export default function BlogPage(props: BlogPageProps) {
	const query = props.searchParams?.query || '';
	const page = props.searchParams.page || 1;

	const t = useTranslations("blogPage");

	return (
		<div className="lg:w-full">
			<section className="flex justify-center">
				<p className={title({ color: "blue", size: 'md' })}>{t("later_1")}</p>
				<p className={title({ size: 'md' })}>{t("title")}</p>
				<Search />
			</section>
			<Suspense key={query} fallback={<RecentPostSkeleton />}>
				{/* @ts-expect-error Async Server Component */}
				<BlogItems
					query={query}
					page={page}
				/>
        	</Suspense>
		</div>
	);
}
