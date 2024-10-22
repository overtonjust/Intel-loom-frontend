import React, { useState } from 'react';
import { FaGithub, FaGitlab, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Import social media icons

// Reusable component for Social Media Link Input
const SocialLinkInput = ({ icon: Icon, name, value, onChange, placeholder }) => (
    <div className="form-input" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Icon style={{ marginRight: '10px' }} />
        <input
            type="url"
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            style={{ flex: 1 }}
        />
    </div>
);

const Uploads = ({ formData, setFormSection }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [videoLink, setVideoLink] = useState(''); // Default to empty string for controlled input
    const [socialLinks, setSocialLinks] = useState({
        github: '',
        gitlab: '',
        linkedin: '',
        youtube: ''
    });
    const [formErrors, setFormErrors] = useState([]);

    const isInstructor = formData.isInstructor; // Check if user is an instructor

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUploadFile(file || null); // Ensure we are always setting a value, even if null
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file || null); // Ensure we are always setting a value, even if null
    };

    const handleLinkChange = (e) => {
        setVideoLink(e.target.value || ''); // Ensure controlled input with a default empty string
    };

    const handleSocialLinkChange = (e) => {
        const { name, value } = e.target;
        setSocialLinks({ ...socialLinks, [name]: value });
    };

    const handleNext = () => {
        let errors = [];

        // Check if instructor and profile pic is mandatory
        if (isInstructor && !profilePic) {
            errors.push('As an instructor, please upload a profile picture.');
        }

        // If the user is an instructor, ensure at least one social media link
        if (isInstructor && !socialLinks.github && !socialLinks.gitlab && !socialLinks.linkedin && !socialLinks.youtube) {
            errors.push('As an instructor, please provide at least one social media link (GitHub, GitLab, LinkedIn, or YouTube).');
        }

        if (errors.length > 0) {
            setFormErrors(errors);
            setTimeout(() => setFormErrors([]), 3000);
            return;
        }

        // Proceed to the next section (complete)
        setFormSection('complete');
    };

    return (
        <>
            {/* Profile Picture Upload */}
            <div className="signup-form__group" style={{ marginBottom: '1.5rem' }}>
                <div className="form-input">
                    <label htmlFor="profilePic">
                        {isInstructor ? 'Upload Profile Picture (Required for Instructors)' : 'Upload Profile Picture (Optional)'}
                    </label>
                    <input
                        type="file"
                        id="profilePic"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                    />
                </div>
            </div>

            {/* Video File Upload (Optional) */}
            <div className="signup-form__group" style={{ marginBottom: '1.5rem' }}>
                <div className="form-input">
                    <label htmlFor="uploadFile">Upload Video File (Optional)</label>
                    <input
                        type="file"
                        id="uploadFile"
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            {/* Video Link Input (Optional) */}
            <div className="signup-form__group" style={{ marginBottom: '1.5rem' }}>
                <div className="form-input">
                    <label htmlFor="videoLink">Enter Video Link (Optional)</label>
                    <input
                        type="url"
                        id="videoLink"
                        value={videoLink || ''} // Ensure controlled input with a default empty string
                        onChange={handleLinkChange}
                        placeholder="https://example.com/video"
                    />
                </div>
            </div>

            {/* Social Media Links (Mandatory only for instructors) */}
            <div className="signup-form__group" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <SocialLinkInput
                    icon={FaGithub}
                    name="github"
                    value={socialLinks.github}
                    onChange={handleSocialLinkChange}
                    placeholder="https://github.com/yourprofile"
                />
                <SocialLinkInput
                    icon={FaGitlab}
                    name="gitlab"
                    value={socialLinks.gitlab}
                    onChange={handleSocialLinkChange}
                    placeholder="https://gitlab.com/yourprofile"
                />
                <SocialLinkInput
                    icon={FaLinkedin}
                    name="linkedin"
                    value={socialLinks.linkedin}
                    onChange={handleSocialLinkChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                />
                <SocialLinkInput
                    icon={FaYoutube}
                    name="youtube"
                    value={socialLinks.youtube}
                    onChange={handleSocialLinkChange}
                    placeholder="https://youtube.com/yourchannel"
                />
            </div>

            {/* Error Message */}
            {formErrors.length > 0 && (
                <div className="error-container" style={{ marginBottom: '1.5rem', color: 'red' }}>
                    {formErrors.map((error, index) => (
                        <p key={index} className="error">{error}</p>
                    ))}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="signup-form__group main-btns" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={() => setFormSection('personal')}>
                    Previous
                </button>
                <button type="button" onClick={handleNext}>
                    Submit
                </button>
            </div>
        </>
    );
};

export default Uploads;
