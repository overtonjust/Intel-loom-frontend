// Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';


// Layouts
import DefaultLayout from './layouts/DefaultLayout';

// Components

// Pages
import Conference from './pages/Conference';


const App = () => {
  return (
    <Routes path='/' element={<DefaultLayout/>}>
      <Route path='/view' element={<Conference/>}></Route>
    </Routes>
  );
};

export default App;