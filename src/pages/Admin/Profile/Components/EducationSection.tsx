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
} from "lucide-react";

const EducationSection = () => {
  const { register, control } = useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl border border-border shadow-sm overflow-hidden mb-8 transition-colors duration-300">
      <div className="px-8 py-10 border-b border-border bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <School className="w-32 h-32 text-brand-600" />
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-brand-600/10 dark:bg-brand-600/20 p-4 rounded-2xl text-brand-600 shadow-sm ring-1 ring-brand-600/20">
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
          onClick={() =>
            append({
              title: "",
              degree: "",
              description: "",
              logo: "school",
              link: "",
              startDate: "",
              endDate: "",
              location: "",
            })
          }
          className="px-6 py-3 text-xs font-semibold text-white bg-brand-600 rounded-2xl hover:bg-brand-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 active:scale-95 z-10"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-white dark:bg-slate-800/40 rounded-[2rem] border border-border p-8 transition-all duration-500 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5"
              >
                <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:right-4 group-hover:top-4">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Top Header Section */}
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10 transition-colors border border-border group-hover:border-brand-500/20 shadow-inner">
                      <School className="w-10 h-10 text-muted-foreground group-hover:text-brand-600 transition-all duration-500 group-hover:scale-110" />
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                          Institution Name
                        </label>
                        <input
                          {...register(`education.${index}.title`)}
                          placeholder="e.g. Stanford University"
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                          Degree / Certificate
                        </label>
                        <input
                          {...register(`education.${index}.degree`)}
                          placeholder="e.g. B.S. Software Engineering"
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-3 text-sm font-semibold text-brand-600 dark:text-brand-400 placeholder:text-brand-500/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Middle Meta Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-border">
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                        <MapPin className="w-3 h-3" /> Location
                      </label>
                      <input
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
                          {...register(`education.${index}.startDate`)}
                          placeholder="From (YYYY)"
                          className="w-full bg-white dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-brand-500/50 text-center transition-all"
                        />
                        <input
                          {...register(`education.${index}.endDate`)}
                          placeholder="To (YYYY)"
                          className="w-full bg-white dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-brand-500/50 text-center transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Textarea Section */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
                      <AlignLeft className="w-3 h-3" /> Key Achievements &
                      Details
                    </label>
                    <textarea
                      {...register(`education.${index}.description`)}
                      rows={3}
                      placeholder="Highlight relevant coursework, honors, or research topics..."
                      className="w-full bg-slate-50 dark:bg-slate-800/20 border border-border rounded-2xl px-5 py-4 text-xs font-semibold text-muted-foreground placeholder:text-muted-foreground/20 italic focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-900 transition-all duration-300 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {fields.length === 0 && (
            <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-800/10 border-2 border-dashed border-border rounded-[2.5rem]">
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
                onClick={() =>
                  append({
                    title: "",
                    degree: "",
                    description: "",
                    logo: "school",
                    link: "",
                    startDate: "",
                    endDate: "",
                    location: "",
                  })
                }
                className="mt-10 px-10 py-4 text-sm font-semibold text-white bg-brand-600 rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/30 border border-brand-500/50 flex items-center gap-3 mx-auto"
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
