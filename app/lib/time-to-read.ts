export function timeToRead(text: string): number {
    const words: string[] = text.split(/\s+/);
    const wordCount: number = words.length;
    const readingTimeMinutes: number = wordCount / 200;
    return Math.max(1, Math.ceil(readingTimeMinutes));
}