import { useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'

const Instructor = ({ formData, handleChange, setFormSection }) => {
    const { setMessage } = useContext(UserContext)
    const [disclaimers, setDisclaimers] = useState({
        experience: false,
        materials: false
    })
    // Click to handle next button to next section
    const handleNextClick = () => {
        if (formData.isInstructor) {
            if (disclaimers.experience && disclaimers.materials) {
                setFormSection('credentials')
            } else {
                setMessage('Please check both disclaimers.')
            }
        } else {
            // Move to next form section
            setFormSection('credentials')
        }
    }

    const handleCheckboxChange = e => {
        setDisclaimers({ ...disclaimers, [e.target.name]: !disclaimers[e.target.name] })
    }
    return (
        <>
            <div className='sign-up-form__group'>
                <h6 className='text'>Would you like to register as an Instructor?</h6>
                <div className='instructor-answers text'>
                    <div className='instructor-answers__opt'>
                        <input type='radio'
                            name='isInstructor'
                            id='yes'
                            value={true}
                            checked={formData.isInstructor === true}
                            onChange={handleChange} />
                        <label htmlFor='yes'>Yes</label>
                    </div>
                    <div className='instructor-answers__opt'>
                        <input type='radio'
                            name='isInstructor'
                            id='no'
                            value={false}
                            checked={formData.isInstructor === false}
                            onChange={handleChange} />
                        <label htmlFor='no'>No</label>
                    </div>
                </div>
            </div>
            <div className='sign-up-form__group text'>
                {!formData.isInstructor ? (
                    <>
                        <p className='disclaimer'>* You can become an instructor at any time.</p>
                        <p className='disclaimer'>** Additional information may be needed <br />to complete your instructor profile.</p>
                        <p className='disclaimer'>*** At first, you'll recieve 75% of your earnings, <br />with a chance to increase it, by maintaining <br />a rating of 4 stars and higher</p>
                    </>
                ) : (
                    <>
                        <p className='disclaimer'>
                            <input type='checkbox'
                                name='experience'
                                checked={disclaimers.experience}
                                onChange={handleCheckboxChange}></input>
                            <i> By registering as an instructor, I certify that<br /> I possess the necessary experience to teach <br />the subject(s) I am offering.</i></p>
                        <p className='disclaimer'>
                            <input type='checkbox'
                                name='materials'
                                checked={disclaimers.materials}
                                onChange={handleCheckboxChange}></input>
                            <i> I certify that all materials I use <br />or distribute in my courses are either <br />my own or are used with proper licensing <br />and permissions.</i></p>
                    </>
                )}

                <p className='disclaimer'></p>
            </div>
            <div className='sign-up-form__group'>
                <button type='button' className='button-large-orange'
                    onClick={handleNextClick}>Next</button>
            </div>
        </>
    )
}

export default Instructor
