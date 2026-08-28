import Link from "next/link";

export function WorkFooter() {
    return (
        <footer className="mt-16 pt-8 border-t border-neutral-900 flex justify-between items-center">
            <Link href="/" className="text-neutral-400 hover:text-neutral-300 text-xs transition-colors group flex items-center gap-2">
                <span className="text-neutral-400 group-hover:-translate-x-1 transition-transform">←</span>
                cd ..
            </Link>
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
                EOF
            </span>
        </footer>
    );
}