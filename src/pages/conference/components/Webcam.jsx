// Dependencies
import React, { useContext } from 'react';
import { useVideo, selectIsPeerAudioEnabled, useHMSStore, selectIsPeerVideoEnabled } from '@100mslive/react-sdk';
import { AiOutlineAudioMuted } from 'react-icons/ai';
import { WebcamContext } from '../../../context/UserContext';
import defaultImg from '../../../assets/default-profile.png';
import './Webcam.scss';

const Webcam = ({ peer }) => {
    const { fullscreen, isLandscape, isMobile, isDesktop } = useContext(WebcamContext);
    const { videoRef } = useVideo({
        trackId: peer.auxiliaryTracks[0] || peer.videoTrack
    });
    
    const isFullDesktopHost =  fullscreen && isDesktop && peer.roleName === 'host';
    const isFullDesktopGuest =  fullscreen && isDesktop && peer.roleName === 'guest';
    const isDesktopHost = !fullscreen && isDesktop && peer.roleName === 'host';
    const isDesktopGuest = !fullscreen && isDesktop && peer.roleName === 'guest';

    const isFullMobileHostPortrait = fullscreen && isMobile && peer.roleName === 'host' && !isLandscape;
    const isFullMobileGuestPortrait = fullscreen && isMobile && peer.roleName === 'guest' && !isLandscape;
    const isFullMobileHostLandscape = fullscreen && isMobile && peer.roleName === 'host' && isLandscape;
    const isFullMobileGuestLandscape = fullscreen && isMobile && peer.roleName === 'guest' && isLandscape;

    const isMobileHostPortrait = !fullscreen && isMobile && peer.roleName === 'host' && !isLandscape;
    const isMobileGuestPortrait = !fullscreen && isMobile && peer.roleName === 'guest' && !isLandscape;
    const isMobileHostLandscape = !fullscreen && isMobile && peer.roleName === 'host' && isLandscape;
    const isMobileGuesttLandscape = !fullscreen && isMobile && peer.roleName === 'guest' && isLandscape;

    const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));
    
    return (
        <section className={`webcam ${peer.roleName === 'guest' && 'webcam__guest'} `}>
            <article className={`
                ${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : 'webcam__video'} 
                ${isFullMobileGuestPortrait && 'mini-portrait'}`}>
                <video
                ref={videoRef}
                autoPlay={true}
                muted
                className={ 
                    isFullMobileHostLandscape ? 'webcam__fullscreen-landscape' 
                    : isFullMobileHostPortrait ? 'webcam__fullscreen-portrait' 
                    : isFullMobileGuestPortrait ? 'webcam-portrait__guest'
                    : isDesktopHost ? 'conference-desktop__host-cam' 
                    : isFullDesktopHost ? 'conference-desktop__fullscreen-host'
                    : isFullDesktopGuest? 'conference-desktop__fullscreen-guest' 
                    : `webcam__video`}
                playsInline 
                data-testid={peer.auxiliaryTracks[0] ? `screen-${peer.id}` : `video-${peer.id}`}
                />
                {!isPeerVideoEnabled ? (
                    <img className={` webcam__image 
                        ${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' 
                        : isFullDesktopHost ? 'webcam-desktop__fullscreen-image'
                        : isDesktopHost ? 'webcam-desktop__image'
                        : isLandscape && isMobile ? 'webcam__image-landscape' 
                        : !isLandscape && isMobile ? 'webcam__image-portrait' 
                        : ''} 
                        ${isFullMobileGuestPortrait  && 'mini-portrait'} `} src={peer.metadata || defaultImg} alt="" /> 
                ) : null} 
                <article className={`webcam__name 
                    ${isDesktopHost ? 'desktop-host-name'
                    : isFullDesktopHost ? 'desktop-host-name__fullscreen'
                    : ''
                    } 
                    ${isFullMobileHostLandscape ? 'landscape-name-host' 
                    : isMobileHostLandscape ? 'landscape-name-guest'
                    : isFullMobileGuestPortrait ? 'mini-name'
                    : isFullMobileHostPortrait ? 'portrait-name-host' 
                    : ''} 
                    ${!isPeerVideoEnabled && peer.roleName === 'host' && 'image-name'}`}>
                    {peer.name} {peer.isLocal ? "(You)": ""}
                </article>
                <article className={`webcam__muted 
                    ${isFullMobileHostLandscape ? 'landscape-muted-host' 
                    : isFullMobileGuestLandscape ? 'landscape-muted-guest' 
                    : isFullMobileHostPortrait ? 'portrait-muted-host'
                    : isFullDesktopHost ? 'desktop-host-mute' : ''} `}>
                    {!isPeerAudioEnabled  && <AiOutlineAudioMuted/>}
                </article>
            </article>         
        </section>
    );
};

export default Webcam;