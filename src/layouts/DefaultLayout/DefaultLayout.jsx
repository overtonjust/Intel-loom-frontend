// Dependencies
import './DefaultLayout.scss'
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Contexts
import { UserContext } from '../../context/UserContext';

// Components
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import SearchBar from "./components/SearchBar";
import Brand from '../../shared components/Brand';
import PopUp from '../../shared components/PopUp';

const DefaultLayout = () => {
  const API = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : false;
  })
  const [message, setMessage] = useState(false);


  const location = useLocation();
  const hideSearchBarOn = ["users", "view", 'login'];
  const showSearchBar = hideSearchBarOn.every(
    (path) => !location.pathname.includes(path)
  );

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  
  return (
    <UserContext.Provider value={{ user, setUser, setMessage, API }}>
      <article className='default-mobile-layout'>
        <header className='default-mobile-layout__header'>
          {showSearchBar ? <SearchBar /> : <Brand />}
        </header>
        <section className='default-mobile-layout__content'>
          <Outlet />
          <Footer />
          {message && <PopUp message={message} setMessage={setMessage}/>}
        </section>
        <footer className='default-mobile-layout__footer'>
          <MobileNav />
        </footer>
      </article>
    </UserContext.Provider>
  );
};

export default DefaultLayout;
