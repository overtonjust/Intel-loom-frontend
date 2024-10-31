// Dependencies
import React, { useContext } from 'react';
import { WebcamContext } from '../../../context/UserContext';
import './ConferenceInfo.scss'

const ConferenceInfo = () => {
    const { instructorName, isDesktop } = useContext(WebcamContext);
    
    return (
       <section className={isDesktop ? 'conference-desktop__call-info' : 'call-info'}>
            <article className='call-info__rules'>
                <h2 className='call-info__title'>
                    "{instructorName || 'Instructor'}'s" class etiquette {/** replace instructor with appropriate name  and map their rules*/}
                </h2>
                <ul className='call-info__list'>
                    <li className='call-info__list-item'>
                        Please have your webcam on (We want to see you!)
                    </li>
                    <li className='call-info__list-item'>
                        Please mute yourself when not speaking
                    </li>
                </ul>
            </article>
            
            <article className='call-info__requirements'>
                <h2 className='call-info__title'>Requirements for the session:</h2>
                <ul className='call-info__list'>
                    <li className='call-info__list-item'>
                        A computer with a webcam
                    </li>
                    <li className='call-info__list-item'>
                        An Ide installed and updated ("{instructorName || 'Instructor'}" prefers vscode!)
                    </li>
                    <li className='call-info__list-item'>
                        Your smiling face!
                    </li>
                </ul>
            </article>
            <article className='call-info__disclaimer'>
                <h2 className='call-info__title'>Disclaimer:</h2>
                <ul className='call-info__list'>
                    <li className='call-info__list-item'>
                        These calls may be recorded to help bring you a better experience!
                    </li>
                </ul>
            </article>   
       </section>
    );
};

export default ConferenceInfo;