import { tv } from "tailwind-variants";

export const title = tv({
	base: "tracking-tight inline font-serif font-semibold",
	variants: {
		color: {
			violet: "text-warmtan",
			yellow: "text-terracotta",
			blue: "text-terracotta",
			cyan: "text-mutedblue",
			green: "text-sage",
			pink: "text-terracotta",
			foreground: "text-ink dark:text-cream",
		},
		size: {
			xs: "text-lg lg:text-xl",
			sm: "text-3xl lg:text-4xl",
			md: "text-[2.3rem] lg:text-5xl leading-9",
			lg: "text-4xl lg:text-6xl",
		},
		fullWidth: {
			true: "w-full block",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const subtitle = tv({
	base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-midgray block max-w-full",
	variants: {
		fullWidth: {
			true: "!w-full",
		},
	},
	defaultVariants:{
		fullWidth: true
	}
});

export const sectionTitle = tv({
	base: "text-3xl md:text-4xl font-serif font-semibold tracking-tight",
	variants: {
		color: {
			blue: "text-ink dark:text-cream",
			default: "text-ink dark:text-cream",
		},
		align: {
			center: "text-center",
			left: "text-left",
		},
	},
	defaultVariants: {
		color: "default",
		align: "center",
	},
});

export const sectionSubtitle = tv({
	base: "text-midgray text-lg mt-2 max-w-2xl",
	variants: {
		align: {
			center: "text-center mx-auto",
			left: "text-left",
		},
	},
	defaultVariants: {
		align: "center",
	},
});
