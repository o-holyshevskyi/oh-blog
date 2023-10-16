import { useEffect, useState } from "react";
import styles from './scroll-to-top.module.css';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <div className={styles.scrollToTop}>
            <button
                className={`${styles.scrollToTopButton} ${isVisible ? styles.visible : ''}`}
                onClick={scrollToTop}
            >
                <div className={styles.container}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABO0lEQVR4nO2T2ytEURTGf3kZHDIkJGXIzKThxT/txQsPw4y7ByVJKZSUS4P4J45WfadWmnPTVh7mq1XnrL3W9+112TBAYFRkf4IKsA3sAcOhyUeBLhDLOsBIKPIIOBLxB/Cp7yCVRD/IW0ATeA9RyQRwLqJXoO7OTORNZ93fiFSBCxE8A8vyr8sMq6rKYvbLiKSRN9WaL2BNvoar5BQYyyOfBC6V8AAsyF93RLEG3XIiPfnP8kR2FHgPzMu34gg6sljVNPqIbGUJ1IA2MKf/JQ3YEg/VZ7MD+Xq6QFLlDbBBQSwCT66/trL+4R27DUvmNFSU3Hr/KAJb1fE+MWkiuZgF7pR4pcGnwao6UeyLWpqJGeBWCdfAVIELRdqeZK1tjqlolyT3rz55O7tkoKZVnaY8qsCmW+8B/gm+ARu4XQ2umowvAAAAAElFTkSuQmCC" />
                    TO TOP
                </div>
            </button>
        </div>
        
    );
}
