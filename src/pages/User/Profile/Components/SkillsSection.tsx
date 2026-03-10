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
  Globe,
  Github,
  Linkedin,
  Twitter,
  Database,
  Server,
  Code2,
  Cpu,
  Layout,
  Package,
  Terminal,
  Figma,
  Zap,
  Framer,
  Monitor,
  Smartphone,
  Cloud,
  Box,
  Container,
  Braces,
  FileCode,
  GitBranch,
  GitMerge,
  Network,
  Shield,
  TestTube,
  Workflow,
  Wand2,
  BarChart2,
  Globe2,
  Hash,
  Laptop,
  Lock,
  Puzzle,
  Settings,
  Triangle,
} from "lucide-react";
import { IconOption } from "./IconPickerPopover";
import IconPickerPopover from "./IconPickerPopover";

const SKILL_ICONS: IconOption[] = [
  { id: "code", icon: Code, label: "Generic Code" },
  { id: "code2", icon: Code2, label: "Code" },
  { id: "braces", icon: Braces, label: "JS/TS" },
  { id: "file-code", icon: FileCode, label: "File/Code" },
  { id: "terminal", icon: Terminal, label: "Terminal/CLI" },
  { id: "database", icon: Database, label: "Database" },
  { id: "server", icon: Server, label: "Server / Node" },
  { id: "cloud", icon: Cloud, label: "Cloud / AWS" },
  { id: "network", icon: Network, label: "Networking" },
  { id: "container", icon: Container, label: "Docker" },
  { id: "box", icon: Box, label: "Package / npm" },
  { id: "package", icon: Package, label: "Package Manager" },
  { id: "cpu", icon: Cpu, label: "CPU / Hardware" },
  { id: "monitor", icon: Monitor, label: "Desktop App" },
  { id: "smartphone", icon: Smartphone, label: "Mobile App" },
  { id: "laptop", icon: Laptop, label: "Full-stack" },
  { id: "layout", icon: Layout, label: "UI / Frontend" },
  { id: "figma", icon: Figma, label: "Figma / Design" },
  { id: "framer", icon: Framer, label: "Framer / Motion" },
  { id: "wand2", icon: Wand2, label: "AI / Magic" },
  { id: "zap", icon: Zap, label: "Speed / Vite" },
  { id: "triangle", icon: Triangle, label: "Vercel / Next.js" },
  { id: "git-branch", icon: GitBranch, label: "Git Branch" },
  { id: "git-merge", icon: GitMerge, label: "Git Merge / CI" },
  { id: "workflow", icon: Workflow, label: "CI/CD Pipeline" },
  { id: "shield", icon: Shield, label: "Security / Auth" },
  { id: "lock", icon: Lock, label: "Auth / JWT" },
  { id: "test-tube", icon: TestTube, label: "Testing" },
  { id: "bar-chart2", icon: BarChart2, label: "Analytics" },
  { id: "settings", icon: Settings, label: "DevOps / Config" },
  { id: "puzzle", icon: Puzzle, label: "Plugin / Extension" },
  { id: "layers", icon: Layers, label: "Layers / Stack" },
  { id: "hash", icon: Hash, label: "CSS / Sass" },
  { id: "globe", icon: Globe, label: "Web / HTTP" },
  { id: "globe2", icon: Globe2, label: "GraphQL / REST" },
  { id: "github", icon: Github, label: "GitHub" },
  { id: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { id: "twitter", icon: Twitter, label: "Twitter" },
];

const SkillsSection = () => {
  const { register, control, setValue, watch } =
    useFormContext<ProfileFormData>();

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
          <div className="bg-brand-600/10 dark:bg-brand-600/20 p-4 rounded-xl text-brand-600 shadow-sm ring-1 ring-brand-600/20">
            <Code className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              Technical Skills
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
          className="px-6 py-3 text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 active:scale-95 z-10"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => {
              const currentLogo = watchedSkills?.[index]?.logo || "code";
              const currentProgress =
                watchedSkills?.[index]?.progress ?? field.progress;

              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-white dark:bg-slate-800/40 rounded-xl border border-border p-8 transition-all duration-500 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 overflow-hidden"
                >
                  {/* Delete button */}
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
                    {/* Icon + Skill Name Row */}
                    <div className="flex items-end gap-4">
                      {/* Icon Picker */}
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                          Icon
                        </label>
                        <IconPickerPopover
                          value={currentLogo}
                          onChange={(newVal) =>
                            setValue(`skills.${index}.logo`, newVal)
                          }
                          icons={SKILL_ICONS}
                          variant="square"
                          popoverAlign="start"
                        />
                      </div>

                      {/* Technology Name */}
                      <div className="flex-1 space-y-1">
                        <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                          Technology
                        </label>
                        <input
                          {...register(`skills.${index}.name`)}
                          placeholder="e.g. React.js"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-brand-500/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Category + Mastery Row */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Category — free text input */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 pl-1">
                          <Layers className="w-3 h-3" /> Category
                        </label>
                        <input
                          {...register(`skills.${index}.category`)}
                          placeholder="e.g. Frontend, DevOps…"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-[11px] font-semibold text-brand-600 dark:text-brand-400 placeholder:text-muted-foreground/30 focus:outline-none focus:border-brand-500/50 transition-all"
                        />
                      </div>

                      {/* Mastery — number input */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 pl-1 justify-end">
                          Mastery Level <Sparkles className="w-3 h-3" />
                        </label>
                        <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-2.5 justify-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            {...register(`skills.${index}.progress`, {
                              valueAsNumber: true,
                              min: 0,
                              max: 100,
                            })}
                            className="w-12 text-right text-[11px] font-semibold text-foreground bg-transparent border-none p-0 focus:ring-0"
                          />
                          <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar with interactive slider */}
                    <div className="space-y-2">
                      {/* Slider */}
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={isNaN(currentProgress) ? 0 : currentProgress}
                        onChange={(e) => {
                          setValue(
                            `skills.${index}.progress`,
                            Number(e.target.value),
                          );
                        }}
                        className="w-full h-1.5 appearance-none rounded-full cursor-pointer
                          bg-slate-200 dark:bg-slate-700
                          accent-brand-600
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-4
                          [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-brand-600
                          [&::-webkit-slider-thumb]:shadow-md
                          [&::-webkit-slider-thumb]:border-2
                          [&::-webkit-slider-thumb]:border-white
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-moz-range-thumb]:w-4
                          [&::-moz-range-thumb]:h-4
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-brand-600
                          [&::-moz-range-thumb]:border-2
                          [&::-moz-range-thumb]:border-white
                          [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, var(--color-brand-600, #4f46e5) 0%, var(--color-brand-600, #4f46e5) ${isNaN(currentProgress) ? 0 : currentProgress}%, #e2e8f0 ${isNaN(currentProgress) ? 0 : currentProgress}%, #e2e8f0 100%)`,
                        }}
                      />
                      {/* Animated fill bar */}
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-border/50">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full shadow-lg shadow-brand-500/20"
                          animate={{
                            width: `${isNaN(currentProgress) ? 0 : currentProgress}%`,
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {fields.length === 0 && (
            <div className="md:col-span-2 text-center py-20 bg-slate-50/50 dark:bg-slate-800/10 border-2 border-dashed border-border rounded-xl">
              <div className="bg-white dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-border">
                <Bolt className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <h4 className="text-foreground font-semibold text-xl tracking-tight">
                Empty Tech Skills
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
                className="mt-10 px-10 py-4 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/30 border border-brand-500/50 flex items-center gap-3 mx-auto"
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
