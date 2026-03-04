import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { profileSchema, ProfileFormData } from "./Components/schemas";
import ProfileDetailsForm from "./Components/ProfileDetailsForm";
import SocialLinksSection from "./Components/SocialLinksSection";
import ProjectsSection from "./Components/ProjectsSection";
import SkillsSection from "./Components/SkillsSection";
import ExperienceSection from "./Components/ExperienceSection";
import EducationSection from "./Components/EducationSection";
import NavigationSidebar, { TabId } from "./Components/NavigationSidebar";
import {
  useGetSinglePortfolioQuery,
  useUpdatePortfolioMutation,
  useCreatePortfolioMutation,
} from "@/store/Api/portfolio.api";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [completedTabs, setCompletedTabs] = useState<TabId[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: portfolioResponse, isLoading: isFetching } = useGetSinglePortfolioQuery(
    user?.id as string,
    { skip: !user?.id }
  );
  const [updatePortfolio, { isLoading: isUpdating }] =
    useUpdatePortfolioMutation();
  const [createPortfolio, { isLoading: isCreating }] =
    useCreatePortfolioMutation();

  const portfolioData = portfolioResponse?.data;

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      socialLinks: [],
      projects: [],
      skills: [],
      experience: [],
      education: [],
    },
  });

  const { reset, handleSubmit, watch, setValue } = methods;

  // Use useMemo or just calculate during render if it's lightweight, 
  // but since we pass it to NavigationSidebar, keeping it as state or memo is better.
  const watchedData = watch();

  useEffect(() => {
    const completed: TabId[] = [];
    if (watchedData.name && watchedData.email) completed.push("profile");
    if (watchedData.skills && watchedData.skills.length > 0) completed.push("skills");
    if (watchedData.projects && watchedData.projects.length > 0) completed.push("projects");
    if (watchedData.experience && watchedData.experience.length > 0) completed.push("experience");
    if (watchedData.education && watchedData.education.length > 0) completed.push("education");
    
    // Check if the content actually changed before updating state to avoid infinite loops
    setCompletedTabs(prev => {
      if (prev.length === completed.length && prev.every((v, i) => v === completed[i])) {
        return prev;
      }
      return completed;
    });
  }, [watchedData.name, watchedData.email, watchedData.skills, watchedData.projects, watchedData.experience, watchedData.education]);

  useEffect(() => {
    if (portfolioData) {
      reset(portfolioData);
    }
  }, [portfolioData, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // If portfolioData exists, we update. 
      // We can use either portfolioData._id or user.id since backend now supports both.
      if (portfolioData) {
        const idToUpdate = portfolioData._id || user?.id;
        await updatePortfolio({
          id: idToUpdate as string,
          body: data,
        }).unwrap();
        toast.success(`Portfolio ${data.status === 'draft' ? 'saved as draft' : 'updated'} successfully`);
      } else {
        // Prepare creation payload with userId
        const creationData = {
          ...data,
          userId: user?.id,
        };
        await createPortfolio(creationData as any).unwrap();
        toast.success(`Portfolio ${data.status === 'draft' ? 'saved as draft' : 'created'} successfully`);
      }
    } catch (error) {
      console.error("Failed to save portfolio:", error);
      toast.error("Failed to save portfolio");
    }
  };

  const handleSaveDraft = () => {
    setValue("status", "draft");
    handleSubmit(onSubmit, onError)();
  };

  const handlePublish = () => {
    setValue("status", "published");
    handleSubmit(onSubmit, onError)();
  };

  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
    toast.error("Please check the form for errors");
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileDetailsForm />
            <SocialLinksSection />
          </motion.div>
        );
      case "skills":
        return (
          <motion.div
            key="skills"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SkillsSection />
          </motion.div>
        );
      case "projects":
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectsSection />
          </motion.div>
        );
      case "experience":
        return (
          <motion.div
            key="experience"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ExperienceSection />
          </motion.div>
        );
      case "education":
        return (
          <motion.div
            key="education"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EducationSection />
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        {/* Global Progress Tracking */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-border shadow-sm flex-1 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-600 opacity-20" />
          <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-brand-600/10 dark:bg-brand-600/20 flex flex-col items-center justify-center border border-brand-600/20">
            <span className="text-xl font-semibold text-brand-600 tracking-tighter">
              {Math.round((completedTabs.length / 5) * 100)}%
            </span>
            <span className="text-[8px] font-semibold text-brand-600 uppercase">
              Complete
            </span>
          </div>

          <div className="flex-1 w-full space-y-3">
            <div className="flex justify-between items-end px-1">
              <h4 className="text-sm font-semibold text-foreground tracking-tight flex items-center gap-2">
                Portfolio Integrity Status{" "}
                <div className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
                {portfolioData?.status && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                    portfolioData.status === 'draft' ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                  }`}>
                    {portfolioData.status}
                  </span>
                )}
              </h4>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest italic opacity-60">
                Target: 100% Visibility
              </span>
            </div>

            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-border shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-400 rounded-full shadow-lg shadow-brand-600/20"
                initial={{ width: 0 }}
                animate={{ width: `${(completedTabs.length / 5) * 100}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => reset(portfolioData)}
              className="px-5 py-2.5 text-xs font-semibold text-muted-foreground bg-secondary border border-border rounded-xl hover:bg-muted transition-all duration-300"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isUpdating || isCreating}
              className="px-5 py-2.5 text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-200 rounded-xl hover:bg-brand-100 transition-all duration-300"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={isUpdating || isCreating}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all duration-300 shadow-lg shadow-brand-shadow disabled:opacity-50 flex items-center gap-2"
            >
              {isUpdating || isCreating ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save & Publish"
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <NavigationSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          completedTabs={completedTabs}
        />

        <div className="flex-1 w-full min-h-[600px]">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <AnimatePresence mode="wait">
                {renderActiveSection()}
              </AnimatePresence>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Profile;
