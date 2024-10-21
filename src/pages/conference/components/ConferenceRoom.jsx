// Dependencies
import React, { useContext } from 'react';
import { selectPeers, useHMSStore } from '@100mslive/react-sdk';
import { WebcamContext } from '../../../context/UserContext';
import './ConferenceRoom.scss';

// Components
import Webcam from './Webcam';


const ConferenceRoom = () => {
    const { fullscreen } = useContext(WebcamContext);
    const peers = useHMSStore(selectPeers);
    
    const host = peers.find(peer => peer.roleName === 'host');
    const guests = peers.filter(peer => peer.roleName === 'guest');
    const userCam = peers.find(peer => peer.isLocal);

    
    return (
        <div className={`conference-room ${fullscreen && 'conference-room-takeover'}`}>
            <div className={`conference-room__host `}>
                {host && <Webcam key={host.id} peer={host}/>}
            </div>
            <div className={`conference-room__guest ${fullscreen ? 'conference-room__fullscreen' : ''}`}>
                { guests.map((peer) => (
                    <Webcam key={peer.id} peer={peer} />
                ))}
            </div>
        </div>
    );
};

export default ConferenceRoom;