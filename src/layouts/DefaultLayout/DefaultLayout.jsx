// Dependencies
import './DefaultLayout.scss'
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

// Components
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import SearchBar from "./components/SearchBar";
import PopUp from '../../shared components/PopUp';

const DefaultLayout = () => {
  const location = useLocation();
  const hideSearchBarOn = ["users", "view"];
  const showSearchBar = hideSearchBarOn.every(
    (path) => !location.pathname.includes(path)
  );

  return (
    <main>
      {showSearchBar ? <SearchBar /> : <h1>Intel Loom Logo</h1>}
      <Outlet />
      <Footer />
      <MobileNav />
      <PopUp />
    </main>
  );
};

export default DefaultLayout;
