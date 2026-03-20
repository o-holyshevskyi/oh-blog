import BlogItems from "@/components/blog-items/blog-items";
import Search from "@/components/blog-items/search";
import { Suspense } from "react";
import { sectionTitle } from "@/components/primitives";
import { useTranslations } from "next-intl";
import { getTranslator, unstable_setRequestLocale } from "next-intl/server";

interface BlogPageProps {
	searchParams: {
		query: string;
		page: number;
	},
	params: {
		locale: string;
	}
}

export async function generateMetadata({ params: { locale } } : { params: { locale: string; } }) {
	const t = await getTranslator(locale, "metadata");
	return { title: t("blogPage") };
}

export default function BlogPage(props: BlogPageProps) {
	const query = props.searchParams?.query || '';
	const page = props.searchParams.page || 1;

	unstable_setRequestLocale(props.params.locale);

	const t = useTranslations("blogPage");

	return (
		<div className="w-full">
			<section className="flex items-center gap-4">
				<h1 className={sectionTitle()}>{t("later_1")}{t("title")}</h1>
				<Search />
			</section>
			<Suspense key={query} fallback={
				<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
					{[1,2,3,4].map(i => (
						<div key={i} className="animate-pulse rounded-sm border border-warmgray/30 dark:border-warmgray/10 p-6 h-64" />
					))}
				</div>
			}>
				{/* @ts-ignore Async Server Component */}
				<BlogItems
					query={query}
					page={page}
					locale={props.params.locale}
				/>
			</Suspense>
		</div>
	);
}
