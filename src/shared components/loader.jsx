import React from 'react';
import "../shared components/loader.scss"; 
import logoImage from "../../public/Intel_Loom_Logo.png"

const Loader = () => {
  return (
    <div className="loader">
      <div className="logo-container">
      <img className="moving-logo" src={logoImage}></img>
      </div>
      
      <p className="loading-text">Loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></p>
    </div>
  );
};

export default Loader;
