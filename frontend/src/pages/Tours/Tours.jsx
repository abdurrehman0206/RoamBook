import React, { useState, useRef } from "react";
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
  const [sortTerm, setSortTerm] = useState("");
  const daysRef = useRef();
  const priceRef = useRef();
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
  const handleSort = (e) => {
    if (e.target.value === "Days") {
      daysRef.current.style.color = "#ff4c29";
      priceRef.current.style.color = "#f9f5f6";
      setSortTerm(e.target.value);
    } else if (e.target.value === "Price") {
      priceRef.current.style.color = "#ff4c29";
      daysRef.current.style.color = "#f9f5f6";
      setSortTerm(e.target.value);
    } else if (e.target.value === "↺") {
      priceRef.current.style.color = "#f9f5f6";
      daysRef.current.style.color = "#f9f5f6";
      setSortTerm("");
    }

    // reset all other sort terms styles
  };
  if (sortTerm === "Days") {
    newTours = [...newTours].sort((a, b) => a.duration - b.duration);
  } else if (sortTerm === "Price") {
    newTours = [...newTours].sort((a, b) => a.price - b.price);
  } else if (sortTerm === "↺") {
    newTours = tours;
  }
  return (
    <div className="tours-container">
      <div className="tours-actions">
        <div className="sort-action">
          <h4>Sort By</h4>
          <input
            onClick={handleSort}
            value="Days"
            type="button"
            ref={daysRef}
          />
          <input
            onClick={handleSort}
            value="Price"
            type="button"
            ref={priceRef}
          />
          <input onClick={handleSort} value="↺" type="button" />
          {/* <span onClick={handleSort} value='days'>Days</span> */}
        </div>
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
