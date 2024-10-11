// Dependencies
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import './InstructorView.scss';
import axios from 'axios';

// Components
import StudentCard from './components/studentCard';
import MobileCarousel from '../../shared components/carousels/MobileCarousel';

const InstructorView = () => {
    const { API } = useContext(UserContext);
    const { id } = useParams();
    const [lectureInfo, setLectureInfo] = useState({
        classStudents: [],
        classInfo: {},
        title: '',
        classPictures: []
    });
    const { classStudents, classInfo } = lectureInfo;
    const { title, classPictures } =  classInfo
    
    useEffect(() => {
        axios(`${API}/classes/class-date-info/${id}`, { withCredentials: true })
        .then(res => setLectureInfo(res.data))
        .catch(err => console.error(err))
    },[id])
    console.log(lectureInfo)
    return (
        <main className='lectures'>
            <h1 className='lectures__title'>{title}</h1>
            <MobileCarousel imageArr={classPictures} alt={title} />  
            <h3 className='lectures__title'>Students enrolled:</h3>  
            <section className='lectures__students-grid'>
                {classStudents.map(student => (
                    <StudentCard key={student.userId} studentInfo={student}/>
                ))}       
            </section>
        </main>
    );
};

export default InstructorView;