import React from "react";

interface SkillsProps {
  skills: any[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="mb-24 scroll-mt-24" id="skills">
      <div className="mb-12 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground italic">Technical Stack</h2>
        <div className="h-[1px] flex-1 bg-brand-600/20"></div>
      </div>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-all hover:border-brand-600/50 hover:shadow-lg"
          >
            <span className="text-sm font-bold text-foreground">{skill.name}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
              {skill.level}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
