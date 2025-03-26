import { useTranslations } from "next-intl";
import { getTranslator, unstable_setRequestLocale} from 'next-intl/server';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Date from "@/components/date/date";
import getCurrentDate from "../lib/date";
import { Divider, Link } from "@nextui-org/react";
import DownloadCv from "@/components/about/download-cv/download-cv";
import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import LanguageSwitch from "@/components/language-switch";

export async function generateMetadata({ params: { locale } } : { params: { locale: string; } }) {
	const t = await getTranslator(locale, "metadata");
	return { title: t("homePage") };
}

const socialLinks = () => {
	return (
		<div className="flex">
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
		<section className="flex justify-center items-center h-screen">
			<div className="relative w-[800px] h-[500px] ">
				<Card
					className="w-[790px] h-[500px] absolute top-3 left-1 opacity-90 z-10"
				/>
				<Card
					className="w-[780px] h-[500px] absolute top-4 left-2 opacity-80 rotate-[2deg] z-00"
				/>
				<Card
					isFooterBlurred 
					isPressable
					className="w-[800px] h-[500px] z-10"
					id="hero"
				>
					<CardHeader
						className="text-xl relative w-[max-content]
							before:absolute before:inset-0 before:animate-typewriter before:bg-content1
							after:absolute after:inset-0 after:w-[0.225em] after:m-3 after:h-[1.5em] after:animate-caret after:bg-default"
						id="hero-card-header"
					>
						{t('name')}&nbsp;|&nbsp;{t('position')}
					</CardHeader>
					<CardBody 
						className="px-3 py-0 text-default-500 mb-6 " 
						id="hero-card-body"
					>
						<div 
							className="flex flex-row text-large mb-5"
							id="hero-personal-info"
						>
							<p id="location">{t("personalInfo.location")}&nbsp;|&nbsp;</p>
							<p id="phoneNumber">{t("personalInfo.phoneNumber")}&nbsp;|&nbsp;</p>
							<a 
								href={`mailto:${t("personalInfo.email")}`}
								className="hover:underline"
								id="email"
							>
									{t("personalInfo.email")}
							</a>
						</div>
						<div
							className="py-2 px-3 mb-5"
							id="hero-education-info"
						>
							<p
								className="font-bold mb-2"
								id="title"
							>
								{t('educationInfo.title')}
							</p>
							<div className="flex flex-row justify-between">
								<p>{t('educationInfo.university')}</p>
								<p>{t('educationInfo.universityLocation')}</p>
							</div>
							<div className="flex flex-row justify-between">
								<p>{t('educationInfo.degree')}</p>
								<p>
									{t('educationInfo.graduatedYear')}&nbsp;
										<Date 
											dateString='2018-02-01' 
											locale={locale}
										/>
								</p>
							</div>
							
						</div>
						<div
							className="py-2 px-3 mb-5"
							id="hero-excperience-info"
						>
							<p
								className="font-bold mb-2"
								id="title"
							>
								{t('experienceInfo.title')}
							</p>
							<div id="experience-list">
								<div id="SII">
									<div className="flex flex-row justify-between">
										<p>{t('experienceInfo.SII.company')}</p>
										<p>{t('experienceInfo.SII.companyLocation')}</p>
									</div>
									<p className="text-tiny">{t('experienceInfo.SII.type')}</p>
									<div className="flex flex-row justify-between mb-1">
										<p>{t('experienceInfo.SII.position')}</p>
										<p>
											&nbsp;
												<Date 
													dateString='2024-07-01' 
													locale={locale}
												/>&nbsp;-&nbsp;
												<Date 
													dateString={getCurrentDate()}
													locale={locale}
												/>
										</p>
									</div>
									<p className="px-3">{t("experienceInfo.SII.description")}</p>
									<Divider className="my-4"/>
								</div>
								<div id="AddvantISS">
									<div className="flex flex-row justify-between">
										<p>{t('experienceInfo.AddvantISS.company')}</p>
										<p>{t('experienceInfo.AddvantISS.companyLocation')}</p>
									</div>
									<p className="text-tiny">{t('experienceInfo.AddvantISS.type')}</p>
									<div className="flex flex-row justify-between mb-1">
										<p>{t('experienceInfo.AddvantISS.position')}</p>
										<p>
											&nbsp;
												<Date 
													dateString='2022-08-01' 
													locale={locale}
												/>&nbsp;-&nbsp;
												<Date 
													dateString={'2024-07-01'}
													locale={locale}
												/>
										</p>
									</div>
									<p className="px-3">{t("experienceInfo.AddvantISS.description")}</p>
									<Divider className="my-4"/>
								</div>
								<div id="PasynSoft">
									<div className="flex flex-row justify-between">
										<p>{t('experienceInfo.PasynSoft.company')}</p>
										<p>{t('experienceInfo.PasynSoft.companyLocation')}</p>
									</div>
									<p className="text-tiny">{t('experienceInfo.PasynSoft.type')}</p>
									<div className="flex flex-row justify-between">
										<p>{t('experienceInfo.PasynSoft.position')}</p>
										<p>
											&nbsp;
												<Date 
													dateString='2020-02-01' 
													locale={locale}
												/>&nbsp;-&nbsp;
												<Date 
													dateString='2022-08-01' 
													locale={locale}
												/>
										</p>
									</div>
									<p className="px-3">{t("experienceInfo.PasynSoft.description")}</p>
									<Divider className="my-4"/>
								</div>
								<div id="TechStudio">
									<div className="flex flex-row justify-between">
										<p>{t('experienceInfo.TechStudio.company')}</p>
										<p>{t('experienceInfo.TechStudio.companyLocation')}</p>
									</div>
									<p className="text-tiny">{t('experienceInfo.TechStudio.type')}</p>
									<div className="flex flex-row justify-between">
										<p>{t('experienceInfo.TechStudio.position')}</p>
										<p>
											&nbsp;
												<Date 
													dateString='2019-06-01' 
													locale={locale}
												/>&nbsp;-&nbsp;
												<Date 
													dateString='2021-08-01' 
													locale={locale}
												/>
										</p>
									</div>
									<p className="px-3">{t("experienceInfo.TechStudio.description")}</p>
								</div>
							</div>
						</div>
					</CardBody>
					<CardFooter 
						className="flex flex-row justify-between border-white/20 border-1 py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1"
						id="hero-card-footer"
					>
						<div>
							<DownloadCv />
						</div>
						<div>
							{socialLinks()}
						</div>
						<div className="flex gap-2">
							<ThemeSwitch />
							<LanguageSwitch locale={locale}/>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
