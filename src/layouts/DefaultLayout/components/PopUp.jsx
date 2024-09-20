import React from 'react';
import './PopUp.scss'

const PopUp = ({ message, isVisible, onClose }) => {
    if (!isVisible) {
        return null;
    }

    const handleClose = () => {
        const isConfirmed = window.confirm("'Cool Class' has been booked!");
        if (isConfirmed) {
            onClose();
        }
    };

    return (
        <div className='popup-overlay'>
            <div className='popup-content'>
                <p>{message}</p>
                <button onClick={handleClose}>OK</button>
            </div>
        </div>
    );
};

export default PopUp