// Dependencies
import React, {useState, useEffect, useRef} from 'react';
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
    const messageRef = useRef(null);
    
    console.log(messageRef)

    const handleChatInput = (e) => {
        setChatMessage(e.target.value)
    };
    
    const handleChatSubmit = (e) => {
        hmsActions.sendGroupMessage(chatMessage, ['guest', 'host'])
        setChatMessage('')
    };

    useEffect(() => {
        if(messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [allMessages])
    
    
    return (
        <section className='chat'>
            <article className='chat__view' ref={messageRef}>
                {allMessages.map((msg) => (
                    <Message key={msg.id} msg={msg}/>
                ))}
            </article>
            <article className='chat__box'>
                <input 
                type="text" 
                name='message'
                placeholder='Type a message ...'
                className='chat__input'
                value={chatMessage}
                onChange={handleChatInput}
                />
                <button className='chat__submit button-blue' type='submit' onClick={handleChatSubmit}>send</button>
            </article>
        </section>
    );
};

export default Chat;