import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const headers: HeadersInit = process.env.GITHUB_TOKEN 
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } 
            : {};

        const res = await fetch(
            "https://api.github.com/repos/o-holyshevskyi/oh-blog/actions/runs?per_page=1",
            { 
                cache: 'no-store',
                headers 
            }
        );

        if (!res.ok) {
            return NextResponse.json({ status: `http_${res.status}` });
        }

        const data = await res.json();
        let pipelineStatus = "unknown";
        
        if (data.workflow_runs && data.workflow_runs.length > 0) {
            pipelineStatus = data.workflow_runs[0].conclusion || data.workflow_runs[0].status;
        }

        return NextResponse.json({ status: pipelineStatus });
    } catch (error) {
        return NextResponse.json({ status: "error" });
    }
}