import React from "react";
import { Github, Globe, Code2 } from "lucide-react";

interface ProjectsProps {
  projects: any[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="mb-24 scroll-mt-24" id="projects">
      <div className="mb-12 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground italic">
          Featured Projects
        </h2>
        <div className="h-[1px] flex-1 bg-brand-600/20"></div>
      </div>
      <div className="grid gap-12">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="group grid gap-8 md:grid-cols-2 items-center"
          >
            <div
              className={`overflow-hidden rounded-2xl border border-border bg-muted/40 ${idx % 2 === 1 ? "md:order-2" : ""}`}
            >
              {proj.coverImage ? (
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center text-muted-foreground/20">
                  <Code2 className="w-16 h-16" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {proj.tags?.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-600/10 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                {proj.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {proj.description}
              </p>
              <div className="flex gap-6 pt-4">
                {proj.repositoryLink && (
                  <a
                    href={proj.repositoryLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-brand-600 transition-colors"
                  >
                    <Github className="w-5 h-5" /> Source
                  </a>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-brand-600 transition-colors"
                  >
                    <Globe className="w-5 h-5" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
