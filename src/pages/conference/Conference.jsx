// Dependencies
import React, { useEffect, useState, useContext } from 'react';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
} from '@100mslive/react-sdk';
import { useAVToggle } from '@100mslive/react-sdk';
import './Conference.scss';
import { WebcamContext } from '../../context/UserContext';

// Components
import JoinCall from './components/JoinCall';
import ConferenceRoom from './components/ConferenceRoom';
import MenuOptions from './components/MenuOptions';
import ConferenceInfo from './components/ConferenceInfo';
import Participants from './components/Participants';
import Chat from './components/Chat';

const Conference = ({/** Grab room / class data */}) => {
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