import { CopyCommand } from "@/components/copy-command";
import { PipelineStatus } from "@/components/pipeline-status";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 font-mono sm:p-24 p-8 flex justify-center">
            <div className="max-w-[640px] w-full flex flex-col gap-16 mt-10">
                <section className="flex flex-col gap-5">
                    <h1 className="text-neutral-100 text-base font-semibold">
                        Oleksandr Holyshevskyi
                    </h1>
                    <p className="text-sm leading-relaxed text-neutral-400">
                        Senior SDET with 7+ years of experience architecting test automation frameworks (Playwright, C#/TS). 
                        Proven track record of transforming QA processes: reduced deployment times by 50%, 
                        cut regression testing by up to 80%, and embedded strict quality gates into CI/CD pipelines.
                    </p>
                </section>
                <section className="flex flex-col gap-3">
                    <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                        Impact & Milestones
                    </h2>
                    <ul className="flex flex-col gap-3">
                        <li className="w-full">
                            <Link
                                href={"/work/biometrics"}
                                className="flex justify-between items-baseline gap-4 text-sm group"
                            >
                                <span className="shrink-0 text-neutral-300 group-hover:text-white transition-colors">
                                    Architected hardware mocks for biometric scanners
                                </span>
                                <span className="w-full border-b border-dashed border-neutral-700 group-hover:border-neutral-500 transition-colors relative -top-1"/>
                                <span className="shrink-0 text-neutral-500 text-xs flex items-center gap-1 group-hover:text-neutral-300 transition-colors">
                                    C# / .NET
                                    <span className="text-neutral-600 group-hover:text-white">↗</span>
                                </span>
                            </Link>
                        </li>
                        <li className="w-full">
                            <Link
                                href={"/work/playwright-migration"}
                                className="flex justify-between items-baseline gap-4 text-sm group"
                            >
                                <span className="shrink-0 text-neutral-300 group-hover:text-white transition-colors">
                                    Enterprise migration from Selenium to Playwright
                                </span>
                                <span className="w-full border-b border-dashed border-neutral-700 group-hover:border-neutral-500 transition-colors relative -top-1"/>
                                <span className="shrink-0 text-neutral-500 text-xs flex items-center gap-1 group-hover:text-neutral-300 transition-colors">
                                    70+ engineers
                                    <span className="text-neutral-600 group-hover:text-white">↗</span>
                                </span>
                            </Link>
                        </li>
                        <li className="w-full">
                            <Link
                                href={"/work/cicd-quality-gates"}
                                className="flex justify-between items-baseline gap-4 text-sm group"
                            >
                                <span  className="shrink-0 text-neutral-300 group-hover:text-neutral-100 transition-colors">
                                    Architected CI/CD Quality Gates
                                </span>
                                <span className="w-full border-b border-dashed border-neutral-700 group-hover:border-neutral-500 transition-colors relative -top-1"/>
                                <span className="shrink-0 text-neutral-500 text-xs flex items-center gap-1 group-hover:text-neutral-300 transition-colors">
                                    Azure / GitLab
                                    <span className="text-neutral-600 group-hover:text-white">↗</span>
                                </span>
                            </Link>
                        </li>
                        <li className="flex justify-between items-baseline gap-4 text-sm group">
                            <span className="shrink-0 text-neutral-300 group-hover:text-neutral-100 transition-colors">
                                Reduced deployment times & regression cycles
                            </span>
                            <span className="w-full border-b border-dashed border-neutral-700 relative -top-1"/>
                            <span className="shrink-0 text-neutral-500 text-xs">
                                -50% / -80%
                            </span>
                        </li>
                    </ul>
                </section>
                <section className="flex flex-col gap-3">
                    <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                        Core Stack
                    </h2>
                    <p className="text-sm leading-relaxed text-neutral-400">
                        TypeScript, C#, Playwright, NUnit/xUnit, Azure DevOps GitLab CI, Docker, MS SQL, Claude Code, Cline
                    </p>
                </section>
                <footer className="flex flex-col gap-8 pt-4">
                    <div className="flex gap-6 text-sm text-neutral-500">
                        <a 
                            href="mailto:holyshevskyi.a@gmail.com"
                            className="hover:text-neutral-300 transition-colors"
                        >
                            email
                        </a>
                        <a 
                            href="https://github.com/o-holyshevskyi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-neutral-300 transition-colors group"
                        >
                            github
                            <span className="text-neutral-600 group-hover:text-white">↗</span>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/oleksandr-holyshevskyi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-neutral-300 transition-colors group"    
                        >
                            linkedin
                            <span className="text-neutral-600 group-hover:text-white">↗</span>
                        </a>
                    </div>
                    <div className="flex flex-col gap-2 mt-4 border-t border-neutral-900 pt-6">
                        <span className="text-neutral-600 text-[10px] uppercase tracking-[0.1em]">
                            # For developers: fetch new resume
                        </span>
                        <CopyCommand />
                    </div>
                    {/* @ts-expect-error Async Server Component */}
                    <PipelineStatus />
                    <TestLogs />
                </footer>
            </div>
        </main>
    );
}