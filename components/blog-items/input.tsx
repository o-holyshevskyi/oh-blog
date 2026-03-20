'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SearchInput({
    handleSearch
} : {
    handleSearch: (term: string) => void
}) {
    const t = useTranslations("blogPage");
    const [searchTerm, setSearchTerm] = useState('');

    const onClear = () => {
        setSearchTerm('');
        handleSearch('');
    };

    return (
        <div className="relative">
            <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-midgray pointer-events-none"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
            </svg>
            <input
                type="text"
                placeholder={t("searchInputPlaceholder")}
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch(e.target.value);
                }}
                className="w-full pl-9 pr-8 py-2 text-sm bg-transparent border border-warmgray/30 dark:border-warmgray/10 rounded-sm text-ink dark:text-cream placeholder:text-midgray focus:outline-none focus:border-terracotta transition-colors"
            />
            {searchTerm && (
                <button
                    onClick={onClear}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-midgray hover:text-ink dark:hover:text-cream transition-colors cursor-pointer"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            )}
        </div>
    )
}
