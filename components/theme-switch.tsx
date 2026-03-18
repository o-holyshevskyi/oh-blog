"use client";

// View Transitions API type (not yet in all TS libs)
declare global {
	interface Document {
		startViewTransition?: (callback: () => void) => { finished: Promise<void> };
	}
}

import { FC, useCallback, useRef } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import {useIsSSR} from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { MotionWhileHover } from "@/app/[locale]/motion";

export type ThemeEffect = "circle" | "fade" | "slide";

export interface ThemeSwitchProps {
	className?: string;
	classNames?: SwitchProps["classNames"];
}

function getStoredEffect(): ThemeEffect {
	if (typeof window === "undefined") return "circle";
	return (localStorage.getItem("theme-effect") as ThemeEffect) || "circle";
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
	className,
	classNames,
}) => {
	const { theme, setTheme } = useTheme();
  	const isSSR = useIsSSR();
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const btnRef = useRef<HTMLElement | null>(null);

	const applyTheme = useCallback(() => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	}, [theme, setTheme]);

	const onChange = () => {
		// Play sound
		if (!audioRef.current) {
			audioRef.current = new Audio('/drawer-closing.mp3');
		}
		audioRef.current.currentTime = 0;
		audioRef.current.play().catch(() => {});

		const effect = getStoredEffect();
		const doc = document.documentElement;

		// Fallback for browsers without View Transitions API
		if (!document.startViewTransition) {
			applyTheme();
			return;
		}

		// Set the transition class
		doc.classList.add(`theme-transition-${effect}`);

		// For circle effect, set the origin to the button position
		if (effect === "circle" && btnRef.current) {
			const rect = btnRef.current.getBoundingClientRect();
			const x = rect.left + rect.width / 2;
			const y = rect.top + rect.height / 2;
			doc.style.setProperty("--tx", `${x}px`);
			doc.style.setProperty("--ty", `${y}px`);
		}

		const transition = document.startViewTransition(() => {
			applyTheme();
		});

		transition.finished.then(() => {
			doc.classList.remove(`theme-transition-${effect}`);
		});
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
			ref={btnRef}
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
