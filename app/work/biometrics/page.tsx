import { WorkHeader } from "@/components/work-header";
import { WorkImpact } from "@/components/work-impact";
import { WorkSection } from "@/components/work-section";

const impacts = [
    <><strong className="text-neutral-300 font-normal">Cloud Execution:</strong> Decoupled test execution from physical hardware, enabling 100% parallelization on GitLab cloud runners.</>,
    <><strong className="text-neutral-300 font-normal">Speed:</strong> Optimized pipeline workflows, reducing overall deployment time by 50%.</>,
    <><strong className="text-neutral-300 font-normal">Coverage Gates:</strong> Enforced strict quality gates, driving unit and integration test coverage to 75% across the engineering team.</>,
];

export default function CaseStudy() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 font-mono sm:p-24 p-8 flex justify-center">
            <div className="max-w-[640px] w-full flex flex-col gap-12 mt-10">
                <WorkHeader
                    header="Hardware Mocks & E2E for Biometric Ecosystem"
                    description=".NET / Playwright / FlaUI / 2024"
                />
                <WorkSection
                    header="The Context"
                    description="Testing a biometric security ecosystem (desktop and web applications) presented a critical bottleneck: 
                        E2E tests were hard-coupled to physical biometric scanners. This meant tests could only run sequentially 
                        on specific local machines in a lab. CI/CD pipelines were paralyzed, scaling to cloud runners was impossible, 
                        and hardware dependencies caused constant flaky test failures."
                />
                <WorkSection
                    header="The Architecture"
                    description="To unblock CI/CD, I architected a hardware abstraction layer in C# to completely decouple the software from 
                        the physical devices. By leveraging Dependency Injection, the test framework (Playwright for Web, FlaUI for Desktop) 
                        injects mock scanner payloads during test execution. This allows the pipeline to programmatically simulate complex edge cases 
                        (e.g., spoofed reads, hardware disconnects, corrupted biometric data) that are extremely difficult to reproduce manually."
                    content={
                        <pre className="bg-[#111] p-4 rounded-sm text-xs text-neutral-400 overflow-x-auto border border-neutral-800 mt-2">
                            <code>
                                {`
    [Physical Scanner] ---X (Decoupled)

    [Playwright/FlaUI] ---> [Mock Layer (C#)] ---> [System Under Test]
                            |
                Injects valid/invalid
                biometric payloads via DI`}
                            </code>
                        </pre>
                    }
                />
                <WorkImpact
                    impacts={impacts}
                />
            </div>
        </main>
    )
}