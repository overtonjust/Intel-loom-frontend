// Dependencies
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./MobileNav.scss";

// Components
import {
  faHouse,
  faCalendarCheck,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const MobileNav = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="mobile-nav" style={{justifyContent: user ? 'space-between' : 'space-around'}}>
      <Link className="mobile-nav__link" to={"/"}>
        <FontAwesomeIcon className="mobile-nav__icon" icon={faHouse} />
      </Link>
      {user && (
        <>
          <Link className="mobile-nav__link" to={"/myclasses"}>
            <FontAwesomeIcon
              className="mobile-nav__icon"
              icon={faCalendarCheck}
            />
          </Link>
          <Link className="mobile-nav__link" to={"/"}>
            <FontAwesomeIcon className="mobile-nav__icon" icon={faBookmark} />
          </Link>
        </>
      )}
      <Link
        className="mobile-nav__link"
        to={user ? `/profile/${user.userId}` : "/login"}
      >
        <FontAwesomeIcon className="mobile-nav__icon" icon={faUser} />
      </Link>
    </section>
  );
};

export default MobileNav;
