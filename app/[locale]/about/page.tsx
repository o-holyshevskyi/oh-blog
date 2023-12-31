import AboutAccordion from "@/components/about/about-accordion";
import DownloadCv from "@/components/about/download-cv/download-cv";
import AnnualStatistic from "@/components/annual-statistic/annual-statistic";
import { title } from "@/components/primitives";
import Recommendations from "@/components/recommendations/recommendations";
import { useTranslations } from "next-intl";
import { getTranslator, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } } : { params: { locale: string; } }) {
	const t = await getTranslator(locale, "metadata");
	
	return { title: t("aboutPage") };
}

export default function AboutPage({ params: { locale } } : { params: { locale: string; } }) {
	unstable_setRequestLocale(locale);

	const t = useTranslations("about");

	return (
		<div>
			<section className="flex justify-center">
				<p className={title({ color: "blue", size: 'md' })}>{t("later_1")}</p>
				<p className={title({ size: 'md' })}>{t("title")}</p>
			</section>
			<section className="mt-5 mb-5 text-center">
				<p>
					{t("aboutMe")}
				</p>
			</section>
			<AboutAccordion locale={locale}/>
			<DownloadCv />
			<Recommendations locale={locale}/>
			<AnnualStatistic />
		</div>
	);
}
