import { useEffect } from "react";
import { usePersistedState } from "./usePersistedState";

export type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = usePersistedState<Theme>("reviewprep-theme", "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, setTheme, toggleTheme };
}
