import { useFieldArray, useFormContext } from "react-hook-form";
import { ProfileFormData } from "./schemas";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bolt,
  Plus,
  Trash2,
  Code,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const SkillsSection = () => {
  const { register, control, watch } = useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const watchedSkills = watch("skills");

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl border border-border shadow-sm overflow-hidden mb-8 transition-colors duration-300">
      <div className="px-8 py-10 border-b border-border bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Bolt className="w-32 h-32 text-brand-600" />
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-brand-600/10 dark:bg-brand-600/20 p-4 rounded-2xl text-brand-600 shadow-sm ring-1 ring-brand-600/20">
            <Code className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              Technical Arsenal
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Showcase your technology stack and proficiency levels.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              logo: "code",
              progress: 80,
              category: "Frontend",
            })
          }
          className="px-6 py-3 text-xs font-semibold text-white bg-brand-600 rounded-2xl hover:bg-brand-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 active:scale-95 z-10"
        >
          <Plus className="w-4 h-4" />
          Add Arsenal
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-white dark:bg-slate-800/40 rounded-[2rem] border border-border p-8 transition-all duration-500 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 overflow-hidden"
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

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10 transition-colors border border-border group-hover:border-brand-500/20 shadow-inner overflow-hidden">
                      <input
                        {...register(`skills.${index}.logo`)}
                        className="w-full text-center border-none bg-transparent focus:ring-0 p-0 text-muted-foreground font-semibold text-[10px] uppercase group-hover:text-brand-600 transition-colors"
                        placeholder="SVG/ICO"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="space-y-1">
                        <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                          Technology
                        </label>
                        <input
                          {...register(`skills.${index}.name`)}
                          placeholder="e.g. React.js"
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-brand-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 pl-1">
                        <Layers className="w-3 h-3" /> Category
                      </label>
                      <select
                        {...register(`skills.${index}.category`)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 text-[11px] font-semibold text-brand-600 dark:text-brand-400 appearance-none focus:outline-none focus:border-brand-500/50 cursor-pointer transition-all"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 pl-1 justify-end">
                        Mastery Level <Sparkles className="w-3 h-3" />
                      </label>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-2.5 justify-center">
                        <input
                          type="number"
                          {...register(`skills.${index}.progress`, {
                            valueAsNumber: true,
                          })}
                          className="w-10 text-right text-[11px] font-semibold text-foreground bg-transparent border-none p-0 focus:ring-0"
                        />
                        <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-border/50 p-0.5">
                      <motion.div
                        className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full shadow-lg shadow-brand-500/20"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${watchedSkills?.[index]?.progress || field.progress}%`,
                        }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {fields.length === 0 && (
            <div className="md:col-span-2 text-center py-20 bg-slate-50/50 dark:bg-slate-800/10 border-2 border-dashed border-border rounded-[3rem]">
              <div className="bg-white dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-border">
                <Bolt className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <h4 className="text-foreground font-semibold text-xl tracking-tight">
                Empty Tech Arsenal
              </h4>
              <p className="text-muted-foreground text-sm font-medium mt-2 max-w-xs mx-auto">
                Define your field of expertise by adding the technologies you
                master.
              </p>
              <button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    logo: "code",
                    progress: 80,
                    category: "Frontend",
                  })
                }
                className="mt-10 px-10 py-4 text-sm font-semibold text-white bg-brand-600 rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/30 border border-brand-500/50 flex items-center gap-3 mx-auto"
              >
                Add Your First Skill <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
