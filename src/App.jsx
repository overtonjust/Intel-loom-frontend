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
import ClassPage from './pages/classpage/ClassPage';
import MyClasses from './pages/myclasses/MyClasses';
import Register from './pages/register/Register';
import InstructorView from './pages/instructorview/InstructorView';
import CreateClass from './pages/createclass/CreateClass';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path='/profile/:id' element={<UserPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/classInfo/:id' element={<ClassPage />} />
        <Route path='/view' element={<Conference/>}/>
        <Route path='mylectures/:id' element={<InstructorView/>}/>
        <Route path='/myclasses/*' element={<MyClasses/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/create-class' element={<CreateClass />} />
      </Route>  
    </Routes>

  );
};

export default App;
