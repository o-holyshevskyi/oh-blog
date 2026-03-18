'use client';

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import {
	DevIcon,
	GithubIcon,
	LinkedInIcon,
	Logo,
} from "@/components/icons";
import React, { useCallback, useEffect, useState } from "react";
import Bell from "./bell";
import { Post } from "@/app/lib/posts";
import LanguageSwitch from "./language-switch";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next-intl/client";
import { motion, useScroll, useSpring } from "framer-motion";

interface NavbarWrapperProps {
	daysDifference: number;
	posts: Post[];
	locale: string;
}

export default function NavbarWrapper({ daysDifference, posts, locale }: NavbarWrapperProps) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [activeSection, setActiveSection] = useState<string>("");
	const t = useTranslations("header");
	const router = useRouter();
	const pathname = usePathname();
	const isHomePage = pathname === '/' || pathname === '';

	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

	const handleNavClick = useCallback((item: { label: string; href: string }) => {
		if (isHomePage) {
			const el = document.querySelector(item.href);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			router.push('/' + item.href);
		}
		setIsMenuOpen(false);
	}, [isHomePage, router]);

	useEffect(() => {
		if (!isHomePage) return;

		const sectionIds = siteConfig.navItems
			.map(item => item.href.replace('#', ''));

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ rootMargin: '-20% 0px -70% 0px' }
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [isHomePage]);

	const isActive = (item: { label: string; href: string }) => {
		return activeSection === item.href.replace('#', '');
	};

	return (
		<>
			<motion.div
				className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
				style={{ scaleX }}
			/>
			<NextUINavbar
				maxWidth="xl"
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				position="sticky"
				classNames={{
					wrapper: "backdrop-blur-lg bg-background/70",
					item: [
						"flex",
						"relative",
						"h-full",
						"items-center",
						"data-[active=true]:after:content-['']",
						"data-[active=true]:after:absolute",
						"data-[active=true]:after:left-0",
						"data-[active=true]:after:right-0",
						"data-[active=true]:after:h-[2px]",
						"data-[active=true]:after:rounded-[2px]",
						"data-[active=true]:after:bg-primary",
						"data-[active=true]:after:mt-[50px]",
						"data-[active=true]:opacity-70",
					],
				}}
			>
				<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
					<NavbarBrand as="li" className="gap-3 max-w-fit">
						<Link
							className={clsx(
								linkStyles({ color: "foreground" }),
								"data-[active=true]:text-primary data-[active=true]:font-medium cursor-pointer"
							)}
							onClick={() => {
								if (isHomePage) {
									window.scrollTo({ top: 0, behavior: 'smooth' });
								} else {
									router.push('/');
								}
							}}
						>
							<Logo size={42} />
						</Link>
					</NavbarBrand>
					<ul className="hidden lg:flex gap-4 justify-start ml-2">
						{siteConfig.navItems.map((item) => (
							<NavbarItem key={item.href} isActive={isActive(item)}>
								<Link
									className={clsx(
										linkStyles({ color: "foreground" }),
										"data-[active=true]:text-primary data-[active=true]:font-medium cursor-pointer text-sm"
									)}
									color="foreground"
									onClick={() => handleNavClick(item)}
								>
									{t(`navItems.${item.label}`)}
								</Link>
							</NavbarItem>
						))}
					</ul>
				</NavbarContent>

				<NavbarContent
					className="hidden sm:flex basis-1/5 sm:basis-full"
					justify="end"
				>
					<NavbarItem className="hidden sm:flex gap-2">
						<Link isExternal href={siteConfig.links.linkedIn} aria-label="LinkedIn">
							<LinkedInIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.github} aria-label="Github">
							<GithubIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.dev} aria-label="Dev">
							<DevIcon className="text-default-500" />
						</Link>
						<ThemeSwitch />
						<LanguageSwitch locale={locale} />
						{daysDifference < 7 && posts.length > 0 && (
							<Bell latestPostId={posts[0].meta.slug} />
						)}
					</NavbarItem>
				</NavbarContent>

				<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
					<ThemeSwitch />
					<LanguageSwitch locale={locale} />
					<NavbarMenuToggle />
				</NavbarContent>

				<NavbarMenu className="pt-6">
					<div className="mx-4 mt-2 flex flex-col gap-4">
						{siteConfig.navMenuItems.map((item, index) => (
							<NavbarMenuItem key={`${item.label}-${index}`}>
								<Link
									className="w-full text-lg cursor-pointer"
									color={isActive(item) ? "primary" : "foreground"}
									size="lg"
									onClick={() => handleNavClick(item)}
								>
									{t(`navItems.${item.label}`)}
								</Link>
							</NavbarMenuItem>
						))}
					</div>
					<div className="mx-4 mt-8 flex gap-4">
						<Link isExternal href={siteConfig.links.linkedIn} aria-label="LinkedIn">
							<LinkedInIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.github} aria-label="Github">
							<GithubIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.dev} aria-label="Dev">
							<DevIcon className="text-default-500" />
						</Link>
					</div>
				</NavbarMenu>
			</NextUINavbar>
		</>
	);
}
