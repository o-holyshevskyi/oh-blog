"use client";

import { useState, useEffect, useRef } from "react";

export function TestLogs() {
    const [logs, setLogs] = useState<string>("[ click to fetch test logs... ]");
    const [isOpen, setIsOpen] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false);
    
    const isFetching = useRef(false);

    useEffect(() => {
        if (!isOpen) return;

        const fetchLogs = async () => {
            if (isFetching.current) return;
            isFetching.current = true;

            try {
                const res = await fetch("/api/test-logs");
                const data = await res.json();
                
                if (res.status === 429) {
                    setIsRateLimited(true);
                } else {
                    setIsRateLimited(false);
                }
                
                setLogs(data.logs || "[ empty log ]");
            } catch (error) {
                setLogs("[ network error ]");
            } finally {
                isFetching.current = false;
            }
        };

        setLogs("[ fetching latest logs... ]");
        fetchLogs();

        const interval = setInterval(fetchLogs, 15000);
        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <details 
            className="mt-2 group cursor-pointer"
            onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
        >
            <summary className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-300 transition-colors list-none flex items-center gap-2 select-none [&::-webkit-details-marker]:hidden">
                Live E2E Verification <span className="text-neutral-700 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className={`mt-3 p-4 bg-[#0d0d0d] border rounded-sm transition-colors duration-300 ${isRateLimited ? 'border-red-900/50' : 'border-neutral-900'}`}>
                <pre className={`text-[10px] overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed transition-colors duration-300 ${isRateLimited ? 'text-red-500' : 'text-neutral-400'}`}>
                    <code>{logs}</code>
                </pre>
            </div>
        </details>
    );
}