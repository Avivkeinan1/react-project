import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
const SignOut = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/react-project");
  }, []);
  return;
};
export default SignOut;
