import Reac, { useEffect } from 'react';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSActions,
    useHMSStore
  } from '@100mslive/react-sdk';

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
                    {/* add ConferenceRoom component to hold all each videoPlayer component
                        add RoomMenu component to house all options (ie: mute, show video, chat etc) */}
                </>
            ): (
                {/* sign in component ? */}
            )}
        </div>
    );
};

export default Conference;