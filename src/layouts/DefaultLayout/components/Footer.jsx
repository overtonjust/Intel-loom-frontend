// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

// Components
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
        <p className="footer__text">@ Intel Loom, Inc 2024</p>
        <Link className="footer__link">
          <p className="footer__text">About the team</p>
        </Link>
        <a
          className="footer__link"
          href="https://github.com/overtonjust/Intel-loom-frontend"
        >
          <FaGithub className="footer__icon" />
        </a>
    </footer>
  );
};

export default Footer;
