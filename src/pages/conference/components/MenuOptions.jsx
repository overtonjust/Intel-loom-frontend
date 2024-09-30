// Dependencies
import React, { useContext } from 'react';
import { selectIsLocalScreenShared, useAVToggle } from '@100mslive/react-sdk';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
    selectPeers,
} from '@100mslive/react-sdk'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrophoneSlash,
    faMicrophone,
    faVideo,
    faVideoSlash,
    faUserPlus,
    faUpRightAndDownLeftFromCenter,
    faMessage,
    faArrowUpFromBracket
} from '@fortawesome/free-solid-svg-icons'
import './MenuOptions.scss'
import { WebcamContext } from '../../../context/UserContext';

// Components

const MenuOptions = () => {
    const { fullscreen, setFullscreen, showParticipants, setShowParticipants, 
        isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo,
        chatOpen, setChatOpen} = useContext(WebcamContext);
    const peers = useHMSStore(selectPeers);
    
    const userCount = peers.length;

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared)
    const hmsActions = useHMSActions();

    const toggleScreenShare = async () => {
        try {
            await hmsActions.setScreenShareEnabled(!isLocalScreenShared)
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <main className={`menu-holder ${fullscreen ? 'menu-holder__fullscreen' : ''}`} >
            <section className='menu-options-head'>
                <article onClick={toggleAudio} className='menu-options-head__audio'>
                    {isLocalAudioEnabled ? (
                        <>
                            <FontAwesomeIcon className='menu-options__icon' icon={faMicrophoneSlash} />
                            <span className='menu-options__label'>Mute</span>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon className='menu-options__icon' icon={faMicrophone}/>
                            <span className='menu-options__label'>Unmute</span>
                        </>
                    )}
                </article>
                <article onClick={toggleVideo} className='menu-options-head__video'>
                    {isLocalVideoEnabled ? (
                        <>
                            <FontAwesomeIcon className='menu-options__icon' icon={faVideoSlash} />
                            <span className='menu-options__label'>Stop Video</span>
                        </>
                    ) : 
                        <>
                            <FontAwesomeIcon className='menu-options__icon' icon={faVideo} />
                            <span className='menu-options__label'>Start Video</span>
                        </>
                    }
                </article>
            </section>
            <section className='menu-options'>
                <article className='menu-options__container' onClick={() => setShowParticipants(!showParticipants)}>
                    <span className='menu-options__count'>
                        <FontAwesomeIcon className='menu-options__icon' icon={faUserPlus} /><>{userCount}</>
                    </span>
                    <span className='menu-options__label'>{showParticipants ? 'Close' : 'Participants'}</span>
                </article>
                <article className='menu-options__container' onClick={() => setChatOpen(!chatOpen)} >
                    <FontAwesomeIcon className='menu-options__icon' icon={faMessage}/>
                    <span className='menu-options__label'>{chatOpen ? 'close chat' : 'Chat'}</span>
                </article>
                <article className='menu-options__container' onClick={toggleScreenShare} >
                    <FontAwesomeIcon className='menu-options__icon' icon={faArrowUpFromBracket}/>
                    <span className='menu-options__label'>{isLocalScreenShared ? 'stop sharing' : 'Share'}</span>
                </article>
                <article className='menu-options__container' onClick={() => setFullscreen(!fullscreen)}>
                    <FontAwesomeIcon className='menu-options__icon' icon={faUpRightAndDownLeftFromCenter}/>
                    <span className='menu-options__label'>{fullscreen ? 'Close' : 'Fullscreen'}</span>
                </article>
            </section>
            {isConnected && (
                <button
                id='leave-btn'
                className='menu-options__button'
                onClick={() => hmsActions.leave()}
                >
                    Leave
                </button>
            )}
        </main>
    );
};

export default MenuOptions;