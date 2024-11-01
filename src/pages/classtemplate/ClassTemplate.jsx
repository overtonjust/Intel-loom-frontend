import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import moment from "moment";
import MobileCarousel from "../../shared components/carousels/MobileCarousel";
import { TypeAnimation } from "react-type-animation";
import "./ClassTemplate.scss";
import Loader from "../../shared components/loader";

const ClassTemplate = () => {
  const {
    isTabletOrMobile,
    fitsOneColumn,
    fitsTwoColumns,
    fitsThreeColumns,
    API,
    setMessage,
  } = useContext(UserContext);
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
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
  }, [id]);

  if (!classData) {
    return <Loader />;
  }

  const bigScreen =
    (!isTabletOrMobile || fitsTwoColumns || fitsThreeColumns) && !fitsOneColumn;

  return (
    <main className={`class-template-container ${bigScreen ? 'class-template-desktop' : 'class-template-mobile'}`}>
      <section className={`class-template-container__banner ${bigScreen ? 'class-template-desktop__banner' : ''}`}>
        <h1>Plan for Success!</h1>
        <p>
          Adding a well-thought-out schedule helps your students stay organized
          and committed.
        </p>
        <TypeAnimation
          sequence={[
            "Make it easy for them to show up",
            3000,
            "Make it easy for them to learn",
            3000,
            "Make it easy for them to succeed",
            3000,
          ]}
          wrapper="h3"
          className="class-template-container__slogan"
          repeat={Infinity}
        />
      </section>
      <section className={`class-template-container__main ${bigScreen ? 'class-template-desktop__main' : ''}`}>
        <div className="class-template-container__header">
          <h1>{classData?.title}</h1>
        </div>
        <MobileCarousel imageArr={classData?.classPictures} />
        <div className="class-template-container__info">
          <h4>{`Price: $${classData?.price}`}</h4>
          <h4>{`Capacity: ${classData?.capacity}`}</h4>
        </div>
        <div className="class-template-container__description">
          <p>{classData?.description}</p>
        </div>
        <div className="class-template-container__dates">
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
        </div>
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
          <div className="add-date-container">
            <form className="add-date-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="start">Begins</label>
                <input
                  type="datetime-local"
                  name="classStart"
                  id="start"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="end">Ends</label>
                <input
                  type="datetime-local"
                  name="classEnd"
                  id="end"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
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
              </div>
            </form>
          </div>
        )}
      </section>
    </main>
  );
};

export default ClassTemplate;
