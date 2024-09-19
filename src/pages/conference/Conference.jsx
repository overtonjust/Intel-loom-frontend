// Dependencies
import React, { useEffect } from 'react';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore
  } from '@100mslive/react-sdk';

// Components
import JoinCall from './components/JoinCall'
import ConferenceRoom from './components/ConferenceRoom'
import MenuOptions from './components/MenuOptions';

const Conference = () => {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

    useEffect(() => {
        if(!isConnected) {
            hmsActions.leave();
        }
    }, [hmsActions, isConnected])

    return (
        <div className='Conference'>
            {isConnected ? (
                <>
                    <ConferenceRoom/>
                    <MenuOptions/>
                    {/* add ConferenceRoom component to hold all each videoPlayer component
                        add RoomMenu component to house all options (ie: mute, show video, chat etc) */}
                </>
            ): (
                <JoinCall/>
            )}
        </div>
    );
};

export default Conference;