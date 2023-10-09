import { useEffect, useState } from "react";
import Script from "next/script";

export default function SetTheme({ handleTheme }) {
    const [theme, setTheme] = useState('');

    const toggleTheme = () => {
        if ( theme == 'light') {
            setTheme('dark');
            handleTheme('dark');
        } else if ( theme == 'dark' ) {
            setTheme('light');
            handleTheme('light');
        }
    }

    const defaultTheme = () => {
        const themeLocalStorage = localStorage.getItem('theme')
        const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
        return ( themeLocalStorage ?? themeSystem )
    }

    useEffect( () => {
        if ( ! theme ) return setTheme( defaultTheme() )

        document.querySelector(':root').dataset.theme = ( theme );
        localStorage.setItem('theme', ( theme ));
    
        const useSetTheme = (e) => { setTheme( e.matches ? 'dark' : 'light' ) };
        const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)');

        watchSysTheme.addEventListener( 'change', useSetTheme );

        return () => {
            watchSysTheme.removeEventListener( 'change', useSetTheme );
        }
    }, [theme] )

    return (
        <>
        <Script id="theme-util.tsx" strategy="beforeInteractive" >
            {`
                let themeLocalStorage = localStorage.getItem('theme')
                let themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                document.querySelector(':root').dataset.theme = themeLocalStorage ?? themeSystem
            `}
        </Script>
            <label>
                <input type="checkbox" onClick={toggleTheme} data-theme={theme} />
                <span className={`switch ${theme === 'dark' ? 'dark' : ''}`}>
                    <span className='handle' />
                </span>
            </label>
        </>
    );
}