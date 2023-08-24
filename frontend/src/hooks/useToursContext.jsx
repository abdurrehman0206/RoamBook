import { useContext } from "react";
import { ToursContext } from "../context/ToursContext";

export const useToursContext = () => {
  const context = useContext(ToursContext);
  if (!context) {
    throw new Error(
      "useToursContext must be used within a ToursContextProvider"
    );
  } else {
    return context;
  }
};
