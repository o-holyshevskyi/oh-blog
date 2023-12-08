import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { DevIcon, GithubIcon, LinkedInIcon } from "@/components/icons";
import RecentPosts from "@/components/recent-posts/recent-posts";
import { Suspense } from "react";
import RecentPostSkeleton from "@/components/skeleton/recent-posts-skeleton/recent-posts-skeleton";

export async function generateMetadata() {
	return { title: 'Oleksandr Holyshevskyi' };
}

export default function Home() {
	return (
		<>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-2xl text-center justify-center">
					<h1 className={title({ size: "sm" })}>Hi, my name is Oleksandr Holyshevskyi.&nbsp;</h1>
					<br />
					<h2 className={subtitle({ class: "mt-4" })}>
						I&apos;m a certificated Test Automation Engineer based in Ukraine. I am dedicated to improving the experiences of both people and customers alike, using my skills to deliver top-notch results that drive success.
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
					<RecentPosts/>
				</Suspense>
			</section>
			<div className="items-center flex justify-center mb-5">
				<hr className="w-[50%]" />
			</div>
		</>
	);
}
