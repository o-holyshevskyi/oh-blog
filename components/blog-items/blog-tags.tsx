'use client';

import { useState } from "react";
import { Pagination } from '@nextui-org/pagination';
import { siteConfig } from "@/config/site";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Post } from "@/app/lib/posts";
import { useTranslations } from "next-intl";
import PostCards from "../cards";

export default function BlogTags({ allPosts, page, locale } : { allPosts: Post[]; page: number; locale: string; }) {
    const t = useTranslations("blogPage");

    const [filteredTag, setFilteredTag] = useState('');
    const [posts, setPosts] = useState(allPosts);
    const [currentPage, setCurrentPage] = useState(page);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    let allTags = new Set();
    allPosts.forEach((postsData) => {
        postsData.meta.tags.forEach((tag) => {
            allTags.add(tag);
        })
    });

    const uniqueTags = [...allTags] as string[];

    const handleFilterTags = (tag: string) => {
        if (tag === '') {
            setPosts(allPosts);
            setFilteredTag('');
        } else {
            const filteredTags = allPosts.filter((post) => post.meta.tags.includes(tag));
            if (filteredTags.length > 0) {
                setPosts(filteredTags);
                setFilteredTag(tag);
            }
        }
        setCurrentPage(1);
    }

    const handlePagination = useDebouncedCallback((page: number) => {
        setCurrentPage(page);
        if (searchParams) {
            const params = new URLSearchParams(searchParams);
            params.set('page', page.toString());
            replace(`${pathname}?${params.toString()}`);
        }
    }, 300);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = posts.slice(startIndex, endIndex);

    return (
        <section className="w-full">
            {/* Tag filter bar */}
            <div className="flex flex-wrap gap-2 mt-8">
                <button
                    onClick={() => handleFilterTags('')}
                    className={`text-xs font-sans tracking-wider uppercase px-3 py-1.5 rounded-sm border transition-colors cursor-pointer ${
                        filteredTag === ''
                            ? 'border-terracotta text-terracotta'
                            : 'border-warmgray/30 dark:border-warmgray/10 text-midgray hover:border-terracotta/50 hover:text-ink dark:hover:text-cream'
                    }`}
                >
                    {t("all")}
                </button>
                {uniqueTags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => handleFilterTags(tag)}
                        className={`text-xs font-sans tracking-wider uppercase px-3 py-1.5 rounded-sm border transition-colors cursor-pointer ${
                            filteredTag === tag
                                ? 'border-terracotta text-terracotta'
                                : 'border-warmgray/30 dark:border-warmgray/10 text-midgray hover:border-terracotta/50 hover:text-ink dark:hover:text-cream'
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Post count */}
            <div className="mt-8 mb-6 flex items-center gap-3">
                <span className="text-xs font-sans tracking-wider uppercase text-midgray">
                    {t("allPosts")}
                </span>
                <span className="text-xs text-midgray">({posts.length})</span>
            </div>

            {allPosts.length > 0 ? (
                <div>
                    <PostCards
                        displayedItems={displayedItems}
                        locale={locale}
                    />
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10">
                            <Pagination
                                total={totalPages}
                                page={currentPage}
                                onChange={handlePagination}
                                showControls
                                classNames={{
                                    cursor: "bg-terracotta text-cream",
                                }}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-midgray text-lg font-serif">{t("noPosts")}</p>
                </div>
            )}
        </section>
    )
}
