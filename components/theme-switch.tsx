"use client";

// View Transitions API type (not yet in all TS libs)
declare global {
	interface Document {
		startViewTransition?: (callback: () => void) => { finished: Promise<void> };
	}
}

import { FC, useCallback } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import {useIsSSR} from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { MotionWhileHover } from "@/app/[locale]/motion";

export interface ThemeSwitchProps {
	className?: string;
	classNames?: SwitchProps["classNames"];
}

export function startSlideTransition(callback: () => void) {
	if (!document.startViewTransition) {
		callback();
		return;
	}
	document.startViewTransition(callback);
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
	className,
	classNames,
}) => {
	const { theme, setTheme } = useTheme();
  	const isSSR = useIsSSR();
	const applyTheme = useCallback(() => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	}, [theme, setTheme]);

	const onChange = () => {
		startSlideTransition(applyTheme);
	};

	const {
		Component,
		slots,
		isSelected,
		getBaseProps,
		getInputProps,
		getWrapperProps,
	} = useSwitch({
		isSelected: theme === "light" || isSSR,
    	"aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
		onChange,
	});

	return (
		<Component
			{...getBaseProps({
				className: clsx(
					"px-px transition-opacity hover:opacity-80 cursor-pointer",
					className,
					classNames?.base
				),
			})}
		>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<MotionWhileHover
				{...getWrapperProps()}
				className={slots.wrapper({
					class: clsx(
						[
							"w-auto h-auto",
							"bg-transparent",
							"rounded-lg",
							"flex items-center justify-center",
							"group-data-[selected=true]:bg-transparent",
							"!text-default-500",
							"pt-px",
							"px-0",
							"mx-0",
						],
						classNames?.wrapper
					),
				})}
			>
				{!isSelected || isSSR ? <SunFilledIcon size={20} /> : <MoonFilledIcon size={20} />}
			</MotionWhileHover>
		</Component>
	);
};
