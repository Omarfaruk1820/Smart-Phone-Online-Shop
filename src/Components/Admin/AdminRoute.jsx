import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user || role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
