import React from 'react';
import { FaGithub, FaGitlab, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './SocialLinks.scss';

const SocialLinks = ({ formData, handleChange, nextStep, prevStep }) => {
    return (
        <div className='social-container'>
            <div className='social-form'>
                <h2>Social Links (Optional)</h2>
                <form>
                    <div className="form-input">
                        <FaGithub className="social-icon" />
                        <input
                            type="text"
                            name="github"
                            placeholder="GitHub"
                            value={formData.github}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-input">
                        <FaGitlab className="social-icon" />
                        <input
                            type="text"
                            name="gitlab"
                            placeholder="GitLab"
                            value={formData.gitlab}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-input">
                        <FaLinkedin className="social-icon" />
                        <input
                            type="text"
                            name="linkedin"
                            placeholder="LinkedIn"
                            value={formData.linkedin}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-input">
                        <FaYoutube className="social-icon" />
                        <input
                            type="text"
                            name="youtube"
                            placeholder="YouTube"
                            value={formData.youtube}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="main-btns">
                        <button className="button-orange" onClick={prevStep}>Back</button>
                        <button className="button-orange" onClick={nextStep}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SocialLinks;
