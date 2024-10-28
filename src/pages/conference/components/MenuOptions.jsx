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
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared)
    const hmsActions = useHMSActions();

    // React dependencies for recording
    const [isRecording, setIsRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [videoSrc, setVideoSrc] = useState('');
    const [videoHaha, setVideoHaha] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const isHost = peers.find(peer => peer.isLocal)?.roleName === 'host'

    const toggleScreenShare = async () => {
        try {
            await hmsActions.setScreenShareEnabled(!isLocalScreenShared)
        } catch (error) {
            console.error(error)
        }
    };

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

    const startRecording = useCallback(async () => {
        if(!isHost) {
            console.error('Only the host can start recording');
            return;
        }

        try {
            const webcamStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true})
            mediaRecorderRef.current = new MediaRecorder(webcamStream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if(event.data.size > 0) {
                    chunksRef.current.push(event.data)
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' })
                setRecordedBlob(blob);
                chunksRef.current = []
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error)
        }
    }, [isHost]);

    const stopRecording = useCallback(() => {
        if(mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false)

            mediaRecorderRef.current.onstop = async () => {
                const blob = new Blob(chunksRef.current, {type: 'video/webm'})
                
                try {
                    const formData = new FormData()
                    formData.append('recording', blob, 'conference-recording.webm');

                    await axios.post(`${API}/classes/class-recording`, formData, {
                        headers: {
                            'Content-Type' : 'multipart/form-data',
                        },
                    })
                        .then(res => setVideoSrc(res.data))
                        .catch(err => console.error(err))

                } catch (error) {
                    console.error('Error uploading to backend:', error)
                }
                chunksRef.current = []
            }
        }
    }, []);

      useEffect(() => {
            setVideoHaha(
                <video
                controls
                autoPlay={true}
                className='test'
                src={videoSrc}
                type='video/webm'
                playsInline
                />
            )
        
      },[videoSrc])

      return (
        <main className={`menu-holder ${fullscreen ? isLandscape ? 'menu-holder__fullscreen-landscape' : 'menu-holder__fullscreen-portrait' : ''}`} >
           {videoHaha}
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
                    <article className='menu-options__container' onClick={isRecording ? stopRecording : startRecording}>
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