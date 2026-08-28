"use client";

import { useState, useEffect, useRef } from "react";

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([
        "oh-os v1.0.0",
        "Type 'help' to see available commands."
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        if (!cmd) return;

        let output = "";

        switch (cmd) {
            case "help":
                output = "Available commands:\n- whoami\n- clear\n- resume\n- toggle_logs";
                break;
            case "whoami":
                output = "guest_user";
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            case "resume":
                output = "Fetching via API...";

                    try {
                        const res = await fetch("/api/resume");

                        if (!res.ok) {
                            throw new Error(`HTTP ${res.status}`);
                        }

                        const data = await res.json();

                        output = JSON.stringify(data, null, 2);
                    } catch (error) {
                        output = `Failed to fetch resume: ${
                            error instanceof Error ? error.message : "Unknown error"
                        }`;
                    }
                
                break;
            case "toggle_logs":
                window.dispatchEvent(new CustomEvent("toggle-e2e-logs"));
                output = "Signal 'toggle-e2e-logs' dispatched to UI.";
                break;
            case "sudo":
            case "sudo rm -rf /":
                output = "Nice try. Defensive engineering active. Incident logged.";
                break;
            default:
                output = `command not found: ${cmd}`;
        }

        setHistory((prev) => [...prev, `> ${cmd}`, output]);
        setInput("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div 
                className="w-full max-w-4xl bg-[#0a0a0a] border border-neutral-800 rounded-lg shadow-2xl flex flex-col overflow-hidden"
                onClick={() => inputRef.current?.focus()}
            >
                {/* Header */}
                <div className="px-4 py-2 border-b border-neutral-800 flex justify-between items-center bg-[#050505]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
                        Command Center
                    </span>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="text-neutral-400 hover:text-white text-[10px] uppercase tracking-widest transition-colors"
                    >
                        [ ESC ]
                    </button>
                </div>

                {/* Output History */}
                <div className="p-4 h-[550px] overflow-y-auto font-mono text-[11px] leading-relaxed text-neutral-400">
                    {history.map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap mb-2">
                            {line.startsWith(">") ? (
                                <span className="text-white">{line}</span>
                            ) : (
                                <span className={line.includes("error") || line.includes("not found") ? "text-red-500" : "text-neutral-400"}>
                                    {line}
                                </span>
                            )}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input Prompt */}
                <form onSubmit={handleCommand} className="flex items-center px-4 py-3 bg-[#0d0d0d] border-t border-neutral-900">
                    <span className="text-green-500 font-mono text-[11px] mr-3">guest@oh-os:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-white font-mono text-[11px]"
                        spellCheck="false"
                        autoComplete="off"
                    />
                </form>
            </div>
        </div>
    );
}