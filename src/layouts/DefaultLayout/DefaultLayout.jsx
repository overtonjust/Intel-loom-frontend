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
import { FaCaretUp } from "react-icons/fa";

const DefaultLayout = () => {
  const API = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : false;
  });
  const [message, setMessage] = useState(false);

  const [showScrollUpButton, setShowScrollUpButton] = useState(false);

  const [isNavVisible, setIsNavVisible] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const scrollToTop = () => {
    scrollRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowScrollUpButton(false);
  };

  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = scrollRef.current.scrollTop;
      if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
        setShowScrollUpButton(true);
      } else {
        setIsNavVisible(true);
        setShowScrollUpButton(false);
      }
      lastScrollY = currentScrollY;
    };
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, setMessage, API }}>
      <article className="default-mobile-layout">
        <header className="default-mobile-layout__header">
          <Brand />
        </header>
        <section ref={scrollRef} className="default-mobile-layout__content">
          <Outlet />
          <Footer />
          {message && <PopUp message={message} setMessage={setMessage} />}
          {showScrollUpButton && (
            <button className="scroll-up-button" onClick={scrollToTop}>
              <FaCaretUp />
            </button>
          )}
        </section>
        <footer
          className={`default-mobile-layout__footer ${isNavVisible ? "visible" : "hidden"}`}
        >
          <MobileNav />
        </footer>
      </article>
    </UserContext.Provider>
  );
};

export default DefaultLayout;
