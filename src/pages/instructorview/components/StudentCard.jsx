// Dependencies
import React from 'react';
import './StudentCard.scss';

// Components
import defaultImg from '../../../assets/default-profile.png';

const StudentCard = () => {
    return (
        <article className='student-card'>
            <img className='student-card__img' src={defaultImg} alt="" />
            <div className='student-card__col'>
                <h5 className='student-card__name'>name</h5>    
                <p className='student-card__email'>email</p>
            </div>
        </article>
    );
};

export default StudentCard;