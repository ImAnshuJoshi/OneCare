import React, { useContext } from 'react'
import './Homepage.css'
import patient from '../../assets/patient.png'
import { AuthContext } from '../../context/authContext.js' 
import { useParams } from 'react-router';

function Homepage() {

  const {username}=useParams();
  const {user} = useContext(AuthContext);

  return (
    <div>
       <nav className='patient__nav'>
          <div className='one'>
            One<span className='care'>Care</span>
          </div>
        <ul className='patient__list'>
          <li className='patient__li'>HOME</li>
          <li className='patient__li'>ABOUT US</li>
          <li className='patient__li'>CONTACT US</li>
        </ul>
        <div>
          Welcome&nbsp;
          { user ? user.username:
          <h3>
          Welcome User
          </h3>
          }
          ! 
        </div>
        </nav>
        <div className="patient">
          <div className="whatweare">
            <div className='we'>
            We are here for <span>You</span>.<br/>
            </div>
            <div>
            For husstle free medical records.
            </div>
          </div>
          <div className="patient-img">
            <img src={patient} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Homepage
