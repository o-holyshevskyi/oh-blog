import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { clsx } from "clsx";
import { Analytics } from '@vercel/analytics/react';
import { CommandPalette } from "@/components/command-palette";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
    // Встановлюємо жорсткий канонічний URL, hreflang більше не потрібен
    alternates: {
        canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://oholyshevskyi.com",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Жорстко фіксуємо англійську мову
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <head />
            <body
                className={clsx(
                    "min-h-screen bg-cream dark:bg-[#1a1918] text-ink dark:text-cream antialiased",
                )}
                style={{ fontFamily: 'Georgia, ui-serif, Cambria, "Palatino Linotype", "Times New Roman", Times, serif' }}
            >
                <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                    {children}
                </Providers>
                <Analytics />
                <CommandPalette />
            </body>
        </html>
    );
}