// Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';


// Layouts
import DefaultLayout from './layouts/DefaultLayout';

// Components
import SearchBar from './layouts/components/SearchBar';

// Pages
import Conference from './pages/conference/Conference';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
      </Route>
    </Routes>
  );
};

export default App;