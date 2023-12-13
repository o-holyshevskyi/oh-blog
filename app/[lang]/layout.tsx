import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { lusitana } from "@/config/fonts";
import { Providers } from "./providers";
import Navbar from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { clsx } from "clsx";
import { RssIcon } from "@/components/icons";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import FooterStack from "@/components/footer-stack";
import {notFound} from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

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
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export async function generateStaticParams() {
	return [{ lang: 'en-US' }, { lang: 'uk' }]
}

const domain = process.env.DOMAIN;

export  default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode;
	params: any;
}) {
	let messages;
	try {
		messages = (await import(`../_translations/${params.locale}.json`)).default;
	} catch (error) {
		console.error(error);
	}

	return (
		<html lang={params.locale} suppressHydrationWarning className="scroll-smooth">
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					lusitana.variable
				)}
			>
				<NextIntlClientProvider messages={messages}>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						<div className="relative flex flex-col h-screen">
							{/* @ts-expect-error Async Server Component */}
							<Navbar />

							<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
								{children}
								<SpeedInsights />
							</main>
							
							<footer className="w-full flex flex-col items-center justify-center py-3 gap-4">
								<FooterStack />
								<div className="flex gap-4 items-center">
									<p>© 2023 Holyshevskyi</p>
									<Link
										isExternal
										href={`${domain}/rss.xml`}
										className="absolute right-0 m-4 items-center text-center cursor-pointer "
									>
										<RssIcon size={50}/>
									</Link>
								</div>
							</footer>
						</div>
					</Providers>
					<Analytics />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
