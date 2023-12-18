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
import React from "react";
import Bell from "./bell";
import { Post } from "@/app/lib/posts";
import LanguageSwitch from "./language-switch";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";

interface NavbarWrapperProps {
    daysDifference: number;
    posts: Post[];
	locale: string;
}

export default function NavbarWrapper({ daysDifference, posts, locale }: NavbarWrapperProps) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const t = useTranslations("header");
	const router = useRouter();
    
    return (
		<NextUINavbar 
			maxWidth="xl"
			isMenuOpen={isMenuOpen}
      		onMenuOpenChange={setIsMenuOpen}
			shouldHideOnScroll={false}
		>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<Link className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium cursor-pointer"
								)} onClick={() => router.push('/')}>
						<Logo size={42}/>
					</Link>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<Link
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium cursor-pointer"
								)}
								color="foreground"
								onClick={() => router.push(item.href)}
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
					<LanguageSwitch locale={locale}/>
					{daysDifference < 7 && (
						<Bell latestPostId={posts[0].meta.slug}/>
					)}
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.linkedIn} aria-label="LinkedIn">
					<LinkedInIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<LanguageSwitch locale={locale} />
                {daysDifference < 7 && (
                    <Bell latestPostId={posts[0].meta.slug}/>
                )}
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href={item.href}
								size="lg"
								onClick={() => setIsMenuOpen(false)}
							>
								{t(`navItems.${item.label}`)}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
}