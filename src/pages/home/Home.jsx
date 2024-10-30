// Dependencies
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import SearchBar from '../../shared components/SearchBar'
import './Home.scss'

// Components
import { FaAnglesDown } from "react-icons/fa6";
import ClassCard from '../../shared components/ClassCard'


const Home = () => {
  const { API } = useContext(UserContext)
  const { navigate } = useNavigate;
  const [allClasses, setAllClasses] = useState([])
  const [classesDisplay, setClassesDisplay] = useState([])
  const [moreClasses, setMoreClasses] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios(`${API}/classes?page=${page}`, { withCredentials: true })
      .then(res => {
        setAllClasses(prev => prev.concat(res.data.classes))
        setMoreClasses(res.data.moreClasses)
      })
      .catch(err => console.log(err))
    navigate('/404');
  }, [page])


  return (
    <main className='home-container'>
      <SearchBar classes={allClasses} setDisplay={setClassesDisplay} />
      <div className='classes'>
        {classesDisplay.map((classInfo) => (
          <ClassCard key={classInfo?.classId} classInfo={classInfo} />
        ))}
      </div>
      {(moreClasses && allClasses.length > 0) &&
        <FaAnglesDown onClick={() => setPage((prevState) => prevState += 1)} className='home-container__more' size={30} />
      }
    </main>
  )
}

export default Home
