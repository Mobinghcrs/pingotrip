import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') as Theme : null;
        return storedTheme || 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (t: Theme) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', t);
            }
            if (t === 'system') {
                if (systemPrefersDark.matches) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                } else {
                    root.classList.add('light');
                    root.classList.remove('dark');
                }
            } else if (t === 'dark') {
                root.classList.add('dark');
                root.classList.remove('light');
            } else {
                root.classList.add('light');
                root.classList.remove('dark');
            }
        }
        
        applyTheme(theme);
        
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                if (e.matches) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                } else {
                    root.classList.add('light');
                    root.classList.remove('dark');
                }
            }
        };

        systemPrefersDark.addEventListener('change', handleSystemThemeChange);

        return () => {
            systemPrefersDark.removeEventListener('change', handleSystemThemeChange);
        };
    }, [theme]);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
