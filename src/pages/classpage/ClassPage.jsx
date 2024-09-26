import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import ClassCard from '../../shared components/ClassCard';
import './ClassPage.scss'

const ClassPage = () => {
  const { API } = useContext(UserContext);
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    axios.get(`${API}/classes/classInfo/${id}`)
      .then(res => setClassData(res.data))
      .catch(err => console.log(err));
  }, [API, id]);

  if (!classData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="class-container">
  <div className="title-button-container">
    <h1 className="title-container">{classData.title}</h1>
    <button className="book-now-button">Book Now</button>
  </div>
  <ClassCard key={classData.classId} classInfo={classData} />
  <div className="description-container">{classData.description}</div>
  <div className="instructor-bio-container">{classData.bio}</div>
</main>

  );
}

export default ClassPage;

