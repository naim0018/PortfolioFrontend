import React from "react";

interface HeroProps {
  name: string;
  profilePicture: string;
  shortDescription: string;
}

export const Hero: React.FC<HeroProps> = ({
  name,
  profilePicture,
  shortDescription,
}) => {
  return (
    <section className="mb-24 flex flex-col items-center gap-10 md:flex-row md:items-start text-foreground transition-colors">
      <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl border-4 border-brand-600/20 shadow-xl md:h-64 md:w-64">
        <img
          src={profilePicture || "/default-avatar.png"}
          alt={`Professional headshot of ${name}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col text-center md:text-left">
        <div className="mb-2 flex items-center justify-center gap-4 text-sm font-mono text-brand-600 md:justify-start">
          <span className="opacity-70">const</span>{" "}
          <span className="text-muted-foreground">developer =</span>{" "}
          <span className="font-bold">&quot;{name}&quot;</span>;
        </div>
        <h1 className="mb-4 text-5xl font-black leading-tight tracking-tight md:text-7xl">
          Crafting digital <span className="text-brand-600">experiences</span>.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {shortDescription ||
            "Full-stack Developer & UI Designer specialized in building scalable web applications and high-performance interfaces."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start font-bold">
          <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-3 text-white hover:scale-105 transition-transform cursor-pointer">
            View Projects <span>↓</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-brand-600/30 px-8 py-3 text-brand-600 hover:bg-brand-600/5 transition-colors cursor-pointer">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};
