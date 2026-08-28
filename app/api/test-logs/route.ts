import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

export async function GET(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') || 'anonymous';
        const now = Date.now();
        const windowMs = 60 * 1000;
        const maxRequests = 4;

        // 2. Логіка Rate Limiter
        const userRecord = rateLimitMap.get(ip);

        if (userRecord) {
            if (now < userRecord.resetTime) {
                userRecord.count++;
                if (userRecord.count > maxRequests) {
                    const cooldown = Math.ceil((userRecord.resetTime - now) / 1000);
                    return NextResponse.json(
                        { logs: `[ SECURITY FAULT ]\nRATE LIMIT EXCEEDED FOR IP: ${ip}\nCOOL DOWN ACTIVE: ${cooldown} SECONDS\n\n[ system protection engaged ]` }, 
                        { status: 429 }
                    );
                }
            } else {
                rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
            }
        } else {
            rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        }

        const url = `https://gist.githubusercontent.com/o-holyshevskyi/8e770c205db74ff086cf7b67c6beb3e9/raw/test-results.log?t=${Date.now()}`;
        
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            return NextResponse.json({ logs: "[ failed to fetch logs from upstream ]" }, { status: res.status });
        }

        const logs = await res.text();
        return NextResponse.json({ logs });
    } catch (e) {
        return NextResponse.json({ logs: "[ internal server error fetching logs ]" }, { status: 500 });
    }
}