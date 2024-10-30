import {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FaLinkedin, FaYoutube, FaGitlab, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import './UserPage.scss'
import MobileCarousel from '../../shared components/carousels/MobileCarousel';
import bannerImage from '../../assets/banner-img.png'


const UserPage = () => {
  const { API, user, setUser, setMessage, loading, setLoading, fitsTwoColumns } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [settingsMenu, setSettingsMenu] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false)
console.log(user, userData)
  useEffect(() => {
    setLoading(true)

    axios.get(`${API}/users/profile/${id}`, {withCredentials: true})
      .then(res => 
        {
        setUserData(res.data)
        setIsInstructor(res.data.isInstructor)
        setLoading(false)
      })
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

  if (loading) {
    return (
      <main className="loading">
        <h1>Loading...</h1>
      </main>
    )
  }

return (
  <main className={`userpage-container ${fitsTwoColumns ? 'userpage-mobile' : (!fitsTwoColumns && isInstructor) ? 'userpage-desktop-instructor' :
  'userpage-desktop-student'}`}>
    <section className={`userpage-container__main-user ${fitsTwoColumns ? 'userpage-mobile__main-user' :  (!fitsTwoColumns && isInstructor) ? 'userpage-desktop-instructor__main-user' : 'userpage-desktop-student__main-user'} ${!fitsTwoColumns ? 'card-desktop' : ''}`}>
      <div className='banner-container'>
        <img className='banner' src={bannerImage} alt="Banner Image" />
      </div>

      <div className={`user-info ${fitsTwoColumns ? 'user-info-bottom-border' : ''}`}>
        <div className='user-info__profile-pic-container'>
          <img className='profile-picture' src={userData?.profilePicture} alt={userData?.firstName} />
        </div>
        <h2 className='user-info__name'>{userData?.firstName + " " + userData?.lastName}</h2>
        {isInstructor && <p>Rating: {userData?.rating}</p>}
        <div className='user-info__bio'>
          <p>{userData?.bio}</p>
          <div className='user-info__socials'>
            <MdOutlineEmail {...userData?.info?.email} size={31}/> 
            {userData?.linkedin && <FaLinkedin size={25} />}
            {userData?.youtube && <FaYoutube size={31}/>}
            {userData?.github && <FaGithub size={31}/>}
            {userData?.gitlab && <FaGitlab size={31}/>}
          </div>
        </div>
      </div>
    </section>
    {isInstructor && 
    <section className={`userpage-container__instructor-info ${!fitsTwoColumns ? 'userpage-desktop-instructor__instructor-info' : 'userpage-mobile__instructor-info'} ${!fitsTwoColumns ? 'card-desktop' : ''}`}>
    <div className='userPage-videos'>
      <div className='video-header'>
        <h3>Videos</h3>
        {user.userId === userData?.userId && 
          <div className="videos_buttons">
            {/* <button className='button-blue'>Upload +</button>
            <button className='button-orange'>Manage</button> */}
          </div>
        }
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
    </section>
    }
      <section className='userpage-container__buttons'>
    {user.userId === userData?.userId && 
    <>
        <button 
          className='button-blue' 
          onClick={() => setSettingsMenu(true)}
        >
          Settings
        </button>
        <button 
          onClick={signout} 
          className='button-orange'
          >
            Sign Out
        </button>
        </>
    }
      </section>
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
  </main>
)
}



export default UserPage
