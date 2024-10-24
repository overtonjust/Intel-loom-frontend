import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '/Intel_Loom_Logo.png'
import './Brand.scss'

const Brand = () => {
  const navigate = useNavigate();
  return (
    <section className='brand' onClick={() => navigate('/')}>
      <img src={Logo} alt='Intel Loom Logo' />
      <h1>Intel Loom</h1>
    </section>
  )
}

export default Brand
