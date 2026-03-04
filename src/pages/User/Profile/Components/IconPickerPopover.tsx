import { useState } from "react";
import { Search, Link as LinkIcon, Globe, ImageOff } from "lucide-react";
import { LucideIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface IconOption {
  id: string;
  icon: LucideIcon;
  label: string;
}

// Detect if a logo value is a URL (custom image) rather than a Lucide icon ID
export const isIconUrl = (val: string) =>
  val?.startsWith("http://") ||
  val?.startsWith("https://") ||
  val?.startsWith("/") ||
  val?.startsWith("data:");

// Shared icon renderer — handles both Lucide IDs and image URLs
interface IconPreviewProps {
  value: string;
  icons: IconOption[];
  className?: string; // applied to Lucide icon (e.g. "w-6 h-6")
  imgClassName?: string; // applied to custom img
}
export const IconPreview = ({
  value,
  icons,
  className = "w-5 h-5",
  imgClassName,
}: IconPreviewProps) => {
  const [imgError, setImgError] = useState(false);

  if (isIconUrl(value)) {
    if (imgError) {
      return <ImageOff className={cn(className, "text-muted-foreground/40")} />;
    }
    return (
      <img
        src={value}
        alt="custom icon"
        className={cn("object-contain", imgClassName ?? className)}
        onError={() => setImgError(true)}
      />
    );
  }

  const found = icons.find((i) => i.id === value);
  if (found) {
    const Icon = found.icon;
    return <Icon className={className} />;
  }
  return <Globe className={className} />;
};

// ──────────────────────────────────────────────
// Main Popover Picker Component
// ──────────────────────────────────────────────
interface IconPickerPopoverProps {
  /** Current icon ID or custom image URL */
  value: string;
  /** Called whenever the user commits a new selection */
  onChange: (value: string) => void;
  /** The icon set to show in the Gallery tab */
  icons: IconOption[];
  /**
   * "square"  → renders a square icon button (used in SkillsSection)
   * "pill"    → renders an inline button with text label (used in SocialLinksSection)
   */
  variant?: "square" | "pill";
  triggerClassName?: string;
  popoverAlign?: "start" | "center" | "end";
}

const IconPickerPopover = ({
  value,
  onChange,
  icons,
  variant = "square",
  triggerClassName,
  popoverAlign = "start",
}: IconPickerPopoverProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"gallery" | "custom">("gallery");
  const [customUrl, setCustomUrl] = useState(isIconUrl(value) ? value : "");
  const [previewError, setPreviewError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const filteredIcons = icons.filter(
    (icon) =>
      icon.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectGalleryIcon = (iconId: string) => {
    onChange(iconId);
  };

  const handleApplyCustomUrl = () => {
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setIsOpen(false);
    }
  };

  const handleCustomUrlChange = (url: string) => {
    setCustomUrl(url);
    setPreviewError(false);
  };

  // Sync local customUrl state if external value changes to a URL
  const displayLabel = isIconUrl(value)
    ? "Custom image"
    : value.replace(/-/g, " ");

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {variant === "square" ? (
          <button
            type="button"
            className={cn(
              "w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center transition-colors border border-border shadow-inner text-brand-600 hover:ring-2 hover:ring-brand-500/30 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:border-brand-500/20",
              triggerClassName,
            )}
          >
            <IconPreview
              value={value}
              icons={icons}
              className="w-6 h-6"
              imgClassName="w-8 h-8 rounded-lg"
            />
          </button>
        ) : (
          <button
            type="button"
            className={cn(
              "flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border border-border rounded-xl text-sm font-semibold text-foreground hover:border-brand-500/50 transition-all duration-300 shadow-sm",
              triggerClassName,
            )}
          >
            <div className="bg-brand-600/10 p-1.5 rounded-lg text-brand-600 flex items-center justify-center w-7 h-7 flex-shrink-0">
              <IconPreview
                value={value}
                icons={icons}
                className="w-4 h-4"
                imgClassName="w-4 h-4 rounded object-contain"
              />
            </div>
            <span className="truncate capitalize text-xs">{displayLabel}</span>
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 rounded-xl border-border shadow-2xl overflow-hidden bg-white dark:bg-slate-900"
        align={popoverAlign}
      >
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-colors",
              activeTab === "gallery"
                ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50/50 dark:bg-brand-600/5"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Search className="w-3.5 h-3.5" />
            Gallery
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("custom")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-colors",
              activeTab === "custom"
                ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50/50 dark:bg-brand-600/5"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Custom URL
          </button>
        </div>

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <>
            <div className="p-3 border-b border-border bg-slate-50/50 dark:bg-slate-800/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50 transition-all"
                />
              </div>
            </div>
            <div className="p-2 max-h-[280px] overflow-y-auto overflow-x-hidden grid grid-cols-4 gap-1">
              {filteredIcons.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => handleSelectGalleryIcon(icon.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200",
                    value === icon.id
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                      : "hover:bg-brand-600/10 text-muted-foreground hover:text-brand-600",
                  )}
                  title={icon.label}
                >
                  <icon.icon className="w-5 h-5" />
                  <span className="text-[9px] font-medium truncate w-full text-center">
                    {icon.id.length > 8 ? icon.id.substring(0, 6) + ".." : icon.id}
                  </span>
                </button>
              ))}
              {filteredIcons.length === 0 && (
                <div className="col-span-4 py-8 text-center text-xs text-muted-foreground italic">
                  No icons found
                </div>
              )}
            </div>
          </>
        )}

        {/* Custom URL Tab */}
        {activeTab === "custom" && (
          <div className="p-4 space-y-4">
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                Paste Image URL
              </p>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="url"
                  placeholder="https://cdn.example.com/icon.svg"
                  value={customUrl}
                  onChange={(e) => handleCustomUrlChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50 transition-all"
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-border min-h-[64px]">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-border flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                {customUrl ? (
                  previewError ? (
                    <ImageOff className="w-5 h-5 text-muted-foreground/40" />
                  ) : (
                    <img
                      src={customUrl}
                      alt="preview"
                      className="w-8 h-8 object-contain"
                      onError={() => setPreviewError(true)}
                    />
                  )
                ) : (
                  <Globe className="w-5 h-5 text-muted-foreground/30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                {customUrl ? (
                  previewError ? (
                    <p className="text-[11px] text-destructive font-medium">
                      ⚠ Could not load image. Check the URL.
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground font-medium break-all line-clamp-2">
                      {customUrl}
                    </p>
                  )
                ) : (
                  <p className="text-[11px] text-muted-foreground italic">
                    Paste a URL above to see a preview
                  </p>
                )}
              </div>
            </div>

            {/* Helpful links */}
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Icon Resources
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "DevIcons", url: "https://devicon.dev" },
                  { label: "SimpleIcons", url: "https://simpleicons.org" },
                  { label: "Iconify", url: "https://icon-sets.iconify.design" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-[10px] font-semibold bg-brand-600/10 text-brand-600 rounded-lg hover:bg-brand-600 hover:text-white transition-all"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={!customUrl.trim() || previewError}
              onClick={handleApplyCustomUrl}
              className="w-full py-2.5 text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-600/20"
            >
              Apply Custom Icon
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default IconPickerPopover;
