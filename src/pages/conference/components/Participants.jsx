// Dependencies
import React, { useContext } from 'react';
import { useHMSStore, selectPeers } from '@100mslive/react-sdk';
import './Participants.scss';
import { WebcamContext } from '../../../context/UserContext';

const Participants = () => {
    const { fullscreen } = useContext(WebcamContext);
    const peers = useHMSStore(selectPeers);

    return (
        <article className={`participants ${fullscreen && 'participants-fullscreen'}`}>
            <p className='participants__title'>Participants</p>
            {peers.map((peer) => (
                <p key={peer.id} className={`participants__name ${peer.roleName === 'host' ? 'orange' : ''}`}>{peer.name}{peer.isLocal && ' (you)'}</p>
            ))}
        </article>
    );
};

export default Participants;