import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { lusitana } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { clsx } from "clsx";
import { DevIcon, GithubIcon, LinkedInIcon } from "@/components/icons";
import { SpeedInsights } from '@vercel/speed-insights/next';

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning className="scroll-smooth">
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					lusitana.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />

						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}
							<SpeedInsights />
						</main>
						
						<footer className="w-full flex flex-col items-center justify-center py-3 gap-4">
							<p>© 2023 Holyshevskyi</p>
							<div className="flex gap-4">
								<Link isExternal href={siteConfig.links.linkedIn} aria-label="LinkedIn">
									<LinkedInIcon size={50} className="text-default-500" />
								</Link>
								<Link isExternal href={siteConfig.links.github} aria-label="Github">
									<GithubIcon size={50} className="text-default-500" />
								</Link>
								<Link isExternal href={siteConfig.links.dev} aria-label="Dev">
									<DevIcon size={50} className="text-default-500" />
								</Link>
							</div>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
