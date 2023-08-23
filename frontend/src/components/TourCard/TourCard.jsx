import React from "react";
import testImage from "../../assets/hero-right.jpg";
import { FaLocationDot } from "react-icons/fa6";
function TourCard(props) {
  return (
    <div className="tour-card-container">
      <div className="tour-card">
        <div className="tour-card-image">
          <span className="tour-location-float">
            {" "}
            <FaLocationDot />
            Denmark
          </span>
          <img src={testImage} alt="" />
          <div className="tour-card-body">
            <div className="tour-title">Hello</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
