import { ReactNode } from "react";

export function WorkSection({ header, description, content }: { header: string, description: string, content?: ReactNode }) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-neutral-100 text-sm font-semibold">{header}</h2>
            <p className="text-sm leading-relaxed text-neutral-400">{description}</p>
            {content ?? <>{content}</>}
        </section>
    );
}