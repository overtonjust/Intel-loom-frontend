// Dependencies
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import ClassCard from '../../shared components/ClassCard';
import './ClassPage.scss'
import { Link } from 'react-router-dom';


const ClassPage = () => {
  const { API } = useContext(UserContext);
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    axios.get(`${API}/classes/classInfo/${id}`)
      .then(res => setClassData(res.data))
      .catch(err => console.log(err));
  }, [API, id]);
  console.log(classData)

  if (!classData) {
    return <div>Loading...</div>;
  }

  const bio = classData.instructor.bio;
  const sentences = bio.split('.');
  // console.log(sentences)
  const display = `${sentences[0]}... `;
  console.log(display)

  return (
    
    <main className="class-container">
  <div className="title-button-container">
    <h1 className="title-container">{classData.title}</h1>
    <button className="book-now-button">Book Now</button>
  </div>
  <ClassCard key={classData.classId} classInfo={classData} />

  {/* // Description Container */}

  <div className="description-container">{classData.description}</div>

  {/* Instructor container */}
  <div className="instructor-bio-container">
  {display}
  <Link to={`/instructor/${classData.instructor.instructorId}`}>See more</Link>
</div>

  

</main>


  );
}

export default ClassPage;

