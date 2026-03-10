import React from "react";

interface AboutProps {
  description: string;
}

export const About: React.FC<AboutProps> = ({ description }) => {
  return (
    <section className="mb-24 scroll-mt-24 text-foreground transition-colors" id="about">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-bold italic">
          About Me
        </h2>
        <div className="h-[1px] flex-1 bg-brand-600/20"></div>
      </div>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {description ||
              "Passionate developer with experience building scalable web applications. I focus on clean code and efficient solutions."}
          </p>
        </div>
        <div className="md:col-span-4 rounded-xl border border-brand-600/10 bg-brand-600/5 p-6">
          <h3 className="mb-4 font-bold text-brand-600">Quick Stats</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Location</span>{" "}
              <span className="font-medium">Global Remote</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Availability</span>{" "}
              <span className="text-green-600 font-bold">Open to Work</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Focus</span>{" "}
              <span className="font-medium">Full-Stack Development</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
