// Dependencies
import React from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import {  isHourFromStart, isClassDayToday } from '../../utils';
import './ClassCard.scss';

const ClassCard = ({ classInfo, dateId, dateInfo }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { classId , title, highlightPicture, classPictures, price } = classInfo;
    
    let { classStart, classEnd } = dateInfo || '';
    const startTime = new Date(classStart).toLocaleTimeString('en-US', {timeStyle: "short"});
    const endTime = new Date(classEnd).toLocaleTimeString('en-US', {timeStyle: "short"});

    const handleJoinRoom = (e, id) => {
        e.stopPropagation();
        navigate(`/view/${id}`)
    };

    return (
        <section onClick={ dateId ? () => navigate(`/mylectures/${dateId}`) : () => navigate(`/classInfo/${classId}`)} className='class'>
            <h2 className='class__title '>{ title }</h2>
            <img className='class__image' src={ highlightPicture ? highlightPicture : classPictures[0] } alt={ title } />
            <article className='class__info-box'>
                <div className='class__row'>
                    <p className='class__text'>${Number(price).toFixed(0)}</p>
                    {pathname.includes('/myclasses') && 
                        <p className='class__time'>{startTime} - {endTime}</p>
                    }
                    {pathname.includes('/myclasses') && isClassDayToday(classStart) && isHourFromStart(classStart) && 
                            <button className='button-orange class__link' onClick={(e) => handleJoinRoom(e, classId)}>
                                Join Class
                            </button>
                    }
                </div>
            </article>
        </section>
    );
};

export default ClassCard;
