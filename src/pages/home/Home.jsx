import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import SearchBar from '../../shared components/SearchBar'

const Home = () => {
  const { API  } = useContext(UserContext)
  const [allClasses, setAllClasses] = useState([])
  const [classesDisplay, setClassesDisplay] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios(`${API}/classes?page=${page}`)
      .then(res => setAllClasses(prev => prev.concat(res.data)))
      .catch(err => console.log(err))
  }, [page])

  return (
    <main className='home-container'>
      <SearchBar classes={allClasses} setDisplay={setClassesDisplay}/>
    </main>
  )
}

export default Home
