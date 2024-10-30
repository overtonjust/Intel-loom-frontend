import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Instructor from './Components/Instructor';
import Credentials from './Components/Credentials';
import Personal from './Components/Personal';
import Uploads from './Components/Uploads';
import './Register.scss'

const Register = () => {
    // current state in the registration process
    const [formSection, setFormSection] = useState('instructor');
    const navigate = useNavigate();

    // Global form state
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: null,
        bio: '',
        github: '',
        gitlab: '',
        linkedin: '',
        youtube: '',
        isInstructor: false,
        instructorLinks: [],
        securityQuestion: '',
        securityAnswer: '',
        birthDate: '',
    });

    // Update form state
    const handleChange = (e) => {
        const key = String(e.target.name);
        if (key === 'isInstructor') {
            const bool = e.target.value === 'true';
            setFormData({ ...formData, [key]: bool });
        } else {
            setFormData({ ...formData, [key]: e.target.value });
        }
    };

    return (
        <main className='form-container'>
            <form className='sign-up-form'>
                <section className='sign-up-form__group text'>
                    <h2>Sign Up</h2>
                </section>
                {formSection === 'instructor' && (
                    <Instructor
                        formData={formData}
                        handleChange={handleChange}
                        setFormSection={setFormSection}
                    />
                )
                }

                {formSection === 'credentials' && (
                    <Credentials
                        formData={formData}
                        handleChange={handleChange}
                        setFormSection={setFormSection}
                    />
                )
                }

                {formSection === 'personal' && (
                    <Personal
                        formData={formData}
                        handleChange={handleChange}
                        setFormSection={setFormSection}
                    />
                )
                }

                {formSection === 'uploads' && (
                    <Uploads
                        formData={formData}
                        handleChange={handleChange}
                        setFormSection={setFormSection}
                        setFormData={setFormData}
                    />
                )
                }

                <section className='sign-up-form__group'>
                    <button type='button' className='button-blue' onClick={() => navigate('/login')}>Cancel</button>
                </section>
            </form>
        </main>
    )
};

export default Register;
