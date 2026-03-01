import { useFieldArray, useFormContext } from "react-hook-form";
import { ProfileFormData } from "./schemas";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  AlignLeft,
  Building2,
  Link2,
  ImageOff,
} from "lucide-react";

const ExperienceSection = () => {
  const { register, control, watch } = useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const watchedExperience = watch("experience");

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl border border-border shadow-sm overflow-hidden mb-8 transition-colors duration-300">
      <div className="px-8 py-10 border-b border-border bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Briefcase className="w-32 h-32 text-brand-600" />
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-brand-600/10 dark:bg-brand-600/20 p-4 rounded-xl text-brand-600 shadow-sm ring-1 ring-brand-600/20">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              Career Architecture
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Document your professional trajectory and impact.
            </p>
          </div>
        </div>
        <button
          type="button"
          id="add-experience-btn"
          onClick={() =>
            append({
              title: "",
              description: "",
              logo: "",
              link: "",
              startDate: "",
              endDate: "Present",
              location: "",
            })
          }
          className="px-6 py-3 text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 active:scale-95 z-10"
        >
          <Plus className="w-4 h-4" />
          Add Position
        </button>
      </div>

      <div className="p-8">
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-10 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-600/50 before:via-brand-500/20 before:to-transparent">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => {
              const experience = watchedExperience?.[index] || field;
              const logoUrl = experience.logo ?? "";

              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative flex gap-10 group"
                >
                  {/* ── Timeline Avatar / Logo ── */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 shadow-xl flex items-center justify-center overflow-hidden group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt="Company logo"
                          className="w-full h-full object-contain p-1.5"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display =
                              "none";
                            (
                              e.currentTarget
                                .nextElementSibling as HTMLElement
                            ).style.display = "flex";
                          }}
                        />
                      ) : null}
                      {/* Fallback icon — always rendered, hidden when logo loads */}
                      <div
                        className={`w-full h-full items-center justify-center ${logoUrl ? "hidden" : "flex"}`}
                      >
                        <Building2 className="w-8 h-8 text-brand-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-full w-4 h-0.5 bg-brand-500/20" />
                  </div>

                  {/* ── Content Card ── */}
                  <div className="flex-1 bg-white dark:bg-slate-800/40 rounded-xl border border-border p-8 transition-all duration-500 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 relative overflow-hidden">
                    {/* Delete button */}
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:p-4">
                      <button
                        type="button"
                        id={`experience-remove-btn-${index}`}
                        onClick={() => remove(index)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-8">
                      {/* ── Company Logo URL ── */}
                      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-border p-5 space-y-4">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                          <Building2 className="w-3 h-3" /> Company Logo
                        </label>

                        {/* Preview strip */}
                        <div className="flex items-center gap-4">
                          {/* Thumbnail preview */}
                          <div className="w-14 h-14 shrink-0 rounded-xl border-2 border-dashed border-border bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden shadow-inner">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt="Logo preview"
                                className="w-full h-full object-contain p-1"
                                onError={(e) => {
                                  (
                                    e.currentTarget as HTMLImageElement
                                  ).style.display = "none";
                                  (
                                    e.currentTarget
                                      .nextElementSibling as HTMLElement
                                  ).style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className={`w-full h-full items-center justify-center ${logoUrl ? "hidden" : "flex"}`}
                            >
                              <ImageOff className="w-5 h-5 text-muted-foreground/20" />
                            </div>
                          </div>

                          {/* URL input */}
                          <div className="flex-1 relative group/input">
                            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
                            <input
                              id={`experience-logo-${index}`}
                              {...register(`experience.${index}.logo`)}
                              placeholder="https://company.com/logo.svg"
                              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-border rounded-xl text-xs font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* ── Role & Location ── */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                            Company Name
                          </label>
                          <input
                            id={`experience-title-${index}`}
                            {...register(`experience.${index}.title`)}
                            placeholder="e.g. Google, Meta, OpenAI"
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-5 py-3.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                            Location
                          </label>
                          <div className="relative group/input">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
                            <input
                              id={`experience-location-${index}`}
                              {...register(`experience.${index}.location`)}
                              placeholder="e.g. Google • Mountain View, CA"
                              className="w-full pl-11 pr-5 py-3.5 bg-slate-50 dark:bg-slate-900 border border-border rounded-xl text-sm font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* ── Work Periods ── */}
                      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-6 border border-border">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mb-4 pl-1">
                          <Calendar className="w-3 h-3" /> Work Periods
                        </label>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-tighter ml-1 text-center block">
                              Start Period
                            </span>
                            <input
                              id={`experience-start-${index}`}
                              {...register(`experience.${index}.startDate`)}
                              placeholder="JAN 2021"
                              className="w-full bg-white dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground placeholder:text-muted-foreground/20 text-center focus:outline-none focus:border-brand-500/50 uppercase transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-tighter ml-1 text-center block">
                              End Period
                            </span>
                            <input
                              id={`experience-end-${index}`}
                              {...register(`experience.${index}.endDate`)}
                              placeholder="PRESENT"
                              className="w-full bg-white dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-xs font-semibold text-brand-600 dark:text-brand-400 placeholder:text-brand-500/20 text-center focus:outline-none focus:border-brand-500/50 uppercase transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* ── Impact Narrative ── */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                          <AlignLeft className="w-3 h-3" /> Strategic
                          Contributions &amp; Impact
                        </label>
                        <textarea
                          id={`experience-description-${index}`}
                          {...register(`experience.${index}.description`)}
                          rows={4}
                          placeholder="Describe your achievements, technical leadership, and business impact..."
                          className="w-full bg-slate-50 dark:bg-slate-800/20 border border-border rounded-xl px-6 py-5 text-sm font-medium text-foreground placeholder:text-muted-foreground/20 italic focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-900 transition-all duration-300 resize-none leading-relaxed shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {fields.length === 0 && (
            <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-800/10 border-2 border-dashed border-border rounded-xl ml-20">
              <div className="bg-white dark:bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-border">
                <Briefcase className="w-10 h-10 text-muted-foreground/20" />
              </div>
              <h4 className="text-foreground font-semibold text-2xl tracking-tight">
                Career Canvas Awaiting
              </h4>
              <p className="text-muted-foreground text-sm font-medium mt-3 max-w-sm mx-auto leading-relaxed">
                Your professional story is a sequence of milestones. Add your
                first career peak to begin.
              </p>
              <button
                type="button"
                id="add-first-experience-btn"
                onClick={() =>
                  append({
                    title: "",
                    description: "",
                    logo: "",
                    link: "",
                    startDate: "",
                    endDate: "Present",
                    location: "",
                  })
                }
                className="mt-12 px-12 py-4 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all shadow-2xl shadow-brand-600/40 border border-brand-500/50 flex items-center gap-3 mx-auto active:scale-95"
              >
                Launch Your Career Path <Plus className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
