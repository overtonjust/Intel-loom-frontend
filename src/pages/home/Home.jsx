// Dependencies
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import SearchBar from '../../shared components/SearchBar'
import './Home.scss'
import Loader from '../../shared components/loader'

// Components
import { FaAnglesDown } from "react-icons/fa6";
import ClassCard from "../../shared components/ClassCard";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const {
    API,
    isTabletOrMobile,
    fitsOneColumn,
    fitsTwoColumns,
    fitsThreeColumns,
    loading,
    setLoading,
  } = useContext(UserContext);
  const [allClasses, setAllClasses] = useState([]);
  const [classesDisplay, setClassesDisplay] = useState([]);
  const [moreClasses, setMoreClasses] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    axios(`${API}/classes?page=${page}`, { withCredentials: true })
      .then((res) => {
        if (page === 1) {
          setAllClasses([]);
        }
        setAllClasses((prev) => prev.concat(res.data.classes));
        setMoreClasses(res.data.moreClasses);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page]);

  if (loading) {
    return (
      <Loader />
    );
  }

  const bigScreen = (!isTabletOrMobile || fitsTwoColumns || fitsThreeColumns) && !fitsOneColumn;

  return (
    <main className="home-container">
      <section className="home-hero-container">
        {bigScreen && (
          <div className="home-hero-container__gradient-left"></div>
        )}
        <div
          className={`home-hero-container__slogan ${isTabletOrMobile ? "slogan-mobile" : "slogan-desktop"}`}
        >
          <TypeAnimation
            sequence={[
              "Learn your way to success, anytime",
              3000,
              "Learn your way to success, anywhere",
              3000,
              "Learn your way to success, anyplace",
              3000,
            ]}
            wrapper="h1"
            className="home-hero-container__animation"
            repeat={Infinity}
          />
        </div>
        {bigScreen && (
          <div className="home-hero-container__gradient-right"></div>
        )}
      </section>
      <SearchBar classes={allClasses} setDisplay={setClassesDisplay} />
      <section
        className={`classes ${fitsOneColumn ? "columns-one" : fitsTwoColumns ? "columns-two" : fitsThreeColumns ? "columns-three" : "columns-four"}`}
      >
        {classesDisplay.map((classInfo) => (
          <ClassCard key={classInfo?.classId} classInfo={classInfo} />
        ))}
      </section>
      {moreClasses && allClasses.length > 0 && (
        <FaAnglesDown
          onClick={() => setPage((prevState) => (prevState += 1))}
          className="home-container__more"
          size={30}
        />
      )}
    </main>
  );
};

export default Home;
