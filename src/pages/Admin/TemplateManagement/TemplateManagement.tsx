import { useGetTemplatesQuery, useCreateTemplateMutation, useDeleteTemplateMutation } from "@/store/Api/portfolio.api";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";

const TemplateManagement = () => {
  const { data: templatesResponse, isLoading } = useGetTemplatesQuery();
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation();
  const [deleteTemplate] = useDeleteTemplateMutation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    images: "", // comma separated for now
    link: ""
  });

  const templates = templatesResponse?.data || [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        images: formData.images.split(",").map(i => i.trim()).filter(Boolean)
      };
      await createTemplate(payload).unwrap();
      toast.success("Template created successfully!");
      setIsModalOpen(false);
      setFormData({ title: "", description: "", coverImage: "", images: "", link: "" });
    } catch {
      toast.error("Failed to create template");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await deleteTemplate(id).unwrap();
        toast.success("Template deleted");
      } catch {
        toast.error("Failed to delete template");
      }
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading templates...</div>;

  return (
    <div className="admin-dark max-w-7xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 border-l-4 border-brand-600 pl-4">Template Library</h2>
          <p className="mt-2 text-slate-500">Configure portfolio designs available for users.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition"
        >
          <Plus size={20} /> Add New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template: any) => (
          <div key={template._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
              <img 
                src={template.coverImage || "/placeholder.jpg"} 
                alt={template.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button 
                  onClick={() => handleDelete(template._id)}
                  className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900">{template.title}</h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">{template.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ImageIcon size={14} /> {template.images?.length || 0} Images
                </div>
                <a 
                  href={template.link} 
                  target="_blank" 
                  className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Preview <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Create New Template</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Title</label>
                <input 
                  required
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-brand-500 outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea 
                  required
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-brand-500 outline-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Cover Image URL</label>
                <input 
                  required
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-brand-500 outline-none"
                  value={formData.coverImage}
                  onChange={e => setFormData({...formData, coverImage: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Demo Link</label>
                <input 
                  required
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-brand-500 outline-none"
                  value={formData.link}
                  onChange={e => setFormData({...formData, link: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Gallery Images (CSV)</label>
                <input 
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="url1, url2, url3"
                  value={formData.images}
                  onChange={e => setFormData({...formData, images: e.target.value})}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="submit" 
                  disabled={isCreating}
                  className="flex-1 bg-brand-600 text-white py-2 rounded-lg font-bold hover:bg-brand-700 disabled:opacity-50"
                >
                  {isCreating ? "Saving..." : "Create Template"}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManagement;
