"use client";

import { useState, useEffect } from "react";

interface LighthouseData {
    perf: number;
    a11y: number;
    seo: number;
}

export function SystemMetrics() {
    const [metrics, setMetrics] = useState<LighthouseData | null>(null);
    const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch(`https://gist.githubusercontent.com/o-holyshevskyi/8e770c205db74ff086cf7b67c6beb3e9/raw/metrics.json?t=${Date.now()}`, { cache: 'no-store' });

                if (!res.ok) throw new Error("Failed to fetch metrics");
                const data = await res.json();

                if (typeof data.perf !== 'number' || typeof data.a11y !== 'number' || typeof data.seo !== 'number') {
                    throw new Error("Invalid telemetry contract");
                }

                setMetrics(data);
                setStatus("success");
            } catch (error) {
                setStatus("error");
            }
        };

        fetchMetrics();
    }, []);

    if (status === "loading") {
        return <div className="text-[10px] uppercase font-mono text-neutral-400 mt-2">[ fetching telemetry... ]</div>;
    }

    if (status === "error" || !metrics) {
        return <div className="text-[10px] uppercase font-mono text-red-500 mt-2">[ telemetry unavailable ]</div>;
    }

    const getColor = (score: number) => {
        if (score >= 90) return "text-green-500";
        if (score >= 50) return "text-yellow-400";
        return "text-red-500";
    };

    return (
        <div className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.1em] font-mono mt-1">
            <span className="text-neutral-400">Live Telemetry (Lighthouse CI):</span>
            <div className="flex gap-4">
                <span>
                    <span className="text-neutral-400">PERF:</span> <span className={getColor(metrics.perf)}>[ {metrics.perf} ]</span>
                </span>
                <span>
                    <span className="text-neutral-400">A11Y:</span> <span className={getColor(metrics.a11y)}>[ {metrics.a11y} ]</span>
                </span>
                <span>
                    <span className="text-neutral-400">SEO:</span> <span className={getColor(metrics.seo)}>[ {metrics.seo} ]</span>
                </span>
            </div>
        </div>
    );
}