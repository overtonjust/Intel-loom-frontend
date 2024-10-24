// Dependencies
import React from 'react';
import './Prompt.scss'

const Prompt = ({ prompt, setPrompt }) => {
    return (
        <section className='prompt'>
          <p className='prompt__message'>{prompt}</p>
          <div className='prompt__options'>
            <button className='button-orange'>Yes</button>
            <button className='button-blue' onClick={() => setPrompt(false)}>Skip</button>
          </div>
        </section>
    );
};

export default Prompt;