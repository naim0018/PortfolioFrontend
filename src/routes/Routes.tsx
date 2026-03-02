import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { adminRoutes } from "./AdminRoutes";
import { routesGenerator } from "@/utils/Generator/RoutesGenerator";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoutes";
import { userRoute } from "./UserRoute";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Signup = lazy(() => import("@/pages/Auth/Signup"));

const routes = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute role="admin">
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
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
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="portfolio-template" replace />,
      },
      ...routesGenerator(userRoute),
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
