// Dependencies
import React from 'react';
import { selectPeers, useHMSStore } from '@100mslive/react-sdk';

const Message = ({msg}) => {
    const peers = useHMSStore(selectPeers);
    const userCam = peers.find(peer => peer.isLocal);
    const host = peers.find(peer => peer.roleName === 'host');
    const {message, senderName, sender} = msg;

    console.log(userCam.id, sender)
    return (
        <div className={`chat__message`}>
            <span className={`chat__sender `}>{sender === userCam.id ? 'You' : senderName }</span>
            <span className={`chat__bubble ${sender === userCam.id && 'chat__user'} ${host.id === sender && 'chat__instructor'}`}><p className='chat__text' >{message}</p></span>     
        </div>
    );
};

export default Message;