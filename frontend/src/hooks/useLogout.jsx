import { useNavigate } from "react-router-dom";
import { useToursContext } from "./useToursContext";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
export const useLogout = () => {
  const navigate = useNavigate();

  const toursContext = useToursContext();
  const authContext = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    toursContext.dispatch({ type: "CLEAR_TOURS" });
    authContext.dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return { logout };
};
