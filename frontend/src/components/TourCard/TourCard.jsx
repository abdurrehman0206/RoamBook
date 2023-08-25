import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function TourCard(props) {
  const nav = useNavigate();
  const { tour } = props;

  return (
    <div className="tour-card-container">
      <div className="tour-card">
        <div
          className="tour-card-image"
          onMouseEnter={(e) => {
            if (e.target.id === "tour-image") {
              e.target.style.animation = "flip 0.5s ease-in-out";
              e.target.src = tour.images[0];
            }
          }}
          onMouseLeave={(e) => {
            if (e.target.id === "tour-image") {
              e.target.style.animation = "flipBack 0.5s ease-in-out";
              e.target.src = tour.images[1];
            }
          }}
        >
          <span
            className="tour-detail-button"
            onClick={() => nav(`/tours/${tour._id}`)}
          >
            <BsFillArrowRightCircleFill />
          </span>
          <small className="tour-location-float c-ac2">
            {" "}
            <FaLocationDot />
            {tour.destination}
          </small>
          <img src={tour.images[1]} alt="" id="tour-image" />
          <div className="tour-card-body">
            <div className="tour-title">
              <h4>{tour.title}</h4>
            </div>
            <div className="tour-info">
              <small className="tour-price c-ac2">
                ${Math.round(tour.price / tour.duration)} / day
              </small>
              <small className="tour-days c-ac2">{tour.duration} Days</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
