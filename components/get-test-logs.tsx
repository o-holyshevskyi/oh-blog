export async function TestLogs() {
    let logs = "[ fetching test logs... ]";
    try {
        const res = await fetch('https://gist.githubusercontent.com/o-holyshevskyi/6f7760e182b7cb05c0b69c2b32fb4217/raw/test-results.log', {
            next: { revalidate: 60 } 
        });
        if (res.ok) {
            logs = await res.text();
        }
    } catch (e) {
        logs = "[ failed to load test logs ]";
    }

    return (
        <details className="mt-2 group cursor-pointer">
            <summary className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-300 transition-colors list-none flex items-center gap-2 select-none [&::-webkit-details-marker]:hidden">
                Live E2E Verification <span className="text-neutral-700 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="mt-3 p-4 bg-[#0d0d0d] border border-neutral-900 rounded-sm">
                <pre className="text-[10px] text-neutral-400 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                    <code>{logs}</code>
                </pre>
            </div>
        </details>
    );
}