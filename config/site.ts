export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "OH | Test Automation Engineer",
	description: "OH | Test Automation Engineer based in Ukraine",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
		label: "About",
		href: "/about",
		},
		{
		label: "Blog",
		href: "/blog",
		},
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Blog",
			href: "/blog",
		},
	],
	links: {
		github: "https://github.com/o-holyshevskyi",
		linkedIn: "https://www.linkedin.com/in/oleksandr-holyshevskyi/",
    	dev: "https://dev.to/oholyshevskyi",
	},
	images: {
		noPosts: "https://app.requestly.io/delay/1000/https://o-holyshevskyi.github.io/blog-pic/images/sapiens.png"
	}
};
