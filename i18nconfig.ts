import { Locale } from "./types";

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'uk', 'cz'];

export const localeNames: Record<Locale, string> = {
    "en": "English",
    "uk": "Українська",
    "cz": "Čeština"
}