// Dependencies
import "./DefaultLayout.scss";
import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

// Contexts
import { UserContext } from "../../context/UserContext";

// Components
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import Brand from "./components/Brand";
import PopUp from "./components/PopUp";

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
    if(shouldScroll) {
      scrollRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setShouldScroll(false)
    }
  }, [shouldScroll])

  useSessionChecker(API, setUser, user);
  
  return (
    <UserContext.Provider value={{ user, setUser, setMessage, API, setShouldScroll }}>
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
    </UserContext.Provider>
  );
};

export default DefaultLayout;
