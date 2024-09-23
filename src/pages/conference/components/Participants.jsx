// Dependencies
import React from 'react';
import { useHMSStore, selectPeers } from '@100mslive/react-sdk';
import './Participants.scss';

const Participants = () => {
    const peers = useHMSStore(selectPeers)

    return (
        <article className='participants'>
            <p className='participants__title'>Participants</p>
            {peers.map((peer) => (
                <p key={peer.id} className={`participants__name ${peer.roleName === 'host' ? 'orange' : ''}`}>{peer.name}{peer.isLocal && ' (you)'}</p>
            ))}
        </article>
    );
};

export default Participants;