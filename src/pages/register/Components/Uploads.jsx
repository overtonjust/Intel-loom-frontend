import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { FaGithub, FaGitlab, FaLinkedin, FaYoutube } from "react-icons/fa"; // Import social media icons
import { FaRegCircleUser } from "react-icons/fa6";
import SocialLinkInput from "./SocialLinkInput"; // Import SocialLinkInput component

const Uploads = ({ formData, handleChange, setFormSection, setFormData }) => {
  const { API, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const isInstructor = formData.isInstructor; // Check if user is an instructor
  const inputRef = useRef();
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState([]);

  const chooseProfilePic = () => inputRef.current.click();

  const pickProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
    }
  };

  const addLink = () => {
    const embeddableLink = link.replace("watch?v=", "embed/");
    setFormData({
      ...formData,
      instructorLinks: [...formData.instructorLinks, embeddableLink],
    });
    setLink("");
  };

  const removeLink = (idx) => {
    setFormData({
      ...formData,
      instructorLinks: formData.instructorLinks.filter(
        (_, index) => index !== idx
      ),
    });
  };

  const validate = () => {
    const formErrors = {};
    const { profilePicture, linkedin } = formData;
    if (isInstructor && !profilePicture) formErrors.profilePicture = "As an instructor, please upload a profile picture.";
    if (isInstructor && !linkedin) formErrors.linkedin = "As an instructor, please provide a LinkedIn profile link.";
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('middleName', formData.middleName);
      data.append('lastName', formData.lastName);
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('profilePicture', formData.profilePicture);
      data.append('bio', formData.bio);
      data.append('github', formData.github);
      data.append('gitlab', formData.gitlab);
      data.append('linkedin', formData.linkedin);
      data.append('youtube', formData.youtube);
      data.append('isInstructor', formData.isInstructor);
      formData.instructorLinks.forEach((link) => {
        data.append('instructorLinks', link);
      });
      data.append('securityQuestion', formData.securityQuestion);
      data.append('securityAnswer', formData.securityAnswer);
      data.append('birthDate', formData.birthDate);
      axios.post(`${API}/users/register`, data, { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error) {
            setErrors(err.response.data.error);
            return;
          }
        });
    }
    setTimeout(() => {
      setErrors({});
    }, 5000);  
  };

  return (
    <>
      {/* Profile Picture Upload */}
      <div className="sign-up-form__group">
        <div className="form-input">
          <label htmlFor="profilePic">
            {`Profile Picture ${!isInstructor ? "(optional)" : ""}`}
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            ref={inputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={pickProfilePic}
          />
          <button
            type="button"
            onClick={chooseProfilePic}
            className="button-orange profile-pic"
          >
            <FaRegCircleUser />
          </button>
        </div>
      </div>
      {errors.profilePicture && (<p className="error-message">{errors.profilePicture}</p>)}
      {formData.profilePicture && (
        <div className="sign-up-form__group">
          <img
            src={URL.createObjectURL(formData.profilePicture)}
            alt="Profile"
            className="profile-preview"
          />
        </div>
      )}

      {/* Video Link Input (Optional) */}
      {formData.isInstructor && (
        <div className="sign-up-form__group">
          <div className="form-input">
            <input
              type="url"
              id="videoLink"
              placeholder="Add YouTube video link/s"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button type="button" onClick={addLink} className="button-orange">
              Add
            </button>
          </div>
        </div>
      )}

      {formData.instructorLinks.length > 0 && (
        <div className="sign-up-form__group">
          <ul className="instructor-links">
            {formData.instructorLinks.map((link, idx) => (
              <li key={idx}>
                <button
                  className="delete-link"
                  type="button"
                  onClick={() => removeLink(idx)}
                >
                  X
                </button>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social Media Links (Mandatory only for instructors) */}
      <div className="sign-up-form__group">
        <SocialLinkInput
          icon={FaLinkedin}
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="Linkedin profile link"
        />
      </div>
      {errors.linkedin && (<p className="error-message">{errors.linkedin}</p>)}
      <div className="sign-up-form__group">
        <SocialLinkInput
          icon={FaGithub}
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="Github profile link"
        />
      </div>
      <div className="sign-up-form__group">
        <SocialLinkInput
          icon={FaGitlab}
          name="gitlab"
          value={formData.gitlab}
          onChange={handleChange}
          placeholder="Gitlab profile link"
        />
      </div>
      <div className="sign-up-form__group">
        <SocialLinkInput
          icon={FaYoutube}
          name="youtube"
          value={formData.youtube}
          onChange={handleChange}
          placeholder="Youtube profile link"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="sign-up-form__group steps-btns">
        <button
          type="button"
          onClick={() => setFormSection("personal")}
          className="button-large-orange"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="button-large-orange"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Uploads;
