// Dependencies
import React, { useContext } from 'react';
import { useVideo, selectIsPeerAudioEnabled, useHMSStore, selectIsPeerVideoEnabled } from '@100mslive/react-sdk';
import './Webcam.scss';
import { WebcamContext } from '../../../context/UserContext';

const Webcam = ({ peer }) => {
    const { fullscreen } = useContext(WebcamContext);
    const { videoRef } = useVideo({
        trackId: peer.auxiliaryTracks[0] || peer.videoTrack
    });
    
    const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));

    // console.log(peer)
    
    return (
        <section className={`webcam ${peer.roleName === 'guest' ? 'webcam__guest' : 'webcam__host'} `}>
            <video
            ref={videoRef}
            autoPlay={true}
            muted
            className={`webcam__video ${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : fullscreen && peer.roleName === 'host' ? 'webcam__fullscreen' : ''} `}
            playsInline 
            />
            {/* {!isPeerVideoEnabled ? (
                <img className={`webcam__video webcam__image ${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : fullscreen && peer.roleName === 'host' ? 'webcam__fullscreen' : ''} `} src="https://placehold.co/180x100" alt="" /> 
            ) : null} */}
            {!fullscreen && 
                <article className='webcam__name'>
                    {peer.name} {peer.isLocal ? "(You)": ""}
                </article>
            }
        </section>
    );
};

export default Webcam;