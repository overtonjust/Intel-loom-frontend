// Dependencies
import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';

const DefaultLayout = () => {
    return (
        <main>
            <Outlet/>

            <Footer/>
            <MobileNav/>
        </main>
    );
};

export default DefaultLayout;