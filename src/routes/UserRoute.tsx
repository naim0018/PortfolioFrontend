import { ChartPie, Layout, UserCircle } from "lucide-react";
import PortfolioTemplate from "@/pages/User/PortfolioTemplate/PortfolioTemplate";
import TemplateGallery from "@/pages/Admin/TemplateGallery/TemplateGallery";
import Profile from "@/pages/User/Profile/Profile";

export const userRoute = [
  {
    icon: <Layout />,
    label: "Browse Templates",
    path: "portfolio-template", // Keeping same path but using Gallery
    element: <TemplateGallery />,
  },
  {
    icon: <ChartPie />,
    label: "Live Preview",
    path: "preview",
    element: <PortfolioTemplate />,
  },
  {
    icon: <UserCircle />,
    name: "My Profile",
    path: "profile",
    element: <Profile />,
  },
];
