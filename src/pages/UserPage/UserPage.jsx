import {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import './UserPageMobile.scss'
import MobileCarousel from '../../shared components/carousels/MobileCarousel';
import bannerImage from '../../assets/banner-img.png'
// import './UserPage.scss'
// import CarouselRatio from './Carousel';


const UserPage = () => {
  const { API, user, setUser, setMessage } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [settingsMenu, setSettingsMenu] = useState(false)

  useEffect(() => {
    axios.get(`${API}/users/profile/${id}`, {withCredentials: true})
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const signout = () => {
    axios.post(`${API}/users/logout`, {}, {withCredentials: true})
      .then(() => {
        setUser(false);
        navigate('/');
      })
      .catch(err => setMessage('Failed to sign out'));
  };

return (
  <div className='userPage-container'>
    <div className='banner-container'>
      <img className='banner' src={bannerImage} alt="" />

        </div>


    <div className='userPage-info-container'>
      <div className='profile-picture-container'>
    <img className='profile-picture' src={userData?.profilePicture} alt="profile picture" />
    </div>
      <h2 className='userPage-name'>{userData?.firstName + " " + userData?.lastName}</h2>
      <p>Rating: {userData?.rating}</p>
      <div className='userPage-bio'>
        <p>{userData?.bio}</p>

        <div className='userPage-socials'>
        <FaLinkedin size={25} />
        <MdOutlineEmail {...userData?.info?.email} size={31}/> 
        <FaYoutube size={31}/>
        </div>
      </div>
      </div>

      <div className='userPage-videos'>
        <div className='video-header'>
        <h3>Videos</h3>
        <div className="videos_buttons">
        <button className='button-blue'>Upload +</button>
        <button className='button-orange'>Manage</button>
        </div>
        </div>
        <MobileCarousel links={userData?.instructorLinks}/>
        <div className="videos"></div>
      </div>

      <div className="reviews-container">
        <h3 className='reviews-header'>Reviews</h3>
        <div className='reviews-all'>
          {userData?.instructorReviews?.map((review, idx) => (

        <div className="review1" key={idx}>
          <h4 className='review1_name'>{`${review.firstName} ${review.lastName[0]}.`}</h4>
          <p className='review1__review'>{review?.review}</p>
        </div>
          ))}
        </div>
      </div>

      <div className='buttons'>
      <button className='button-blue' onClick={() => setSettingsMenu(true)}>Settings</button>
      <button onClick={signout} className='signout_button'>Sign Out</button>
    </div>

{settingsMenu && 
<div className='settings'>
  <div className='settings__card'>
  <div className='settings__header'>Settings</div>
  <div className='settings__buttons-container'>
  <button className='settings__buttons'>Become an Instructor!</button>
  <button className='settings__buttons'>Edit Profile</button>
  <button className='settings__buttons'>Change Password</button>
  <button className='settings__buttons'>Delete User</button>
  <button className='button-orange' onClick={() => setSettingsMenu(false)}>Cancel</button>
  </div>
  </div>
</div> }

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
