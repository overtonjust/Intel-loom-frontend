// Dependencies
import React, { useEffect } from 'react';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore
  } from '@100mslive/react-sdk';
import './Conference.scss';

// Components
<<<<<<< HEAD
import JoinCall from './components/JoinCall';
import ConferenceRoom from './components/ConferenceRoom';
import MenuOptions from './components/MenuOptions';
import ConferenceInfo from './components/ConferenceInfo';
=======
import JoinCall from './components/JoinCall'
import ConferenceRoom from './components/ConferenceRoom'
import MenuOptions from './components/MenuOptions';
>>>>>>> b2f3be6 (added MenuOptions info and package-lock to .gitign)

const Conference = ({/** Grab room / class data */}) => {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

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
                    <ConferenceRoom/>
                    <MenuOptions/>
                </article>
            ): (
                <JoinCall/>
            )}
            <ConferenceInfo/>
        </section>
    );
};

export default Conference;