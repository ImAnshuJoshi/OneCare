import React, {useEffect, useState } from 'react'
import './searchPatient.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavbarComponent from '../Navbar/Navbar';
// import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import noavatar from '../../assets/noavatar.png'
import axios from 'axios';
import PatientsCard from '../patientsCard/PatientsCard'
import { Link } from 'react-router-dom';

function SearchPatient() {
  const [patients,setPatients]= useState([]);
  const [query,setQuery] = useState("")


  useEffect(()=>{
    const fetchPatients = async ()=>{
      const res = await axios.get('http://localhost:3000/api/users/getusers/');
      setPatients(res.data);
      // console.log(patients);
    }
    fetchPatients();
  },[])
  return (
    <div>
      <NavbarComponent/>
      <div className="search-feature">
      <InputGroup className="mb-3 input-group even-height" onChange={(e)=>setQuery(e.target.value.toLowerCase())}>
        <Form.Control
          placeholder="Search By username"
        />
      </InputGroup>
      {
        patients.filter((patient)=>
          patient.username.toLowerCase().includes(query)
        ).map((patient,idx)=>{
          return <Link to={`/homepage/${patient.username}`}><PatientsCard key={idx} user={patient}/></Link>
        })
      }
      </div>
      </div>
  )
}

export default SearchPatient
