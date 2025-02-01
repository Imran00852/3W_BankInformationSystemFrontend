import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { context } from "../main";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(context);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
