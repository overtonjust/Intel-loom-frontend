import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../../context/UserContext.jsx';
import axios from "axios";
import ClassCard from "../../../shared components/ClassCard";
import { formatDateKey } from "../../../../utils";

const LecturesByDay = ({ API }) => {
  const { fitsOneColumn, fitsTwoColumns, fitsThreeColumns, loading, setLoading } = useContext(UserContext);
  const [mylectures, setMyLectures] = useState(null);

  useEffect(() => {
    setLoading(true)

    axios
      .get(`${API}/instructors/instructor-classes`, { withCredentials: true })
      .then((res) => {
        setMyLectures(res.data)
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <main className="loading">
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <>
      {Object.keys(mylectures).map((day) => {
        return (
          <section key={day} className="by-day">
            <h2>{formatDateKey(day)}</h2>
            <section key={day} className={`by-day__time ${fitsOneColumn ? 'columns-one' : fitsTwoColumns ? 'columns-two' : fitsThreeColumns ? 'columns-three' : 'columns-four'}`}>
              {mylectures[day].map((classDate, idx) => {
                const { classStart, classEnd } = classDate;

                return (
                <ClassCard key={idx} classInfo={classDate.classInfo} dateId={classDate.classDateId} dateInfo={{classStart, classEnd}} />
              )})}
            </section>
          </section>
        );
      })}
    </>
  );
};

export default LecturesByDay;
