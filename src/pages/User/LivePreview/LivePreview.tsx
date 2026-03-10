import { useParams } from "react-router-dom";
import {
  useGetSinglePortfolioQuery,
  useTrackProfileEventMutation,
} from "@/store/Api/portfolio.api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";

const PortfolioTemplate = () => {
  const { id: paramsId } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.auth.user);

  // Use param ID if it exists (public view), otherwise use logged-in user's ID (private preview)
  const id = paramsId || user?.id;

  const {
    data: response,
    isLoading,
    isError,
  } = useGetSinglePortfolioQuery(id as string, {
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h2 className="text-2xl font-semibold text-foreground">
          Portfolio Not Found
        </h2>
      </div>
    );
  }

  const portfolio = response.data;
  const isDraft = (portfolio as any).status === "draft";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col selection:bg-brand-500/30">
      {isDraft && (
        <div className="bg-brand-600 text-white text-center py-2 text-sm font-bold sticky top-0 z-[60] shadow-md italic">
          🚧 This is a DRAFT version. It may not be visible to the public.
        </div>
      )}

      {/* Modern Top Navigation */}
      <Header name={portfolio.name} />

      <main className="mx-auto w-full max-w-5xl px-6 py-12 md:py-20 flex-1">
        {/* Hero Section */}
        <Hero
          name={portfolio.name}
          profilePicture={portfolio.profilePicture}
          shortDescription={portfolio.shortDescription}
        />

        {/* About Section */}
        <About description={portfolio.longDescription} />

        {/* Selected Projects */}
        <Projects projects={portfolio.projects} />

        {/* Experience Timeline */}
        <Experience experience={portfolio.experience} />

        {/* Technical Proficiencies */}
        <Skills skills={portfolio.skills} />
      </main>

      {/* Footer Area */}
      <Footer name={portfolio.name} />
    </div>
  );
};

export default PortfolioTemplate;
