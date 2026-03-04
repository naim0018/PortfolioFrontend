import React from "react";

interface Skill {
  logo: string;
  name: string;
  progress: number;
}

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="mb-24 scroll-mt-24" id="skills">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 italic">
          Technical Proficiencies
        </h2>
        <div className="h-[1px] flex-1 bg-[#ec5b13]/20"></div>
      </div>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-6 text-sm font-mono font-bold text-[#ec5b13] uppercase">
            Core Skills
          </h3>
          <div className="space-y-6">
            {skills.map((skill, idx) => (
              <div key={idx}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {skill.name}
                  </span>
                  <span className="text-[#ec5b13] font-mono font-bold">
                    {skill.progress}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#ec5b13]/10">
                  <div
                    className="h-full rounded-full bg-[#ec5b13]"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
