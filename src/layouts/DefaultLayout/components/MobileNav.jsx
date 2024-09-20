// Dependencies
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './MobileNav.scss'

// Components
import { faHouse, faCalendarCheck, faBookmark, faUser  } from '@fortawesome/free-solid-svg-icons';

const MobileNav = () => {
    return (
        <section className='mobile-nav'>
            <Link className='mobile-nav__link' to={'/home'}>
                <FontAwesomeIcon className='mobile-nav__icon' icon={faHouse} />    
            </Link>
            <Link className='mobile-nav__link' to={'/home'}>
                <FontAwesomeIcon className='mobile-nav__icon' icon={faCalendarCheck} />    
            </Link>
            <Link className='mobile-nav__link' to={'/home'}>
                <FontAwesomeIcon className='mobile-nav__icon' icon={faBookmark} />    
            </Link>
            <Link className='mobile-nav__link' to={'/users'}>
                <FontAwesomeIcon className='mobile-nav__icon' icon={faUser} />    
            </Link>
        </section>
    );
};

export default MobileNav;