import React, { useContext } from 'react'
import './Homepage.css'
import patient from '../../assets/patient.png'
import { AuthContext } from '../../context/authContext.js' 
import { useParams } from 'react-router';

function Homepage() {
  function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  
    return JSON.parse(jsonPayload)
  }

  const {username}=useParams();
  const {user} = useContext(AuthContext);
  console.log()
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
