import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const UserPage = () => {
  const { API } = useContext(UserContext);
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API}/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);


  return (
    
    <div className='user_container'>UserPage
    
        <div className='user_profile-img' alt='profile-img'>
            <img src="https://placehold.co/200x280" alt="profile image" />
        </div>
        <div className='user_name'>First Last</div>
        <div className='user_bio'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non scelerisque nunc. Integer tristique pretium porta.</div>
        <div className='user_socials'>
            <button><FaLinkedin /></button> 
            <button><MdOutlineEmail /></button> 
            <button><FaYoutube /></button>
        </div>

        <div className='user_videos'>Videos:
            <img className='user_video1' src="https://placehold.co/300x200" alt="video1" />
            <img className='user_video2' src="https://placehold.co/300x200" alt="video2" />
            <img className='user_video3' src="https://placehold.co/300x200" alt="video3" />

        </div>
    </div>
  )
}

export default UserPage
