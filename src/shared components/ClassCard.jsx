// Dependencies
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatDate, formatTime, checkTime } from '../../utils';
import './ClassCard.scss';

const ClassCard = ({ classInfo }) => {
    const {pathname} = useLocation();
    /* const classIsToday = formatDate(new Date()) === formatDate(classInfo.classDate);
    const currentTime = new Date().getHours() + ':' + new Date().getMinutes();
    const checkedTime = checkTime(currentTime, classInfo.classTimeStart);
    const withInTime =  checkedTime.hours <= 1 && checkedTime.minutes === 0;
    */

    return (
        <Link to={`/classinfo/${classInfo.classId}`}>
            <section className='class'>
                <h2 className='class__title '>{pathname.includes('classInfo') ? '' : classInfo.title}</h2>
                <img className='class__image' src={classInfo.highlightPicture} alt={classInfo.title} />
                <article className='class__info-box'>
                    <div className='class__row'>
                        <p className='class__text'>2 hr</p>
                    </div>
                    <div className='class__row'>
                        <p className='class__text'>${Number(classInfo.price).toFixed(0)}</p>
                        {true && 
                                <Link className='button-orange' to={'/view'}>
                                    Join Class
                                </Link>
                        }
                    </div>
                </article>
            </section>
        </Link>
    );
};

export default ClassCard;
