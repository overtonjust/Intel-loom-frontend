// Dependencies
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import SearchBar from '../../shared components/SearchBar'
import './Home.scss'

// Components
import { FaAnglesDown } from "react-icons/fa6";
import ClassCard from '../../shared components/ClassCard'


const Home = () => {
  const { API, fitsOneColumn, fitsTwoColumns, fitsThreeColumns, loading, setLoading } = useContext(UserContext)
  const [allClasses, setAllClasses] = useState([])
  const [classesDisplay, setClassesDisplay] = useState([])
  const [moreClasses, setMoreClasses] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)

    axios(`${API}/classes?page=${page}`, { withCredentials: true })
      .then(res => {
        if (page === 1) {
          setAllClasses([])
        }
        setAllClasses(prev => prev.concat(res.data.classes))
        setMoreClasses(res.data.moreClasses)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [page])

  if (loading) {
    return (
      <main className="loading">
        <h1>Loading...</h1>
      </main>
    )
  }

  return (
    <main className='home-container'>
      <SearchBar classes={allClasses} setDisplay={setClassesDisplay}/>
      <div className={`classes ${ fitsOneColumn ? 'columns-one' : fitsTwoColumns ? 'columns-two' : fitsThreeColumns ? 'columns-three' : 'columns-four' }`}>
        {classesDisplay.map((classInfo) => (
          <ClassCard key={classInfo?.classId} classInfo={classInfo}/>
        ))}
      </div>
      {(moreClasses && allClasses.length > 0) && 
        <FaAnglesDown onClick={() => setPage((prevState) => prevState+= 1)} className='home-container__more' size={30}/>
      }
    </main>
  )
}

export default Home
