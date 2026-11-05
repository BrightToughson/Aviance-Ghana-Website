import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'navy' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState('light');
    try {
      localStorage.setItem('aviance_theme', 'light');
    } catch {
      // fallback
    }
  };

  const toggleTheme = () => {
    setTheme('light');
  };

  useEffect(() => {
    try {
      localStorage.setItem('aviance_theme', 'light');
    } catch {}
    const root = document.documentElement;
    root.classList.add('theme-light', 'light');
    root.classList.remove('theme-navy', 'dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme, setTheme, isLight: true }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
