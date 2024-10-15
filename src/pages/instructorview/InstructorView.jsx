// Dependencies
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import './InstructorView.scss';
import axios from 'axios';
import { formatDate } from '../../../utils';

// Components
import StudentCard from './components/StudentCard';

const InstructorView = () => {
    const { API } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [lectureInfo, setLectureInfo] = useState({
        classStudents: [],
        classInfo: {},
        title: '',
    });
    const { classStudents, classInfo, classEnd, classStart } = lectureInfo;
    const { title } =  classInfo;
    const today = formatDate(new Date());
    const classDay = formatDate(classStart);
    const currentTime = new Date().toLocaleTimeString('en-US', {timeStyle: 'short'});
    const startTime = new Date(classStart).toLocaleTimeString('en-US', {timeStyle: "short"});
    const endTime = new Date(classEnd).toLocaleTimeString('en-US', {timeStyle: "short"});
    
    useEffect(() => {
        axios(`${API}/classes/class-date-info/${id}`, { withCredentials: true })
        .then(res => setLectureInfo(res.data))
        .catch(err => console.error(err))
    },[id]);

    console.log(startTime , currentTime )
    return (
        <main className='lectures'>
            <header>
                <h1 className='lectures__title'>{title}</h1>
                <h2 className='lectures__title'><span className={classDay === today ? 'alert' : ''}>{classDay === today ? 'Today' : classDay}</span> ({startTime} - {endTime}) {today === classDay && <button className='button-orange' onClick={() => navigate('/view')}>Join call</button>}</h2>
            </header>
            <h4 className='lectures__title'>Students enrolled:</h4>  
            <section className='lectures__students-grid'>
                {classStudents.map(student => (
                    <StudentCard key={student.userId} studentInfo={student}/>
                ))}     
            </section>
        </main>
    );
};

export default InstructorView;