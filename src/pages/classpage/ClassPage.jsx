import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import './ClassPage.scss';
import { Link } from 'react-router-dom';
import MobileCarousel from "../../shared components/carousels/MobileCarousel";

const ClassPage = () => {
  const { API } = useContext(UserContext);
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [isBooked, setIsBooked] = useState(false); // State for pop-up visibility

  useEffect(() => {
    axios.get(`${API}/classes/class-info/${id}`, {withCredentials: true})
      .then(res => setClassData(res.data))
      .catch(err => console.log(err));
  }, [API, id]);
  console.log(classData)

  if (!classData) {
    return <div>Loading...</div>;
  }

  const bio = classData.instructor.bio;
  const sentences = bio.split('.');
  const display = `${sentences[0]}... `;
  console.log(display)
  const classTitle = classData.title;

  const handleBooking = () => {
    // Simulate successful booking action
    setIsBooked(true);
    // You can add any further logic like API calls here if necessary
  };

  const closeModal = () => {
    setIsBooked(false); // Close the modal
  };

  return (
    <main className="class-container">
      <div className="title-button-container">
        <h1 className="title-container">{classData.title}</h1>
      </div>

      <MobileCarousel imageArr={classData.classPictures}/>

      {/* // Description Container */}
      <div className="description-container">{classData.description}</div>

      <div className="class-slot-title">
        <label htmlFor="timeSlot">Available Class Times:</label>
      </div>

      <div className="title-button-container">
        <select id="timeSlot" className="time-slot-dropdown">
          <option value="sep26-9am">Sep 26, 2024 9am-10am</option>
          <option value="sep26-2pm">Sep 26, 2024 2pm-3pm</option>
          <option value="sep27-11am">Sep 27, 2024 11am-12pm</option>
          <option value="sep28-3pm">Sep 28, 2024 3pm-4pm</option>
          <option value="sep29-10am">Sep 29, 2024 10am-11am</option>
        </select>

        <button className="book-now-button" onClick={handleBooking}>Book Now</button>
      </div>

      {/* Instructor container */}
      <div className="instructor-container">
        <div className='img-container'><img src={classData.instructor.profilePicture} alt={`${classData.instructor.firstName}'s profile`} />
        </div>

        
        <div className="instructor-info">
          <h1 className="instructor-name">{classData.instructor.firstName} {classData.instructor.lastName}</h1>
          <p className="instructor-email">{classData.instructor.email}</p>
        </div>

        <p className="display-container">{display}</p>
        <button className="see-profile-button">
      <Link to={`/profile/${classData.instructor.id}`} className="no-link-style">
    See Profile
  </Link>
  </button>
       
      </div>
      

      {/* Pop-up */}
      {isBooked && (
        <div className="modal">
          <div className="modal-content">
            <p>"{classTitle}" has been successfully booked!</p>
            <button className="close-modal-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ClassPage;


