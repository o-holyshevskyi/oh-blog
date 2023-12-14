import AboutAccordion from "@/components/about/about-accordion";
import DownloadCv from "@/components/about/download-cv/download-cv";
import { title } from "@/components/primitives";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateMetadata() {
	return { title: 'About' };
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
			<AboutAccordion />
			<DownloadCv />
		</div>
	);
}
