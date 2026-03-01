import { useFieldArray, useFormContext } from "react-hook-form";
import { ProfileFormData } from "./schemas";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Plus,
  Trash2,
  Github,
  Globe,
  Tag,
  Image as ImageIcon,
  Sparkles,
  ChevronRight,
  Code2,
  AlertCircle,
} from "lucide-react";

const ProjectsSection = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const watchedProjects = watch("projects");

  const handleTagsChange = (index: number, value: string) => {
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    setValue(`projects.${index}.tags`, tags);
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl border border-border shadow-sm overflow-hidden mb-8 transition-colors duration-300">
      <div className="px-8 py-10 border-b border-border bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Rocket className="w-32 h-32 text-brand-600" />
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-brand-600/10 dark:bg-brand-600/20 p-4 rounded-2xl text-brand-600 shadow-sm ring-1 ring-brand-600/20">
            <Rocket className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              Engineering Showcase
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Display your most impactful architectural builds.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              description: "",
              coverImage: "",
              images: [],
              link: "",
              tags: [],
              repositoryLink: "",
              notes: "",
            })
          }
          className="px-6 py-3 text-xs font-semibold text-white bg-brand-600 rounded-2xl hover:bg-brand-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 active:scale-95 z-10"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-12">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => {
              const project = watchedProjects?.[index] || field;
              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-white dark:bg-slate-800/20 rounded-[2.5rem] border border-border overflow-hidden hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-500"
                >
                  <div className="absolute top-6 right-6 z-20">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 shadow-lg active:scale-90"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col lg:flex-row min-h-[450px]">
                    {/* Visual Media Column */}
                    <div className="lg:w-[32%] relative bg-slate-50 dark:bg-slate-900/40 border-r border-border flex flex-col p-8 group/media">
                      <div className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-border bg-white dark:bg-slate-800 flex flex-col items-center justify-center overflow-hidden relative group-hover/media:border-brand-500/50 transition-all duration-500 shadow-inner">
                        {project.coverImage ? (
                          <img
                            src={project.coverImage}
                            alt="Project Highlight"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/media:scale-110"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-muted-foreground/30">
                            <ImageIcon className="w-12 h-12 mb-3" />
                            <span className="text-[10px] font-semibold uppercase tracking-widest">
                              No Media Found
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover/media:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                          <input
                            type="text"
                            {...register(`projects.${index}.coverImage`)}
                            placeholder="Paste cover URL..."
                            className="w-full px-4 py-2 rounded-xl border border-white/20 bg-black/40 text-[10px] font-semibold text-white placeholder:text-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <div className="space-y-1.5 text-center">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">
                            Project Title
                          </label>
                          <input
                            {...register(`projects.${index}.title`)}
                            placeholder="e.g. Neural Nexus AI"
                            className="w-full text-center text-xl font-semibold text-foreground border-none bg-transparent focus:ring-0 p-0 placeholder:text-muted-foreground/20 italic"
                          />
                        </div>
                        <div className="flex justify-center">
                          <div className="h-1 w-12 bg-brand-600 rounded-full group-hover:w-20 transition-all duration-500" />
                        </div>
                      </div>
                    </div>

                    {/* Architectural Specs Column */}
                    <div className="flex-1 p-10 bg-white dark:bg-slate-900/10 flex flex-col gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                          <Code2 className="w-3.5 h-3.5" /> Project Blueprint &
                          Description
                        </label>
                        <textarea
                          {...register(`projects.${index}.description`)}
                          rows={4}
                          placeholder="Elaborate on the challenges, technical decisions, and standard-setting results..."
                          className="w-full rounded-2xl border border-border bg-slate-50 dark:bg-slate-800/40 shadow-inner focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 focus:bg-white dark:focus:bg-slate-900 sm:text-sm py-5 px-6 transition-all duration-300 resize-none leading-relaxed font-medium text-foreground italic placeholder:text-muted-foreground/30"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Technical Links */}
                        <div className="space-y-3">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                            Source Governance
                          </label>
                          <div className="relative group/input">
                            <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
                            <input
                              {...register(`projects.${index}.repositoryLink`)}
                              placeholder="github.com/organization/repo"
                              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/40 border border-border rounded-xl text-xs font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                            Live Manifestation
                          </label>
                          <div className="relative group/input">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
                            <input
                              {...register(`projects.${index}.link`)}
                              placeholder="deployed-artifact.io"
                              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/40 border border-border rounded-xl text-xs font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                            />
                          </div>
                        </div>

                        {/* Technology Spectrum */}
                        <div className="md:col-span-2 space-y-4">
                          <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                              <Tag className="w-3.5 h-3.5" /> Technology
                              Spectrum
                            </label>
                            <span className="text-[9px] font-semibold text-muted-foreground/40 italic">
                              Separate with commas
                            </span>
                          </div>
                          <div className="relative group/input">
                            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500/40 group-focus-within/input:text-brand-500 transition-colors" />
                            <input
                              type="text"
                              defaultValue={(project.tags || []).join(", ")}
                              onBlur={(e) =>
                                handleTagsChange(
                                  index,
                                  (e.target as HTMLInputElement).value,
                                )
                              }
                              placeholder="e.g. Next.js 14, GraphQL, Docker, AWS Lamba..."
                              className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-900/40 border border-border rounded-2xl text-[13px] font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 shadow-inner transition-all"
                            />
                          </div>
                          <div className="flex flex-wrap gap-2.5 pt-2">
                            {project.tags?.map((tag: string, i: number) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-3 py-1.5 bg-brand-600/5 dark:bg-brand-600/10 text-brand-600 dark:text-brand-400 text-[9px] font-semibold uppercase tracking-wider rounded-lg border border-brand-600/20 shadow-sm flex items-center gap-1.5"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {errors.projects?.[index] && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className="px-8 py-3 bg-destructive/5 text-destructive text-[10px] font-semibold uppercase tracking-widest flex items-center gap-2 border-t border-destructive/10"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        Infrastructure Validation Failure: Missing required
                        engineering metrics.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {fields.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-border rounded-[3.5rem] bg-slate-50/50 dark:bg-slate-800/20">
              <div className="bg-white dark:bg-slate-900 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl border border-border text-muted-foreground/20">
                <Code2 className="w-12 h-12" />
              </div>
              <h4 className="text-foreground font-semibold text-2xl tracking-tight">
                Portfolio Canvas Blank
              </h4>
              <p className="text-muted-foreground text-sm font-medium mt-3 max-w-sm mx-auto leading-relaxed">
                Your engineering masterpieces deserve a high-fidelity display.
                Launch your first project record.
              </p>
              <button
                type="button"
                onClick={() =>
                  append({
                    title: "",
                    description: "",
                    coverImage: "",
                    images: [],
                    link: "",
                    tags: [],
                    repositoryLink: "",
                    notes: "",
                  })
                }
                className="mt-14 px-12 py-5 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all shadow-2xl shadow-brand-600/40 border border-brand-500/50 flex items-center gap-3 mx-auto active:scale-95 group"
              >
                Assemble New Project{" "}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
