import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { DevIcon, GithubIcon, LinkedInIcon } from "@/components/icons";
import RecentPosts from "@/components/recent-posts/recent-posts";
import { Suspense } from "react";
import RecentPostSkeleton from "@/components/skeleton/recent-posts-skeleton/recent-posts-skeleton";
import { useTranslations } from "next-intl";
import { getTranslator, unstable_setRequestLocale} from 'next-intl/server';

export async function generateMetadata({ params: { locale } } : { params: { locale: string; } }) {
	const t = await getTranslator(locale, "metadata");
	
	return { title: t("homePage") };
}

export default function Home({
	params: { locale }
  } : {
	params: { locale: string; }
  }) {
    const t = useTranslations("homePage");
	unstable_setRequestLocale(locale);

	return (
		<>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-2xl text-center justify-center">
					<h1 className={title({ size: "sm" })}>{t("name")}.&nbsp;</h1>
					<br />
					<h2 className={subtitle({ class: "mt-4" })}>
                        {t("about")}
					</h2>
				</div>

				<div className="flex gap-3">
					<Link
						isExternal
						className={buttonStyles({ variant: "ghost", radius: "full" })}
						href={siteConfig.links.linkedIn}
					>
						<LinkedInIcon size={20} />
						LinkedIn
					</Link>
					<Link
						isExternal
						className={buttonStyles({ variant: "ghost", radius: "full" })}
						href={siteConfig.links.github}
					>
						<GithubIcon size={20} />
						GitHub
					</Link>
					<Link
						isExternal
						className={buttonStyles({ variant: "ghost", radius: "full" })}
						href={siteConfig.links.dev}
					>
						<DevIcon size={20} />
						DEV
					</Link>
				</div>
			</section>
			<div className="items-center flex justify-center">
				<hr className="w-[50%]" />
			</div>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<Suspense key="recent-posts" fallback={<RecentPostSkeleton />}>
					{/* @ts-ignore Async Server Component */}
					<RecentPosts locale={locale}/>
				</Suspense>
			</section>
			<div className="items-center flex justify-center mb-5">
				<hr className="w-[50%]" />
			</div>
		</>
	);
}
