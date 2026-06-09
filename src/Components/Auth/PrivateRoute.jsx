import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  // Wait until Firebase finishes checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>

          <p className="mt-4 text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If user exists allow access
  if (user) {
    return children;
  }

  // Redirect to login and remember previous page
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
