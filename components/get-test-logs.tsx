// Додай цю функцію поруч з іншими компонентами
export async function TestLogs() {
    let logs = "[ fetching test logs... ]";
    try {
        // ВАЖЛИВО: Заміни GIST_ID на свій реальний ID
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
        <div className="mt-8 border border-neutral-800 bg-[#0a0a0a] rounded-sm p-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Live E2E Verification</h3>
            <pre className="text-[10px] text-neutral-400 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                <code>{logs}</code>
            </pre>
        </div>
    );
}