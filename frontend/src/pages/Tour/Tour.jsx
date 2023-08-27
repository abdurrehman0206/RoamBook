import React, { useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import Booking from "../../components/Booking/Booking";

import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loader/Loader";
function Tour() {
  const nav = useNavigate();
  const { user } = useAuthContext();
  const { tourId } = useParams();
  const [singleTour, setSingleTour] = useState();
  const [loading, setLoading] = useState(false);
  const [bookingActive, setBookingActive] = useState(false);

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
              Authorization: `Bearer ${user.token}`,
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
  }, [tourId, user.token]);
  const deactivateBooking = () => {
    setBookingActive(false);
  };
  const onChange = (value) => {
    console.log(`React Stars Rating value is ${value}`);
  };
  if (!singleTour && loading) {
    return <Loader />;
  }
  if (!singleTour && !loading) {
    return null;
  }

  return (
    <div className="tour-container">
      {bookingActive && (
        <Booking
          deactivateBooking={() => deactivateBooking}
          image={singleTour.images[1]}
        />
      )}
      <BsFillArrowLeftCircleFill
        className="c-ac1 back-icon"
        onClick={() => nav("/tours")}
      />
      <div className="tour">
        <section className="tour-top">
          <div className="tour-top-left">
            <img src={singleTour.images[0]} alt="" />
          </div>
        </section>
        <section className="tour-bottom">
          <section className="tour-main-info">
            <section className="tour-header">
              <div className="tour-top-header">
                <div className="single-tour-title">{singleTour.title}</div>
                <div className="single-tour-destination c-ac2">
                  <FaLocationDot />
                  {singleTour.destination.split(",")[1]}
                </div>
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
            </section>
            <div className="single-tour-desc">{singleTour.description}</div>

            <div className="tour--info">
              <div className="tour-location">
                <span>Location </span>
                {singleTour.destination.split(",")[0]}
              </div>
              <div className="tour-start-date">
                <span>Starting </span>
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
                <span>Ending </span>
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
              <div className="tour-duration">
                <span>Duration </span>
                {singleTour.duration} Days
              </div>
              <div className="tour-price">
                <span>Price</span>${singleTour.price}
              </div>
              <button
                className="btn-box-primary"
                onClick={() => setBookingActive(true)}
                disabled={bookingActive}
              >
                Book Now
              </button>
            </div>
          </section>
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

          {/* Itin */}
        </section>
        <h1 className="gallery-heading">Gallery</h1>
        <section className="tour-bottom">
          <div className="tour-top-right">
            {singleTour.images.slice(0, 4).map((image, i) => {
              return (
                <div className="image-gitem" key={i}>
                  <img src={image} alt="" />
                </div>
              );
            })}
          </div>
        </section>
        {/* <div className="tour-itinerary-test">
                <span className="line"></span>
          {singleTour.itinerary.map((day) => {
            return (
              <div key={day.day} className="itinerary-item">
                <span className="day-bullet">{day.day}</span>
                <span className="day-desc">{day.description}</span>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}

export default Tour;

/*
<div className="tour-container">
      <BsFillArrowLeftCircleFill
        className="c-ac1 back-icon"
        onClick={() => nav("/tours")}
      />
      <div className="tour">
        <section className="tour-header">
          <div className="tour-top-header">
            <div className="single-tour-title">{singleTour.title}</div>
            <div className="single-tour-destination c-ac2">
              <FaLocationDot />
              {singleTour.destination.split(",")[1]}
            </div>
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
        </section>
        <section className="tour-top">
          <div className="tour-top-left">
            <img src={singleTour.images[0]} alt="" />
          </div>
          <div className="tour-top-right">
            {singleTour.images.slice(0, 4).map((image, i) => {
              return (
                <div className="image-gitem" key={i}>
                  <img src={image} alt="" />
                </div>
              );
            })}
          </div>
        </section>
        <section className="tour-bottom">
          <section className="tour-main-info">
            <div className="single-tour-desc">{singleTour.description}</div>
            
            <div className="tour--info">
              <div className="tour-location">
                <span>Location </span>
                {singleTour.destination.split(",")[0]}
              </div>
              <div className="tour-start-date">
                <span>Starting </span>
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
                <span>Ending </span>
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
              <div className="tour-duration">
                <span>Duration </span>
                {singleTour.duration} Days
              </div>
              <div className="tour-price">
                <span>Price</span>${singleTour.price}
              </div>
            </div>
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
          </section>
          <section className="tour-booking">
            <h2>Book Now</h2>
            <form>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Phone Number" />
              <input type="number" placeholder="No. of tickets" />
              <button className="btn-primary"> Book</button>
            </form>
          </section>
          //Itinerary orignal place 
        </section>
      </div>
    </div>
    */

// =================================================================
// <div className="tour-container">
//   <BsFillArrowLeftCircleFill
//     className="c-ac1 back-icon"
//     onClick={() => nav("/tours")}
//   />
//   <div className="tour">
//     <div className="tour-top-left">
//       <img src={singleTour.images[0]} alt="" />
//     </div>
//     <section className="tour-top"></section>
//     <section className="tour-bottom">
//       <section className="tour-main-info">
//         <section className="tour-header">
//           <div className="tour-top-header">
//             <div className="single-tour-title">{singleTour.title}</div>
//             <div className="single-tour-destination c-ac2">
//               <FaLocationDot />
//               {singleTour.destination.split(",")[1]}
//             </div>
//           </div>
//           <div className="single-tour-rating">
//             <div className="stars">
//               <AiFillStar />
//               <AiFillStar />
//               <AiFillStar />
//               <AiFillStar />
//               <AiFillStar />
//             </div>
//             <span className="ratings-number">
//               ({singleTour.ratings.length})
//             </span>
//           </div>
//         </section>
//         <div className="single-tour-desc">{singleTour.description}</div>

//         <div className="tour--info">
//           <div className="tour-location">
//             <span>Location </span>
//             {singleTour.destination.split(",")[0]}
//           </div>
//           <div className="tour-start-date">
//             <span>Starting </span>
//             {new Date(
//               singleTour.startDate.split("T")[0]
//             ).toLocaleDateString("en-us", {
//               weekday: "long",
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//             })}
//           </div>
//           <div className="tour-end-date">
//             <span>Ending </span>
//             {new Date(singleTour.endDate.split("T")[0]).toLocaleDateString(
//               "en-us",
//               {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               }
//             )}
//           </div>
//           <div className="tour-duration">
//             <span>Duration </span>
//             {singleTour.duration} Days
//           </div>
//           <div className="tour-price">
//             <span>Price</span>${singleTour.price}
//           </div>
//         </div>
//       </section>
//       <div className="tour-top-right">
//         {singleTour.images.slice(0, 4).map((image, i) => {
//           return (
//             <div className="image-gitem" key={i}>
//               <img src={image} alt="" />
//             </div>
//           );
//         })}
//       </div>

//       {/* Itin */}
//     </section>
//     <section className="tour-bottom">
//       <div className="tour-itinerary">
//         {singleTour.itinerary.map((day) => {
//           return (
//             <div key={day.day} className="itinerary-item">
//               <span className="day-bullet">{day.day}</span>
//               <span className="day-desc">{day.description}</span>
//             </div>
//           );
//         })}
//       </div>
//       <div className="tour-booking">
//         <h2>Book Now</h2>
//         <form>
//           <input type="text" placeholder="Name" />
//           <input type="email" placeholder="Email" />
//           <input type="text" placeholder="Phone Number" />
//           <input type="number" placeholder="No. of tickets" />
//           <button className="btn-primary"> Book</button>
//         </form>
//       </div>
//     </section>
//   </div>
// </div>
