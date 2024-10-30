import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../../context/UserContext.jsx';
import axios from "axios";
import ClassCard from "../../../shared components/ClassCard";
import { formatDateKey } from "../../../../utils";

const ClassesByDay = ({API}) => {
  const { fitsOneColumn, fitsTwoColumns, fitsThreeColumns } = useContext(UserContext);
  const [myClasses, setMyClasses] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/users/user-classes`, { withCredentials: true })
      .then((res) => setMyClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!myClasses) {
    return (
      <main className="loading">
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <>
      {Object.keys(myClasses).map((day) => {
        return (
          <section key={day} className="by-day">
            <h2>{formatDateKey(day)}</h2>
            <section key={day} className={`by-day__time ${fitsOneColumn ? 'columns-one' : fitsTwoColumns ? 'columns-two' : fitsThreeColumns ? 'columns-three' : 'columns-four'}`}>
              {myClasses[day].map((classDate, idx) => {
                const { classStart, classEnd } = classDate;
                return (
                <ClassCard key={idx} classInfo={classDate.classInfo} dateInfo={{classStart, classEnd}} />
              )})}
            </section>
          </section>
        );
      })}
    </>
  );
};

export default ClassesByDay;
