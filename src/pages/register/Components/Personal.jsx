import { useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";

const Personal = ({ formData, handleChange, setFormSection }) => {
  const [errors, setErrors] = useState({});
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

  const validate = () => {
    const { firstName, lastName, birthDate, isInstructor, bio } = formData;
    const formErrors = {};
    if (firstName === '') formErrors.firstName = "First Name is required";
    if (lastName === '') formErrors.lastName = "Last Name is required";
    if (birthDate === '') formErrors.birthDate = "Birth Date is required";
    if (birthDate !== '' && validateBirthDate() < 18) formErrors.birthDate = "You must be at least 18 years old to create an account";
    if (isInstructor && bio === '') formErrors.bio = "Bio is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

    const handleNext = () => {
      if (validate()) {
        setFormSection('uploads');
      }
      setTimeout(() => {
        setErrors({});
      }, 5000);
    };

    return (
        <>
            <div className="sign-up-form__group">
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
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            <div className="sign-up-form__group">
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
            <div className="sign-up-form__group">
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
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            <div className="sign-up-form__group">
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
                
            </div>
            {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
            <div className="sign-up-form__group">
              <div className="form-input">
                <textarea
                  name="bio"
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder={`Bio ${!formData.isInstructor ? ' (optional)' : ''}`}
                />
              </div>
            </div>
            {errors.bio && <p className="error-message">{errors.bio}</p>}
            <div className="sign-up-form__group steps-btns">
                <button type="button" onClick={() => setFormSection('credentials')} className='button-large-orange'>
                    Previous
                </button>
                <button type="button" onClick={handleNext} className='button-large-orange'>
                    Next
                </button>
            </div>
        </>
    );
};

export default Personal;
