import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import { MdAlternateEmail } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { BsInfoCircle } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";

const Credentials = ({ formData, handleChange, setFormSection }) => {
    const { API } = useContext(UserContext)
    const [validatedPassword, setValidatedPassword] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false
    })
    const [validatedUsername, setValidatedUsername] = useState('')
    const [validatedEmail, setValidatedEmail] = useState('')
    const [validateForm, setValidateForm] = useState({

    })
    const [passwordPassed, setPasswordPassed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [errors, setErrors] = useState({});

    // Validation function for username, email, passsword & confirmation password

  const validate = () => {
    const {username, email, password, confirmPassword, securityQuestion, securityAnswer} = formData;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const formErrors = {};


        if (username === '') formErrors.username = 'Username is required';
        if (email === '') formErrors.email = 'Email is required';
        if (email !== '' && !emailRegex.test(email)) formErrors.email = 'Invalid email address';
        if (password === '') formErrors.password = 'Password is required';
        if (confirmPassword === '') formErrors.confirmPassword = 'Confirm Password is required';
        if ((password !== '' && confirmPassword !== '') && password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
        if (securityQuestion === '') formErrors.securityQuestion = 'Security Question is required';
        if (securityAnswer === '') formErrors.securityAnswer = 'Security Answer is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            setFormSection('personal');
        }
        setTimeout(() => {
          setErrors({})
        }, 5000);
    };


    useEffect(() => {
        axios.post(`${API}/users/validate-username`, { username: formData.username })
            .then(res => {
                setValidatedUsername('')
            })
            .catch(err => {
                setValidatedUsername(err.response.data)
            })
    }, [formData.username])

    useEffect(() => {
        axios.post(`${API}/users/validate-email`, { email: formData.email })
            .then(res => {
                setValidatedEmail('');
            })
            .catch(err => {
                setValidatedEmail(err.response.data)
            })
    }, [formData.email])

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
            {validatedUsername ? <p className='error-message'>{validatedUsername}</p> : ''}
            {errors.username ? <p className='error-message'>{errors.username}</p> : ''}
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
            {validatedEmail ? <p className='error-message'>{validatedEmail}</p> : ''}
            {errors.email ? <p className='error-message'>{errors.email}</p> : ''}
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
            {errors.password ? <p className='error-message'>{errors.password}</p> : ''}
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
                <>
                <section className="sign-up-form__group">
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
                </section>
                {errors.confirmPassword ? <p className='error-message'>{errors.confirmPassword}</p> : ''}
              </>
            )}
            <section className="sign-up-form__group">
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
            </section>
            {errors.securityQuestion ? <p className='error-message'>{errors.securityQuestion}</p> : ''}
            <section className="sign-up-form__group">
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
            </section>
            {errors.securityAnswer ? <p className='error-message'>{errors.securityAnswer}</p> : ''}
            <div className="sign-up-form__group steps-btns">
                <button
                    type="button"
                    className='button-large-orange'
                    onClick={() => setFormSection('instructor')}
                >Previous</button>
                <button
                    type="button"
                    className='button-large-orange'
                    onClick={handleNext}
                    disabled={Object.keys(errors).length > 0}
                >Next</button>
            </div>
        </>
    );
};

export default Credentials;
