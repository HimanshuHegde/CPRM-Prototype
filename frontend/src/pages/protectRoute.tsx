import React from "react";
import { decodeToken } from "../util/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const user = decodeToken();

  if (!user) {
    return window.location.href = '/';
  }

  if (!allowedRoles.includes(user.role)) {
    return <div className="text-red-600 text-center mt-20"> Access Denied: You are not authorized to view this page.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
