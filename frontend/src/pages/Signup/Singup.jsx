import React, { useState } from "react";
import signup_image from "../../assets/Signup.jpeg";
import { NavLink } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
function Signup() {
  const { signup } = useSignup();
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  });
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(
      user.email,
      user.password,
      user.fullname,
      user.username,
      image
    );
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="image-container">
          <img src={signup_image} alt="" />
        </div>
        <form className="auth-form">
          <p>
            <span className="c-ac1">
              Embark on Your Next Journey with RoamBook <br />
            </span>
            Your Travel Companion Awaits!
          </p>
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="Password">Password</label> */}
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="Password">Password</label> */}
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Fullname"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="Password">Password</label> */}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="Password">Password</label> */}
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button className="btn-primary" onClick={handleSignup}>
            Signup
          </button>
          <small>
            Already a RoamBooker? Glide in by{" "}
            <NavLink to="/login">logging in</NavLink>
          </small>
        </form>
      </div>
    </div>
  );
}

export default Signup;
