import React from 'react'
import Logo from '/Intel_Loom_Logo.png'
import './Brand.scss'

const Brand = () => {
  return (
    <section className='brand'>
      <img src={Logo} alt='Intel Loom Logo' />
      <h1>Intel Loom</h1>
    </section>
  )
}

export default Brand
