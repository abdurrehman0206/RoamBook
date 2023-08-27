import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToursContext } from "../../hooks/useToursContext";
import { FaLocationDot, FaClock } from "react-icons/fa6";
import { BiCurrentLocation } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
function Tours() {
  const nav = useNavigate();
  const { tours } = useToursContext();
  const [searchTerm, setSearchTerm] = useState("");
  if (!tours) {
    return;
  }
  let newTours;
  if (searchTerm) {
    newTours = tours.filter((tour) =>
      tour.destination
        .split(",")[1]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  } else {
    newTours = tours;
  }
  return (
    <div className="tours-container">
      <div className="tours-actions">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Location"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm || ""}
          autoComplete="off"
        />
      </div>
      <div className="tours">
        {newTours.map((tour) => (
          <div key={tour._id} className="tour-block">
            <div className="tour-block-image">
              <small className="tour-location-float c-ac2 ">
                <FaLocationDot /> {tour.destination.split(",")[1]}
              </small>
              <small className="tour-duration-float c-ac2 ">
                <FaClock /> {tour.duration} days
              </small>
              <div className="tour-block-image-slider">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{ clickable: true, dynamicBullets: true }}
                >
                  {tour.images.map((image, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <img src={image} alt="" />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              {/* <img src={tour.images[0]} alt="" /> */}
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
