import Profile from "@/pages/Admin/Profile/Profile";
import {
  ChartPie,
} from "lucide-react";

import { Outlet } from "react-router-dom";

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
        element: <Outlet />,
      },
      {
        icon: <ChartPie />,
        name: "Profile",
        path: "profile",
        element: <Profile />,
      }
    ],
  }
];
