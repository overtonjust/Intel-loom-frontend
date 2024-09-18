import React from 'react';
import { selectPeers, useHMSStore } from '@100mslive/react-sdk';


const ConferenceRoom = () => {
    const peers = useHMSStore(selectPeers);

    return (
        <div>
            {/* Map through list of joined callers and render a videoplayer for each */}
        </div>
    );
};

export default ConferenceRoom;