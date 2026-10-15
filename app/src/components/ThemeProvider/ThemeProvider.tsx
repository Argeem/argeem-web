"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Lang = "en" | "th";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  toggleLang: () => void;
}

const AppContext = createContext<AppContextType>({
  theme: "light",
  toggleTheme: () => {},
  lang: "en",
  toggleLang: () => {},
});

export const useApp = () => useContext(AppContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as Theme | null;
    const savedLang = localStorage.getItem("lang") as Lang | null;
    if (saved) setTheme(saved);
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("lang", lang);
  }, [lang, mounted]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleLang = () => setLang((l) => (l === "en" ? "th" : "en"));

  if (!mounted) return <>{children}</>;

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
}
