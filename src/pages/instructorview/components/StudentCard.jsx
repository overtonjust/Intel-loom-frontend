// Dependencies
import React from 'react';
import './StudentCard.scss';
import { useNavigate } from 'react-router-dom';

// Components
import defaultImg from '../../../assets/default-profile.png';

const StudentCard = ({ studentInfo }) => {
    const navigate = useNavigate();
    const { userId, firstName, lastName, email, profilePicture } = studentInfo;

    return (
        <article className='student-card' onClick={() => navigate(`/profile/${userId}`)}>
            <img className='student-card__img' src={profilePicture ? profilePicture : defaultImg} alt="" />
            <div className='student-card__col'>
                <p className='student-card__name'>{firstName} {lastName}</p>    
                <p className='student-card__email'>{email}</p>
            </div>
        </article>
    );
};

export default StudentCard;