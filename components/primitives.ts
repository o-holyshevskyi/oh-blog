import { tv } from "tailwind-variants";

export const title = tv({
	base: "tracking-tight inline font-semibold",
	variants: {
		color: {
			violet: "from-[#FF1CF7] to-[#b249f8]",
			yellow: "from-[#FF705B] to-[#FFB457]",
			blue: "from-[#5EA2EF] to-[#0072F5] dark:from-[#c084fc] dark:to-[#a855f7]",
			cyan: "from-[#00b7fa] to-[#01cfea]",
			green: "from-[#6FEE8D] to-[#17c964]",
			pink: "from-[#FF72E1] to-[#F54C7A]",
			foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
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
	compoundVariants: [
		{
			color: [
				"violet",
				"yellow",
				"blue",
				"cyan",
				"green",
				"pink",
				"foreground",
			],
			class: "bg-clip-text text-transparent bg-gradient-to-b",
		},
	],
});

export const subtitle = tv({
	base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
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
	base: "text-3xl md:text-4xl font-bold tracking-tight",
	variants: {
		color: {
			blue: "bg-clip-text text-transparent bg-gradient-to-r from-[#5EA2EF] to-[#0072F5] dark:from-[#c084fc] dark:to-[#a855f7]",
			default: "",
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
	base: "text-default-500 text-lg mt-2 max-w-2xl",
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
