import React, { useState } from 'react';
import './Security.scss';

const Security = ({ formData, handleChange, prevStep }) => {
    const [errors, setErrors] = useState({});

    // Validation function for security question and security answer
    const validate = () => {
        let formErrors = {};
        if (!formData.securityQuestion) formErrors.securityQuestion = 'Security question is required';
        if (!formData.securityAnswer) formErrors.securityAnswer = 'Security answer is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted successfully', formData);
            // Handle sending the form data to a backend server via an API call
        }
    };

    return (
        <div className='security-container'>
            <div className='security-form'>
                <h2>Security Information</h2>
                <form>
                    <div className="form-input">
                        <input
                            type="text"
                            name="securityQuestion"
                            placeholder="Security Question (required)"
                            value={formData.securityQuestion}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.securityQuestion && <p className="error-message">{errors.securityQuestion}</p>}

                    <div className="form-input">
                        <input
                            type="text"
                            name="securityAnswer"
                            placeholder="Security Answer (required)"
                            value={formData.securityAnswer}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.securityAnswer && <p className="error-message">{errors.securityAnswer}</p>}

                    <div className="main-btns">
                        <button className="button-orange" onClick={prevStep}>Back</button>
                        <button className="button-orange" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Security;
