// Dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils';
import './ClassCard.scss';

const ClassCard = ({ classInfo }) => {
    const enrolled = true;

    return (
        <section className='class'>
            <img className='class__image' src={classInfo.highlightPicture} alt={classInfo.title} />
            <article className='class__info-box'>
                <div className='class__row'>
                    <span className='class__title'>
                        <p className='class__text '>{classInfo.title}</p>
                    </span>
                    <p className='class__text'>{formatDate(classInfo.classDate)}</p>
                </div>
                <div className='class__row'>
                    <p className='class__text'>${Number(classInfo.price).toFixed(0)}</p>
                    {enrolled ? 
                            <Link className='class__link' to={'/view'}>
                                Join Class
                            </Link>
                        :
                        <p className='class__text'>{formatTime(classInfo.classTimeStart, classInfo.classTimeEnd)}</p>
                    }
                </div>
            </article>
        </section>
    );
};

export default ClassCard;