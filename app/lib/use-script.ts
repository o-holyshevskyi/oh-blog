import { useState, useEffect } from "react";

export const useScript = (params: any) => {
    const { url, theme, issueTerm, repo, ref } = params;

    const [status, setStatus] = useState(url ? "loading" : "idle");

    useEffect(() => {
        if (!url) {
            setStatus("idle");
            return;
        }

        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
            setStatus("ready");
            return;
        }

        let script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.setAttribute("theme", theme);
        script.setAttribute("issue-term", issueTerm);
        script.setAttribute("repo", repo);

        ref.current.appendChild(script);

        const setAttributeStatus = (event: any) => {
            setStatus(event.type === "load" ? "ready" : "error");
        };

        script.addEventListener("load", setAttributeStatus);
        script.addEventListener("error", setAttributeStatus);

        return () => {
            if (script) {
                script.removeEventListener("load", setAttributeStatus);
                script.removeEventListener("error", setAttributeStatus);
            }
        };
    }, [url, theme, issueTerm, repo, ref]);

    return status;
};