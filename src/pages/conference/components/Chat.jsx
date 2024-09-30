// Dependencies
import React, {useState} from 'react';
import {
    selectHMSMessages,
    selectBroadcastMessages,
    selectMessagesByRole,
    selectMessagesByPeerID,
    useHMSStore,
    useHMSActions,
} from '@100mslive/react-sdk';
import './Chat.scss'

// Components
import Message from './Message';

const Chat = () => {
    const allMessages = useHMSStore(selectHMSMessages);
    const [chatMessage, setChatMessage] = useState('');
    const hmsActions = useHMSActions();
    
    const handleChatInput = (e) => {
        setChatMessage(e.target.value)
    };
    
    const handleChatSubmit = (e) => {
        hmsActions.sendGroupMessage(chatMessage, ['guest', 'host'])
        setChatMessage('')
    };
    
    
    return (
        <section className='chat'>
            <article className='chat__view'>
                {allMessages.map((msg) => (
                    <Message key={msg.id} msg={msg}/>
                ))}
            </article>
            <article className='chat__input'>
                <input 
                type="text" 
                name='message'
                placeholder='Write chat here'
                value={chatMessage}
                onChange={handleChatInput}
                />
                <button type='submit' onClick={handleChatSubmit}>send</button>
            </article>
        </section>
    );
};

export default Chat;