// Dependencies
import React, { useContext } from 'react';
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
import { WebcamContext } from '../../../context/UserContext';

// Components
import Participants from './Participants';

const MenuOptions = () => {
    const { fullscreen, setFullscreen, showParticipants, setShowParticipants, isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useContext(WebcamContext);
    const peers = useHMSStore(selectPeers);
    
    const userCount = peers.length;

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

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