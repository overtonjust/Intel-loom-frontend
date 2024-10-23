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
import NotFound from './pages/notfound/NotFound';
import InstructorView from './pages/instructorview/InstructorView';
import CreateClass from './pages/createclass/CreateClass';
import ClassTemplate from './pages/classtemplate/ClassTemplate';
import Forums from './pages/forums/Forums';
import ForumPage from './pages/forumpage/ForumPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path='/profile/:id' element={<UserPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/classInfo/:id' element={<ClassPage />} />
        <Route path='/view/:id' element={<Conference/>}/>
        <Route path='mylectures/:id' element={<InstructorView/>}/>
        <Route path='/myclasses/*' element={<MyClasses/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/create-class' element={<CreateClass />} />
        <Route path='class-template/:id' element={<ClassTemplate />} />
        <Route path='/forums' element={<Forums />} />
        <Route path='/forum/:id/*' element={<ForumPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>  
    </Routes>

  );
};

export default App;
