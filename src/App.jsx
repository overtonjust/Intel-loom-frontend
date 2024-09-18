// Dependencies
import React from 'react';
import { Route } from 'react-router-dom';

// Layouts
import DefaultLayout from './layouts/DefaultLayout';

// Components

// Pages

const App = () => {
  return (
    <Route path='/' element={<DefaultLayout/>}>

    </Route>
  );
};

export default App;