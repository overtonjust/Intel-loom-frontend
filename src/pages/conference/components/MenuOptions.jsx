// Dependencies
import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { WebcamContext, UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
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
    faArrowUpFromBracket,
    faCircle,
    faDownload
} from '@fortawesome/free-solid-svg-icons'
import './MenuOptions.scss'
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';

// Components

const MenuOptions = () => {
    const { fullscreen, setFullscreen, showParticipants, setShowParticipants, 
        isLocalAudioEnabled, isLocalVideoEnabled, handleAudioChange, toggleVideo,
        chatOpen, setChatOpen, isLandscape, isDesktop, isMobile, setPrompt, instructorId, instructorName, title, id} = useContext(WebcamContext);
    const { user: { userId }, API } = useContext(UserContext);
    const navigate = useNavigate();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      })
    const peers = useHMSStore(selectPeers);
    const host = peers.find(peer => peer.roleName === 'host');
    const userCam = peers.find(peer => peer.isLocal);    
    const userCount = peers.length;

    // 100ms dependencies
<<<<<<< HEAD
=======
    const peers = useHMSStore(selectPeers);
    const isHost = peers.find(peer => peer.isLocal)?.roleName === 'host'
    const userCount = peers.length;
    const hmsActions = useHMSActions();
>>>>>>> 163a2b7 (testing updates)
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared)

    // React dependencies for recording
    const [isRecording, setIsRecording] = useState(false);
    const [videoSrc, setVideoSrc] = useState('');
 


    const { status, startRecording, stopRecording, mediaBlobUrl, } = useReactMediaRecorder({ 
        screen: isLocalScreenShared, 
        audio: {noiseSuppression: true, echoCancellation: true}, 
        video: !isLocalScreenShared 
    });

    useEffect(() => {
        setIsRecording(status === "recording");
    }, [status]);

    useEffect(() => {
        if (mediaBlobUrl) {
            setVideoSrc(mediaBlobUrl);
        }
    }, [mediaBlobUrl]);

    const toggleScreenShare = async () => {
        try {
            await hmsActions.setScreenShareEnabled(!isLocalScreenShared);
            // Stop current recording and start a new one with updated settings
            if (isRecording) {
                stopRecording();
                startRecording();
            }
        } catch (error) {
            console.error(error);
        }
    };

<<<<<<< HEAD
    const handleLeave = async () => {
        await hmsActions.leave();
        if(instructorId === userId) {
            navigate('/')
        } else {
            navigate(`/view/${id}`)
            setPrompt({
                message: `Thank you for attending ${title} with ${instructorName}. Would you like to leave them a review? `,
                instructor: instructorName,
                instructorId: instructorId
            })
        }
    };

    const handleRecordingToggle = async () => {
        if (!isHost) {

            console.error('Only the host can start recording');
            return;
        }

        if (isRecording) {
            stopRecording();
            try {
                const response = await fetch(mediaBlobUrl);
                const blob = await response.blob();
                console.log(response, blob)
                const formData = new FormData();
                formData.append('recording', blob, 'conference-recording.webm');

                await axios.post(`${API}/classes/class-recording`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (error) {
                console.error('Error uploading to backend:', error);
            }
        } else {
            startRecording();
        }
    };

      return (
        <main className={`menu-holder ${fullscreen ? isLandscape ? 'menu-holder__fullscreen-landscape' : 'menu-holder__fullscreen-portrait' : ''}`} >
           {videoSrc && (
                <video
                    controls
                    autoPlay={true}
                    className='test'
                    src={videoSrc}
                    playsInline
                />
            )}
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
                    {isDesktopOrLaptop && 
                        <span className='menu-options__label'>{showParticipants ? 'Close' : 'Participants'}</span>
                    }
                </article>
                <article className='menu-options__container' onClick={() => {
                    setChatOpen(!chatOpen)
                    setShowParticipants(false)
                }} >
                    <FontAwesomeIcon className='menu-options__icon' icon={faMessage}/>
                    {isDesktopOrLaptop &&
                        <span className='menu-options__label'>{chatOpen ? 'close chat' : 'Chat'}</span>
                    }
                </article>
                {isDesktop && host === userCam &&
                    <article className='menu-options__container' onClick={toggleScreenShare} >
                        <FontAwesomeIcon className='menu-options__icon' icon={faArrowUpFromBracket}/>
                        {isDesktopOrLaptop && 
                            <span className='menu-options__label'>{isLocalScreenShared ? 'stop sharing' : 'Share'}</span>
                        }
                    </article>
                }
                <article className='menu-options__container' onClick={() => setFullscreen(!fullscreen)}>
                    <FontAwesomeIcon className='menu-options__icon' icon={faUpRightAndDownLeftFromCenter}/>
                    {isDesktopOrLaptop && 
                        <span className='menu-options__label'>{fullscreen ? 'Close' : 'Fullscreen'}</span>
                    }
                </article>
                {isHost && (
                    <article className='menu-options__container' onClick={handleRecordingToggle}>
                        <FontAwesomeIcon className='menu-options__icon' icon={faCircle} />
                        <span className='menu-options__label'>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                    </article>
                )}
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