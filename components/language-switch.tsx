'use client';

import { usePathname, useRouter } from "next-intl/client";
import { locales } from "../i18nconfig";
import React, { useEffect, useRef, useState } from "react";

const localeLabels: Record<string, string> = {
    en: 'EN',
    uk: 'UK',
    cz: 'CZ',
};

export default function LanguageSwitch({ locale }: { locale: string }) {
    const router = useRouter();
    const pathName = usePathname();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (loc: string) => {
        setOpen(false);
        if (loc !== locale) {
            router.push(pathName, { locale: loc });
        }
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="text-[12px] font-sans font-medium tracking-wider uppercase text-midgray hover:text-ink dark:hover:text-cream transition-colors cursor-pointer focus:outline-none px-1"
                aria-label="Switch language"
            >
                {localeLabels[locale] || locale.toUpperCase()}
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-2 py-1 min-w-[48px] bg-cream dark:bg-[#1a1918] border border-warmgray/40 dark:border-warmgray/15 rounded-sm shadow-sm">
                    {locales
                        .filter((loc) => loc !== locale)
                        .map((loc) => (
                            <button
                                key={loc}
                                onClick={() => handleSelect(loc)}
                                className="block w-full text-left px-3 py-1.5 text-[12px] font-sans font-medium tracking-wider uppercase text-midgray hover:text-ink dark:hover:text-cream hover:bg-warmgray/20 dark:hover:bg-warmgray/5 transition-colors cursor-pointer focus:outline-none"
                            >
                                {localeLabels[loc] || loc.toUpperCase()}
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}
