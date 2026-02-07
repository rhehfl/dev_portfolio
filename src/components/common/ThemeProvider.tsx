'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isReady: boolean;
};

const STORAGE_KEY = 'gd-theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(next: Theme) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle('dark', next === 'dark');
  root.setAttribute('data-theme', next);
  root.style.colorScheme = next;
}

function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'dark' || stored === 'light' ? stored : null;
}

function readSystemPreference(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isReady, setIsReady] = useState(false);
  const isUserPreference = useRef(false);

  useEffect(() => {
    const stored = readStoredTheme();
    const initialTheme = stored ?? readSystemPreference();
    isUserPreference.current = stored !== null;

    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setIsReady(true);

    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (isUserPreference.current) {
        return;
      }

      const nextTheme: Theme = event.matches ? 'dark' : 'light';
      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const contextValue = useMemo<ThemeContextValue>(() => {
    const setTheme = (next: Theme) => {
      isUserPreference.current = true;
      setThemeState(next);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      applyTheme(next);
    };

    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return {
      theme,
      setTheme,
      toggleTheme,
      isReady,
    };
  }, [theme, isReady]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
