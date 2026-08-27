import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const url = `https://gist.githubusercontent.com/o-holyshevskyi/6f7760e182b7cb05c0b69c2b32fb4217/raw/test-results.log?t=${Date.now()}`;
        
        const res = await fetch(url, { 
            cache: 'no-store' 
        });

        if (!res.ok) {
            return NextResponse.json({ logs: "[ failed to fetch logs from upstream ]" }, { status: res.status });
        }

        const logs = await res.text();
        return NextResponse.json({ logs });
    } catch (e) {
        return NextResponse.json({ logs: "[ internal server error fetching logs ]" }, { status: 500 });
    }
}