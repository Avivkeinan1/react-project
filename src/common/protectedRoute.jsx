import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();

  if (!user || (onlyBiz && !user.biz)) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};
export default ProtectedRoute;
