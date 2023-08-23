import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import TourCard from "../TourCard/TourCard";
function Pane(props) {
  return (
    <div className="pane-container">
      <div className="pane">
        <div className="pane-header">
          <h2>{props.title}</h2>
          <BsFillArrowRightCircleFill className="view-all-icon c-ac1" />
        </div>
        <div className="pane-body">
          <TourCard />
          <TourCard />
          <TourCard />
          {/* <TourCard />   */}
        </div>
      </div>
    </div>
  );
}

export default Pane;
