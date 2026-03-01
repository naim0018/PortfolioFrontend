import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { id: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
    { id: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
    { id: "system", label: "System", icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-all duration-300 flex items-center justify-center border border-transparent hover:border-border"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5 text-amber-500 animate-in fade-in zoom-in duration-300" />
          ) : theme === "dark" ? (
            <Moon className="w-5 h-5 text-indigo-400 animate-in fade-in zoom-in duration-300" />
          ) : (
            <Monitor className="w-5 h-5 text-slate-400 animate-in fade-in zoom-in duration-300" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1 bg-white dark:bg-slate-900 border border-border shadow-xl rounded-xl z-50">
        <div className="flex flex-col gap-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                theme === t.id
                  ? "bg-brand-50 text-brand-600 dark:bg-brand-600/20 dark:text-brand-400"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;
