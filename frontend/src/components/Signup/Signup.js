import './Signup.css'
import React, { useContext, useState } from 'react'
import signup from '../../assets/signup.png'
import { AuthContext } from '../../context/authContext';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

function Signup() {
  
  const {user,loading,error,dispatch} = useContext(AuthContext);
  const [name,setName]=useState("");
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");

  const navigate = useNavigate();


  const handleClick = async (e) =>{
    e.preventDefault();
    const credentials =
    {
      name,username,email,phone,password,
    }
    dispatch({type:":LOGIN_START"})

    try{
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/auth/register",
         data: credentials,
         withCredentials: false
        });
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
        navigate('/homepage');
      // console.log(res.data);
    }
    catch(err){
      dispatch({type:"LOGIN_ERROR",payload:err.response.data});
    }
  }

  return (
    <div>
      <div className="login">
        <div className="image">
      <img src={signup} alt="" />
        </div>
        <div className="signup-card">
          <p>
          Sign<span>
          Up 
          </span>
          </p>
          {/* <input type="text" placeholder='Username'>{PermIdentityIcon}</input> */}
          <div className="username">
            {/* <img src={PermIdentityIcon} className="username-icon" alt="" /> */}
            <input type="text" placeholder='Name' className='username input' onChange={(e)=> setName(e.target.value)}/>
            <input type="text" placeholder='Username' className='username input' onChange={(e)=> setUsername(e.target.value)}/>
            <input type="text" placeholder='Email' className='username input' onChange={(e)=> setEmail(e.target.value)}/>
            <input type="text" placeholder='Phone Number' className='username input' onChange={(e)=> setPhone(e.target.value)}/>
            <input type="password" placeholder='Password' className='password input' onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <div>
            <button onClick={handleClick}>SignIn</button>
          </div>
          <div className="signup-instead">
            Already have an account? 
              <Link to="/login">
              Log In
              </Link>            
          </div>
          <div className="signup-instead">
            Log In as an Admin!&nbsp;
            <Link to="/login">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
