// Dependencies
import React from 'react';
import { selectPeers, useHMSStore } from '@100mslive/react-sdk';
import './ConferenceRoom.scss';

// Components
import Webcam from './Webcam';


const ConferenceRoom = () => {
    const peers = useHMSStore(selectPeers);

    const host = peers.find(peer => peer.roleName === 'host')
    const guests = peers.filter(peer => peer.roleName === 'guest')

    return (
        <div className='conference-room'>
            <div className='conference-room__host'>
                {host && <Webcam key={host.id} peer={host}/>}
            </div>
            <div className='conference-room__guest'>
                {guests.map((peer) => (
                    <Webcam key={peer.id} peer={peer} />
                ))}
            </div>
        </div>
    );
};

export default ConferenceRoom;