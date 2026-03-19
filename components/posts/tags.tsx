import { Link } from "@nextui-org/link";

export default function Tags({ tags } : { tags: string[] }) {
    return (
        <div className="flex flex-wrap gap-2 mt-10">
            {tags.map((tag, index) => (
                <Link
                    key={index}
                    href={`/blog/filtered/${tag.replace('#', '').toLowerCase()}`}
                    className="text-[11px] font-sans tracking-wider uppercase px-3 py-1 border border-warmgray/30 dark:border-warmgray/10 rounded-sm text-midgray hover:border-terracotta hover:text-terracotta transition-colors"
                >
                    {tag}
                </Link>
            ))}
        </div>
    )
}
