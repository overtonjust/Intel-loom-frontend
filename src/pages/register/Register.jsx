import React, { useState } from 'react';
import Credentials from './Credentials';
// import Personal from './Personal';
// import SocialLinks from './SocialLinks';
// import InstructorPrompt from './InstructorPrompt';
// import Security from './Security';

const Register = () => {
    // current state in the registration process
    const [step, setStep] = useState(1);

    // Global form state
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: '',
        bio: '',
        github: '',
        gitlab: '',
        linkedin: '',
        youtube: '',
        instructor: false,
        instructorProfilePicture: '',
        instructorBio: '',
        securityQuestion: '',
        securityAnswer: '',
        videos: ''
    });

    // Update form state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Move to the NEXT step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Move to the PREVIOUS step
    const prevStep = () => {
        setStep(step - 1);
    };

    // Render the current step based on the valie of the 'step'
    switch (step) {
        case 1:
            return <Credentials formData={formData} handleChange={handleChange} nextStep={nextStep} />;
        case 2:
            return <Personal formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
        case 3:
            return <SocialLinks formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <InstructorPrompt formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
        case 5:
            return <Security formData={formData} handleChange={handleChange} prevStep={prevStep} />;
        default:
            return null;
    }
};

export default Register;
