import './Signup.css'
import React, { useContext, useState } from 'react'
import signup from '../../assets/signup.png'
import { AuthContext } from '../../context/authContext';
import swal from "sweetalert2";
import axios from "axios";

import {Link, useNavigate} from 'react-router-dom';

function Signup() {
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  // function to validate password
  const validatePassword = (str) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
    return re.test(str);
  };

  function validatePhoneNumber(input_str) 
  { 
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/; 
    return re. test(input_str); 
  }
  
  const {user,loading,error,dispatch} = useContext(AuthContext);
  const [name,setName]=useState("");
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [repassword,setrePassword]=useState("");

  const navigate = useNavigate();


  const handleClick = async (e) =>{
    e.preventDefault();
    const credentials =
    {
      name,username,email,phone,password
    }
    dispatch({type:":LOGIN_START"})
    if (!username || !email || !password)
    swal.fire({
      icon: "error",
      title: "Empty Field(s).",
      text: "Please fill all fields!",
    });
  else if (!validateEmail(email)) {
    swal.fire({
      icon: "error",
      title: "Invalid Email...",
      text: "Please enter a valid email!",
    });
  } else if (!validatePassword(password)) {
    swal.fire({
      icon: "error",
      title: "Invalid Password...",
      text: "Password should be longer than 4 characters and must contain atleast 1 Uppercase,1 Lowercase, 1 Number and 1 special character",
    });
  } else if (password !== repassword) {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password and Confirm Password do not match!",
    });
  }
  else if (!validatePhoneNumber(phone)){
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Write a valid phone number!",
    });
  }
    else{  
      try{
        const res = await axios({
          method: "POST",
          url: "http://localhost:3000/api/auth/register",
          data: credentials,
          withCredentials: false
        });
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
        navigate('/homepage');
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Welcome',
          showConfirmButton: false,
          timer: 1500
        })
        // console.log(res.data);
      }
      catch(err){
        dispatch({type:"LOGIN_ERROR",payload:err.response.data});
      }
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
            <input type="password" placeholder='Retype-Password' className='password input' onChange={(e)=> setrePassword(e.target.value)}/>
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
