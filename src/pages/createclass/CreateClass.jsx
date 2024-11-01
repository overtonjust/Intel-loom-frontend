import { useState, useRef, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuImagePlus } from "react-icons/lu";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import "./CreateClass.scss";

const CreateClass = () => {
  const { API, setMessage } = useContext(UserContext);
  const navigate = useNavigate();
  const inputRef = useRef();
  const [newClass, setNewClass] = useState({
    title: "",
    description: "",
    price: "",
    capacity: "",
    highlightPicture: 0,
    classPictures: [],
  });

  const handleChange = (e) => {
    setNewClass({
      ...newClass,
      [e.target.name]: e.target.value,
    });
  };

  const choosePictures = () => inputRef.current.click();

  const addPictures = (e) => {
    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      setNewClass((prev) => {
        const existingFiles = prev.classPictures;
        const newFiles = files.filter(
          (file) => !existingFiles.some((f) => f.name === file.name)
        );
        return {
          ...prev,
          classPictures: [...existingFiles, ...newFiles],
        };
      });
    }
  };

  const removePicture = (idx) => {
    setNewClass((prev) => {
      const existingFiles = prev.classPictures;
      if (idx === prev.highlightPicture) {
        return {
          ...prev,
          highlightPicture: 0,
          classPictures: existingFiles.filter((_, index) => index !== idx),
        };
      } else if (idx < prev.highlightPicture) {
        return {
          ...prev,
          highlightPicture: prev.highlightPicture - 1,
          classPictures: existingFiles.filter((_, index) => index !== idx),
        };
      } else {
        return {
          ...prev,
          classPictures: existingFiles.filter((_, index) => index !== idx),
        };
      }
    });
  };

  const clearForm = () => {
    setNewClass({
      title: "",
      description: "",
      price: "",
      capacity: "",
      highlightPicture: 0,
      classPictures: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newClass.classPictures.length === 0) {
      setMessage('Please upload at least one picture');
      return;
    }
    const formData = new FormData();
    formData.append("title", newClass.title);
    formData.append("description", newClass.description);
    formData.append("price", newClass.price);
    formData.append("capacity", newClass.capacity);
    formData.append("highlightPicture", newClass.highlightPicture);
    newClass.classPictures.forEach((file) => {
      formData.append("classPictures", file);
    });
    axios
      .post(`${API}/classes/create-class`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        clearForm();
        navigate(`/class-template/${res.data.classId}`);
      })
      .catch((err) => {
        setMessage('Problem with creating class, try again later. If problem persists, contact support.');
      });
  };

  return (
    <main className="create-class-container">
      <section className="create-class-container__header">
        <h2>Create a Class</h2>
      </section>
      <form className="create-class-container__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={newClass.title}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={newClass.description}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            min="0"
            step="0.01"
            value={newClass.price}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <select
            name="capacity"
            id="capacity"
            onChange={handleChange}
            required
            value={newClass.capacity}
          >
            <option value="" disabled>
              ?
            </option>
            {[...Array(20).keys()].map((i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="classPictures">Class Pictures</label>
          <input
            type="file"
            name="classPictures"
            id="classPictures"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={addPictures}
            multiple
            accept="image/*"
          />
          <button
            className="button-blue"
            type="button"
            onClick={choosePictures}
          >
            <LuImagePlus />
          </button>
        </div>
        <div className="form-preview">
          {newClass.classPictures.map((file, idx) => {
            return (
              <div key={idx} className="form-preview__image">
                <img src={URL.createObjectURL(file)} alt={file.name} />
                <div className="form-preview__btns">
                  <button
                    className="remove-pic"
                    type="button"
                    onClick={() => removePicture(idx)}
                  >
                    X
                  </button>
                  {newClass.highlightPicture === idx ? (
                    <ImCheckboxChecked className="highlight-pic" />
                  ) : (
                    <ImCheckboxUnchecked
                      className="highlight-pic"
                      onClick={() =>
                        setNewClass({ ...newClass, highlightPicture: idx })
                      }
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="form-buttons">
          <button
            className="button-blue"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button className="button-blue" type="button" onClick={clearForm}>
            Clear
          </button>
          <button className="button-orange" type="submit">
            Create
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateClass;
