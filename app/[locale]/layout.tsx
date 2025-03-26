import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { lusitana,  } from "@/config/fonts";
import { Providers } from "./providers";
import { clsx } from "clsx";
import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from "@/i18nconfig";
import { notFound } from "next/navigation";
import {unstable_setRequestLocale} from 'next-intl/server';
import { Roboto_Mono } from "next/font/google";

export const robotoMono = Roboto_Mono({
	subsets: ["latin", "cyrillic"],
	variable: "--font-roboto-mono",
	weight: ['400', '700'],
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
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
					"min-h-screen bg-background font-mono antialiased",
					robotoMono.variable
				)}
			>
				<NextIntlClientProvider messages={messages} locale={locale}>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						<main className="">
							{children}
						</main>
					</Providers>
					<Analytics />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
