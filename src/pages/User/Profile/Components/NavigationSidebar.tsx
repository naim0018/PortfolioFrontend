import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type TabId =
  | "profile"
  | "skills"
  | "projects"
  | "experience"
  | "education";

interface Tab {
  id: TabId;
  title: string;
  description: string;
  step: number;
}

const TABS: Tab[] = [
  {
    id: "profile",
    title: "Profile Information",
    description: "Basic details & bio",
    step: 1,
  },
  {
    id: "skills",
    title: "Skills & Tech",
    description: "Tech stack proficiency",
    step: 2,
  },
  {
    id: "projects",
    title: "Projects",
    description: "Case studies & work",
    step: 3,
  },
  {
    id: "experience",
    title: "Experience",
    description: "Work history",
    step: 4,
  },
  {
    id: "education",
    title: "Education",
    description: "Degrees & courses",
    step: 5,
  },
];

interface NavigationSidebarProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  completedTabs: TabId[];
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  activeTab,
  onTabChange,
  completedTabs,
}) => {
  return (
    <aside className="w-full md:w-80 bg-white border-r border-border flex-shrink-0 sticky top-0 md:h-[calc(100vh-120px)] overflow-y-auto hidden md:block rounded-xl shadow-sm transition-colors duration-300">
      <div className="p-8">
        <nav className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-[15px] top-4 bottom-10 w-[2px] bg-muted z-0">
            <motion.div
              className="w-full bg-brand-600 origin-top"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY:
                  TABS.findIndex((t) => t.id === activeTab) / (TABS.length - 1),
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-8">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const isCompleted = completedTabs.includes(tab.id);

              return (
                <div
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative z-10 flex gap-4 group cursor-pointer transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs transition-all duration-300 shadow-sm",
                      isActive
                        ? "bg-brand-600 border-brand-600 text-white scale-110"
                        : isCompleted
                          ? "bg-brand-50 border-transparent text-brand-600 dark:bg-brand-600/20 dark:text-brand-400"
                          : "bg-background border-border text-muted-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <span className="font-semibold">{tab.step}</span>
                    )}
                  </div>
                  <div className="pt-0.5">
                    <span
                      className={cn(
                        "block text-sm font-semibold transition-colors duration-300",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {tab.title}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      {tab.description}
                    </p>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute -left-8 top-0 bottom-0 w-1 bg-brand-600 rounded-r-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default NavigationSidebar;
