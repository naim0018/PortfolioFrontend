import React from "react";

interface FooterProps {
  name: string;
}

export const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-8 flex justify-center items-center gap-4 text-brand-600">
             <div className="h-8 w-8 rounded bg-brand-600 text-white flex items-center justify-center font-bold">{"<"}</div>
             <span className="text-xl font-bold italic text-foreground">{name}</span>
        </div>
        <p className="text-sm text-muted-foreground italic mb-8">
            Built with Passion for Digital Excellence.
        </p>
        <div className="flex justify-center gap-8 text-sm font-medium mb-12">
             <a href="#about" className="hover:text-brand-600 transition-colors">About</a>
             <a href="#projects" className="hover:text-brand-600 transition-colors">Projects</a>
             <a href="#experience" className="hover:text-brand-600 transition-colors">Experience</a>
             <a href="#skills" className="hover:text-brand-600 transition-colors">Skills</a>
        </div>
        <div className="text-xs text-muted-foreground font-mono opacity-50">
          © {new Date().getFullYear()} {name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
