import React, { useState } from 'react';
import './Personal.scss';

const Personal = ({ formData, handleChange, nextStep, prevStep }) => {
    const [errors, setErrors] = useState({});

    // Validation function for first name and last name
    const validate = () => {
        let formErrors = {};

        if (!formData.firstName) formErrors.firstName = 'First name is required';
        if (!formData.lastName) formErrors.lastName = 'Last name is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validate()) {
            nextStep(); // Move to the next step if validation passes
        }
    };

    return (
        <div className='personal-container'>
            <div className='personal-form'>
                <h2>Personal Information</h2>
                <form>
                    {/* // First Name (required) */}

                    <div className="form-input">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name (required)"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.firstName && <p className="error-message">{errors.firstName}</p>}

                    {/* // Optional Middle Name */}

                    <div className="form-input">
                        <input
                            type="text"
                            name="middleName"
                            placeholder="Middle Name (optional)"
                            value={formData.middleName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* // Last Name (required) */}

                    <div className="form-input">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name (required)"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}

                    {/* // Optional User Bio */}
                    <div className="form-input">
                        <textarea
                            name="bio"
                            placeholder="Bio (optional)"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="form-input">
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={handleChange}
                        />
                    </div>


                    <div className="main-btns">
                        <button className="button-orange" onClick={prevStep}>Back</button>
                        <button className="button-orange" onClick={handleNext}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Personal;
