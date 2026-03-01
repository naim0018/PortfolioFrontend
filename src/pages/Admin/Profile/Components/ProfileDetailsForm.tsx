import { useFormContext } from "react-hook-form";
import { ProfileFormData } from "./schemas";
import {
  User,
  Mail,
  FileText,
  Camera,
  Link as LinkIcon,
  AlertCircle,
  Sparkles,
  Link2,
  ImageOff,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileDetailsForm = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  const profilePicture = watch("profilePicture");

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-sm overflow-hidden mb-8 transition-colors duration-300">
      <div className="p-8 space-y-10">
        {/* ── Profile Picture Section ── */}
        <div className="group">
          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* Live avatar preview */}
            <div className="relative shrink-0">
              <div className="h-32 w-32 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-border flex items-center justify-center overflow-hidden relative transition-all duration-500 group-hover:border-brand-500 group-hover:shadow-2xl group-hover:shadow-brand-500/10 group-hover:-translate-y-1">
                {profilePicture ? (
                  <>
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                        (
                          e.currentTarget.nextElementSibling as HTMLElement
                        ).style.display = "flex";
                      }}
                    />
                    {/* broken-image fallback */}
                    <div className="hidden w-full h-full items-center justify-center flex-col gap-1 text-muted-foreground/30">
                      <ImageOff className="w-8 h-8" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">
                        Invalid URL
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-muted-foreground/20">
                    <Camera className="w-10 h-10" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      No Image
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-brand-600/60 backdrop-blur-[4px]">
                  <Camera className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>

              {/* Online badge */}
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-lg border border-border group-hover:scale-110 transition-transform">
                <div className="w-4 h-4 rounded-full bg-brand-600" />
              </div>
            </div>

            {/* URL input + meta */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <h4 className="text-base font-semibold text-foreground">
                  Profile Image
                </h4>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Paste a publicly accessible image URL.
                </p>
              </div>

              {/* URL input */}
              <div className="space-y-2">
                <label
                  htmlFor="profilePicture"
                  className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"
                >
                  <Link2 className="w-3 h-3" /> Image URL
                </label>
                <div className="relative group/input flex items-center">
                  <Link2 className="absolute left-4 w-4 h-4 text-muted-foreground group-focus-within/input:text-brand-500 transition-colors z-10" />
                  <input
                    id="profilePicture"
                    {...register("profilePicture")}
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full pl-11 pr-10 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-border rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 shadow-sm"
                  />
                  {/* Clear button */}
                  <AnimatePresence>
                    {profilePicture && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        type="button"
                        onClick={() =>
                          setValue("profilePicture", "", {
                            shouldValidate: true,
                          })
                        }
                        className="absolute right-3 w-6 h-6 flex items-center justify-center rounded-lg bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {errors.profilePicture && (
                <p className="text-destructive text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />{" "}
                  {errors.profilePicture.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          {/* Full Name */}
          <div className="flex flex-col space-y-2.5">
            <label
              htmlFor="name"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" /> Full Name
            </label>
            <div className="relative group/input">
              <input
                id="name"
                {...register("name")}
                placeholder="e.g. John Doe"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border rounded-xl px-5 py-3.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 shadow-sm"
              />
            </div>
            {errors.name && (
              <p className="text-destructive text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="flex flex-col space-y-2.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" /> Email Address
            </label>
            <div className="relative group/input">
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="e.g. john@example.com"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border rounded-xl px-5 py-3.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 shadow-sm"
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Headline */}
          <div className="md:col-span-2 flex flex-col space-y-2.5">
            <label
              htmlFor="shortDescription"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" /> Headline
            </label>
            <input
              id="shortDescription"
              {...register("shortDescription")}
              placeholder="e.g. Full Stack Developer specializing in React and Node.js"
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border rounded-xl px-5 py-3.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 shadow-sm"
            />
            {errors.shortDescription && (
              <p className="text-destructive text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />{" "}
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          {/* Professional Narrative */}
          <div className="md:col-span-2 flex flex-col space-y-2.5">
            <label
              htmlFor="longDescription"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" /> Professional Narrative
            </label>
            <textarea
              id="longDescription"
              {...register("longDescription")}
              rows={6}
              placeholder="Write a compelling story about your career and passion..."
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border rounded-xl px-5 py-4 text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 resize-none shadow-sm leading-relaxed"
            />
            {errors.longDescription && (
              <p className="text-destructive text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />{" "}
                {errors.longDescription.message}
              </p>
            )}
          </div>

          {/* Resume URL */}
          <div className="md:col-span-2 flex flex-col space-y-2.5">
            <label
              htmlFor="resume"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2"
            >
              <LinkIcon className="w-3.5 h-3.5" /> Resume / CV URL
            </label>
            <div className="relative group/input flex">
              <div className="flex items-center justify-center px-4 bg-muted border border-r-0 border-border rounded-l-xl text-muted-foreground transition-all duration-300 group-focus-within/input:bg-brand-50 group-focus-within/input:text-brand-600 group-focus-within/input:border-brand-500/50">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                id="resume"
                {...register("resume")}
                placeholder="e.g. https://drive.google.com/your-resume-pdf"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border rounded-r-xl px-5 py-3.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 shadow-sm"
              />
            </div>
            {errors.resume && (
              <p className="text-destructive text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.resume.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetailsForm;
