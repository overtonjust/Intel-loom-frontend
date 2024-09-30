// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

// Components
import { FaGithub } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__row'>
                <p className='footer__text'>@ Intel Loom, Inc 2024</p> 
                <Link className='footer__link'>
                    <p className='footer__text'>About the team</p>  
                </Link>
            </div>
            <div className='footer__row'>
                <a className='footer__link' href="https://github.com/overtonjust/Intel-loom-frontend">
                    <FaGithub className='footer__icon'/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;