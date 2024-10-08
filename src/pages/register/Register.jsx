import React, { useState } from 'react';
import Instructor from './Components/Instructor';
import Credentials from './Components/Credentials';
import Personal from './Components/Personal';
import './Register.scss'

const Register = () => {
    // current state in the registration process
    const [formSection, setFormSection] = useState('instructor');

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
        isInstructor: false,
        instructorBio: '',
        instructorMedia: [],
        instructorLinks: [],
        securityQuestion: '',
        securityAnswer: ''
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

    // console.log(formData)

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

                {/* {formSection === 'uploads' && (
                    <Uploads />
                )
                }

                {formSection === 'submission' && (
                    <Submission />
                )
                } */}

                <section className='sign-up-form__group'>
                    <button>Cancel</button>
                </section>
            </form>
        </main>
    )
};

export default Register;
