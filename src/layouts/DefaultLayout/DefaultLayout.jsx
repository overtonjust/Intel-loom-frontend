// Dependencies
import "./DefaultLayout.scss";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";

// Contexts
import { UserContext } from "../../context/UserContext";

// Components
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import Brand from "./components/Brand";
import PopUp from "./components/PopUp";
import DesktopNav from "./components/DesktopNav";

// Hooks
import useSessionChecker from "./hooks/useSessionChecker";

const DefaultLayout = () => {
  const API = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : false;
  });
  const [message, setMessage] = useState(false);

  const [shouldScroll, setShouldScroll] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (shouldScroll) {
      scrollRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  useSessionChecker(API, setUser, user);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const fitsOneColumn = useMediaQuery({ query: "(max-width: 550px)" });
  const fitsTwoColumns = useMediaQuery({ query: "(max-width: 900px)" });
  const fitsThreeColumns = useMediaQuery({ query: "(max-width: 1280px)" });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setMessage,
        API,
        setShouldScroll,
        isTabletOrMobile,
        fitsOneColumn,
        fitsTwoColumns,
        fitsThreeColumns,
      }}
    >
      {isTabletOrMobile ? (
        <article className="default-mobile-layout">
          <header className="default-mobile-layout__header">
            <Brand />
          </header>
          <section ref={scrollRef} className="default-mobile-layout__content">
            <Outlet />
            <Footer />
            {message && <PopUp message={message} setMessage={setMessage} />}
          </section>
          <footer className="default-mobile-layout__footer">
            <MobileNav />
          </footer>
        </article>
      ) : (
        <article className="default-desktop-layout">
          <header className="default-desktop-layout__header">
            <Brand />
            <DesktopNav user={user} />
          </header>
          <section ref={scrollRef} className="default-desktop-layout__content">
            <Outlet />
            <Footer />
            {message && <PopUp message={message} setMessage={setMessage} />}
          </section>
        </article>
      )}
    </UserContext.Provider>
  );
};

export default DefaultLayout;
