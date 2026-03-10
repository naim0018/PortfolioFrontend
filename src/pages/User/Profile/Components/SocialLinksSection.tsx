import { useFieldArray, useFormContext } from "react-hook-form";
import { ProfileFormData } from "./schemas";
import {
  Share2,
  Plus,
  Trash2,
  Link as LinkIcon,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Slack,
  Twitch,
  Dribbble,
  Codepen,
  Gitlab,
  Figma,
  Framer,
  Coffee,
  Zap,
  Terminal,
  Briefcase,
  GraduationCap,
  Award,
  Book,
  Heart,
  Star,
  Smile,
  User,
  Chrome,
  Rss,
  Hash,
  X,
  Smartphone,
  Monitor,
  Database,
  Server,
  Code2,
  Cpu,
  Globe2,
  Layers,
  Layout,
  MousePointer2,
  Package,
  Pocket,
  Send,
  Trello,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IconOption } from "./IconPickerPopover";
import IconPickerPopover from "./IconPickerPopover";

const SOCIAL_ICONS: IconOption[] = [
  { id: "github", icon: Github, label: "GitHub" },
  { id: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { id: "twitter", icon: Twitter, label: "Twitter/X" },
  { id: "x", icon: X, label: "X" },
  { id: "youtube", icon: Youtube, label: "YouTube" },
  { id: "facebook", icon: Facebook, label: "Facebook" },
  { id: "instagram", icon: Instagram, label: "Instagram" },
  { id: "mail", icon: Mail, label: "Email" },
  { id: "message-circle", icon: MessageCircle, label: "WhatsApp" },
  { id: "phone", icon: Phone, label: "Phone" },
  { id: "slack", icon: Slack, label: "Slack" },
  { id: "twitch", icon: Twitch, label: "Twitch" },
  { id: "dribbble", icon: Dribbble, label: "Dribbble" },
  { id: "codepen", icon: Codepen, label: "CodePen" },
  { id: "gitlab", icon: Gitlab, label: "GitLab" },
  { id: "figma", icon: Figma, label: "Figma" },
  { id: "framer", icon: Framer, label: "Framer" },
  { id: "chrome", icon: Chrome, label: "Chrome" },
  { id: "coffee", icon: Coffee, label: "Buy me a Coffee" },
  { id: "zap", icon: Zap, label: "Skill/Zap" },
  { id: "terminal", icon: Terminal, label: "Dev/Terminal" },
  { id: "briefcase", icon: Briefcase, label: "Work/Portfolio" },
  { id: "graduation-cap", icon: GraduationCap, label: "Education" },
  { id: "award", icon: Award, label: "Award" },
  { id: "book", icon: Book, label: "Blog" },
  { id: "rss", icon: Rss, label: "RSS Feed" },
  { id: "globe", icon: Globe, label: "Website" },
  { id: "globe2", icon: Globe2, label: "Global Domain" },
  { id: "link", icon: LinkIcon, label: "Link" },
  { id: "send", icon: Send, label: "Telegram" },
  { id: "hash", icon: Hash, label: "Hash/Tag" },
  { id: "smartphone", icon: Smartphone, label: "Mobile App" },
  { id: "monitor", icon: Monitor, label: "Desktop App" },
  { id: "database", icon: Database, label: "Database" },
  { id: "server", icon: Server, label: "Server" },
  { id: "code2", icon: Code2, label: "Coding" },
  { id: "cpu", icon: Cpu, label: "Hardware" },
  { id: "layers", icon: Layers, label: "Components" },
  { id: "layout", icon: Layout, label: "UI/UX" },
  { id: "mouse-pointer2", icon: MousePointer2, label: "Pointer" },
  { id: "package", icon: Package, label: "Product" },
  { id: "pocket", icon: Pocket, label: "Pocket" },
  { id: "trello", icon: Trello, label: "Trello" },
  { id: "heart", icon: Heart, label: "Love" },
  { id: "star", icon: Star, label: "Favorite" },
  { id: "smile", icon: Smile, label: "Personal" },
  { id: "user", icon: User, label: "User" },
];

const SocialLinksSection = () => {
  const { register, control, setValue, watch } =
    useFormContext<ProfileFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const watchedLinks = watch("socialLinks");

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl border border-border shadow-sm overflow-hidden mb-8 transition-colors duration-300">
      <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/10">
        <div className="flex items-center gap-4">
          <div className="bg-brand-600/10 dark:bg-brand-600/20 p-2.5 rounded-xl text-brand-600">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              Social Connectivity
            </h3>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              Link your professional networks and socials.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            append({ name: "", link: "", logo: "globe", description: "social" })
          }
          className="px-4 py-2 text-xs font-semibold text-brand-600 bg-brand-600/10 hover:bg-brand-600 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-2 border border-brand-600/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Platform
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => {
              const currentLogo = watchedLinks?.[index]?.logo || "globe";
              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group relative flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-border hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300"
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Icon Selection */}
                    <div className="flex flex-col gap-1.5 md:col-span-1 lg:col-span-1">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                        Icon
                      </label>
                      <IconPickerPopover
                        value={currentLogo}
                        onChange={(newVal) => {
                          setValue(`socialLinks.${index}.logo`, newVal);
                          // Auto-fill name only when picking from gallery and name is still empty
                          const isUrl =
                            newVal.startsWith("http") ||
                            newVal.startsWith("/") ||
                            newVal.startsWith("data:");
                          if (!isUrl) {
                            const found = SOCIAL_ICONS.find(
                              (i) => i.id === newVal,
                            );
                            if (found) {
                              setValue(
                                `socialLinks.${index}.name`,
                                found.label,
                              );
                            }
                          }
                        }}
                        icons={SOCIAL_ICONS}
                        variant="pill"
                        popoverAlign="start"
                      />
                    </div>

                    {/* Platform Name Input */}
                    <div className="relative group/input flex flex-col gap-1.5 md:col-span-1 lg:col-span-2">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                        Platform Name
                      </label>
                      <input
                        {...register(`socialLinks.${index}.name`)}
                        placeholder="e.g. GitHub, LinkedIn..."
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all duration-300 shadow-sm"
                      />
                    </div>

                    {/* URL Input */}
                    <div className="relative group/input flex flex-col gap-1.5 md:col-span-2 lg:col-span-2">
                      <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                        Profile URL
                      </label>
                      <div className="relative flex">
                        <div className="flex items-center justify-center px-4 bg-muted border border-r-0 border-border rounded-l-xl text-muted-foreground group-focus-within/input:bg-brand-50 group-focus-within/input:text-brand-600 group-focus-within/input:border-brand-500/50 transition-all">
                          <LinkIcon className="w-3.5 h-3.5" />
                        </div>
                        <input
                          {...register(`socialLinks.${index}.link`)}
                          placeholder="https://..."
                          className="w-full px-4 py-3 bg-background border border-border rounded-r-xl text-sm font-semibold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all duration-300 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Hidden input for description */}
                    <input
                      type="hidden"
                      {...register(`socialLinks.${index}.description`)}
                      value="social"
                    />
                  </div>

                  <div className="flex items-end pb-1">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-300 border border-transparent hover:border-destructive/20 active:scale-90 flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {fields.length === 0 && (
            <div className="text-center py-12 rounded-xl border-2 border-dashed border-border bg-slate-50/50 dark:bg-slate-800/20">
              <div className="bg-white dark:bg-slate-900 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-border">
                <Share2 className="w-6 h-6 text-muted-foreground/40" />
              </div>
              <h4 className="text-foreground font-semibold tracking-tight">
                Expand Your Reach
              </h4>
              <p className="text-muted-foreground text-xs font-semibold mt-1">
                Connect your digital footprints here.
              </p>
              <button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    link: "",
                    logo: "globe",
                    description: "social",
                  })
                }
                className="mt-6 px-6 py-2.5 text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 border border-brand-500/50"
              >
                Add My First Link
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;
