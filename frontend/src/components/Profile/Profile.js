import React, { useContext } from "react";
import "./Profile.css";
import profile3 from "../../assets/profile.png";
import { AuthContext } from "../../context/authContext.js";
import { Link } from "react-router-dom";

function Profile({ username }) {
  const { user } = useContext(AuthContext);
  let isAdmin = localStorage.getItem("isuserAdmin");
  return (
    <div className="profile">
      <div className="heading">
        About <span>You</span>
      </div>
      <div className="profile-card">
        <div>Name: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Phone number: {user.phone}</div>
        <div>
          {isAdmin === "false" ? (
            <Link to={`/history?id=${user._id}`}>
              <button>View History</button>
            </Link>
          ) : (
            <Link to={`/admin`}>
              <button>Search Patients</button>
            </Link>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Profile;
