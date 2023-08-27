import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/login`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        toast.success(json.message);
        setError(null);
        dispatch({
          type: "LOGIN",
          payload: json.user,
        });
        localStorage.setItem("user", JSON.stringify(json.user));
      } else {
        toast.error(error);
        setError(json.error);
      }
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
};
