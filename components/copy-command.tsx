"use client";

import { useState } from "react";

export function CopyCommand() {
    const [copied, setCopied] = useState(false);
    const command = "curl -s https://oholyshevskyi.com/api/resume | jq";

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <code 
            onClick={handleCopy}
            className={`text-xs p-3 rounded-sm border w-fit cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center min-w-[340px] ${
                copied 
                ? "bg-[#0a1a0f] border-green-900/50 text-green-500" 
                : "bg-[#111] border-neutral-800 text-neutral-400 hover:bg-[#1a1a1a] hover:border-neutral-700"
            }`}
        >
            {copied ? "[ copied to clipboard ]" : command}
        </code>
    );
}