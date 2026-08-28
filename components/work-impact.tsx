import { ReactNode } from "react";

export function WorkImpact({ impacts }: { impacts: ReactNode[] }) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                The Impact
            </h2>
            <ul className="flex flex-col gap-3 text-sm text-neutral-400 list-disc pl-4">
                {impacts.map((impact, index) => (
                    <li key={index}>{impact}</li>
                ))}
            </ul>
        </section>
    );
}