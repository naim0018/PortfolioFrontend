import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ProfileFormData, ProjectData } from "./schemas";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Plus,
  Trash2,
  Github,
  Globe,
  Tag,
  Image as ImageIcon,
  Images,
  Sparkles,
  ChevronRight,
  Code2,
  AlertCircle,
  Link2,
  StickyNote,
  X,
} from "lucide-react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

/* ─────────────────────────────────────────────────────────────────────────────
   ImageGalleryManager – manages the `images` string[] for a single project
───────────────────────────────────────────────────────────────────────────── */
interface ImageGalleryManagerProps {
  projectIndex: number;
  images: string[];
  onAdd: (url: string) => void;
  onRemove: (idx: number) => void;
}

const ImageGalleryManager = ({
  projectIndex,
  images,
  onAdd,
  onRemove,
}: ImageGalleryManagerProps) => {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (!isValidUrl(trimmed)) {
      setHasError(true);
      return;
    }
    onAdd(trimmed);
    setInputValue("");
    setHasError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      {/* Add URL row */}
      <div className="flex gap-2">
        <div className="relative flex-1 group/input">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
          <input
            id={`project-image-input-${projectIndex}`}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setHasError(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Paste image URL and press Enter…"
            className={`w-full pl-11 pr-4 py-3 bg-background border rounded-xl text-xs font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all ${
              hasError
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-brand-500/50"
            }`}
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          id={`project-image-add-btn-${projectIndex}`}
          className="shrink-0 px-4 py-3 bg-brand-600 text-white text-xs font-semibold rounded-xl hover:bg-brand-700 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-brand-600/20"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {hasError && (
        <p className="text-destructive text-[10px] font-semibold flex items-center gap-1 pl-1">
          <AlertCircle className="w-3 h-3" /> Please enter a valid URL.
        </p>
      )}

      {/* Image thumbnail grid */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            {images.map((url, imgIdx) => (
              <motion.div
                key={`${url}-${imgIdx}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className="group relative aspect-video rounded-lg overflow-hidden border border-border bg-slate-100 dark:bg-slate-800 shadow-sm"
              >
                <img
                  src={url}
                  alt={`Gallery image ${imgIdx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23e2e8f0'/%3E%3Ctext x='50' y='34' font-family='sans-serif' font-size='9' text-anchor='middle' fill='%2394a3b8'%3EInvalid URL%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Index badge */}
                <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                  #{imgIdx + 1}
                </span>
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => onRemove(imgIdx)}
                  id={`project-image-remove-${projectIndex}-${imgIdx}`}
                  className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-destructive transition-all duration-200 backdrop-blur-sm active:scale-90"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-xl bg-slate-50/50 dark:bg-slate-800/20 text-muted-foreground/30">
          <Images className="w-8 h-8 mb-2" />
          <span className="text-[10px] font-semibold uppercase tracking-widest">
            No gallery images yet
          </span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectCard – single project entry
───────────────────────────────────────────────────────────────────────────── */
interface ProjectCardProps {
  index: number;
  project: Partial<ProjectData>;
  register: UseFormRegister<ProfileFormData>;
  control: Control<ProfileFormData>;
  setValue: UseFormSetValue<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  onRemove: () => void;
  onTagsChange: (index: number, value: string) => void;
}

const ProjectCard = ({
  index,
  project,
  register,
  setValue,
  errors,
  onRemove,
  onTagsChange,
}: ProjectCardProps) => {
  const images: string[] = project.images ?? [];

  const handleAddImage = (url: string) => {
    setValue(`projects.${index}.images`, [...images, url], {
      shouldValidate: true,
    });
  };

  const handleRemoveImage = (imgIdx: number) => {
    const updated = images.filter((_, i) => i !== imgIdx);
    setValue(`projects.${index}.images`, updated, { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative bg-white dark:bg-slate-800/20 rounded-xl border border-border overflow-hidden hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-500"
    >
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={onRemove}
          id={`project-remove-btn-${index}`}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 shadow-lg active:scale-90"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[450px]">
        {/* ── Visual Media Column ── */}
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
                id={`project-cover-${index}`}
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
                Project Title <span className="text-destructive">*</span>
              </label>
              <input
                id={`project-title-${index}`}
                {...register(`projects.${index}.title`)}
                placeholder="e.g. Neural Nexus AI"
                className={`w-full text-center text-xl font-semibold text-foreground border rounded-xl p-2 bg-transparent focus:ring-0 placeholder:text-muted-foreground/20 italic transition-colors ${
                  errors.projects?.[index]?.title
                    ? "border-destructive"
                    : "border-border"
                }`}
              />
              {errors.projects?.[index]?.title && (
                <p className="text-destructive text-[10px] font-semibold flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.projects[index].title?.message}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <div className="h-1 w-12 bg-brand-600 rounded-full group-hover:w-20 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* ── Specs Column ── */}
        <div className="flex-1 p-10 bg-white dark:bg-slate-900/10 flex flex-col gap-10">
          {/* Description */}
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
              <Code2 className="w-3.5 h-3.5" /> Project Blueprint &amp;
              Description
            </label>
            <textarea
              id={`project-description-${index}`}
              {...register(`projects.${index}.description`)}
              rows={4}
              placeholder="Elaborate on the challenges, technical decisions, and standard-setting results..."
              className={`w-full rounded-xl border bg-background shadow-inner focus:ring-4 focus:ring-brand-500/10 sm:text-sm py-5 px-6 transition-all duration-300 resize-none leading-relaxed font-medium text-foreground italic placeholder:text-muted-foreground/30 ${
                errors.projects?.[index]?.description
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-brand-500/50"
              }`}
            />
            {errors.projects?.[index]?.description && (
              <p className="text-destructive text-[10px] font-semibold flex items-center gap-1 pl-1">
                <AlertCircle className="w-3 h-3" />
                {errors.projects[index].description?.message}
              </p>
            )}
          </div>

          {/* Links row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                Repository Link
              </label>
              <div className="relative group/input">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
                <input
                  id={`project-repo-${index}`}
                  {...register(`projects.${index}.repositoryLink`)}
                  placeholder="github.com/organization/repo"
                  className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-xl text-xs font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                Live Link
              </label>
              <div className="relative group/input">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors" />
                <input
                  id={`project-link-${index}`}
                  {...register(`projects.${index}.link`)}
                  placeholder="deployed-artifact.io"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/40 border border-border rounded-xl text-xs font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all"
                />
              </div>
            </div>

            {/* Tags – full width */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5" /> Technology Stack
                </label>
                <span className="text-[9px] font-semibold text-muted-foreground/40 italic">
                  Separate with commas
                </span>
              </div>
              <div className="relative group/input">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500/40 group-focus-within/input:text-brand-500 transition-colors" />
                <input
                  id={`project-tags-${index}`}
                  type="text"
                  defaultValue={(project.tags || []).join(", ")}
                  onBlur={(e) =>
                    onTagsChange(index, (e.target as HTMLInputElement).value)
                  }
                  placeholder="e.g. Next.js 14, GraphQL, Docker, AWS Lambda..."
                  className="w-full pl-11 pr-4 py-4 bg-background border border-border rounded-xl text-[13px] font-semibold text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 shadow-inner transition-all"
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

          {/* ── Image Gallery ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Images className="w-3.5 h-3.5" /> Image Gallery
              </label>
              {images.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-[9px] font-bold bg-brand-600/10 text-brand-600 rounded-lg border border-brand-600/20">
                  {images.length} image{images.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            <ImageGalleryManager
              projectIndex={index}
              images={images}
              onAdd={handleAddImage}
              onRemove={handleRemoveImage}
            />
          </div>

          {/* ── Notes ── */}
          <div className="space-y-3">
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 pl-1">
              <StickyNote className="w-3.5 h-3.5" /> Notes &amp; Context
            </label>
            <textarea
              id={`project-notes-${index}`}
              {...register(`projects.${index}.notes`)}
              rows={3}
              placeholder="Internal notes, future plans, or context for reviewers..."
              className="w-full rounded-xl border border-border bg-background shadow-inner focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 sm:text-sm py-4 px-6 transition-all duration-300 resize-none leading-relaxed font-medium text-foreground placeholder:text-muted-foreground/30"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {errors.projects?.[index] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-8 py-4 bg-destructive/5 border-t border-destructive/10 space-y-1"
          >
            <p className="text-destructive text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Please fix the following before saving:
            </p>
            <ul className="pl-6 space-y-0.5">
              {([
                "title",
                "description",
                "coverImage",
                "link",
                "repositoryLink",
              ] as const).map((field) => {
                const msg = errors.projects?.[index]?.[field]?.message;
                return msg ? (
                  <li
                    key={field}
                    className="text-destructive/80 text-[10px] font-semibold list-disc"
                  >
                    {msg}
                  </li>
                ) : null;
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectsSection
───────────────────────────────────────────────────────────────────────────── */
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
          <div className="bg-brand-600/10 dark:bg-brand-600/20 p-4 rounded-xl text-brand-600 shadow-sm ring-1 ring-brand-600/20">
            <Rocket className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              Project Showcase
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Display your most impactful architectural builds.
            </p>
          </div>
        </div>
        <button
          type="button"
          id="add-project-btn"
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
          className="px-6 py-3 text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-brand-600/20 active:scale-95 z-10"
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
                <ProjectCard
                  key={field.id}
                  index={index}
                  project={project}
                  register={register}
                  control={control}
                  setValue={setValue}
                  errors={errors}
                  onRemove={() => remove(index)}
                  onTagsChange={handleTagsChange}
                />
              );
            })}
          </AnimatePresence>

          {fields.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-border rounded-xl bg-slate-50/50 dark:bg-slate-800/20">
              <div className="bg-white dark:bg-slate-900 w-24 h-24 rounded-xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-border text-muted-foreground/20">
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
                id="add-first-project-btn"
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
