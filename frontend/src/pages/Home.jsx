import React from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Certifcation from '../components/Certifcation'
import HomeDoctors from '../components/HomeDoctors'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
        <NavBar/> 
        <Banner/>
        <Certifcation/>
        <HomeDoctors/>
        <Testimonial/>
        <Footer/>
    </div>
  )
}

export default Home