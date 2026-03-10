import React from "react";

interface ExperienceProps {
  experience: any[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <section className="mb-24 scroll-mt-24" id="experience">
      <div className="mb-12 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground italic">Career Journey</h2>
        <div className="h-[1px] flex-1 bg-brand-600/20"></div>
      </div>
      <div className="space-y-12">
        {experience.map((exp, idx) => (
          <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[2px] before:bg-border">
            <div className="absolute left-[-5px] top-2 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-background" />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                <p className="text-brand-600 font-bold">{exp.company}</p>
              </div>
              <span className="text-sm font-bold text-muted-foreground bg-muted px-4 py-1 rounded-full">
                {exp.startDate} — {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
