import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import './userPageMobile.scss'
// import './UserPage.scss'
// import CarouselRatio from './Carousel';


const UserPage = () => {
  const { API, user } = useContext(UserContext);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`${API}/users/${id}`, {headers: {Authorization: user.token}})
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, []);
console.log(userData)

return (
  <div className='userPage-container'>
    <div className='banner-container'>
      <img className='banner' src="https://placehold.co/430x230" alt="" />

        </div>


    <div className='userPage-info-container'>
      <div className='profile-picture-container'>
    <img className='profile-picture' src="https://placehold.co/160x160" alt="profile picture" />
    </div>
      <h2 className='userPage-name'>Nicole Marin</h2>
      <p>Rating: 4.8</p>
      <div className='userPage-bio'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <div className='userPage-socials'>
        <FaLinkedin size={25} />
        <MdOutlineEmail {...userData?.info?.email} size={31}/> 
        <FaYoutube size={31}/>
        </div>
      </div>
      </div>

      <div className='userPage-videos'>
        <h3>Videos:</h3>
        <button className='upload_button'>Upload +</button>
        <div className="video"></div>
      </div>

      <div className="reviews-container">
        <div className="review1"></div>
        <div className="review2"></div>
        <div className="review3"></div>
        <div className="review4"></div>
      </div>

      <div className='buttons'>
      <button className='edit_button'>Edit</button>
      <button className='signout_button'>Sign Out</button>
    </div>

  </div>
)
}









  // return (
    
  //   <div className='user_container'>
      
  //     <div className='user_bio-container'>
  //       <div className='user_profile-img' alt='profile-img'>
  //           <img src="https://unsplash.com/photos/woman-in-black-tank-top-and-blue-denim-jeans-standing-on-white-floor-tiles-jI6Je9fYRo0" alt="profile image" />

  //           <div className='user_socials'>
  //           <FaLinkedin size={25} />
  //           <MdOutlineEmail {...userData?.info?.email} size={31}/> 
  //           <FaYoutube size={31}/>
  //           </div>
  //       </div>
      
  //       <div className='user_description'>
  //         <h1><b>{userData?.info?.firstName}</b></h1>
  //         <p>{userData?.info?.bio} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          
  //         </div>
       
  //     </div>
  //       <div className='user_videos'>
  //         <h2>Videos:</h2>
  //         <div className='Carousel'><CarouselRatio/></div>
  //       </div>

  //     <div className='buttons'>
  //       <button className='edit_button'>Edit</button>
  //       <button className='signout_button'>Sign Out</button>
  //     </div>
        
  //   </div>
  // )
// }

export default UserPage
