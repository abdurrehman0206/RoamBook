import React from "react";
import { BsFillAirplaneFill } from "react-icons/bs";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="icon">
          <BsFillAirplaneFill />
        </div>
      </div>
    </div>
  );
}

export default Loader;
