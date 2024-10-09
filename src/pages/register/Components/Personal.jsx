import React, { useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";

const Personal = ({ formData, handleChange, setFormSection, setError }) => {
    const [birthDateValid, setBirthDateValid] = useState(true);

    // Function to validate age 18+
    const validateBirthDate = () => {
        const today = new Date();
        const birthDate = new Date(formData.birthDate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    const handleNext = () => {
        const requiredFields = ['firstName', 'lastName', 'birthDate'];

        if (requiredFields.every((field) => formData[field])) {
            const age = validateBirthDate();
            if (age >= 18) {
                setBirthDateValid(true);
                setFormSection('uploads'); // Proceed to the next section (uploads)
            } else {
                setBirthDateValid(false);
                setError("You must be at least 18 years old to create an account.");
                setTimeout(() => setError(""), 3000);
            }
        } else {
            const missingFields = requiredFields.filter((field) => !formData[field])
                .map((field) => field === 'firstName' ? 'First Name' : field === 'lastName' ? 'Last Name' : 'Birth Date');
            setError(`Please fill in: ${missingFields.join(', ')}`);
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <>
            <div className="signup-form__group">
                <div className="form-input">
                    <MdOutlineDriveFileRenameOutline />
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="First Name"
                    />
                </div>
            </div>
            <div className="signup-form__group">
                <div className="form-input">
                    <MdOutlineDriveFileRenameOutline />
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Middle Name (optional)"
                    />
                </div>
            </div>
            <div className="signup-form__group">
                <div className="form-input">
                    <MdOutlineDriveFileRenameOutline />
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Last Name"
                    />
                </div>
            </div>
            <div className="signup-form__group">
                <div className="form-input">
                    <BsCalendar2Date />
                    <input
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Birth Date"
                    />
                </div>
                <div className='error-container'>
                    {!birthDateValid && <p className="error">You must be at least 18 years old to create an account.</p>}
                </div>
            </div>

            <div className="signup-form__group main-btns">
                <button type="button" onClick={() => setFormSection('credentials')}>
                    Previous
                </button>
                <button type="button" onClick={handleNext}>
                    Next
                </button>
            </div>
        </>
    );
};

export default Personal;
