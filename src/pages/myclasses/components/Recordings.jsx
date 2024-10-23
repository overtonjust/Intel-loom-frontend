import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import Recording from "./Recording";

const Recordings = ({ API }) => {
  const {
    user: { isInstructor },
  } = useContext(UserContext);
  const [userRecordings, setUserRecordings] = useState([]);
  const [instructorRecordings, setInstructorRecordings] = useState([]);
  const [view, setView] = useState("classes");

  useEffect(() => {
    axios
      .get(`${API}/users/user-class-recordings`, { withCredentials: true })
      .then((res) => {
        setUserRecordings(res.data);
      })
      .catch((err) => console.error(err));
    if (isInstructor) {
      axios
        .get(`${API}/instructors/instructor-class-recordings`, {
          withCredentials: true,
        })
        .then((res) => {
          setInstructorRecordings(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <main className="recordings-container">
      <section className="recordings-container__view">
        <div>
          <input
            type="radio"
            id="classes"
            name="view"
            value="classes"
            checked={view === "classes"}
            onChange={() => setView("classes")}
          />
          <label htmlFor="classes">My Classes</label>
        </div>
        {isInstructor && (
          <div>
            <input
              type="radio"
              id="lectures"
              name="view"
              value="lectures"
              checked={view === "lectures"}
              onChange={() => setView("lectures")}
            />
            <label htmlFor="lectures">My Lectures</label>
          </div>
        )}
      </section>
      <section className="recordings-container__videos">
        {view === "classes" &&
          userRecordings.length > 0 &&
          userRecordings.map((recording, idx) => (
            <Recording key={`recording-${idx}`} recording={recording} />
          ))}
        {view === "lectures" &&
          instructorRecordings.length > 0 &&
          instructorRecordings.map((recording, idx) => (
            <Recording key={`recording-${idx}`} recording={recording} />
          ))}
      </section>
    </main>
  );
};

export default Recordings;
