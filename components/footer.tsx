'use client';

import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedInIcon, DevIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

export default function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="border-t border-divider bg-background/50 mt-16">
			<div className="section-container py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-3">
							Oleksandr Holyshevskyi
						</h3>
						<p className="text-default-500 text-sm mb-4">
							{t("tagline")}
						</p>
						<div className="flex gap-3">
							<Link isExternal href={siteConfig.links.github} aria-label="GitHub">
								<GithubIcon className="text-default-500 hover:text-primary transition-colors" />
							</Link>
							<Link isExternal href={siteConfig.links.linkedIn} aria-label="LinkedIn">
								<LinkedInIcon className="text-default-500 hover:text-primary transition-colors" />
							</Link>
							<Link isExternal href={siteConfig.links.dev} aria-label="Dev.to">
								<DevIcon className="text-default-500 hover:text-primary transition-colors" />
							</Link>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-3">
							{t("quickLinks")}
						</h3>
						<ul className="space-y-2">
							{siteConfig.navItems.map((item) => (
								<li key={item.label}>
									<Link
										href={item.isRoute ? item.href : `/${item.href}`}
										className="text-default-500 hover:text-primary text-sm transition-colors"
									>
										{t(`links.${item.label}`)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-3">
							{t("contactInfo")}
						</h3>
						<ul className="space-y-2 text-sm text-default-500">
							<li className="flex items-center gap-2">
								<Icon icon="mdi:email-outline" width={16} />
								<Link
									href={`mailto:${siteConfig.contact.email}`}
									className="text-default-500 hover:text-primary text-sm transition-colors"
								>
									{siteConfig.contact.email}
								</Link>
							</li>
							<li className="flex items-center gap-2">
								<Icon icon="mdi:phone-outline" width={16} />
								<span>{siteConfig.contact.phone}</span>
							</li>
							<li className="flex items-center gap-2">
								<Icon icon="mdi:map-marker-outline" width={16} />
								<span>{siteConfig.contact.location}</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-divider mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-default-400">
					<p>&copy; {new Date().getFullYear()} Oleksandr Holyshevskyi. {t("copyright")}</p>
					<p>{t("builtWith")}</p>
				</div>
			</div>
		</footer>
	);
}
