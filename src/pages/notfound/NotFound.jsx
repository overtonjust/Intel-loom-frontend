import React from "react";
import { Link } from "react-router-dom";
import './NotFound.scss'

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="logo-wrapper">
                <img src={`${import.meta.env.BASE_URL}Intel_Loom_Logo.png`} alt="Intel Loom Logo" className="logo" />
                <div className="magnifying-glass"></div>
            </div>
            <h1>404 - Page Not Found</h1>
            <p> The page you're looking for doesn't exist.</p>
            <Link to='/'>Go back to Home</Link>
        </div>
    )
}

export default NotFound;