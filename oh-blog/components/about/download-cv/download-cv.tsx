'use client';

import { Button } from "@nextui-org/button";
import { useState } from "react";

export default function DownloadCv() {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleClick = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            setIsDownloaded(true);

            const link = document.createElement('a');
            link.href = 'https://o-holyshevskyi.github.io/blog-pic/files/Oleksandr%20Holyshevskyi.pdf';
            link.download = 'OleksandrHolyshevskyi.pdf';
            link.target = '_blank';

            link.click();

            setTimeout(() => {
                setIsDownloaded(false);
            }, 1700)
        }, 2000);
    }
    
    return (
        <section className="mt-10 flex justify-center">
            <Button
                disabled={isDownloading || isDownloaded}
                onClick={handleClick}
                variant="shadow"
                color="primary"
                startContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            >
                {isDownloading
                    ? "Downloading..."
                    : isDownloaded
                        ? "Downloaded"
                        : "Download CV"
                }
            </Button>
        </section>
    )
}