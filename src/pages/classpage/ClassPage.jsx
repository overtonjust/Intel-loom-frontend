import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../../context/UserContext"

const ClassPage = () => {
  const { API } = useContext(UserContext)
  const { id } = useParams()
  const [classData, setClassData] = useState(null)

  useEffect(() => {
    axios.get(`${API}/classInfo/${id}`)
      .then(res => setClassData(res.data))
      .catch(err => console.log(err))
  }, [])

  return null
}

export default ClassPage
