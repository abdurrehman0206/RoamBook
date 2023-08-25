import React, { useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
function Tour() {
  const nav = useNavigate();
  const { tourId } = useParams();
  const [singleTour, setSingleTour] = useState();
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    if (!tourId) return;
    const fetchTourById = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/tours/${tourId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${localStorage.getItem(token)}`,
            },
          }
        );
        const json = await response.json();
        if (json.success) {
          setSingleTour(json.data);
        } else {
          console.log(json.error);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTourById();
  }, [tourId]);
  if (!singleTour) {
    return null;
  }
  console.table(singleTour);
  return (
    <div className="tour-container">
      <BsFillArrowLeftCircleFill
        className="c-ac1 back-icon"
        onClick={() => nav("/tours")}
      />
      <div className="tour">
        <div className="tour-top">
          <div className="tour-top-left">
            <div className="tour-top-left-header">
              <div className="single-tour-title">{singleTour.title}</div>
            </div>
            <div className="single-tour-rating">
              <div className="stars">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <span className="ratings-number">
                ({singleTour.ratings.length})
              </span>
            </div>
            {/* <div className="single-tour-destination c-ac2">
              <FaLocationDot />
              {singleTour.destination}
            </div> */}
            <div className="single-tour-desc">{singleTour.description}</div>
            <div className="single-tour-price">${singleTour.price}</div>
            <div className="tour-timing-info">
              <div className="tour-start-date">
                {new Date(
                  singleTour.startDate.split("T")[0]
                ).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="tour-end-date">
                {new Date(singleTour.endDate.split("T")[0]).toLocaleDateString(
                  "en-us",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </div>
            </div>
          </div>
          <div className="tour-top-right">
            <img src={singleTour.images[0]} alt="" />
          </div>
        </div>
        <div className="tour-bottom">
          <div className="tour-itinerary">
            {singleTour.itinerary.map((day) => {
              return (
                <div key={day.day} className="itinerary-item">
                  <span className="day-bullet">{day.day}</span>
                  <span className="day-desc">{day.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
