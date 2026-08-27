"use client";
import { useState } from "react";

export function CopyCommand() {
    const [copied, setCopied] = useState(false);
    const command = "curl -s https://oholyshevskyi.com/api/resume | jq";

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <code 
            onClick={handleCopy}
            className={`text-[11px] sm:text-xs p-3 rounded-sm w-full sm:w-fit cursor-pointer transition-all active:scale-[0.98] flex items-center justify-start sm:justify-center overflow-hidden whitespace-nowrap ${
                copied 
                ? "bg-[#0a1a0f] text-green-500" 
                : "bg-[#111] text-neutral-400 hover:bg-[#1a1a1a] hover:text-neutral-300"
            }`}
        >
            {copied ? "[ copied to clipboard ]" : command}
        </code>
    );
}