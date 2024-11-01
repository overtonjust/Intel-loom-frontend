import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import Recording from "./Recording";
import Loader from "../../../shared components/loader";

const Recordings = ({ API }) => {
  const {
    user: { isInstructor },
    fitsOneColumn,
    fitsTwoColumns,
    fitsThreeColumns,
    loading,
    setLoading,
  } = useContext(UserContext);
  const [userRecordings, setUserRecordings] = useState([]);
  const [instructorRecordings, setInstructorRecordings] = useState([]);
  const [view, setView] = useState("classes");

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${API}/users/user-class-recordings`, { withCredentials: true })
      .then((res) => {
        setUserRecordings(res.data);
        setLoading(false);
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

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <main className="recordings-container">
      {isInstructor && (
        <section className="recordings-container__view">
          <div className="choices">
            <div className="choices__opt">
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
            <div className="choices__opt">
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
          </div>
        </section>
      )}
      <section
        className={`recordings-container__videos ${fitsOneColumn ? "columns-one" : fitsTwoColumns ? "columns-two" : fitsThreeColumns ? "columns-three" : "columns-four"}`}
      >
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
