// Dependencies
import React, { useContext } from 'react';
import { useVideo, selectIsPeerAudioEnabled, useHMSStore, selectIsPeerVideoEnabled } from '@100mslive/react-sdk';
import { useOrientation } from 'react-use';
import { AiOutlineAudioMuted } from 'react-icons/ai';
import { WebcamContext } from '../../../context/UserContext';
import './Webcam.scss';

const Webcam = ({ peer }) => {
    const orientation = useOrientation();
    const isLandscape = orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary';
    const { fullscreen } = useContext(WebcamContext);
    const { videoRef } = useVideo({
        trackId: peer.auxiliaryTracks[0] || peer.videoTrack
    });
    
    const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));
    
    console.log(orientation.type, isLandscape)
    return (
        <section className={`webcam ${peer.roleName === 'guest' && 'webcam__guest'} `}>
            <article className={`${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : 'webcam__video'}`}>
                <video
                ref={videoRef}
                autoPlay={true}
                muted
                className={ fullscreen && peer.roleName === 'host' ? isLandscape ? 'webcam__fullscreen-landscape' : 'webcam__fullscreen-portrait' : `webcam__video`}
                playsInline 
                />
                {!isPeerVideoEnabled ? (
                    <img className={`webcam__video webcam__image ${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : fullscreen && peer.roleName === 'host' ? isLandscape ? 'webcam__fullscreen-landscape' : 'webcam__fullscreen-portrait' : ''} `} src="https://placehold.co/210x100" alt="" /> 
                ) : null} 
                <article className='webcam__name'>
                    {peer.name} {peer.isLocal ? "(You)": ""}
                </article>
                <article className='webcam__muted'>
                    {!isPeerAudioEnabled  && <AiOutlineAudioMuted/>}
                </article>
            </article>         
        </section>
    );
};

export default Webcam;