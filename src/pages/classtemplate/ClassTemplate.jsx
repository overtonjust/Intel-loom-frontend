import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import moment from "moment";
import MobileCarousel from "../../shared components/carousels/MobileCarousel";
import "./ClassTemplate.scss";

const ClassTemplate = () => {
  const { API, setMessage } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  /* console.log(classData) */
  const [addClassForm, setAddClassForm] = useState(false);
  const [classDates, setClassDates] = useState({
    classStart: "",
    classEnd: "",
  });
  const handleChange = (e) => {
    setClassDates({ ...classDates, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${API}/classes/add-class-date/${id}`,
        {
          classStart: new Date(classDates.classStart),
          classEnd: new Date(classDates.classEnd),
        },
        { withCredentials: true }
      )
      .then((res) => {
        setClassData({
          ...classData,
          classDates: [...classData.classDates, res.data],
        });
        setAddClassForm(false);
        setMessage("Class date added successfully!");
      })
      .catch((err) => {
        setAddClassForm(false);
        setMessage("Error adding class date");
      });
  };

  useEffect(() => {
    axios
      .get(`${API}/instructors/instructor-class-template-by-id/${id}`, {
        withCredentials: true,
      })
      .then((res) => setClassData(res.data))
      .catch((err) => console.log(err));
    navigate("/404");
  }, [id]);

  return (
    <main className="class-template-container">
      <section className="class-template-container__header">
        <h1>{classData?.title}</h1>
      </section>
      <MobileCarousel imageArr={classData?.classPictures} />
      <section className="class-template-container__info">
        <h4>{`Price: $${classData?.price}`}</h4>
        <h4>{`Capacity: ${classData?.capacity}`}</h4>
      </section>
      <section className="class-template-container__description">
        <p>{classData?.description}</p>
      </section>
      <section className="class-template-container__dates">
        <div className="dates-select-menu">
          <label htmlFor="timeSlot">Class on:</label>
          <select id="timeSlot">
            <option value="" disabled>
              Choose a date
            </option>
            {classData?.classDates.map(
              ({ classDateId, classStart, classEnd }, idx) => {
                const formattedDate =
                  moment(classStart).format("ddd. MMM. D, 'YY");
                const startTime = moment(classStart).format("h:mm A");
                const endTime = moment(classEnd).format("h:mm A");
                const formattedString = `${formattedDate} ${startTime} - ${endTime}`;
                return (
                  <option key={idx} value={classDateId}>
                    {formattedString}
                  </option>
                );
              }
            )}
          </select>
        </div>
      </section>
      {!addClassForm && (
        <section className="class-template-container__add">
          <button
            className="button-orange"
            onClick={() => setAddClassForm(true)}
          >
            Add Date
          </button>
        </section>
      )}
      {addClassForm && (
        <section className="add-date-container">
          <form className="add-date-form" onSubmit={handleSubmit}>
            <section className="form-group">
              <label htmlFor="start">Begins</label>
              <input
                type="datetime-local"
                name="classStart"
                id="start"
                onChange={handleChange}
                required
              />
            </section>
            <section className="form-group">
              <label htmlFor="end">Ends</label>
              <input
                type="datetime-local"
                name="classEnd"
                id="end"
                onChange={handleChange}
                required
              />
            </section>
            <section className="form-group">
              <button
                className="button-blue"
                type="button"
                onClick={() => setAddClassForm(false)}
              >
                Cancel
              </button>
              <button className="button-orange" type="submit">
                Add
              </button>
            </section>
          </form>
        </section>
      )}
    </main>
  );
};

export default ClassTemplate;
