import { useState } from "react";
import styles from './download-button.module.css';

export default function DownloadButton() {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleClick = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            setIsDownloaded(true);

            const link = document.createElement('a');
            link.href = '/files/Oleksandr Holyshevskyi.pdf';
            link.download = 'OleksandrHolyshevskyi.pdf';
            link.target = '_blank';

            link.click();

            setTimeout(() => {
                setIsDownloaded(false);
            }, 1700)
        }, 2000);
    }

    return (
        <div className={styles.buttonContainer}>
            <button
            disabled={isDownloading || isDownloaded}
            onClick={handleClick}
            className={styles.downloadButton}
            >
                <span className={styles.rail}></span>
                <span className={styles.icon}></span>
                <span className={styles.text}>
                    {isDownloading
                        ? "Downloading..."
                        : isDownloaded
                            ? "Downloaded"
                            : "Download CV"
                    }
                </span>
            </button>
        </div>
    );
}
