// Dependencies
import React from 'react';
import './StudentCard.scss';
import { useNavigate } from 'react-router-dom';

// Components
import defaultImg from '../../../assets/default-profile.png';

const StudentCard = () => {
    const navigate = useNavigate();
    // const { userId, name, email, profilePicture } = userInfo;

    return (
        <article className='student-card' onClick={() => navigate(`/profile/3`)}>
            <img className='student-card__img' src={defaultImg} alt="" />
            <div className='student-card__col'>
                <p className='student-card__name'>Justin Overton</p>    
                <p className='student-card__email'>joverton@pursuit.org</p>
            </div>
        </article>
    );
};

export default StudentCard;