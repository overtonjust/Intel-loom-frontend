import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Templates = ({API}) => {
  const { fitsOneColumn, fitsTwoColumns, fitsThreeColumns } = useContext(UserContext);
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
    <section className={`class-templates-container ${fitsOneColumn ? 'columns-one' : fitsTwoColumns ? 'columns-two' : fitsThreeColumns ? 'columns-three' : 'columns-four'}`}>
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
