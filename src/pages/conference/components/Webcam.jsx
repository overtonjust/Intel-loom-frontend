// Dependencies
import React from 'react';
import { useVideo } from '@100mslive/react-sdk';
import './Webcam.scss';

const Webcam = ({ peer }) => {
    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });

    return (
        <section className={`webcam ${peer.roleName === 'guest' ? 'webcam__guest' : 'webcam__host'}`}>
            <video
            ref={videoRef}
            autoPlay={true}
            muted
            className='webcam__video'
            playsInline 
            />
            <article className='webcam__name'>
                {peer.name} {peer.isLocal ? "(You)": ""}
            </article>
        </section>
    );
};

export default Webcam;