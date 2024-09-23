// Dependencies
import React, { useEffect, useState } from 'react';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore
  } from '@100mslive/react-sdk';
import './Conference.scss';

// Components
import JoinCall from './components/JoinCall';
import ConferenceRoom from './components/ConferenceRoom';
import MenuOptions from './components/MenuOptions';
import ConferenceInfo from './components/ConferenceInfo';
import Participants from './components/Participants';

const Conference = ({/** Grab room / class data */}) => {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const [showParticipants, setShowParticipants] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    
    useEffect(() => {
        if(!isConnected) {
            hmsActions.leave();
        }
    }, [hmsActions, isConnected]);

    return (
        <section className='conference'>
            <h2 className='conference__title'>{/* class name */}Cool Class</h2>
            {isConnected ? (
                <article className='conference__ video-call'>
                    <ConferenceRoom fullscreen={fullscreen}/>
                    <MenuOptions showParticipants={showParticipants} setShowParticipants={setShowParticipants} setFullscreen={setFullscreen} fullscreen={fullscreen} />
                    {showParticipants && <Participants/>}
                </article>
            ): (
                <JoinCall/>
            )}
            <ConferenceInfo/>
        </section>
    );
};

export default Conference;