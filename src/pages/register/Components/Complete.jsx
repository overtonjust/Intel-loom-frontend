import React from 'react';
import { useNavigate } from 'react-router-dom';

const Complete = () => {
    const navigate = useNavigate();

    return (
        <section className="sign-up-form__group text">
            <h2>Thank you for signing up!</h2>
            <p className="form-complete__message">Your registration is complete.</p>
            <div className="signup-form__group main-btns">
                <button onClick={() => navigate('/')}>Done</button>
            </div>
        </section>
    );
};

export default Complete;
