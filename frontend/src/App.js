import './App.css';
import LandingPage from './components/LandingPage/LandingPage.js';
import HomePage from './components/HomePage/Homepage';
import Profile2 from './components/Profile/Profile.js';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup';
import ProfileMain from './components/FullProfile/FullProfile.js';
import History from './components/HistoryCard/HistoryCard.js';
import AddDetails from './components/HistoryCard/AddDetails.js';
import SearchPatient from './components/search/SearchPatient.jsx'
import Navbar from './components/Navbar/Navbar';

import {
  BrowserRouter,
  Routes,
  Route,
  Router,
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
  const {user}=useContext(AuthContext);
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/homepage" element = {user? <><HomePage/><Profile2/></>:<><Signup/></>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element ={<Signup/>}/>
      <Route path="/profile/" element= {<ProfileMain/>}/>
      <Route path="/history" element= {<><Navbar/><History/></>}/>
      <Route path="/history/adddetails/" element={<><Navbar/><AddDetails/></>}/>
      <Route path="/admin" element= {<SearchPatient/>}/>  
      {/* <Route path="/uploads/:path" element={Image}/>  */}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
