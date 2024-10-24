// Dependencies
import { useEffect, useState, useContext} from "react";
import { UserContext } from "../../context/UserContext";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import './ClassPage.scss';

// Components
import MobileCarousel from "../../shared components/carousels/MobileCarousel";
import ClassCard from "../../shared components/ClassCard";

const ClassPage = () => {
  const { API, setShouldScroll, setMessage } = useContext(UserContext);
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  useEffect(() => {
    axios.get(`${API}/classes/class-info/${id}`, {withCredentials: true})
      .then(res => {
        setClassData(res.data)
        setShouldScroll(true)
      })
      .catch(err => console.log(err));
  }, [API, id]);

  if (!classData) {
    return <div>Loading...</div>;
  }

  const { classDates , classPictures, description, instructor, moreClassesFromInstructor, title } = classData;
  const { bio, email, firstName, instructorId, lastName, profilePicture } = instructor;
  const sentences = bio.split(".");
  const display = `${sentences[0]}... `;

  const classDatesFiltered = classDates.filter(({classStart}) => {
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
        const idx = classDates.findIndex(({classDateId})=> classDateId == selectedTimeSlot);
        classDates.splice(idx, 1);
        setMessage("Class successfully booked!");
      })
      .catch((err) => setMessage("Error booking class"));
  };

  return (
    <main className="class-container">
      <div className="title-button-container">
        <h1 className="title-container">{title}</h1>
      </div>

      <MobileCarousel imageArr={classPictures} />

      <div className="description-container">{description}</div>

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

      <div className="instructor-container">
        <div className="img-container">
          <img
            src={profilePicture}
            alt={`${firstName}'s profile`}
          />
        </div>

        <div className="instructor-info">
          <h1 className="instructor-name">
            {firstName} {lastName}
          </h1>
          <p className="instructor-email">{email}</p>
        </div>

        <p className="display-container">{display}</p>
        <button className="see-profile-button">
          <Link
            to={`/profile/${instructorId}`}
            className="no-link-style"
          >
            See Profile
          </Link>
        </button>
      </div>
      <div className="class-container__more-classes">
        <h3 className="class-container__more-classes-header">More from {firstName}:</h3>
        <div className="class-container__more-classes-carousel">
          {(moreClassesFromInstructor.length > 0) && moreClassesFromInstructor.map((classData) => (
            <ClassCard key={classData.classId} classInfo={classData}/>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ClassPage;
