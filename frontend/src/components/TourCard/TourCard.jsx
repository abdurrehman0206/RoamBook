import React from "react";
import testImage from "../../assets/hero-right.jpg";
import { FaLocationDot } from "react-icons/fa6";

function TourCard(props) {
  return (
    <div className="tour-card-container">
      <div className="tour-card">
        <div className="tour-card-image">
          <small className="tour-location-float c-ac2">
            {" "}
            <FaLocationDot />
            Denmark
          </small>
          <img src={testImage} alt="" />
          <div className="tour-card-body">
            <div className="tour-info">
              <small className="tour-days c-ac2">7 Days</small>
              <small className="tour-price c-ac2">$50/day</small>
            </div>
            <div className="tour-title">
              <h4>Blue Lagoon</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
