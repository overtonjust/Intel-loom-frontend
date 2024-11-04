import { Link, useNavigate, useLocation } from "react-router-dom";
import "./DesktopNav.scss";

const DesktopNav = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNotLoginPage = location.pathname !== "/login";

  return (
    <nav className="desktop-nav">
      <Link className="nav-link" to="/">
        Home
      </Link>
      {user ? (
        <>
          <Link className="nav-link" to="/myclasses">
            My Classes
          </Link>
          <Link className="nav-link" to="/forums">
            Forums
          </Link>
          <Link className="nav-link" to={`/profile/${user.userId}`}>
            Profile
          </Link>
        </>
      ) : isNotLoginPage ? (
        <button className="button-orange" onClick={() => navigate("/login")}>
          Login
        </button>
      ) : null}
    </nav>
  );
};

export default DesktopNav;
