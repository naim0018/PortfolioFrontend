import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { adminRoutes } from "./AdminRoutes";
import { routesGenerator } from "@/utils/Generator/RoutesGenerator";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
const NotFound = lazy(() => import("@/pages/NotFound"));

const routes = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <App />
  //     </Suspense>
  //   ),
  //   children: [
  //     ...routesGenerator(publicRoutes),
  //     {
  //       path: "/form",
  //       element: <Form />,
  //     },
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //     {
  //       path: "/signup",
  //       element: <Signup />,
  //     },
  //   ],
  // },
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      ...routesGenerator(adminRoutes),
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
