import React from "react";
import { useNavigate } from "react-router-dom";
import { useToursContext } from "../../hooks/useToursContext";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { BiCurrentLocation } from "react-icons/bi";

function Tours() {
  const nav = useNavigate();
  const { tours } = useToursContext();
  console.log("🚀 ~ file: Tours.jsx:5 ~ Tours ~ tours:", tours);

  if (!tours) {
    return;
  }
  return (
    <div className="tours-container">
      <div className="tours">
        {tours.map((tour) => (
          <div key={tour._id} className="tour-block">
            <div className="tour-block-image">
              <small className="tour-location-float c-ac2 ">
                <FaLocationDot /> {tour.destination.split(",")[1]}
              </small>
              <small className="tour-duration-float c-ac2 ">
                <FaClock /> {tour.duration} days
              </small>
              <img src={tour.images[0]} alt="" />
            </div>
            <div className="tour-block-body">
              <div className="tour-block-title">{tour.title}</div>
              <div className="tour-block-info">
                <div className="tour-block-spot">
                  {" "}
                  <BiCurrentLocation className="c-ac1" />
                  {tour.destination.split(",")[0]}
                </div>
                <div className="tour-block-price">
                  ${Math.round(tour.price / tour.duration)}/Day
                </div>
              </div>
              <div className="tour-block-desc">{tour.description}</div>
              <button
                className="btn-box-primary"
                onClick={() => nav(`/tours/${tour._id}`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tours;
