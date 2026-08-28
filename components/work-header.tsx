import Link from "next/link";

export function WorkHeader({ header, description}: { header: string, description: string }) {
    return (
        <header className="flex flex-col gap-4">
            <Link href="/" className="text-neutral-400 hover:text-neutral-300 text-xs transition-colors group flex items-center gap-2">
                <span className="text-neutral-500 group-hover:-translate-x-1 transition-transform">←</span>
                back
            </Link>
            <h1 className="text-neutral-100 text-lg font-semibold mt-4">
                {header}
            </h1>
            <p className="text-xs text-neutral-400 uppercase tracking-widest">
                {description}
            </p>
        </header>
    )
}