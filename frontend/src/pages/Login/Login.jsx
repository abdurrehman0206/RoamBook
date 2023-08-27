import React, { useState } from "react";
import login_image from "../../assets/login-page.jpg";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
function Login() {
  const { login } = useLogin();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(user.email, user.password);
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="image-container">
          <img src={login_image} alt="" />
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
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button className="btn-primary" onClick={handleLogin}>
            Login
          </button>
          <small>
            New to RoamBook? <NavLink to="/signup">Join</NavLink> us today and
            turn wanderlust into reality!
          </small>
        </form>
      </div>
    </div>
  );
}

export default Login;
