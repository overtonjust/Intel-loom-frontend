// Dependencies
import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import SearchBar from './components/SearchBar';


const DefaultLayout = () => {
    return (
        <main>
            <SearchBar />
            <Outlet />
            <Footer />
            <MobileNav />
        </main>
    );
};

export default DefaultLayout;