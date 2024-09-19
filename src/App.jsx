// Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';


// Layouts
import DefaultLayout from './layouts/DefaultLayout';

// Components

// Pages
import Conference from './pages/conference/Conference';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout/>}>
      </Route>
    </Routes>
  );
};

export default App;