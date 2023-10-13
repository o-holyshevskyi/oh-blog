import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>({
    theme: '',
    toggleTheme: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const rootElement = document.querySelector(':root');
        const initialTheme = rootElement?.getAttribute('data-theme') || 'light';
        setTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

        const rootElement = document.querySelector(':root');
        rootElement?.setAttribute('data-theme', theme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}