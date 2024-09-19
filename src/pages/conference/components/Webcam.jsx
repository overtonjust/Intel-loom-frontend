// Dependencies
import React from 'react';
import { useVideo } from '@100mslive/react-sdk';
import './Webcam.scss';

const Webcam = ({ peer }) => {
    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });

    console.log(peer)

    return (
        <section className={`webcam ${peer.roleName === 'guest' ? 'webcam__guest' : 'webcam__host'}`}>
            <video
            ref={videoRef}
            autoPlay={true}
            className='webcam__video'
            muted
            playsInline 
            />
            <article className='webcam__name'>
                {peer.name} {peer.isLocal ? "(You)": ""}
            </article>
        </section>
    );
};

export default Webcam;