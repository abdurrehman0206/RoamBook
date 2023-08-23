import React from "react";
import heroImage from "../../assets/hero-right.jpg";
function Hero() {
  return (
    <div className="hero-container">
      <div className="hero">
        <div className="hero-left">
          <h2 className="c-ac1">
            Unlock Your Next Adventure with Seamless Travel Booking at RoamBook
          </h2>
          <p>
            Discover handpicked tours, effortless planning, and unforgettable
            experiences in one place
          </p>
          <button className="btn-box-primary">Explore</button>
        </div>
        <div className="hero-right">
          <img src={heroImage} alt="hero" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
