// Dependencies
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

// Components


// Pages
import Home from './pages/home/Home';
import UserPage from './pages/UserPage/UserPage';
import Login from './pages/login/Login';
import Conference from './pages/conference/Conference';
import ClassPage from './pages/classpage/ClassPage'
// import InstructorPage from './pages/instructorpage/InstructorPage';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/profile/:id' element={<UserPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/classInfo/:id' element={<ClassPage />} />
        <Route path='/view' element={<Conference/>}/>
      </Route>  
      {/* <Route path="/instructor/:id" element={<InstructorPage />} /> */}
    </Routes>

  );
};

export default App;
