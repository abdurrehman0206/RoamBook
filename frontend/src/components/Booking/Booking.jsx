import React from "react";

function Booking(props) {
  console.log("🚀 ~ file: Booking.jsx:4 ~ Booking ~ props:", props);
  return (
    <div className="booking-container">
      <div className="const">
        <img src={props.image} alt="" />
        <div className="booking">
          <h1 className="c-ac1">Book Now</h1>
          <form action="" className="booking-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone Number" />
            <input type="number" placeholder="No. Of Tickets" />
          </form>
          <div className="booking-actions">
            <button
              className="btn-box-outline"
              onClick={props.deactivateBooking()}
            >
              Back
            </button>
            <button className="btn-box-primary">Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
