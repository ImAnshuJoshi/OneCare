import React, {useEffect, useState } from 'react'
import '../search/searchPatient.css'
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import noavatar from '../../assets/noavatar.png'
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function PatientsCard({user}) {
  const [patient,setPatient]= useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id")

  useEffect(()=>{
    const getuser = async(e)=>{
      e.preventDefault();
      const {data:response}=await axios.get(`https://onecare-backend1.onrender.com/api/users/getuser/${id}`)
      // console.log(response);
      setPatient(response);
      return response;
    }
    getuser();
  },[])
  // console.log(patient.username); 
  return (
    <div className="cards col" style={{textDecoration:'none'}}>
       <Card className="card-one col-lg-3" style={{ width: '18rem',border:'none',textDecoration:'none'}}>
      <Card.Body >
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>
          {user.desc ? user.desc:"Hey there ! I am new to OneCare"}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><b>Age</b>:{user.age? user.age : "Not specified"}</ListGroup.Item>
        <ListGroup.Item><b>Gender</b>:{user.gender? user.gender : "Not specified"}</ListGroup.Item>
        <ListGroup.Item><b>Weight</b>:{user.weight? user.weight : "Not specified"}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to={`/history?id=${user._id}`} >
      <Button variant="primary">Go to History</Button>
        </Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default PatientsCard
