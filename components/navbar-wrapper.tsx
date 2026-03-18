'use client';

import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
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

	const fullName = t('name');

	useEffect(() => {
		const handleScroll = () => {
			const y = window.scrollY;
			setScrolled(y > 80);
			// Clear active section when at the top (hero area)
			if (y < 200) {
				setActiveSection("");
			}
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
			className={`sticky top-0 z-50 transition-all duration-300 ${
				scrolled
					? 'bg-cream/90 dark:bg-[#1a1918]/90 backdrop-blur-md border-b border-warmgray/40 dark:border-warmgray/10'
					: 'bg-cream dark:bg-[#1a1918] border-b border-transparent'
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
				{/* Left: Logo / Name — fixed width to prevent nav shift */}
				<div className="w-[36px] lg:w-[220px] shrink-0">
					<button
						onClick={handleLogoClick}
						className="relative h-10 flex items-center focus:outline-none cursor-pointer"
					>
						<AnimatePresence mode="wait" initial={false}>
							{!scrolled ? (
								<motion.div
									key="logo"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.15, ease: 'easeOut' }}
								>
									<Logo size={36} />
								</motion.div>
							) : (
								<motion.span
									key="name"
									className="font-serif text-[15px] font-semibold tracking-tight whitespace-nowrap text-ink dark:text-cream flex"
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={{
										hidden: {},
										visible: {
											transition: { staggerChildren: 0.02, delayChildren: 0.05 },
										},
										exit: { opacity: 0, transition: { duration: 0.1 } },
									}}
								>
									{fullName.split('').map((char, i) => (
										<motion.span
											key={i}
											variants={{
												hidden: { opacity: 0, y: 4 },
												visible: {
													opacity: 1,
													y: 0,
													transition: { duration: 0.08, ease: 'easeOut' },
												},
											}}
											style={char === ' ' ? { width: '0.25em' } : undefined}
										>
											{char === ' ' ? '\u00A0' : char}
										</motion.span>
									))}
								</motion.span>
							)}
						</AnimatePresence>
					</button>
				</div>

				{/* Center: Desktop nav */}
				<nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
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
				<div className="flex items-center gap-4 ml-auto lg:ml-0 shrink-0">
					<div className="hidden sm:flex items-center gap-3">
						<a
							href={siteConfig.links.github}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Github"
							className="text-midgray hover:text-ink dark:hover:text-cream transition-colors"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
							</svg>
						</a>
						<a
							href={siteConfig.links.linkedIn}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="text-midgray hover:text-ink dark:hover:text-cream transition-colors"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
								<rect x="2" y="9" width="4" height="12" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</a>
						<a
							href={siteConfig.links.dev}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Dev.to"
							className="text-midgray hover:text-ink dark:hover:text-cream transition-colors"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
								<path d="M7 8v8" />
								<path d="M12 8l-2 4 2 4" />
								<path d="M17 8l-2 4 2 4" />
							</svg>
						</a>
					</div>
					<div className="hidden sm:block w-px h-4 bg-warmgray/40 dark:bg-warmgray/15" />
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
								<a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-midgray">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
										<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
									</svg>
								</a>
								<a href={siteConfig.links.linkedIn} target="_blank" rel="noopener noreferrer" className="text-midgray">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
										<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
										<rect x="2" y="9" width="4" height="12" />
										<circle cx="4" cy="4" r="2" />
									</svg>
								</a>
								<a href={siteConfig.links.dev} target="_blank" rel="noopener noreferrer" className="text-midgray">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
										<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
										<path d="M7 8v8" />
										<path d="M12 8l-2 4 2 4" />
										<path d="M17 8l-2 4 2 4" />
									</svg>
								</a>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
