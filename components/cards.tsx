import { Post } from "@/app/lib/posts";
import { timeToRead } from "@/app/lib/time-to-read";
import { useTranslations } from "next-intl";
import Date from "./date/date";
import Link from "next/link";

export default function PostCards({
    displayedItems,
    locale
} : {
    displayedItems: Post[];
    locale: string;
}) {
    const t = useTranslations("postCards");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedItems.map((post, index) => (
                <Link
                    key={index}
                    href={`/blog/${post.meta.slug}`}
                    className="group border border-warmgray/30 dark:border-warmgray/10 rounded-sm overflow-hidden hover:border-terracotta/50 dark:hover:border-terracotta/30 transition-colors"
                >
                    {post.meta.img && (
                        <div className="aspect-[16/9] overflow-hidden bg-warmgray/10">
                            <img
                                src={post.meta.img}
                                alt={post.meta.title}
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    )}
                    <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-midgray font-sans tracking-wide uppercase">
                            <Date
                                dateString={post.meta.date}
                                formatDate="LLLL d, yyyy"
                                locale={locale}
                            />
                            <span className="w-1 h-1 rounded-full bg-warmgray" />
                            <span>{timeToRead(post.fileContent)} {t("minRead")}</span>
                        </div>
                        <h3 className="mt-2 text-lg font-serif font-semibold text-ink dark:text-cream group-hover:text-terracotta transition-colors leading-snug">
                            {post.meta.title}
                        </h3>
                        <p className="mt-2 text-sm text-midgray leading-relaxed line-clamp-2">
                            {post.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {post.meta.tags.slice(0, 3).map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-[10px] font-sans tracking-wider uppercase px-2 py-0.5 border border-warmgray/30 dark:border-warmgray/10 rounded-sm text-midgray"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
