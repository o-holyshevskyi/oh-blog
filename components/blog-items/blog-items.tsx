import { getAllPostsMetaWithLang, Post } from "@/app/lib/posts";
import BlogTags from "./blog-tags";
import { useTranslations } from "next-intl";

/**
 * Generate trigrams (3-character chunks) from a string.
 * E.g. "testing" → ["tes", "est", "sti", "tin", "ing"]
 */
function trigrams(str: string): Set<string> {
    const s = str.toLowerCase().trim();
    const result = new Set<string>();
    for (let i = 0; i <= s.length - 3; i++) {
        result.add(s.slice(i, i + 3));
    }
    return result;
}

/**
 * Calculate trigram similarity between two strings (0–1).
 * Uses the Dice coefficient: 2 * |intersection| / (|A| + |B|)
 */
function trigramSimilarity(a: string, b: string): number {
    const triA = trigrams(a);
    const triB = trigrams(b);
    if (triA.size === 0 || triB.size === 0) return 0;

    let intersection = 0;
    for (const t of triA) {
        if (triB.has(t)) intersection++;
    }
    return (2 * intersection) / (triA.size + triB.size);
}

/**
 * Score a post against a query.
 * - Exact substring match in title → highest score (1.0)
 * - Exact substring match in tags → high score (0.9)
 * - Exact substring match in description → good score (0.8)
 * - Trigram similarity on title → proportional score
 * - Individual words matching via trigram → accumulated score
 */
function scorePost(post: Post, query: string): number {
    const q = query.toLowerCase().trim();
    const title = post.meta.title.toLowerCase();
    const tags = post.meta.tags.join(' ').toLowerCase();
    const desc = (post.description || '').toLowerCase();

    // Exact substring matches get top priority
    if (title.includes(q)) return 1.0;
    if (tags.includes(q)) return 0.9;
    if (desc.includes(q)) return 0.8;

    // Split query into individual words for multi-word search
    const words = q.split(/\s+/).filter(w => w.length >= 2);
    if (words.length === 0) return 0;

    // Check if all words appear as substrings (word-level exact match)
    const allWordsMatch = words.every(w =>
        title.includes(w) || tags.includes(w) || desc.includes(w)
    );
    if (allWordsMatch) return 0.85;

    // Trigram similarity on the full query vs title
    const titleSim = trigramSimilarity(q, title);

    // Per-word trigram matching — average best similarity per word
    let wordScore = 0;
    const searchFields = [title, tags, desc];
    for (const word of words) {
        let bestSim = 0;
        for (const field of searchFields) {
            const sim = trigramSimilarity(word, field);
            if (sim > bestSim) bestSim = sim;
        }
        wordScore += bestSim;
    }
    wordScore /= words.length;

    return Math.max(titleSim, wordScore);
}

const SIMILARITY_THRESHOLD = 0.15;

export default async function BlogItems({
    query,
    page,
    locale,
} : {
    query: string;
    page: number;
    locale: string;
}) {
    const allPosts = await getAllPostsMetaWithLang(locale);

    let filteredPosts: Post[];

    if (!query || query.trim().length < 2) {
        filteredPosts = allPosts;
    } else {
        const scored = allPosts
            .map(post => ({ post, score: scorePost(post, query) }))
            .filter(({ score }) => score >= SIMILARITY_THRESHOLD)
            .sort((a, b) => b.score - a.score);
        filteredPosts = scored.map(({ post }) => post);
    }

    return (
        <div>
            <BlogTags
                allPosts={filteredPosts}
                page={page}
                locale={locale}
            />
        </div>
    )
}
