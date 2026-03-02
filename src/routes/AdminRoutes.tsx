import Overview from "@/pages/Admin/Overview/Overview";
import { ChartPie, UsersIcon, LayoutPanelLeft } from "lucide-react";
import UserManagement from "@/pages/Admin/UserManagement/UserManagement";
import TemplateManagement from "@/pages/Admin/TemplateManagement/TemplateManagement";

// Import new page components (assuming these exist or will be created)
// For now, I'll use AdminDashboard as a placeholder for new elements if they don't exist.
// You would replace these with actual component imports as needed.

export const adminRoutes = [
  {
    group: "Main Menu",
    items: [
      {
        icon: <ChartPie />,
        name: "Overview",
        path: "overview",
        element: <Overview />,
      },
      {
        icon: <UsersIcon />,
        name: "User Management",
        path: "users",
        element: <UserManagement />,
      },
      {
        icon: <LayoutPanelLeft />,
        name: "Template Management",
        path: "templates",
        element: <TemplateManagement />,
      },
    ],
  },
];
