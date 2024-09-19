// Dependencies
import { useHMSActions } from '@100mslive/react-sdk';
import React, { useState } from 'react';


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
        <form onSubmit={handleSubmit}>
            <h2>Join Room</h2>
            <div className=''>
                <input 
                required
                type="text"
                id='name'
                name='name'
                value={inputValues.name}
                onChange={handleInputChange}
                placeholder='Your Name' 
                />
            </div>
            <div>
                <input 
                required
                type="text"
                id='room-code'
                name='roomCode'
                value={inputValues.roomCode}
                onChange={handleInputChange}
                placeholder='Room Code' 
                />
            </div>
            <button>Join</button>
        </form>
    );
};

export default JoinCall;
