// Dependencies
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatDate, formatTime, checkTime } from '../../utils';
import './ClassCard.scss';

const ClassCard = ({ classInfo, dateId }) => {
    const { classId , title, highlightPicture, classPictures, price } = classInfo;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    /* const classIsToday = formatDate(new Date()) === formatDate(classInfo.classDate);
    const currentTime = new Date().getHours() + ':' + new Date().getMinutes();
    const checkedTime = checkTime(currentTime, classInfo.classTimeStart);
    const withInTime =  checkedTime.hours <= 1 && checkedTime.minutes === 0;
    */

    return (
        <section onClick={ dateId ? () => navigate(`/mylectures/${dateId}`) : () => navigate(`/classInfo/${classId}`)} className='class'>
            <h2 className='class__title '>{ pathname.includes('classInfo') ? '' : title }</h2>
            <img className='class__image' src={ highlightPicture ? highlightPicture : classPictures[0] } alt={ title } />
            <article className='class__info-box'>
                <div className='class__column'>
                    <p className='class__text'>2 hr</p>
                    <p className='class__text'>${Number(price).toFixed(0)}</p>
                </div>
                    {true && 
                            <Link className='button-orange class__link' to={'/view'}>
                                Join Class
                            </Link>
                    }
            </article>
        </section>
    );
};

export default ClassCard;
