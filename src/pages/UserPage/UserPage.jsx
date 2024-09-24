import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import './UserPage.scss'
import CarouselRatio from './Carousel';

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
    
    <div className='user_container'>
      
      <div className='user_bio-container'>
        <div className='user_profile-img' alt='profile-img'>
            <img src="https://placehold.co/144x200" alt="profile image" />
        </div>
      
        <div className='user_description'>
          <h1><b>First Last</b></h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non scelerisque nunc. Integer tristique pretium porta.</p>
          <div className='user_socials'>
            <FaLinkedin size={25} />
            <MdOutlineEmail size={31}/> 
            <FaYoutube size={31}/>
        </div>
          
          </div>
       
      </div>
        <div className='user_videos'>
          <h2>Videos:</h2>
          <div className='Carousel'><CarouselRatio/></div>

        </div>
    </div>
  )
}

export default UserPage
