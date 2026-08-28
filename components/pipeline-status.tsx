"use client";

import { useState, useEffect } from "react";

export function PipelineStatus() {
    const [status, setStatus] = useState<string>("loading");

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch("/api/pipeline-status");
                const data = await res.json();
                setStatus(data.status);
            } catch (error) {
                setStatus("error");
            }
        };

        fetchStatus();

        const interval = setInterval(fetchStatus, 15000);

        return () => clearInterval(interval);
    }, []);

    const isSuccess = status === "success";
    const isRunning = status === "in_progress" || status === "queued" || status === "loading";

    return (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] font-mono mt-1">
            <span className="text-neutral-400">CI/CD Pipeline:</span>
            {isRunning ? (
                <span className="text-yellow-500 animate-pulse">[ {status} ]</span>
            ) : (
                <span className={isSuccess ? "text-green-500" : "text-red-500"}>
                    [ {status} ]
                </span>
            )}
        </div>
    );
}