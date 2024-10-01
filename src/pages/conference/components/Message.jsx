// Dependencies
import React from 'react';
import { selectPeers, useHMSStore } from '@100mslive/react-sdk';

const Message = ({msg}) => {
    const peers = useHMSStore(selectPeers);
    const userCam = peers.find(peer => peer.isLocal);
    const {message, senderName, sender} = msg;

    return (
        <div className={`chat__message`}>
            <span className={`chat__sender `}>{sender === userCam.id ? 'You' : senderName }</span>
            <span className={`chat__bubble ${sender === userCam.id && 'chat__user'}`}><p className='chat__text' >{message}</p></span>     
        </div>
    );
};

export default Message;