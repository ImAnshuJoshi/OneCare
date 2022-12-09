import './Login.css'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import login from '../../assets/login.png'
import PasswordIcon from '@mui/icons-material/Password';
import { AuthContext } from '../../context/authContext';
import {Link, useNavigate} from 'react-router-dom';
import swal from "sweetalert2";
import ReactLoading from 'react-loading';

function Login() {

  // function to validate password
  const validatePassword = (str) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
    return re.test(str);  
  };
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

  const {user,loading,error,dispatch} = useContext(AuthContext);

  const navigate = useNavigate();


  const handleClick = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    window.localStorage.removeItem('user');
    if(!validatePassword(password)){
      swal.fire({
        icon: "error",
        title: "Invalid Password...",
        text: "Password should be longer than 4 characters and must contain atleast 1 Uppercase,1 Lowercase, 1 Number and 1 special character",
      });
    }
    else{

      try{
        const res = await axios.post("https://onecare-backend1.onrender.com/api/auth/login",{
          username, password
        });
        localStorage.setItem('isuserAdmin',res.data.isAdmin);
        dispatch({type:"LOGIN_SUCCESS",payload:res.data.details});
        navigate('/homepage')
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Welcome',
          showConfirmButton: false,
          timer: 1500
        })
      }
      catch(err){
        swal.fire({
          icon: "error",
          title: "No User Found",
          text: "Please Enter valid credentials!",
        });
        dispatch({type:"LOGIN_ERROR",payload:err});
        // console.log("HI err");
      }
    }
  }

  return (
    <div>
      <ReactLoading type="String" color="Black" />
      <div className="login">
        <div className="image">
      <img src={login} alt="" />
        </div>
        <div className="login-card">
          <p>
          Log<span>
          In 
          </span>
          </p>
          <div className="username">
            <i class="fa-solid fa-user"></i>
            <input type="text" placeholder='Username' className='username input'  value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input type="password" placeholder='Password' className='password input'  value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div> 
            <button onClick={handleClick}>SignIn</button>
          </div>
          <div className="signup-instead">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  )
}

export default Login
