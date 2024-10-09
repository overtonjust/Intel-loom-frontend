import { useEffect, useState } from "react";
import axios from "axios";
import ClassCard from "../../../shared components/ClassCard";
import { formatDateKey } from "../../../../utils";

const ClassesByDay = ({API}) => {
  const [myClasses, setMyClasses] = useState([]);
  const [classesDisplay, setClassesDisplay] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/users/user-classes`, { withCredentials: true })
      .then((res) => setMyClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {Object.keys(myClasses).map((day) => {
        return (
          <section key={day}>
            <h2>{formatDateKey(day)}</h2>
            <section key={day} className="by-day">
              {myClasses[day].map((classDate, idx) => (
                <ClassCard key={idx} classInfo={classDate.classInfo} />
              ))}
            </section>
          </section>
        );
      })}
    </>
  );
};

export default ClassesByDay;