import { useFieldArray, useFormContext } from "react-hook-form";
import { ProfileFormData } from "./schemas";
import { motion, AnimatePresence } from "framer-motion";
import {
  School,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  AlignLeft,
  GraduationCap,
  ChevronRight,
  Building2,
  ImageOff,
  Link2,
  ScrollText,
  Image as ImageIcon,
} from "lucide-react";

const EducationSection = () => {
  const { register, control, watch } = useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const watchedEducation = watch("education");

  const emptyEntry = {
    title: "",
    degree: "",
    description: "",
    logo: "",
    link: "",
    startDate: "",
    endDate: "",
    location: "",
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl border border-border shadow-sm overflow-hidden mb-8 transition-colors duration-300">
      <div className="px-8 py-10 border-b border-border bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <School className="w-32 h-32 text-brand-600" />
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-brand-600/10 dark:bg-brand-600/20 p-4 rounded-xl text-brand-600 shadow-sm ring-1 ring-brand-600/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              Academic Background
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Showcase your education and credentials.
            </p>
          </div>
        </div>
        <button
          type="button"
          id="add-education-btn"
          onClick={() => append(emptyEntry)}
          className="px-6 py-3 text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 active:scale-95 z-10"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => {
              const edu = watchedEducation?.[index] || field;
              const logoUrl = edu.logo ?? "";
              const certUrl = edu.link ?? "";

              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-white dark:bg-slate-800/40 rounded-xl border border-border p-8 transition-all duration-500 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5"
                >
                  {/* Delete button */}
                  <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:right-4 group-hover:top-4">
                    <button
                      type="button"
                      id={`education-remove-btn-${index}`}
                      onClick={() => remove(index)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-8">

                    {/* ── Top: Logo + Institution + Degree ── */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">

                      {/* Institution logo avatar */}
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-border shadow-inner overflow-hidden group-hover:border-brand-500/20 transition-colors">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt="Institution logo"
                            className="w-full h-full object-contain p-1.5"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                              (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full items-center justify-center ${logoUrl ? "hidden" : "flex"}`}
                        >
                          <School className="w-10 h-10 text-muted-foreground/30 group-hover:text-brand-600/40 transition-colors duration-500" />
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-2">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                            Institution Name
                          </label>
                          <input
                            id={`education-title-${index}`}
                            {...register(`education.${index}.title`)}
                            placeholder="e.g. Stanford University"
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1 flex items-center gap-1.5">
                            <ScrollText className="w-3 h-3" /> Degree / Certificate Title
                          </label>
                          <input
                            id={`education-degree-${index}`}
                            {...register(`education.${index}.degree`)}
                            placeholder="e.g. B.S. Software Engineering"
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-3 text-sm font-semibold text-brand-600 dark:text-brand-400 placeholder:text-brand-500/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Institution Logo URL ── */}
                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-border p-5 space-y-3">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                        <Building2 className="w-3 h-3" /> Institution Logo
                      </label>
                      <div className="flex items-center gap-4">
                        {/* Thumbnail */}
                        <div className="w-12 h-12 shrink-0 rounded-xl border-2 border-dashed border-border bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden shadow-inner">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt="Logo preview"
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                                (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full items-center justify-center ${logoUrl ? "hidden" : "flex"}`}>
                            <ImageOff className="w-4 h-4 text-muted-foreground/20" />
                          </div>
                        </div>
                        {/* URL input */}
                        <div className="flex-1 relative group/input">
                          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
                          <input
                            id={`education-logo-${index}`}
                            {...register(`education.${index}.logo`)}
                            placeholder="https://university.edu/logo.svg"
                            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-border rounded-xl text-xs font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Certificate / Diploma Image ── */}
                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-border p-5 space-y-3">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                        <ImageIcon className="w-3 h-3" /> Certificate / Diploma Image
                      </label>

                      {/* URL input */}
                      <div className="relative group/input">
                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
                        <input
                          id={`education-link-${index}`}
                          {...register(`education.${index}.link`)}
                          placeholder="https://cdn.example.com/my-certificate.jpg"
                          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-border rounded-xl text-xs font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                        />
                      </div>

                      {/* Certificate preview */}
                      <AnimatePresence>
                        {certUrl ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden rounded-xl border border-border bg-white dark:bg-slate-900 shadow-inner"
                          >
                            <img
                              src={certUrl}
                              alt="Certificate preview"
                              className="w-full max-h-64 object-contain p-3"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                                (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex";
                              }}
                            />
                            <div className="hidden flex-col items-center justify-center py-6 text-muted-foreground/30 gap-2">
                              <ImageOff className="w-8 h-8" />
                              <span className="text-[10px] font-semibold uppercase tracking-widest">
                                Invalid image URL
                              </span>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-xl text-muted-foreground/20"
                          >
                            <ScrollText className="w-8 h-8 mb-2" />
                            <span className="text-[10px] font-semibold uppercase tracking-widest">
                              No certificate image yet
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── Location & Duration ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-6 border border-border">
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                          <MapPin className="w-3 h-3" /> Location
                        </label>
                        <input
                          id={`education-location-${index}`}
                          {...register(`education.${index}.location`)}
                          placeholder="City, Country"
                          className="w-full bg-white dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-brand-500/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                          <Calendar className="w-3 h-3" /> Duration Period
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            id={`education-start-${index}`}
                            {...register(`education.${index}.startDate`)}
                            placeholder="From (YYYY)"
                            className="w-full bg-white dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-brand-500/50 text-center transition-all"
                          />
                          <input
                            id={`education-end-${index}`}
                            {...register(`education.${index}.endDate`)}
                            placeholder="To (YYYY)"
                            className="w-full bg-white dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-brand-500/50 text-center transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Description ── */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                        <AlignLeft className="w-3 h-3" /> Key Achievements &amp; Details
                      </label>
                      <textarea
                        id={`education-description-${index}`}
                        {...register(`education.${index}.description`)}
                        rows={3}
                        placeholder="Highlight relevant coursework, honors, or research topics..."
                        className="w-full bg-slate-50 dark:bg-slate-800/20 border border-border rounded-xl px-5 py-4 text-xs font-semibold text-muted-foreground placeholder:text-muted-foreground/20 italic focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-900 transition-all duration-300 resize-none leading-relaxed"
                      />
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {fields.length === 0 && (
            <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-800/10 border-2 border-dashed border-border rounded-xl">
              <div className="bg-white dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-border">
                <School className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <h4 className="text-foreground font-semibold text-xl tracking-tight">
                Academic Narrative Empty
              </h4>
              <p className="text-muted-foreground text-sm font-medium mt-2 max-w-xs mx-auto">
                Build your professional authority by adding your formal
                education and degrees.
              </p>
              <button
                type="button"
                id="add-first-education-btn"
                onClick={() => append(emptyEntry)}
                className="mt-10 px-10 py-4 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/30 border border-brand-500/50 flex items-center gap-3 mx-auto"
              >
                Add Your First Degree <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
