import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'
// import logo from'./assets/logo.png
const doctor = require('../../assets/doctor.png');
// import Logo_page from './assets/Logo_page.png';

function LandingPage() {
  return (
    <div className='Landing_page'>
       {/* <img src={logo} alt="" className='landing_logo'/> */}
       <img src={doctor} alt="" className='doctor'/>
       {/* <img src={Logo_page} alt="" className='landing_logo2'/> */}
       <div className='landing_about'>
       <div className="landing_name">One<span style={{color:"#68B5C8"}}>Care</span> </div>
       <div className="Landing_desc">-Your Medical Portfolio</div>
       <div className="Landing_btn">
        <Link to="/login">
       <button className="btn">LogIn</button>
        </Link>
        <Link to='/signup'>
       <button className="btn">SignUp</button>
        </Link>
       </div>
       </div>
    </div>
  )
}
export default LandingPage