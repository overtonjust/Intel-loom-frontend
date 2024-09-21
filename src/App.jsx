// Dependencies
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

// Components


// Pages
import Home from './pages/home/Home';
import UserPage from './pages/UserPage';
import Login from './pages/login/Login';
import Conference from './pages/conference/Conference';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/profile/:id' element={<UserPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/view' element={<Conference/>}/>
      </Route>  
    </Routes>

  );
};

export default App;
