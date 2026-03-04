import {
  useGetTemplatesQuery,
  useGetSinglePortfolioQuery,
  useUpdatePortfolioMutation,
} from "@/store/Api/portfolio.api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import {
  Check,
  Eye,
  Layout,
  Sparkles,
  Wand2,
  ShieldCheck,
  ArrowRight,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TemplateGallery = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: templatesResponse, isLoading: templatesLoading } =
    useGetTemplatesQuery();
  const { data: profileResponse } = useGetSinglePortfolioQuery(
    user?.id as string,
    { skip: !user?.id },
  );
  const [updatePortfolio, { isLoading: isUpdating }] =
    useUpdatePortfolioMutation();

  const templates = templatesResponse?.data || [];
  const currentTemplate = profileResponse?.data?.selectedTemplate;

  const handleSelect = async (templateId: string) => {
    try {
      await updatePortfolio({
        id: profileResponse?.data?._id || (user?.id as string),
        body: { selectedTemplate: templateId },
      }).unwrap();
      toast.success("Design System synchronized!");
    } catch {
      toast.error("Handshake failed. Try again.");
    }
  };

  if (templatesLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] animate-pulse">
          Scanning Blueprint Vault...
        </p>
      </div>
    );
  }

  return (
    <div className=" space-y-16 p-6 pb-20 selection:bg-brand-100 selection:text-brand-900">
      {/* ─── TEMPLATE GRID ─── */}
      <div className="space-y-10">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3 font-black text-slate-900 uppercase tracking-widest text-xs">
            <div className="w-1.5 h-6 bg-brand-600 rounded-full" />
            Available Blueprint Series ({templates.length})
          </div>
          <div className="hidden md:flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {templates.map((template: any, index: number) => {
              const isSelected = currentTemplate === template._id;

              return (
                <motion.div
                  key={template._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative flex flex-col bg-white rounded-xl border-2 transition-all duration-500 overflow-hidden ${
                    isSelected
                      ? "border-brand-600 shadow-2xl shadow-brand-600/10 scale-[1.02]"
                      : "border-slate-100 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden">
                    <img
                      src={template.coverImage}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Floating Badge */}
                    {isSelected && (
                      <div className="absolute top-4 left-4 z-20">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-brand-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 border border-brand-500"
                        >
                          <ShieldCheck size={14} className="animate-pulse" />{" "}
                          Deployment Active
                        </motion.div>
                      </div>
                    )}

                    {/* Overlay Buttons */}
                    <div className="absolute inset-0 z-10 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center gap-4">
                      <a
                        href={template.link}
                        target="_blank"
                        className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-600 hover:text-white transition-all shadow-2xl active:scale-95"
                      >
                        <Eye size={18} /> Live Preview
                      </a>
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight">
                          {template.title}
                        </h3>
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 group-hover:text-brand-600 group-hover:border-brand-100 transition-all">
                          <Layers size={14} />
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {template.description ||
                          "A high-performance portfolio layout engineered for modern professionals."}
                      </p>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={() => handleSelect(template._id)}
                        disabled={isSelected || isUpdating}
                        className={`group/btn w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
                          isSelected
                            ? "bg-slate-50 text-slate-400 border border-slate-200 cursor-default"
                            : "bg-slate-900 text-white hover:bg-brand-600 shadow-xl shadow-slate-200 active:scale-95"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check size={16} /> Currently Implemented
                          </>
                        ) : isUpdating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <span>Integrate Theme</span>
                            <ArrowRight
                              size={16}
                              className="transition-transform group-hover/btn:translate-x-1"
                            />
                            <Wand2
                              size={16}
                              className="absolute right-6 opacity-0 group-hover/btn:opacity-20 group-hover/btn:scale-150 transition-all"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── EMPTY STATE ─── */}
      {templates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center gap-8"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
            <Layout size={48} />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-slate-900 uppercase">
              The Vault is Sealed
            </h4>
            <p className="text-slate-500 font-medium">
              No active synthesis protocols found. Consult your Overseer.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TemplateGallery;
