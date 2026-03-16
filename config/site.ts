export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Oleksandr Holyshevskyi | Senior QA Engineer",
	description: "Senior QA Engineer with 7+ years of experience in test automation, specializing in Playwright, Selenium, C#, and TypeScript. Based in Prague, Czech Republic.",
	navItems: [
		{ label: "about", href: "#about" },
		{ label: "experience", href: "#experience" },
		{ label: "skills", href: "#skills" },
		{ label: "contact", href: "#contact" },
	],
	navMenuItems: [
		{ label: "about", href: "#about" },
		{ label: "experience", href: "#experience" },
		{ label: "skills", href: "#skills" },
		{ label: "contact", href: "#contact" },
	],
	links: {
		github: "https://github.com/o-holyshevskyi",
		linkedIn: "https://www.linkedin.com/in/oleksandr-holyshevskyi/",
		dev: "https://dev.to/oholyshevskyi",
	},
	contact: {
		email: "holyshevskyi.a@gmail.com",
		phone: "+420 775 161 467",
		location: "Prague, Czech Republic",
	},
	images: {
		noPosts: "https://o-holyshevskyi.github.io/blog-pic/images/sapiens.png",
	},
};
