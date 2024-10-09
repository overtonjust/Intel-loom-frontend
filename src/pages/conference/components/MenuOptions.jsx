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
    selectLocalPeerID,
    selectScreenShareByPeerID
} from '@100mslive/react-sdk'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrophoneSlash,
    faMicrophone,
    faVideo,
    faCircle,
    faVideoSlash,
    faUserPlus,
    faUpRightAndDownLeftFromCenter,
    faMessage,
    faArrowUpFromBracket
} from '@fortawesome/free-solid-svg-icons'
import './MenuOptions.scss'
import axios from 'axios';

const MenuOptions = () => {
    // React dependencies
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

    const [isRecording, setIsRecording] = useState(false);
    const [videoSrc, setVideoSrc] = useState('');
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
        
    // 100ms dependencies
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);
    
    const getMediaStream = useCallback(async () => {
        if (!hostPeer) {
            console.error('Host peer not found');
            return null;
        }

        let videoElement;
        if (isLocalScreenShared) {
            videoElement = document.querySelector(`video[data-testid="screen-${hostPeer.id}"]`);
        } else {
            videoElement = document.querySelector(`video[data-testid="video-${hostPeer.id}"]`);
        }

        const stream = new MediaStream();

        if (videoElement) {
            const videoStream = videoElement.captureStream();
            const videoTrack = videoStream.getVideoTracks()[0];
            if (videoTrack) {
                stream.addTrack(videoTrack);
            } else {
                console.log('No video track found in video element');
            }
        } else {
            console.error('Video element not found');
        }
    
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            const audioTrack = audioStream.getAudioTracks()[0];
            if (audioTrack) {
                stream.addTrack(audioTrack);
            } else {
                console.log('No audio track obtained from getUserMedia');
            }
        } catch (error) {
            console.error('Error getting audio with getUserMedia:', error);
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
        if (!isHost) {

            console.error('Only the host can start recording');
            return;
        }
    
        try {
            const mediaStream = await getMediaStream();
            if (!mediaStream) {
                throw new Error('Failed to get media stream');
            }
    
            mediaRecorderRef.current = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });
    
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };
    
            mediaRecorderRef.current.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    
                await uploadToServer(blob);
    
                chunksRef.current = [];
            };
    
            mediaRecorderRef.current.start(1000); 
            setIsRecording(true);
    
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    }, [isHost, getMediaStream]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }, []);

    const uploadToServer = async (blob) => {
        try {
            const formData = new FormData();
            formData.append('recording', blob, 'recording.webm');
    
            const response = await axios.post(`${API}/classes/class-recording`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setVideoSrc(response.data)
            console.log('Upload response:', response);
        } catch (error) {
            console.error('Error uploading recording:', error);
        }
    };

    const toggleScreenShare = useCallback(async () => {
        try {
            await hmsActions.setScreenShareEnabled(!isLocalScreenShared);
        } catch (error) {
            console.error('Error toggling screen share:', error);
        }
    }, [hmsActions, isLocalScreenShared]);

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
            {videoSrc && (
                <video
                    controls
                    src={videoSrc}
                    className='test'
                />
            )}
        </main>
    );
};

export default MenuOptions;