// Dependencies
import React from 'react';
import { selectPeers, useHMSStore } from '@100mslive/react-sdk';

// Components
import Webcam from './Webcam';


const ConferenceRoom = ({/** Grab room / class data */}) => {
    const peers = useHMSStore(selectPeers);

    return (
        <div>
            <h2>{/* class name */}</h2>
            {peers.map((peer) => (
                <Webcam key={peer.id} peer={peer} />
            ))}
        </div>
    );
};

export default ConferenceRoom;