import React from "react";

interface FooterProps {
  name: string;
}

export const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <footer className="mt-auto border-t border-[#ec5b13]/10 bg-white dark:bg-[#ec5b13]/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-2">
              <span className="text-[#ec5b13] font-bold">{"{}"}</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 italic">
                Let&apos;s build something together.
              </span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} {name}. Built with passion and code.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              className="text-slate-400 hover:text-[#ec5b13] transition-colors"
              href="#"
            >
              <span className="font-bold">GH</span>
            </a>
            <a
              className="text-slate-400 hover:text-[#ec5b13] transition-colors"
              href="#"
            >
              <span className="font-bold">@</span>
            </a>
            <a
              className="text-slate-400 hover:text-[#ec5b13] transition-colors"
              href="#"
            >
              <span className="font-bold">IN</span>
            </a>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[#ec5b13] px-8 py-3 font-bold text-white hover:scale-105 transition-transform cursor-pointer shadow-md">
            Download Resume
          </button>
        </div>
      </div>
    </footer>
  );
};
