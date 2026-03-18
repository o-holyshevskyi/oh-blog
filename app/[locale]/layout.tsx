import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { clsx } from "clsx";
import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from "@/i18nconfig";
import { notFound } from "next/navigation";
import {unstable_setRequestLocale} from 'next-intl/server';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export function generateStaticParams() {
	return locales.map((locale) => ({locale}));
}

export  default async function RootLayout({
	children,
	params: { locale }
}: {
	children: React.ReactNode;
	params: any;
}) {
	if (!locales.includes(locale as any)) notFound();

	unstable_setRequestLocale(locale);

	let messages;
	try {
		messages = (await import(`../_translations/${locale}.json`)).default;
	} catch (error) {
		console.error(error);
	}

	return (
		<html lang={locale} suppressHydrationWarning className="scroll-smooth">
			<head />
			<body
				className={clsx(
					"min-h-screen bg-cream dark:bg-[#1a1918] text-ink dark:text-cream antialiased",
				)}
				style={{ fontFamily: 'Georgia, ui-serif, Cambria, "Palatino Linotype", "Times New Roman", Times, serif' }}
			>
				<NextIntlClientProvider messages={messages} locale={locale}>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						{children}
					</Providers>
					<Analytics />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
