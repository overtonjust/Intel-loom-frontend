// Dependencies
import React, { useContext, useEffect } from 'react';
import { WebcamContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
    selectIsLocalScreenShared,
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

// Components

const MenuOptions = () => {
    const { fullscreen, setFullscreen, showParticipants, setShowParticipants, 
        isLocalAudioEnabled, isLocalVideoEnabled, handleAudioChange, toggleVideo,
        chatOpen, setChatOpen, isLandscape, isDesktop, isMobile, prompt, setPrompt, instructorId, instructorName, title, id} = useContext(WebcamContext);
    const navigate = useNavigate();
    const peers = useHMSStore(selectPeers);
    const host = peers.find(peer => peer.roleName === 'host');
    const userCam = peers.find(peer => peer.isLocal);    
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

    const handleLeave = async () => {
        await hmsActions.leave();
        navigate(`/view/${id}`)
        setPrompt(`Thank you for attending ${title} with ${instructorName}. Would you like to leave them a review? `)
    };

    return (
        <main className={`menu-holder ${fullscreen ? isLandscape ? 'menu-holder__fullscreen-landscape' : 'menu-holder__fullscreen-portrait' : ''}`} >
            <section className='menu-options-head'>
                <article onClick={handleAudioChange} className='menu-options-head__audio'>
                    {isLocalAudioEnabled ? (
                        <>
                            <FontAwesomeIcon className='menu-options__icon' icon={faMicrophone} />
                            <span className='menu-options__label'>Mute</span>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon className='menu-options__icon' icon={faMicrophoneSlash}/>
                            <span className='menu-options__label'>Unmute</span>
                        </>
                    )}
                </article>
                <article onClick={toggleVideo} className='menu-options-head__video'>
                    {isLocalVideoEnabled ? (
                        <>
                            <FontAwesomeIcon className='menu-options__icon' icon={faVideo} />
                            <span className='menu-options__label'>Video</span>
                        </>
                    ) : 
                        <>
                            <FontAwesomeIcon className='menu-options__icon' icon={faVideoSlash} />
                            <span className='menu-options__label'>Video</span>
                        </>
                    }
                </article>
            </section>
            <section className='menu-options'>
                <article className='menu-options__container' onClick={() => {
                        setShowParticipants(!showParticipants)
                        setChatOpen(false)
                    }}>
                    <span className='menu-options__count'>
                        <FontAwesomeIcon className='menu-options__icon' icon={faUserPlus} /><>{userCount}</>
                    </span>
                    <span className='menu-options__label'>{showParticipants ? 'Close' : 'Participants'}</span>
                </article>
                <article className='menu-options__container' onClick={() => {
                    setChatOpen(!chatOpen)
                    setShowParticipants(false)
                }} >
                    <FontAwesomeIcon className='menu-options__icon' icon={faMessage}/>
                    <span className='menu-options__label'>{chatOpen ? 'close chat' : 'Chat'}</span>
                </article>
                {isDesktop && host === userCam &&
                    <article className='menu-options__container' onClick={toggleScreenShare} >
                        <FontAwesomeIcon className='menu-options__icon' icon={faArrowUpFromBracket}/>
                        <span className='menu-options__label'>{isLocalScreenShared ? 'stop sharing' : 'Share'}</span>
                    </article>
                }
                <article className='menu-options__container' onClick={() => setFullscreen(!fullscreen)}>
                    <FontAwesomeIcon className='menu-options__icon' icon={faUpRightAndDownLeftFromCenter}/>
                    <span className='menu-options__label'>{fullscreen ? 'Close' : 'Fullscreen'}</span>
                </article>
            </section>
                {isConnected && (
                    <button
                    id='leave-btn'
                    className='button-orange leave-btn'
                    onClick={handleLeave}
                    >
                        Leave
                    </button>
                )}
        </main>
    );
};

export default MenuOptions;