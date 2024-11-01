// Dependencies
import React, { useContext } from 'react';
import { selectPeers, useHMSStore } from '@100mslive/react-sdk';
import { WebcamContext } from '../../../context/UserContext';
import './ConferenceRoom.scss';

// Components
import Webcam from './Webcam';


const ConferenceRoom = () => {
    const { fullscreen, isLandscape, isMobile, isDesktop } = useContext(WebcamContext);
    const peers = useHMSStore(selectPeers);
    
    const host = peers.find(peer => peer.roleName === 'host');
    const guests = peers.filter(peer => peer.roleName === 'guest');
    const userCam = peers.find(peer => peer.isLocal);

    
    return (
        <div className={` 
        ${isDesktop && !fullscreen ? 'conference-desktop__video-holder' 
        : isDesktop && fullscreen ? 'conference-desktop__fullscreen-video' 
        : 'conference-room'} 
        ${fullscreen && isLandscape && isMobile ? 'conference-room-landscape' 
        : fullscreen && !isLandscape && isMobile ? 'conference-room-portrait' : ''}`}>
            <div className={` 
                ${isDesktop && !fullscreen ? 'conference-desktop__host' 
                : 'conference-room__host'} `}>
                {host && <Webcam key={host.id} peer={host}/>}
            </div>
            <div className={` 
                ${isDesktop && !fullscreen ? 'conference-desktop__guest' 
                : isDesktop && fullscreen ? 'conference-desktop__fullscreen-guest-row' 
                : 'conference-room__guest'}  
                ${fullscreen && isLandscape && isMobile ? 'conference-room__landscape-guests' 
                : fullscreen && !isLandscape && isMobile ? 'conference-room__portrait-guests' : ''}`}>
                { guests.map((peer) => (
                    <Webcam key={peer.id} peer={peer} />
                ))}
            </div>
        </div>
    );
};

export default ConferenceRoom;