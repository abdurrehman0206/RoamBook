import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { MdTravelExplore } from "react-icons/md";
function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">
          <h1 className="c-ac1">
            RoamBo
            <MdTravelExplore />k
          </h1>
        </div>
        <div className="navbar-actions">
          <button className="btn-primary">Login</button>
        </div>
        <div className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/tours">Tours</NavLink>
          <NavLink to="/destinations">Destinations</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
