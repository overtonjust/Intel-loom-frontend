// Dependencies
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import './InstructorView.scss';
import axios from 'axios';
import { formatTime } from '../../../utils';

// Components
import StudentCard from './components/studentCard';

const InstructorView = () => {
    const { API } = useContext(UserContext);
    const { id } = useParams();
    const [lectureInfo, setLectureInfo] = useState({
        classStudents: [],
        classInfo: {},
        title: '',
        classPictures: []
    });
    const { classStudents, classInfo, classEnd, classStart } = lectureInfo;
    const { title } =  classInfo;
    

    useEffect(() => {
        axios(`${API}/classes/class-date-info/${id}`, { withCredentials: true })
        .then(res => setLectureInfo(res.data))
        .catch(err => console.error(err))
    },[id]);
    const startTime = new Date(classStart).getHours()
    const endTime = new Date(classEnd).getHours()

    console.log(lectureInfo)
    return (
        <main className='lectures'>
            <h1 className='lectures__title'>{title}: {startTime > 12 ? `${startTime - 12}pm` : `${startTime}am`} - {endTime > 12 ? `${endTime - 12}pm` : `${endTime}am` }</h1>
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