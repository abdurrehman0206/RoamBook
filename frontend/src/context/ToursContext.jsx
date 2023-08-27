import { createContext, useReducer, useLayoutEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const toursReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOURS":
      return {
        tours: action.payload,
      };

    case "CLEAR_TOURS":
      return {
        tours: null,
      };

    default:
      return state;
  }
};
export const ToursContext = createContext();
export const ToursContextProvider = ({ children }) => {
  const initialState = {
    tours: null,
  };

  const [state, dispatch] = useReducer(toursReducer, initialState);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    if (!user) {
      return;
    }
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/tours`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        if (response.ok && json.success) {
          dispatch({
            type: "SET_TOURS",
            payload: json.data,
          });
        } else if (!json.success) {
          console.log(json.error);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [user]);
  return (
    <ToursContext.Provider value={{ ...state, loading, dispatch }}>
      {children}
    </ToursContext.Provider>
  );
};
