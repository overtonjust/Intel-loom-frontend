// Dependencies
import React from 'react';
import { useAVToggle } from '@100mslive/react-sdk';
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
    faArrowUpRightFromSquare,
    faMessage,
    faFaceSmile,
    faGear,
    faEllipsis
} from '@fortawesome/free-solid-svg-icons'
import './MenuOptions.scss'

// Components


const MenuOptions = ({ showParticipants, setShowParticipants, fullscreen, setFullscreen }) => {
    const peers = useHMSStore(selectPeers);
    
    const userCount = peers.length;

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo
    } = useAVToggle();

    return (
        <main className='menu-holder'>
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
                <article className='menu-options__container' onClick={() => setFullscreen(!fullscreen)}>
                    <FontAwesomeIcon className='menu-options__icon' icon={faUpRightAndDownLeftFromCenter}/>
                    <span className='menu-options__label'>{fullscreen ? 'Close' : 'Fullscreen'}</span>
                </article>
                {/* <div className='main_controls_button'>
                    <FontAwesomeIcon className='menu-options__icon' icon={faArrowUpRightFromSquare} size='lg' color=""/>
                    <span className='menu-options__label'>Share Screen</span>
                </div>
                <div className='main_controls_button'>
                    <FontAwesomeIcon className='menu-options__icon' icon={faMessage} size='lg'/>
                    <span className='menu-options__label'>Chat</span>
                </div>
                <div className='main_controls_button'>
                    <FontAwesomeIcon className='menu-options__icon' icon={faFaceSmile} size='lg'/>
                    <span className='menu-options__label'>Reactions</span>
                </div>
                <div className='main_controls_button'>
                    <FontAwesomeIcon className='menu-options__icon' icon={faGear} size='lg'/>
                    <span className='menu-options__label'>Settings</span>
                </div>
                <div className='main_controls_button'>
                    <FontAwesomeIcon className='menu-options__icon' icon={faEllipsis} size='lg'/>
                    <span className='menu-options__label'>More</span>
                </div> */}
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