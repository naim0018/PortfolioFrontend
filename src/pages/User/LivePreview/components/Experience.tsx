import React from "react";

interface Exp {
  logo: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceProps {
  experience: Exp[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section className="mb-24 scroll-mt-24" id="experience">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 italic">
          Experience
        </h2>
        <div className="h-[1px] flex-1 bg-[#ec5b13]/20"></div>
      </div>
      <div className="relative space-y-12 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-24px)] before:w-[2px] before:bg-[#ec5b13]/20">
        {experience.map((exp, idx) => (
          <div key={idx} className="relative pl-10">
            <div
              className={`absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-[#f8f6f6] dark:border-[#221610] ${
                idx === 0 ? "bg-[#ec5b13]" : "bg-[#ec5b13]/40"
              }`}
            ></div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 italic">
                {exp.title}
              </h3>
              <span className="text-sm font-mono text-[#ec5b13] font-bold">
                {exp.startDate} — {exp.endDate || "Present"}
              </span>
            </div>
            <div className="mb-2 text-sm font-medium text-slate-500 uppercase tracking-widest font-bold">
              {exp.location}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
