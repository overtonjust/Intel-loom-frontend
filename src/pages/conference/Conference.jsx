// Dependencies
import React, { useEffect, useState, useContext } from 'react';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
    useAVToggle
} from '@100mslive/react-sdk';
import { WebcamContext, UserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import './Conference.scss';
import axios from 'axios';

// Components
import JoinCall from './components/JoinCall';
import ConferenceRoom from './components/ConferenceRoom';
import MenuOptions from './components/MenuOptions';
import ConferenceInfo from './components/ConferenceInfo';
import Participants from './components/Participants';
import Chat from './components/Chat';

const Conference = () => {
    const { id } = useParams();
    const { API, user } = useContext(UserContext);
    const msUrl = import.meta.env.MS_URL;
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const [showParticipants, setShowParticipants] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo
    } = useAVToggle();
    window.addEventListener('beforeunload', () => hmsActions.leave());
    window.addEventListener('onunload', () => hmsActions.leave());

    const handleUserJoinRoom =  async (roomData) => {
        const { firstName, lastName, roomCode } = roomData;
        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode }); 
        console.log(authToken)  

        const displayName = `${firstName} ${lastName.charAt(0)}.`;

        try {
            await hmsActions.join({userName: displayName, authToken })
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
            axios(`${API}/classes/get-room-code/${id}`, { withCredentials: true })
                .then(res => {
                    handleUserJoinRoom(res.data)
                })
                .catch(err => console.error(err))    
        
    },[id])

    return (
        <WebcamContext.Provider value={{ fullscreen, setFullscreen, showParticipants, setShowParticipants, isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo, chatOpen, setChatOpen}}>
            <section className='conference'>
                <h2 className='conference__title'>{/* class name */}Cool Class</h2>
                {isConnected ? (
                    <article className={`conference__video-call ${fullscreen ? 'conference__fullscreen' : ''}`}>
                        <ConferenceRoom />
                        <MenuOptions />
                        {showParticipants && !fullscreen && <Participants/>}
                        {chatOpen && !fullscreen && <Chat/>}
                    </article>
                ): (
                    <JoinCall/>
                )}
                <ConferenceInfo/>
            </section>
        </WebcamContext.Provider>
    );
};

export default Conference;