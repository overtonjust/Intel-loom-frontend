import React from 'react';
import { useVideo } from '@100mslive/react-sdk';

const Webcam = ({ peer }) => {
    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    })

    return (
        <section className='peer-container'>
            <video
            ref={videoRef}
            autoPlay={true}
            className=''
            muted
            playsInline 
            />
            <article className='peer-name'>
                {peer.name} {peer.isLocal ? "(You)": ""}
            </article>
        </section>
    );
};

export default Webcam;