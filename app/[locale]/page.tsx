import { getTranslator, unstable_setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ExperienceTimeline from '@/components/sections/experience-timeline';
import SkillsSection from '@/components/sections/skills-section';
import ContactSection from '@/components/sections/contact-section';
import { locales } from '@/i18nconfig';
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
	const t = await getTranslator(locale, 'metadata');

	return {
		title: t('homePage'),
		description: 'Senior QA Engineer with 7+ years of experience in test automation. Specializing in Playwright, Selenium, C#, and TypeScript. Based in Prague, Czech Republic.',
		openGraph: {
			title: 'Oleksandr Holyshevskyi | Senior QA Engineer',
			description: 'Senior QA Engineer with 7+ years of experience in test automation.',
			type: 'website',
			locale: locale,
		},
		alternates: {
			languages: Object.fromEntries(
				locales.map((l) => [l, `/${l}`])
			),
		},
	};
}

export default function Home({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale);

	return (
		<>
			{/* @ts-ignore Async Server Component */}
			<Navbar locale={locale} />
			<main className="snap-scroll">
				<HeroSection />
				<AboutSection />
				<ExperienceTimeline locale={locale} />
				<SkillsSection />
				<ContactSection />
			</main>
			<Footer />
		</>
	);
}
