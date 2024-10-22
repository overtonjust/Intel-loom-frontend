import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ClassesByDay from "./components/ClassesByDay";
import LecturesByDay from "./components/LecturesByDay";
import Templates from "./components/Templates";
import { MdNoteAdd } from "react-icons/md";
import "./Myclasses.scss";

const MyClasses = () => {
  const {
    API,
    user: { isInstructor },
  } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState('');

  const handleViewChange = (e) => {
    setView(e.target.value);
    navigate(e.target.value);
  };

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2] || "";
    setView(currentPath);
  }, [location]);

  return (
    <main className="my-classes-container">
      <section className="my-classes-container__header">
        <section className="select-view">
          <label htmlFor="view">View:</label>
          <select
            name="view"
            id="view"
            value={view}
            onChange={handleViewChange}
          >
            <option value="">My Classes</option>
            {isInstructor && (
              <>
                <option value="lectures">My Lectures</option>
                <option value="templates">Class Templates</option>
              </>
            )}
            <option value="recording">Class Recordings</option>
          </select>
        </section>
        <Routes>
          <Route
            path="templates"
    element={
      <button className="button-orange" onClick={() => navigate('/create-class')}>
                <MdNoteAdd className="create-button" />
              </button>
            }
          />
        </Routes>
      </section>
      <Routes>
        <Route path="" element={<ClassesByDay API={API} />} />
        <Route path="lectures" element={<LecturesByDay API={API} />} />
        <Route path="templates" element={<Templates API={API} />}/>
        <Route
          path="recordings"
          element={<div>Class Recordings Component</div>}
        />
      </Routes>
    </main>
  );
};

export default MyClasses;
