// Dependencies
import React, { useState } from 'react';
import { formatDate, formatTime } from '../../utils';
import './ClassCard.scss';

const ClassCard = ({ classInfo }) => {
    const enrolled = false;

    return (
        <section className='class'>
            <img className='class__image' src={classInfo.highlightPicture} alt=''/>
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
                        <button className='class__button'>Join Call</button>
                        :
                        <p className='class__text'>{formatTime(classInfo.classTimeStart, classInfo.classTimeEnd)}</p>
                    }
                </div>
            </article>
        </section>
    );
};

export default ClassCard;