import { useEffect, useState } from "react";
import axios from "axios";
import ClassCard from "../../../shared components/ClassCard";
import { formatDateKey } from "../../../../utils";

const LecturesByDay = ({ API }) => {
  const [mylectures, setMyLectures] = useState([]);
  const [lecturesDisplay, setLecturesDisplay] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/instructors/instructor-classes`, { withCredentials: true })
      .then((res) => setMyLectures(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {Object.keys(mylectures).map((day) => {
        return (
          <section key={day}>
            <h2>{formatDateKey(day)}</h2>
            <section key={day} className="by-day">
              {mylectures[day].map((classDate, idx) => (
                <ClassCard key={idx} classInfo={classDate.classInfo} />
              ))}
            </section>
          </section>
        );
      })}
    </>
  );
};

export default LecturesByDay;
