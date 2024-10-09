import React from 'react';
import './InstructorPrompt.scss';

const InstructorPrompt = ({ formData, handleChange, nextStep, prevStep }) => {

    // Handle the checkbox for whether the user is an instructor
    const handleInstructorChange = (e) => {
        handleChange(e);
        if (!e.target.checked) {
            nextStep(); // If "Instructor" is unchecked, skip the instructor fields and go to the next step
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        nextStep(); // Proceed to the next step (either instructor fields or security)
    };

    return (
        <div className="instructor-container">
            <div className="instructor-form">
                <h2>Are you an Instructor?</h2>
                <form>
                    <div className="form-input">
                        <label>
                            <input
                                type="checkbox"
                                name="instructor"
                                checked={formData.instructor}
                                onChange={handleInstructorChange}
                            />
                            Instructor
                        </label>
                    </div>

                    {formData.instructor && (
                        <>
                            <div className="form-input">
                                <label>Instructor Profile Picture (required)</label>
                                <input
                                    type="file"
                                    name="instructorProfilePicture"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-input">
                                <label>Instructor Bio (required)</label>
                                <textarea
                                    name="instructorBio"
                                    value={formData.instructorBio}
                                    onChange={handleChange}
                                    placeholder="Bio (required)"
                                />
                            </div>

                            <div className="form-input">
                                <label>Videos (optional)</label>
                                <input
                                    type="text"
                                    name="videos"
                                    value={formData.videos}
                                    onChange={handleChange}
                                    placeholder="Videos (optional)"
                                />
                            </div>
                        </>
                    )}

                    <div className="main-btns">
                        <button className="button-orange" onClick={prevStep}>Back</button>
                        <button className="button-orange" onClick={handleNext}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstructorPrompt;
