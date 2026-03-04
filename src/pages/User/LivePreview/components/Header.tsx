import React from "react";

interface HeaderProps {
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-[#f8f6f6]/80 dark:bg-[#221610]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#ec5b13] text-white font-bold">
            {/* Using a text fallback for material icon if not available globally */}
            <span className="text-xl">{"<"}</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 italic">
            {name}
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a className="hover:text-[#ec5b13] transition-colors" href="#about">
            About
          </a>
          <a className="hover:text-[#ec5b13] transition-colors" href="#projects">
            Projects
          </a>
          <a
            className="hover:text-[#ec5b13] transition-colors"
            href="#experience"
          >
            Experience
          </a>
          <a className="hover:text-[#ec5b13] transition-colors" href="#skills">
            Skills
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="rounded-lg bg-[#ec5b13] px-5 py-2 text-sm font-bold text-white hover:bg-[#ec5b13]/90 transition-all cursor-pointer">
            Resume
          </button>
        </div>
      </div>
    </header>
  );
};
