// Dependencies
import React, { useContext } from 'react';
import { useHMSStore, selectPeers } from '@100mslive/react-sdk';
import './Participants.scss';
import { WebcamContext } from '../../../context/UserContext';

const Participants = () => {
    const { fullscreen, isMobile, isLandscape, isDesktop } = useContext(WebcamContext);
    const peers = useHMSStore(selectPeers);

    return (
        <article className={`
        ${isDesktop && !fullscreen ? 'participants desktop-overlay' 
        : isDesktop && fullscreen ? 'participants desktop-overlay__full' : 'participants'} 
        ${fullscreen && isMobile && 'participants-fullscreen'} 
        ${fullscreen && isMobile && !isLandscape && 'participants-full-portrait'}`}>
            <p className='participants__title'>Participants</p>
            <div className='participants__holder'>
                {peers.map((peer) => (
                    <p key={peer.id} className={`participants__name ${peer.roleName === 'host' ? 'orange' : ''}`}>{peer.name}{peer.isLocal && ' (you)'}</p>
                ))}
            </div>
        </article>
    );
};

export default Participants;