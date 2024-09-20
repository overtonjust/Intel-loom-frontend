// Dependencies
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';

// Layouts
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

// Components


// Pages
import Conference from './pages/conference/Conference';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout/>}>
        <Route path='/users' element={<UserPage/>}/>
        <Route path='/view' element={<Conference/>}/>
      </Route>  
    </Routes>

  );
};

export default App;