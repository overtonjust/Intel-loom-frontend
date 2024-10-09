import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import './UserPageMobile.scss'


import React from 'react'

const UserPageMobile = () => {
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
      <div className='banner'>
        <img src="" alt="" />
        <div className='profile-picture'></div>
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

        <div className='userPage-videos'>
          <button>Upload +</button>
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

export default UserPageMobile