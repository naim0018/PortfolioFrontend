import { useParams } from "react-router-dom";
import { useGetSinglePortfolioQuery, useTrackProfileEventMutation } from "@/store/Api/portfolio.api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const PortfolioTemplate = () => {
  const { id: paramsId } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Use param ID if it exists (public view), otherwise use logged-in user's ID (private preview)
  const id = paramsId || user?.id;

  const { data: response, isLoading, isError } = useGetSinglePortfolioQuery(id as string, {
    skip: !id,
  });
  const [trackEvent] = useTrackProfileEventMutation();

  useEffect(() => {
    if (id) {
      trackEvent({ id, eventType: "view" });
    }
  }, [id, trackEvent]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-700">Portfolio Not Found</h2>
      </div>
    );
  }

  const portfolio = response.data;
  const isDraft = (portfolio as any).status === 'draft';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {isDraft && (
        <div className="bg-amber-500 text-white text-center py-2 text-sm font-bold sticky top-0 z-50 shadow-md">
          🚧 This is a DRAFT version. It may not be visible to the public.
        </div>
      )}
      {/* Header / Hero Section */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10 border-b border-slate-100">
          {portfolio.profilePicture && (
            <img
              src={portfolio.profilePicture}
              alt={portfolio.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {portfolio.name}
            </h1>
            <h2 className="text-xl text-brand-600 font-medium mb-4">
              {portfolio.shortDescription}
            </h2>
            <p className="text-slate-600 max-w-2xl leading-relaxed">
              {portfolio.longDescription}
            </p>
            
            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              {portfolio.resume && (
                <button
                  onClick={() => {
                    trackEvent({ id: id as string, eventType: "resume" });
                    window.open(portfolio.resume, "_blank");
                  }}
                  className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg shadow-md transition-all hover:bg-brand-700 hover:shadow-lg"
                >
                  Download Resume
                </button>
              )}
              {portfolio.socialLinks?.map((link: { link: string; name: string }, idx: number) => (
                <a
                  key={idx}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Experience Section */}
        {portfolio.experience && portfolio.experience.length > 0 && (
          <section>
            <h3 className="text-3xl font-bold mb-8 text-slate-800 border-b pb-4">Experience</h3>
            <div className="grid gap-8">
              {portfolio.experience.map((exp: { logo: string; title: string; location: string; startDate: string; endDate: string; description: string }, idx: number) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex gap-6">
                  {exp.logo && (
                    <img src={exp.logo} alt={exp.title} className="w-16 h-16 rounded-md object-contain" />
                  )}
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{exp.title}</h4>
                    <p className="text-brand-600 font-medium">{exp.location}</p>
                    <p className="text-sm text-slate-500 mb-4">{exp.startDate} - {exp.endDate || "Present"}</p>
                    <p className="text-slate-700 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section>
            <h3 className="text-3xl font-bold mb-8 text-slate-800 border-b pb-4">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.projects.map((proj: { coverImage: string; title: string; description: string; tags: string[]; link: string }, idx: number) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all">
                  {proj.coverImage && (
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{proj.title}</h4>
                    <p className="text-slate-600 mb-4 line-clamp-3">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.tags?.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-brand-600 font-semibold hover:text-brand-800 flex items-center gap-1">
                        View Project &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section>
            <h3 className="text-3xl font-bold mb-8 text-slate-800 border-b pb-4">Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {portfolio.skills.map((skill: { logo: string; name: string; progress: number }, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-3 hover:shadow-md transition-all hover:-translate-y-1">
                  {skill.logo ? (
                    <img src={skill.logo} alt={skill.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">?</div>
                  )}
                  <div className="w-full">
                    <span className="font-semibold text-slate-800 block text-sm mb-2">{skill.name}</span>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-brand-600 h-1.5 rounded-full" style={{ width: `${skill.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <p>&copy; {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
        <p className="text-sm mt-2 opacity-60">Powered by MyApp</p>
      </footer>
    </div>
  );
};

export default PortfolioTemplate;
