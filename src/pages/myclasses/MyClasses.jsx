import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import axios from "axios"
import SearchBar from "../../shared components/SearchBar"

const MyClasses = () => {
  const { API, user } = useContext(UserContext)
  const [myClasses, setMyClasses] = useState([])
  const [classesDisplay, setClassesDisplay] = useState([])

  useEffect(() => {
    axios(`${API}/userClasses/${user.userId}`)
      .then(res => setMyClasses(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="my-classes-container">
      <SearchBar classes={myClasses} setDisplay={setClassesDisplay} />
    </main>
  )
}

export default MyClasses
