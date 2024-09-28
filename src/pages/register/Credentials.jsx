import React, { useState } from 'react';
import './Credentials.scss'

const Credentials = ({ formData, handleChange, nextStep }) => {
    const [errors, setErrors] = useState({});

    // Validation function for username, email, passsword & confirmation password

    const validate = () => {
        let formErrors = {};

        if (!formData.username) formErrors.username = 'Username is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.password) formErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validate()) {
            nextStep(); // Next step if validation passes.
        }
    };

    return (
        <div className='credentials-container'>
            <div className='credentials-form'>
                <h2>Account Credentials</h2>
                <form>
                    <div className="form-input">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username (required)"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.username && <p className="error-message">{errors.username}</p>}

                    <div className="form-input">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email (required)"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <p className="error-message">{errors.email}</p>}

                    <div className="form-input">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password (required)"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <p className="error-message">{errors.password}</p>}

                    <div className="form-input">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password (required)"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

                    <div className="main-btns">
                        <button className="button-orange" onClick={handleNext}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Credentials;