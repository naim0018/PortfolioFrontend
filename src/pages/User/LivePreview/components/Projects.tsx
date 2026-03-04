import React from "react";

interface Project {
  coverImage: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="mb-24 scroll-mt-24" id="projects">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 italic">
          Selected Projects
        </h2>
        <div className="h-[1px] flex-1 bg-[#ec5b13]/20"></div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border border-[#ec5b13]/10 bg-white dark:bg-[#ec5b13]/5 p-4 transition-all hover:-translate-y-1 hover:border-[#ec5b13]/40"
          >
            {proj.coverImage && (
              <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                />
              </div>
            )}
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">
              {proj.title}
            </h3>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
              {proj.description}
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {proj.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="rounded bg-[#ec5b13]/10 px-2 py-1 text-xs font-medium text-[#ec5b13]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 font-bold text-[#ec5b13]">
              {proj.link && (
                <>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm flex items-center gap-1 hover:underline"
                  >
                    Live Demo <span>↗</span>
                  </a>
                </>
              )}
              {/* Optional GitHub Link if available */}
              <a
                href="#"
                className="text-sm flex items-center gap-1 hover:underline ml-2"
              >
                Github <span>⎘</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
