'use client';

import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
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
import { motion, AnimatePresence } from "framer-motion";

interface NavbarWrapperProps {
	daysDifference: number;
	posts: Post[];
	locale: string;
}

export default function NavbarWrapper({ daysDifference, posts, locale }: NavbarWrapperProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string>("");
	const [scrolled, setScrolled] = useState(false);
	const t = useTranslations("header");
	const router = useRouter();
	const pathname = usePathname();
	const isHomePage = pathname === '/' || pathname === '';

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 80);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleNavClick = useCallback((item: { label: string; href: string }) => {
		if (isHomePage) {
			const el = document.querySelector(item.href);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			router.push('/' + item.href);
		}
		setMobileOpen(false);
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

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	}, [mobileOpen]);

	const isActive = (item: { label: string; href: string }) => {
		return activeSection === item.href.replace('#', '');
	};

	const handleLogoClick = () => {
		if (isHomePage) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			router.push('/');
		}
	};

	return (
		<header
			className={`sticky top-0 z-50 transition-colors duration-300 ${
				scrolled
					? 'bg-cream/90 dark:bg-[#1a1918]/90 backdrop-blur-md border-b border-warmgray/40 dark:border-warmgray/10'
					: 'bg-cream dark:bg-[#1a1918] border-b border-transparent'
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				{/* Left: Logo / Name */}
				<button
					onClick={handleLogoClick}
					className="relative h-10 flex items-center focus:outline-none cursor-pointer"
				>
					<AnimatePresence mode="wait" initial={false}>
						{!scrolled ? (
							<motion.div
								key="logo"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
							>
								<Logo size={36} />
							</motion.div>
						) : (
							<motion.span
								key="name"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
								className="font-serif text-[15px] font-semibold tracking-tight whitespace-nowrap text-ink dark:text-cream"
							>
								{t('name')}
							</motion.span>
						)}
					</AnimatePresence>
				</button>

				{/* Center: Desktop nav */}
				<nav className="hidden lg:flex items-center gap-8">
					{siteConfig.navItems.map((item) => (
						<button
							key={item.href}
							onClick={() => handleNavClick(item)}
							className={`relative text-[13px] font-sans tracking-wide uppercase transition-colors duration-200 cursor-pointer focus:outline-none ${
								isActive(item)
									? 'text-terracotta'
									: 'text-midgray hover:text-ink dark:hover:text-cream'
							}`}
						>
							{t(`navItems.${item.label}`)}
							{isActive(item) && (
								<motion.div
									layoutId="nav-underline"
									className="absolute -bottom-1 left-0 right-0 h-px bg-terracotta"
									transition={{ type: 'spring', stiffness: 380, damping: 30 }}
								/>
							)}
						</button>
					))}
				</nav>

				{/* Right: Icons & controls */}
				<div className="flex items-center gap-3">
					<div className="hidden sm:flex items-center gap-2">
						<Link isExternal href={siteConfig.links.linkedIn} aria-label="LinkedIn">
							<LinkedInIcon className="text-midgray hover:text-ink dark:hover:text-cream transition-colors" />
						</Link>
						<Link isExternal href={siteConfig.links.github} aria-label="Github">
							<GithubIcon className="text-midgray hover:text-ink dark:hover:text-cream transition-colors" />
						</Link>
						<Link isExternal href={siteConfig.links.dev} aria-label="Dev">
							<DevIcon className="text-midgray hover:text-ink dark:hover:text-cream transition-colors" />
						</Link>
					</div>
					<div className="hidden sm:block w-px h-4 bg-warmgray/40 dark:bg-warmgray/15 mx-1" />
					<ThemeSwitch />
					<LanguageSwitch locale={locale} />
					{daysDifference < 7 && posts.length > 0 && (
						<Bell latestPostId={posts[0].meta.slug} />
					)}

					{/* Mobile hamburger */}
					<button
						onClick={() => setMobileOpen(!mobileOpen)}
						className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none cursor-pointer"
						aria-label="Toggle menu"
					>
						<motion.span
							animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.2 }}
							className="block w-5 h-px bg-ink dark:bg-cream origin-center"
						/>
						<motion.span
							animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
							transition={{ duration: 0.15 }}
							className="block w-5 h-px bg-ink dark:bg-cream"
						/>
						<motion.span
							animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.2 }}
							className="block w-5 h-px bg-ink dark:bg-cream origin-center"
						/>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
						className="lg:hidden overflow-hidden bg-cream dark:bg-[#1a1918] border-t border-warmgray/30 dark:border-warmgray/10"
					>
						<nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
							{siteConfig.navMenuItems.map((item, index) => (
								<motion.button
									key={item.href}
									initial={{ opacity: 0, x: -12 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05, duration: 0.2 }}
									onClick={() => handleNavClick(item)}
									className={`text-left text-lg font-serif cursor-pointer focus:outline-none ${
										isActive(item)
											? 'text-terracotta'
											: 'text-ink dark:text-cream'
									}`}
								>
									{t(`navItems.${item.label}`)}
								</motion.button>
							))}
							<div className="flex gap-4 pt-4 border-t border-warmgray/30 dark:border-warmgray/10 mt-2">
								<Link isExternal href={siteConfig.links.linkedIn} aria-label="LinkedIn">
									<LinkedInIcon className="text-midgray" />
								</Link>
								<Link isExternal href={siteConfig.links.github} aria-label="Github">
									<GithubIcon className="text-midgray" />
								</Link>
								<Link isExternal href={siteConfig.links.dev} aria-label="Dev">
									<DevIcon className="text-midgray" />
								</Link>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
