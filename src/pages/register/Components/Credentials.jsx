import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import { MdAlternateEmail } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { BsInfoCircle } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";

const Credentials = ({ formData, handleChange }) => {
    const { API } = useContext(UserContext)
    const [validatedPassword, setValidatedPassword] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false
    })
    const [passwordPassed, setPasswordPassed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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

    useEffect(() => {
        axios.post(`${API}/users/validate-password`, { password: formData.password })
            .then(res => {
                setValidatedPassword(res.data)
                setPasswordPassed(Object.values(res.data).every(val => val === true))
            })
    }, [formData.password])

    return (
        <>
            <section className='sign-up-form__group'>
                <div className='form-input'>
                    <HiUserCircle />
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Username"
                    />
                </div>
            </section>
            <section className='sign-up-form__group'>
                <div className='form-input'>
                    <MdAlternateEmail />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Email"
                    />
                </div>
            </section>
            <section className="sign-up-form__group">
                <div className="form-input">
                    <TbPasswordUser />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Password"
                    />
                    {showPassword ? (
                        <LuEyeOff
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <LuEye
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                </div>
            </section>
            {!formData.password ? (
                ""
            ) : formData.password && !passwordPassed ? (
                <ul className="validations">
                    <li style={{ color: validatedPassword.length ? "green" : "red" }}>
                        At least 12 characters
                    </li>
                    <li style={{ color: validatedPassword.lowercase ? "green" : "red" }}>
                        At least one lowercase letter
                    </li>
                    <li style={{ color: validatedPassword.uppercase ? "green" : "red" }}>
                        At least one uppercase letter
                    </li>
                    <li style={{ color: validatedPassword.number ? "green" : "red" }}>
                        At least one number
                    </li>
                    <li style={{ color: validatedPassword.specialChar ? "green" : "red" }}>
                        At least one special character
                    </li>
                </ul>
            ) : (
                <div className="sign-up-form__group">
                    <div className="form-input">
                        <TbPasswordUser />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            placeholder="Confirm Password"
                        />
                        {showPassword ? (
                            <LuEyeOff
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <LuEye
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>
            )}
            <div className="sign-up-form__group">
                <div className="form-input">
                    <FaRegQuestionCircle />
                    <select
                        name="securityQuestion"
                        id="securityQuestion"
                        onChange={handleChange}
                    >
                        <option value="">Security Question</option>
                        <option value="What is your favorite color?">
                            What is your favorite color?
                        </option>
                        <option value="What is your favorite food?">
                            What is your favorite food?
                        </option>
                        <option value="What is your favorite movie?">
                            What is your favorite movie?
                        </option>
                        <option value="What is your favorite song?">
                            What is your favorite song?
                        </option>
                        <option value="What is your favorite TV show?">
                            What is your favorite TV show?
                        </option>
                        <option value="What is your mother's maiden name?">
                            What is your mother's maiden name?
                        </option>
                        <option value="What is your pet's name?">
                            What is your pet's name?
                        </option>
                        <option value="What is your favorite book?">
                            What is your favorite book?
                        </option>
                        <option value="What is your favorite sport?">
                            What is your favorite sport?
                        </option>
                        <option value="What is your favorite hobby?">
                            What is your favorite hobby?
                        </option>
                    </select>
                </div>
            </div>
            <div className="sign-up-form__group">
                <div className="form-input">
                    <BsInfoCircle />
                    <input
                        type="text"
                        name="securityAnswer"
                        id="securityAnswer"
                        value={formData.securityAnswer}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Security Answer"
                    />
                </div>
            </div>
        </>
    );
};

export default Credentials;