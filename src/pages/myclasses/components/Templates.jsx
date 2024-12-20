import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Templates = ({API}) => {
  const [myTemplates, setMyTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/instructors/instructor-class-templates`, {
        withCredentials: true,
      })
      .then((res) => setMyTemplates(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="class-templates-container">
      {myTemplates.map((template) => (
        <div key={template.classId} className="template" onClick={() => navigate(`/class-template/${template.classId}`)}>
          <h2 className="template__title">{template.title}</h2>
          <img
            className="template__image"
            src={template.highlightPicture}
            alt={template.title}
          />
        </div>
      ))}
    </section>
  );
};

export default Templates;
