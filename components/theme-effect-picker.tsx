"use client";

import { useEffect, useState } from "react";
import type { ThemeEffect } from "./theme-switch";

const effects: { id: ThemeEffect; label: string; icon: string }[] = [
	{ id: "circle", label: "Circle reveal", icon: "◎" },
	{ id: "fade", label: "Crossfade", icon: "◐" },
	{ id: "slide", label: "Slide", icon: "▸" },
];

export default function ThemeEffectPicker() {
	const [active, setActive] = useState<ThemeEffect>("circle");

	useEffect(() => {
		const stored = localStorage.getItem("theme-effect") as ThemeEffect | null;
		if (stored) setActive(stored);
	}, []);

	const pick = (effect: ThemeEffect) => {
		setActive(effect);
		localStorage.setItem("theme-effect", effect);
	};

	return (
		<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1 px-3 py-2 rounded-full bg-ink/90 dark:bg-cream/90 backdrop-blur-sm shadow-lg">
			<span className="text-[10px] font-sans tracking-widest uppercase text-cream/60 dark:text-ink/60 mr-2">
				Effect
			</span>
			{effects.map((e) => (
				<button
					key={e.id}
					onClick={() => pick(e.id)}
					title={e.label}
					className={`w-8 h-8 rounded-full text-sm flex items-center justify-center transition-all cursor-pointer ${
						active === e.id
							? "bg-terracotta text-cream scale-110"
							: "text-cream/70 dark:text-ink/70 hover:bg-cream/10 dark:hover:bg-ink/10"
					}`}
				>
					{e.icon}
				</button>
			))}
		</div>
	);
}
