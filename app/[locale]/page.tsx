import { useTranslations } from "next-intl";
import { getTranslator, unstable_setRequestLocale} from 'next-intl/server';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/react";
import DownloadCv from "@/components/about/download-cv/download-cv";
import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import LanguageSwitch from "@/components/language-switch";
import Typeriter from "./typewriter";
import Motion, { MotionWhileHover } from "./motion";
import CollapsibleFooter from "./collapsibale-footer";

export async function generateMetadata({ params: { locale } } : { params: { locale: string; } }) {
	const t = await getTranslator(locale, "metadata");
	return { title: t("homePage") };
}

const socialLinks = () => {
	return (
		<div className="flex">
			<MotionWhileHover>
				<Link
					className="gap-1"
					size="sm"
					isBlock 
					isExternal
					color="foreground"
					href={siteConfig.links.linkedIn}
				>
					<LinkedInIcon size={20} /> LinkedIn
				</Link>
			</MotionWhileHover>
			<MotionWhileHover>
				<Link
					className="gap-1"
					size="sm"
					isBlock
					isExternal
					color="foreground"
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />GitHub
				</Link>
			</MotionWhileHover>
		</div>
	)
}

export default function Home({
	params: { locale }
  } : {
	params: { locale: string; }
  }) {
    const t = useTranslations("hero");
	unstable_setRequestLocale(locale);

	return (
		<section className="flex justify-center items-center h-screen px-4 md:px-0">
			<div className="relative w-full max-w-[800px] h-auto md:h-[500px]">
				<Motion>
					<Card className="w-full md:w-[790px] h-auto md:h-[500px] absolute top-3 left-1 opacity-90 z-10" />
				</Motion>
				<Motion>
					<Card className="w-full md:w-[780px] h-auto md:h-[500px] absolute top-4 left-2 opacity-80 rotate-[2deg] z-0" />
				</Motion>
				<Motion>
					<Card
						isFooterBlurred
						isPressable
						className="w-full max-w-[800px] h-auto md:h-[500px] z-10 p-4 mx-auto"
						id="hero"
					>
						<CardHeader className="text-lg md:text-xl text-center" id="hero-card-header">
							{t("name")}&nbsp;|&nbsp;{t("position")}
						</CardHeader>
						<CardBody className="px-2 py-0 h-[600px] text-default-500 mb-6 text-sm md:text-base" id="hero-card-body">
							<div className="flex flex-col md:flex-row text-sm md:text-large mb-5 items-center md:items-start text-center md:text-left">
								<p id="location">{t("personalInfo.location")}&nbsp;|&nbsp;</p>
								<p id="phoneNumber">{t("personalInfo.phoneNumber")}&nbsp;|&nbsp;</p>
								<a href={`mailto:${t("personalInfo.email")}`} className="hover:underline" id="email">
									{t("personalInfo.email")}
								</a>
							</div>
							<Typeriter text={t("description")} />
						</CardBody>
						<CollapsibleFooter>
							<DownloadCv />
							<div>{socialLinks()}</div>
							<div className="flex gap-2">
								<ThemeSwitch />
								<LanguageSwitch locale={locale}/>
							</div>
						</CollapsibleFooter>
					</Card>
				</Motion>
			</div>
		</section>
	);
}
