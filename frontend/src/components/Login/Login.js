import './Login.css'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import login from '../../assets/login.png'
import PasswordIcon from '@mui/icons-material/Password';
import { AuthContext } from '../../context/authContext';
import {Link, useNavigate} from 'react-router-dom';

function Login() {

//   const [credentials,setCredentials] = useState({
//     username:undefined,
//     password:undefined
// })
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

  const {user,loading,error,dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  // const handleChange = (e) =>{
  //   setCredentials((prev)=>({
  //     [e.target.id]:e.target.value
  //   }))
  // }

  const handleClick = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    window.localStorage.removeItem('user');
    try{
      const res = await axios.post("http://localhost:3000/api/auth/login",{
        username, password
      });
      // console.log(res.data);
      // console.log("HI1")
      localStorage.setItem('isuserAdmin',res.data.isAdmin);
      dispatch({type:"LOGIN_SUCCESS",payload:res.data.details});
      // console.log(res);
      // console.log("HI2")
      navigate('/homepage')
    }
    catch(err){
      dispatch({type:"LOGIN_ERROR",payload:err});
      // console.log("HI err");
    }
  }

  return (
    <div>
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
