import './FullProfile.css'
import React, { useContext, useEffect, useState } from 'react'
import userimg from '../../assets/userimg.png'
import { AuthContext } from '../../context/authContext.js' 
import profile from '../../assets/userimg.png'
import { useParams } from 'react-router'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios';

function FullProfile() {

  const {user} = useContext(AuthContext);
  const [patient,setPatient]= useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id")

  // useEffect(()=>{
  //   const getuser = async()=>{
  //     // console.log('hi');
  //     const {data:response}=await axios.get(`http://localhost:3000/api/users/getuser/${id}`)
  //     // console.log(response);
  //     setPatient(response);
  //     return response;
  //   }
  //   getuser();
  // },[])
  // // console.log(patient.username);   //from here you can print anything

  return (
    <div>
      <div className="fullProfile">
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
          Logged In as&nbsp;
          { patient ? user.username:
          <h3>
            Guest 
          </h3>
          }
          ! 
        </div>
        </nav>
      </div>
        {/* <h1>{user.username} profile</h1> */}
      <div className="dashboard">
        {/* <div className="upper">
          <div className="photo">
            <img src={profile} alt="" />
          </div>
          <div className="desc">
            Hey! I am {user.name}. I am looking forward to live a healthy and active life.
          </div>
        </div> */}
        <div class="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
        <div class="card p-4"> 
        <div class=" image d-flex flex-column justify-content-center align-items-center"> 
        <button class="btn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
        </button> 
        <span class="name mt-3">Eleanor Pena</span> 
        <span class="idd">@eleanorpena</span> 
        <div class="d-flex flex-row justify-content-center align-items-center gap-2"> 
        <span><i class="fa fa-copy"></i></span> </div> 
        <div class="d-flex flex-row justify-content-center align-items-center mt-3"> 
        </div>
        <div class=" d-flex mt-2"> <button class="btn1 btn-dark">Edit Profile</button> </div> 
        <div class="text mt-3"> 
        {/* <span>
          Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.<br><br> Artist/ Creative Director by Day #NFT minting@ with FND night. 
        </span>  */}
        </div> 
        <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
           <span><i class="fa fa-twitter"></i></span>
           <span><i class="fa fa-facebook-f"></i></span>
           <span><i class="fa fa-instagram"></i></span>
           <span><i class="fa fa-linkedin"></i></span> 
        </div> <div class=" px-2 rounded mt-4 date "> 
        <span class="join">Joined May,2021</span> 
        </div> 
        </div> 
        </div>
</div>
      </div>
      <Link to={`/history?id=${user._id}`}>
      <button>
        Go to History
      </button>
      </Link>
    </div>
  )
}

export default FullProfile
