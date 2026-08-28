// CSS is loaded for its side effects and resolved by Next.js at build time.
// @ts-ignore TypeScript may not have a declaration for CSS side-effect imports.
import "../styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { clsx } from "clsx";
import { Analytics } from '@vercel/analytics/react';
import { CommandPalette } from "@/components/command-palette";

export const metadata: Metadata = {
    title: {
        default: "Oleksandr Holyshevskyi | Senior SDET",
        template: `%s - "Oleksandr Holyshevskyi | Senior SDET"`,
    },
    description: `Senior SDET with 7+ years of experience architecting test automation frameworks (Playwright, C#/TS). 
                Proven track record of transforming QA processes: reduced deployment times by 50%, 
                cut regression testing by up to 80%, and embedded strict quality gates into CI/CD pipelines.`,
    icons: {
        icon: "/favicon.ico",
    },
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
                    "min-h-screen bg-[#0a0a0a] text-neutral-300 font-mono antialiased"
                )}
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