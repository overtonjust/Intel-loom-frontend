// Dependencies
import React, { useContext } from 'react';
import { useVideo, selectIsPeerAudioEnabled, useHMSStore, selectIsPeerVideoEnabled } from '@100mslive/react-sdk';
import { AiOutlineAudioMuted } from 'react-icons/ai';
import { WebcamContext } from '../../../context/UserContext';
import defaultImg from '../../../assets/default-profile.png';
import './Webcam.scss';

const Webcam = ({ peer }) => {
    const { fullscreen, isLandscape, isMobile } = useContext(WebcamContext);
    const { videoRef } = useVideo({
        trackId: peer.auxiliaryTracks[0] || peer.videoTrack
    });
    
    const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));
    
    return (
        <section className={`webcam ${peer.roleName === 'guest' && 'webcam__guest'} `}>
            <article className={`${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : 'webcam__video'} ${!isLandscape && fullscreen && peer.roleName === 'guest' && 'mini-portrait'}`}>
                <video
                ref={videoRef}
                autoPlay={true}
                muted
                className={ fullscreen && peer.roleName === 'host' ? isLandscape && isMobile ? 'webcam__fullscreen-landscape' : !isLandscape && isMobile && 'webcam__fullscreen-portrait' : `webcam__video`}
                playsInline 
                data-testid={peer.auxiliaryTracks[0] ? `screen-${peer.id}` : `video-${peer.id}`}
                />
                {!isPeerVideoEnabled ? (
                    <img className={`webcam__video webcam__image ${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : fullscreen && peer.roleName === 'host' ? isLandscape ? 'webcam__image-landscape' : 'webcam__image-portrait' : ''} ${!isLandscape && fullscreen && peer.roleName === 'guest' && 'mini-portrait'} `} src={peer.metadata || defaultImg} alt="" /> 
                ) : null} 
                <article className={`webcam__name ${fullscreen && isLandscape && peer.roleName === 'host' ? 'landscape-name-host' : 'landscape-name-guest'} ${!isLandscape && fullscreen && peer.roleName === 'guest' && 'mini-name'} ${!isPeerVideoEnabled && peer.roleName === 'host' && 'image-name'}`}>
                    {peer.name} {peer.isLocal ? "(You)": ""}
                </article>
                <article className={`webcam__muted ${fullscreen && isLandscape ? peer.roleName === 'host' ? 'landscape-muted-host' : 'landscape-muted-guest' : fullscreen && !isLandscape && peer.roleName === 'host' && 'portrait-muted-host' } `}>
                    {!isPeerAudioEnabled  && <AiOutlineAudioMuted/>}
                </article>
            </article>         
        </section>
    );
};

export default Webcam;