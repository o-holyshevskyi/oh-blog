export async function PipelineStatus() {
    let status = "unknown";
    
    try {
        const res = await fetch(
            "https://api.github.com/repos/o-holyshevskyi/oh-blog/actions/runs?per_page=1",
            { next: { revalidate: 60 } }
        );
        
        if (res.ok) {
            const data = await res.json();
            if (data.workflow_runs && data.workflow_runs.length > 0) {
                status = data.workflow_runs[0].conclusion || data.workflow_runs[0].status;
            }
        } else {
            status = `http_${res.status}`;
        }
    } catch (error) {
        status = "error";
    }

    const isSuccess = status === "success";
    const isRunning = status === "in_progress" || status === "queued";

    return (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] font-mono mt-1">
            <span className="text-neutral-600">CI/CD Pipeline:</span>
            {isRunning ? (
                <span className="text-yellow-500 animate-pulse">[ running ]</span>
            ) : (
                <span className={isSuccess ? "text-green-800" : "text-red-500"}>
                    [ {status} ]
                </span>
            )}
        </div>
    );
}