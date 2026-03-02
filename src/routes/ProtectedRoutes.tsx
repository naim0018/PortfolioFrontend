import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logOut } from "@/store/features/AuthSlice/authSlice";
import React from "react";

const ProtectedRoute = ({ 
  children, 
  role 
}: { 
  children: React.ReactNode;
  role?: string;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  // 1. Check if user is logged in
  if (!user || !user.accessToken) {
    return <Navigate to="/login" replace />;
  }

  // 2. If a specific role is required, check it
  if (role && user.role !== role) {
    dispatch(logOut()); // Optional: force logout if they try to access something they shouldn't
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
