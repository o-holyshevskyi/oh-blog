import { WorkFooter } from "@/components/work-footer";
import { WorkHeader } from "@/components/work-header";
import { WorkImpact } from "@/components/work-impact";
import { WorkSection } from "@/components/work-section";

const impacts = [
    <><strong className="text-neutral-300 font-normal">Enterprise Scaling:</strong> Successfully onboarded ~70 engineers across multiple teams to the new framework without halting ongoing feature delivery.</>,
    <><strong className="text-neutral-300 font-normal">Execution Speed:</strong> Event-driven architecture accelerated raw test execution by 2x, contributing to a 40% overall reduction in CI/CD execution time.</>,
    <><strong className="text-neutral-300 font-normal">Regression Cycles:</strong> Reduced total regression testing time by up to 80% due to the elimination of flaky explicit waits and improved debuggability.</>,
];

export default function CaseStudy() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 font-mono sm:p-24 p-8 flex justify-center">
            <div className="max-w-[640px] w-full flex flex-col gap-12 mt-10">
                <WorkHeader
                    header="Enterprise-Scale Migration: Selenium to Playwright"
                    description=".NET / Playwright / C# / 2023"
                />
                <WorkSection
                    header="The Context"
                    description="A shared legacy test automation framework was heavily bottlenecking delivery across multiple departments. 
                        The framework was utilized by ~70 engineers across various cross-functional teams. The underlying Selenium architecture 
                        forced engineers to rely on fragile explicit waits, while the HTTP request-response communication protocol caused 
                        massive execution overhead, leading to slow, flaky, and hard-to-debug test suites."
                />
                <WorkSection
                    header="The Architecture"
                    description="I spearheaded the complete architectural migration to Playwright to shift the testing paradigm. 
                        By moving from Selenium's HTTP polling to Playwright's WebSocket event-driven architecture, we eliminated network overhead. 
                        I eradicated thousands of lines of explicit waits by leveraging built-in auto-waiting, and implemented web-first assertions 
                        directly on locators. This not only sped up execution but fundamentally transformed how 70+ engineers debugged failed pipelines."
                    content={
                        <pre className="bg-[#111] p-4 rounded-sm text-xs text-neutral-400 overflow-x-auto border border-neutral-800 mt-2">
                            <code>{`
[Legacy: Selenium]
Test -> HTTP Request -> Browser Driver -> HTTP Response -> Test
(Heavy overhead, requires explicit waiting)

[New: Playwright]
Test <===== WebSocket (Events) =====> Browser
(Bi-directional, auto-waiting, native locator assertions)`}</code>
                        </pre>
                    }
                />
                <WorkImpact
                    impacts={impacts}
                />
                <WorkFooter />
            </div>
        </main>
    );
}