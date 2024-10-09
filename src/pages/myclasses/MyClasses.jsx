import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ClassesByDay from "./components/ClassesByDay";
import LecturesByDay from "./components/LecturesByDay";
import axios from "axios";
import ClassCard from "../../shared components/ClassCard";
import { formatDateKey } from "../../../utils";
import "./MyClasses.scss";

const MyClasses = () => {
  const {
    API,
    user: { isInstructor },
  } = useContext(UserContext);
  const [view, setView] = useState("classes");

  
  return (
    <main className="my-classes-container">
      <section className="select-view">
        <label htmlFor="view">View:</label>
        <select name="view" id="view" onChange={(e) => setView(e.target.value)}>
          <option value="classes">My Classes</option>
          {isInstructor && (
            <>
              <option value="lectures">My Lectures</option>
              <option value="templates">Class Templates</option>
            </>
          )}
          <option value="recording">Class Recordings</option>
        </select>
      </section>
      {view === "classes" && <ClassesByDay API={API} />}
      {view === "lectures" && <LecturesByDay API={API} />}
    </main>
  );
};

export default MyClasses;
