// Dependencies
import React, { useEffect, useState, useContext } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
    useAVToggle
} from '@100mslive/react-sdk';
import { WebcamContext, UserContext } from '../../context/UserContext';
import { useOrientation } from 'react-use';
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
import Prompt from './components/Prompt';

const Conference = () => {
    const { id } = useParams();
    const { API } = useContext(UserContext);
    const orientation = useOrientation();
    const isLandscape = orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary';
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const [showParticipants, setShowParticipants] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [prompt, setPrompt] = useState(false);
    const [roomData, setRoomData ] = useState({
        title: '',
        instructorName: '',
        instructorId: 0
    });
    const { title, instructorName, instructorId } = roomData;
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
        const token = await hmsActions.getAuthTokenByRoomCode({ roomCode }); 

        const displayName = `${firstName} ${lastName.charAt(0)}.`;
        const config = {
            userName: displayName,
            authToken: token,
            settings: {
                isAudioMuted: true
            }
        };

        try {
            await hmsActions.join(config)
        } catch (error) {
            console.error(error)
        }
    };

    const handleAudioChange = async () => {
        try {
            await hmsActions.setAudioSettings({echoCancellation: true, noiseSuppression: true, autoGainControl: true})
        } catch (error) {
            console.error(error)
        }
        toggleAudio()
    };

    useEffect(() => {
            axios(`${API}/classes/get-room-code/${id}`, { withCredentials: true })
                .then(res => {
                    handleUserJoinRoom(res.data)
                })
                .catch(err => console.error(err)) 
                
            axios.get(`${API}/classes/class-info/${id}`, {withCredentials: true})
                .then(res => {
                    const {title , instructor: { firstName, instructorId } } = res.data
                    console.log(res.data, instructorId)
                    setRoomData(prev => {
                        return {
                            title,
                            instructorName: firstName,
                            instructorId
                        }
                    })
                })
                .catch(err => console.error(err))
        
    },[id])

    return (
        <WebcamContext.Provider value={{ fullscreen, setFullscreen, instructorName, showParticipants, setShowParticipants, isLocalAudioEnabled, isLocalVideoEnabled, handleAudioChange, toggleVideo, chatOpen, setChatOpen, isLandscape, isDesktop, isMobile, prompt, setPrompt, title, instructorName, instructorId, id }}>
            <section className='conference'>
                <h2 className='conference__title'>{title}</h2>
                {isConnected ? (
                    <article className={`conference__video-call ${fullscreen ? 'conference__fullscreen' : ''}`}>
                        <ConferenceRoom />
                        <MenuOptions />
                        {showParticipants  && <Participants/>}
                        {chatOpen &&  <Chat/>}
                    </article>
                ) : prompt ? (
                    <Prompt prompt={prompt} setPromt={setPrompt}/> 
                ) : (
                    <div>Loading...</div>
                )}
                <ConferenceInfo/>
            </section>
        </WebcamContext.Provider>
    );
};

export default Conference;