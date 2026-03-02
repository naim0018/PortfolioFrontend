import { useGetTemplatesQuery, useGetSinglePortfolioQuery, useUpdatePortfolioMutation } from "@/store/Api/portfolio.api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { Check, Eye, Layout } from "lucide-react";

const TemplateGallery = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: templatesResponse, isLoading: templatesLoading } = useGetTemplatesQuery();
  const { data: profileResponse } = useGetSinglePortfolioQuery(user?.id as string, { skip: !user?.id });
  const [updatePortfolio, { isLoading: isUpdating }] = useUpdatePortfolioMutation();

  const templates = templatesResponse?.data || [];
  const currentTemplate = profileResponse?.data?.selectedTemplate;

  const handleSelect = async (templateId: string) => {
    try {
      await updatePortfolio({ 
        id: profileResponse?.data?._id || user?.id as string, 
        body: { selectedTemplate: templateId } 
      }).unwrap();
      toast.success("Design updated successfully!");
    } catch {
      toast.error("Failed to update template preference");
    }
  };

  if (templatesLoading) return <div className="p-8 text-center text-slate-500">Discovering layouts...</div>;

  return (
    <div className="admin-dark max-w-7xl mx-auto space-y-8 p-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 border-l-4 border-brand-600 pl-4">Choose Your Theme</h2>
        <p className="mt-2 text-slate-500">Select a design that matches your personal brand. Your portfolio will update instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template: any) => {
          const isSelected = currentTemplate === template._id;
          
          return (
            <div 
              key={template._id} 
              className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-300 group ${
                isSelected ? "border-brand-600 shadow-brand-50" : "border-slate-100 hover:border-slate-300 shadow-sm"
              }`}
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img 
                  src={template.coverImage} 
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a 
                    href={template.link} 
                    target="_blank" 
                    className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition shadow-lg"
                    title="Live Preview"
                  >
                    <Eye size={20} />
                  </a>
                </div>
                {isSelected && (
                  <div className="absolute top-4 left-4 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                    <Check size={14} /> Active Theme
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{template.title}</h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">{template.description}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => handleSelect(template._id)}
                    disabled={isSelected || isUpdating}
                    className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                      isSelected 
                        ? "bg-slate-50 text-slate-400 cursor-default" 
                        : "bg-brand-600 text-white hover:bg-brand-700 active:scale-95 shadow-lg shadow-brand-100"
                    }`}
                  >
                    <Layout size={18} />
                    {isSelected ? "Currently Using" : isUpdating ? "Applying..." : "Select Theme"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {templates.length === 0 && (
        <div className="p-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <Layout className="mx-auto text-slate-300 mb-4" size={48} />
          <p className="text-slate-500 font-medium">No templates are active yet. Contact an administrator.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;
