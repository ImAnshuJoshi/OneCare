import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

function Navbar() {
    const {user}=useContext(AuthContext);
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
    </div>
  )
}

export default Navbar
