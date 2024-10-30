import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import './ClassPage.scss';
import { Link } from 'react-router-dom';
import ClassCard from "../../shared components/ClassCard";
import MobileCarousel from "../../shared components/carousels/MobileCarousel";

const ClassPage = () => {
  const { API, setShouldScroll, setMessage } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  useEffect(() => {
    axios.get(`${API}/classes/class-info/${id}`, { withCredentials: true })
      .then(res => {
        setClassData(res.data)
        setShouldScroll(true)
      })
      .catch(err => console.log(err));
    navigate('/404');
  }, [API, id]);

  if (!classData) {
    return <div>Loading...</div>;
  }

  const bio = classData.instructor.bio;
  const sentences = bio.split(".");
  const display = `${sentences[0]}... `;
  const { moreClassesFromInstructor } = classData;

  const classDatesFiltered = classData.classDates.filter(({ classStart }) => {
    const now = moment();
    const oneHourBefore = moment(classStart).subtract(1, "hours");
    return now.isBefore(oneHourBefore);
  });

  const handleChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post(
        `${API}/users/book-class`,
        { classDateId: selectedTimeSlot },
        { withCredentials: true }
      )
      .then((res) => {
        const idx = classData.classDates.findIndex(({ classDateId }) => classDateId == selectedTimeSlot);
        classData.classDates.splice(idx, 1);
        setMessage("Class successfully booked!");
      })
      .catch((err) => setMessage("Error booking class"));
  };

  return (
    <main className="class-container">
      <div className="title-button-container">
        <h1 className="title-container">{classData.title}</h1>
      </div>

      <MobileCarousel imageArr={classData.classPictures} />

      {/* // Description Container */}
      <div className="description-container">{classData.description}</div>

      {classDatesFiltered.length > 0 && (
        <div className="class-slot-title">
          <label htmlFor="timeSlot">Available Class Times:</label>
        </div>
      )}

      <div className="title-button-container">
        {!classDatesFiltered.length ? (
          <p className="no-classes">No Dates Available</p>
        ) : (
          <>
            <select
              id="timeSlot"
              className="time-slot-dropdown"
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
                    <option
                      key={idx}
                      value={classDateId}
                    >
                      {formattedString}
                    </option>
                  );
                }
              )}
            </select>
            <button className="book-now-button" onClick={handleSubmit}>
              Book Now
            </button>
          </>
        )}
      </div>

      {/* Instructor container */}
      <div className="instructor-container">
        <div className="img-container">
          <img
            src={classData.instructor.profilePicture}
            alt={`${classData.instructor.firstName}'s profile`}
          />
        </div>

        <div className="instructor-info">
          <h1 className="instructor-name">
            {classData.instructor.firstName} {classData.instructor.lastName}
          </h1>
          <p className="instructor-email">{classData.instructor.email}</p>
        </div>

        <p className="display-container">{display}</p>
        <button className="see-profile-button">
          <Link
            to={`/profile/${classData.instructor.id}`}
            className="no-link-style"
          >
            See Profile
          </Link>
        </button>
      </div>
      <div className="class-container__more-classes">
        <h3 className="class-container__more-classes-header">More from {classData.instructor.firstName}:</h3>
        <div className="class-container__more-classes-carousel">
          {(moreClassesFromInstructor.length > 0) && moreClassesFromInstructor.map((classData) => (
            <ClassCard key={classData.classId} classInfo={classData} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ClassPage;
