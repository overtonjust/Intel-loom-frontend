// Dependencies
import React, { useContext } from 'react';
import { useVideo } from '@100mslive/react-sdk';
import './Webcam.scss';
import { WebcamContext } from '../../../context/UserContext';

const Webcam = ({ peer }) => {
    const { fullscreen, isLocalVideoEnabled } = useContext(WebcamContext);
    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });

    return (
        <section className={`webcam ${peer.roleName === 'guest' ? 'webcam__guest' : 'webcam__host'} `}>
            {!isLocalVideoEnabled ? 
                <img className={`webcam__video ${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : fullscreen && peer.roleName === 'host' ? 'webcam__fullscreen' : ''} `} src="https://placehold.co/180x100" alt="" /> 
                :
                <video
                ref={videoRef}
                autoPlay={true}
                muted
                className={`webcam__video ${fullscreen && peer.roleName === 'guest' ? 'webcam__mini' : fullscreen && peer.roleName === 'host' ? 'webcam__fullscreen' : ''} `}
                playsInline 
                />
            }
            {!fullscreen && 
                <article className='webcam__name'>
                    {peer.name} {peer.isLocal ? "(You)": ""}
                </article>
            }
        </section>
    );
};

export default Webcam;