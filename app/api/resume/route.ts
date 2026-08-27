import { NextResponse } from "next/server";

export async function GET() {
    const resume = {
        name: "Oleksandr Holyshevskyi",
        title: "Senior SDET",
        contact: {
            location: "Czechia, Prague",
            email: "holyshevskyi.a@gmail.com",
            github: "https://github.com/o-holyshevskyi",
            linkedin: "https://www.linkedin.com/in/oleksandr-holyshevskyi/"
        },
        summary: "Senior SDET with 7+ years of experience architecting test automation frameworks (Playwright, C#/TS) from scratch and optimizing release cycles.",
        skills: {
            languages: ["C#", "TypeScript", "JavaScript"],
            frameworks: ["Playwright", "Selenium", "NUnit", "xUnit", "Jest"],
            ci_cd: ["GitLab", "Azure DevOps", "GitHub Actions"],
            tools: ["Claude Code", "Cline", "Docker", "MSSQL"]
        },
        experience: [
        {
            company: "Biometric Solutions",
            role: "Software Development Engineer in Test",
            period: "Jul 2024 - Present",
            highlights: [
                "Architected hardware communication mocks to decouple physical biometric scanners from automated tests",
                "Optimized CI/CD pipelines, reducing overall deployment time by 50%",
                "Drove unit (up to 75%) and integration test coverage"
            ]
        },
        {
            company: "Warranty, Insurance CRM",
            role: "Software Development Engineer in Test",
            period: "Aug 2022 - Jul 2024",
            highlights: [
                "Spearheaded migration of legacy automation framework from Selenium to Playwright (40% faster execution)",
                "Scaled test ecosystem to over 1000+ stable UI and API automated tests",
                "Reduced regression testing time by up to 80%"
            ]
        },
        {
            company: "EdTech, InsurTech, Enterprise",
            role: "Automation QA Engineer",
            period: "Feb 2020 - Aug 2022",
            highlights: [
                "Built scalable test automation frameworks from zero for legacy projects",
                "Implemented continuous quality monitoring via Azure DevOps pipelines"
            ]
        }
        ],
        certifications: ["ISTQB Certified Tester Foundation Level (CTFL)"]
    };

    return new NextResponse(JSON.stringify(resume, null, 2), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}