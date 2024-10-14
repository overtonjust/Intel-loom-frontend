// Dependencies
import React, { useState } from 'react';
import moment  from 'moment'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatDate, formatTime, checkTime } from '../../utils';
import './ClassCard.scss';

const ClassCard = ({ classInfo, dateId, dateInfo }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { classId , title, highlightPicture, classPictures, price } = classInfo;
    
    let { classStart, classEnd } = dateInfo || '';
    const today = formatDate(new Date());
    const classDay = formatDate(classStart);
    const currentTime = new Date().toLocaleTimeString('en-US', {timeStyle: 'short'});
    const startTime = new Date(classStart).toLocaleTimeString('en-US', {timeStyle: "short"});
    const endTime = new Date(classEnd).toLocaleTimeString('en-US', {timeStyle: "short"});
    
    console.log(moment )

    return (
        <section onClick={ dateId ? () => navigate(`/mylectures/${dateId}`) : () => navigate(`/classInfo/${classId}`)} className='class'>
            <h2 className='class__title '>{ pathname.includes('classInfo') ? '' : title }</h2>
            <img className='class__image' src={ highlightPicture ? highlightPicture : classPictures[0] } alt={ title } />
            <article className='class__info-box'>
                <div className='class__row'>
                    <p className='class__text'>${Number(price).toFixed(0)}</p>
                    {pathname.includes('/myclasses') && 
                        <p className='class__text'>{startTime} - {endTime}</p>
                    }
                    {pathname.includes('/myclasses') && today === classDay && startTime <= currentTime && 
                            <Link className='button-orange class__link' to={`/view/${classId}`}>
                                Join Class
                            </Link>
                    }
                </div>
            </article>
        </section>
    );
};

export default ClassCard;
