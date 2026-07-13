import React from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Certifcation from '../components/Certifcation'
import HomeDoctors from '../components/HomeDoctors'
import Testimonial from '../components/Testimonial'


const Home = () => {
  return (
    <div>
        <NavBar/> 
        <Banner/>
        <Certifcation/>
        <HomeDoctors/>
        <Testimonial/>
    </div>
  )
}

export default Home