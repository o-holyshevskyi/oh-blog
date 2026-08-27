import { WorkHeader } from "@/components/work-header";
import { WorkImpact } from "@/components/work-impact";
import { WorkSection } from "@/components/work-section";

const impacts = [
    <><strong className="text-neutral-300 font-normal">Deployment Velocity:</strong> Optimized CI/CD pipelines, directly reducing overall deployment times by 50%.</>,
    <><strong className="text-neutral-300 font-normal">Regression Elimination:</strong> Cut regression testing time by up to 80% by replacing manual cycles with parallelized automated workflows.</>,
    <><strong className="text-neutral-300 font-normal">Release Confidence:</strong> Established a reliable quality gate that protected regular releases across multiple cross-functional teams.</>,
];

export default function CaseStudy() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 font-mono sm:p-24 p-8 flex justify-center">
            <div className="max-w-[640px] w-full flex flex-col gap-12 mt-10">
                <WorkHeader
                    header="Architecting CI/CD Quality Gates & Pipeline Optimization"
                    description="Azure DevOps / GitLab CI / Docker / 2022-2024"
                />
                <WorkSection
                    header="The Context"
                    description="Across multiple enterprise platforms (CRM, EdTech, InsurTech), deployments were severely bottlenecked by inefficient 
                    manual testing cycles and lack of continuous quality monitoring. Regression testing took days, deployments were slow, and code was 
                    frequently merged without reliable automated validation, increasing the risk of production failures."
                />
                <WorkSection
                    header="The Architecture"
                    description="I designed and embedded strict, automated quality gates directly into Azure DevOps and GitLab CI/CD pipelines. 
                    By scaling the test ecosystem to over 1000+ stable UI and API tests running in isolated Docker containers, I replaced manual 
                    regression with robust automated pipelines. No pull request could be merged, and no release deployed, without successfully passing 
                    this continuous quality monitoring layer."
                    content={
                        <pre className="bg-[#111] p-4 rounded-sm text-xs text-neutral-500 overflow-x-auto border border-neutral-800 mt-2">
                            <code>{`
[Developer PR] -> [Trigger CI Pipeline]
                |
      +---------+---------+
      | Dockerized Runner |
      | - Unit Tests      |
      | - API Test Suite  |
      | - UI E2E Suite    |
      +---------+---------+
                |
[Quality Gate: PASS] -> [Merge Allowed] -> [Automated Deploy]
[Quality Gate: FAIL] -> [Merge Blocked] -> [Instant Feedback]`}</code>
                        </pre>
                    }
                />
                <WorkImpact
                    impacts={impacts}
                />
            </div>
        </main>
    );
}