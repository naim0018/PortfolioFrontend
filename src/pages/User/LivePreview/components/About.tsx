import React from "react";

interface AboutProps {
  description: string;
}

export const About: React.FC<AboutProps> = ({ description }) => {
  return (
    <section className="mb-24 scroll-mt-24" id="about">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 italic">
          About Me
        </h2>
        <div className="h-[1px] flex-1 bg-[#ec5b13]/20"></div>
      </div>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {description ||
              "Passionate developer with experience building scalable web applications. I focus on clean code and efficient solutions."}
          </p>
        </div>
        <div className="md:col-span-4 rounded-xl border border-[#ec5b13]/10 bg-[#ec5b13]/5 p-6">
          <h3 className="mb-4 font-bold text-[#ec5b13]">Quick Stats</h3>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex justify-between">
              <span className="text-slate-500">Location</span>{" "}
              <span>Global Remote</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Availability</span>{" "}
              <span className="text-green-600 font-medium">Open to Work</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Focus</span>{" "}
              <span>Full-Stack Development</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
