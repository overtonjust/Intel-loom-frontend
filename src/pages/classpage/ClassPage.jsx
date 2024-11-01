// Dependencies
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "./ClassPage.scss";
import Loader from "../../shared components/loader";

// Components
import MobileCarousel from "../../shared components/carousels/MobileCarousel";
import ClassCard from "../../shared components/ClassCard";

const ClassPage = () => {
  const {
    API,
    setShouldScroll,
    setMessage,
    fitsTwoColumns,
    user,
    loading,
    setLoading,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [classData, setClassData] = useState({
    classDates: [],
    classPictures: [],
    description: "",
    instructor: {
      bio: "",
      email: "",
      firstName: "",
      instructorId: 0,
      lastName: "",
      profilePicture: "",
    },
    moreClassesFromInstructor: [],
    title: "",
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${API}/classes/class-info/${id}`, { withCredentials: true })
      .then((res) => {
        setClassData(res.data);
        setShouldScroll(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [API, id]);

  if (loading) {
    return (
      <Loader />
    );
  }

  const {
    classDates,
    classPictures,
    description,
    instructor,
    moreClassesFromInstructor,
    title,
  } = classData;
  const { bio, email, firstName, instructorId, lastName, profilePicture } =
    instructor;
  const sentences = bio.split(".");
  const formattedBio =
    sentences.length > 1 ? sentences[0] + "..." : sentences[0] + ".";

  const classDatesFiltered = classDates.filter(({ classStart }) => {
    const now = moment();
    const oneHourBefore = moment(classStart).subtract(1, "hours");
    return now.isBefore(oneHourBefore);
  });

  const handleChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleSubmit = () => {
    if (!user) {
      setMessage("Please log in to book a class.");
      return;
    }
    axios
      .post(
        `${API}/users/book-class`,
        { classDateId: selectedTimeSlot },
        { withCredentials: true }
      )
      .then((res) => {
        const idx = classData.classDates.findIndex(
          ({ classDateId }) => classDateId == selectedTimeSlot
        );
        setClassData({
          ...classData,
          classDates: classData.classDates.filter((_, index) => index !== idx),
        });
        setSelectedTimeSlot("");
        setMessage("Class successfully booked!");
      })
      .catch((err) => setMessage("Error booking class"));
  };

  return (
    <main className="class-page-container">
      <section
        className={`class-page-main ${fitsTwoColumns ? "class-page-main-mobile" : "class-page-main-desktop"}`}
      >
        <div
          className={`class-page-main__class ${fitsTwoColumns ? "" : "class-page-main-desktop__class"}`}
        >
          <MobileCarousel imageArr={classPictures} />
          <div className="class-info-container">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="book-class-container">
            {!classDatesFiltered.length ? (
              <p className="book-class-container__no-classes">
                No Dates Available
              </p>
            ) : (
              <>
                <div className="book-class-container__select-menu">
                  <label htmlFor="timeSlot">Available Class Times:</label>
                  <select
                    id="timeSlot"
                    onChange={handleChange}
                    value={selectedTimeSlot}
                  >
                    <option value="" disabled>
                      Choose a date
                    </option>
                    {classDatesFiltered.map(
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
                <button className="button-orange" onClick={handleSubmit}>
                  Book Now
                </button>
              </>
            )}
          </div>
        </div>
        <div
          className={`class-page-main__instructor ${fitsTwoColumns ? "" : "class-page-main-desktop__instructor"}`}
        >
          <div className="instructor-info-container">
            <div className="instructor-info-container__image">
              <img src={profilePicture} alt={`${firstName}'s profile`} />
            </div>
            <div className="instructor-info-container__info">
              <h1>
                {firstName} {lastName}
              </h1>
              <p>{email}</p>
              <p>{formattedBio}</p>
            </div>
            <div className="instructor-info-container__button">
              <button
                className="button-blue"
                onClick={() => {
                  if (!user) {
                    setMessage("Please log in to view profiles.");
                    return;
                  }
                  navigate(`/profile/${instructorId}`);
                }}
              >
                See Profile
              </button>
            </div>
          </div>
        </div>
        <div
          className={`class-page-main__classes ${fitsTwoColumns ? "" : "class-page-main-desktop__classes"}`}
        >
          <h3>More Classes from {firstName}</h3>
          <div className="more-classes-container">
            {moreClassesFromInstructor.length > 0 &&
              moreClassesFromInstructor.map((classData) => (
                <ClassCard key={classData.classId} classInfo={classData} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClassPage;
