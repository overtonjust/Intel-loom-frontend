// Dependencies
import { useHMSActions } from '@100mslive/react-sdk';
import React, { useState } from 'react';
import './JoinCall.scss';


const JoinCall = () => {
    const hmsActions = useHMSActions();
    const [inputValues, setInputValues] = useState({
        name: '',
        roomCode: '',
    });

    const handleInputChange = (e) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            userName = '',
            roomCode = '',
        } = inputValues

        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });

        try {
            await hmsActions.join({userName, authToken})
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className='join' onSubmit={handleSubmit}>
            <h2 className='join__title'>Tell us who's joining!</h2>
            <div className='join__input-holder'>
                <input 
                    className='join__input'
                    required
                    type="text"
                    id='name'
                    name='name'
                    value={inputValues.name}
                    onChange={handleInputChange}
                    placeholder='Your Name' 
                />
                <input 
                    className='join__input'
                    required
                    type="text"
                    id='room-code'
                    name='roomCode'
                    value={inputValues.roomCode}
                    onChange={handleInputChange}
                    placeholder='Room Code' 
                />
            </div>
            <button className='join__submit'>Join</button>
        </form>
    );
};

export default JoinCall;