import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const ClassTemplate = () => {
  const { API } = useContext(UserContext);
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  console.log(classData);

  useEffect(() => {
    axios.get(`${API}/instructors/instructor-class-template-by-id/${id}`, { withCredentials: true })
      .then(res => setClassData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <h1>Class Template</h1>
    </div>
  )
}

export default ClassTemplate
