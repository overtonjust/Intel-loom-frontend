// Dependencies
import React from 'react';

const Message = ({msg}) => {
    console.log(msg)
    const {message, senderName} = msg;

    return (
        <div>
            <p><span>{senderName }:</span> {message}</p>
        </div>
    );
};

export default Message;