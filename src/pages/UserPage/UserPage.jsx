import {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import './UserPageMobile.scss'
import MobileCarousel from '../../shared components/carousels/MobileCarousel';
import bannerImage from '../../assets/banner-img.png'


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
      <img className='banner' src={bannerImage} alt="Banner Image" />
    </div>


    <div className='userPage-info-container'>
      <div className='profile-picture-container'>
        <img className='profile-picture' src={userData?.profilePicture} alt={userData?.firstName} />
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
          <button className='videos-upload_button'>Upload +</button>
          <button className='videos-edit_button'>Manage</button>
        </div>
      </div>
      <MobileCarousel links={userData?.instructorLinks}/>
    </div>

    <div className="reviews-container">
      <h3 className='reviews-header'>Reviews</h3>
      <div className='reviews-all'>
        {userData?.instructorReviews?.map((review, idx) => (
          <div className="review" key={idx}>
            <h4 className='review__name'>{`${review.firstName} ${review.lastName[0]}.`}</h4>
            <p className='review__comment'>{review?.review}</p>
          </div>
        ))}
      </div>
    </div>

    <div className='buttons'>
      <button 
        className='button-blue' 
        onClick={() => setSettingsMenu(true)}
      >
        Settings
      </button>
      <button 
        onClick={signout} 
        className='signout_button'
        >
          Sign Out
      </button>
    </div>

    {settingsMenu && 
      <div className='settings'>
        <div className='settings__card'>
          <div className='settings__header'>Settings</div>
          <div className='settings__buttons-container'>
            <button 
            className='settings__button'
            >
              Become an Instructor!
            </button>
            <button 
            className='settings__button'
            >
              Edit Profile
            </button>
            <button 
            className='settings__button'
            >
              Change Pasword
            </button>
            <button 
            className='settings__button'
            >
              Delete User
            </button>
            <button 
            className='button-orange' 
            onClick={() => setSettingsMenu(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div> 
    }
  </div>
)
}



export default UserPage
