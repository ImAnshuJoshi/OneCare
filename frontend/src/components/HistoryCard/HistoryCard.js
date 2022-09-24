import React, { useContext, useEffect, useState } from 'react'
import './HistoryCard.css'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
function HistoryCard() {
  const {user} = useContext(AuthContext);
  const [patient,setPatient]= useState({});
  const [record,setRecord]=useState([]);
  const [file,setFile]=useState(null);
  const [fileImage, setFileImage]=useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id")

  useEffect(()=>{
    const getuser = async()=>{
      const {data:response}=await axios.get(`http://localhost:3000/api/users/getuser/${id}`)
      setPatient(response);
      return response;
    }
    getuser();
  },[])

  useEffect(()=>{

    const fetchRecord= async ()=>{
      try{
        const res = await axios.get(`http://localhost:3000/api/record/getrecords/${id}/`);
        const file = await fetch(res.data.prescription)
        setFileImage(file);
        setRecord(
          res.data
          .sort((p1,p2)=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
          )
          // console.log('hi');
          // console.log(fileImage);
        }catch(err){
          //// console.log(err);
        }
      }
      //// console.log(record);
      fetchRecord();
    },[])
      const navigate = useNavigate();

    const deleteRecord = async (p) =>{
        try{
        const response = axios.delete(`http://localhost:3000/api/record/deleterecord/${p._id}`)
          // console.log(response);
          window.location.reload(false);
        }
        catch(err){
          // console.log(err);
        }
    }
  return (
    <div>
        <VerticalTimeline className="vertical_timeline .vertical-timeline .vertical-timeline-custom-line " lineColor="grey">
        <div className="timeline">
    {
      record.map((p)=>{
        // {// console.log(p.diseasename)}
        
       return <VerticalTimelineElement
     className="vertical-timeline-element--work box"
     contentStyle={{ background: 'white', color: '#000' ,boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
     contentArrowStyle={{ borderRight: '7px solid  grey' }}
     date={p.createdAt}
     iconStyle={{ background: '#68B5C8', color: 'lightblue' }}
     >
      {/* {//// console.log(p.createdAt)} */}
     <h3 className="vertical-timeline-element-title centerit3">Diseasename : {p.diseasename}</h3>
     <h5 className="vertical-timeline-element-subtitle centerit3">Weight: {p.weight} kgs</h5>
     <h5 className="vertical-timeline-element-subtitle centerit3">Height: {p.height} cm</h5>
     <p className="centerit3">
       Medicines: {p.medicines}
     </p>
     <p className="centerit3">
       Description: {p.desc? p.desc:"Not spcified"}
     </p>
     <p>{p.prescription}</p>
     <a href="">
      <a href={`http://localhost:3000/${p.prescription}`} target="_blank">
      <button style={{marginTop:'20px'}}> 
         View prescription 
      </button>
      </a>
      <button style={{marginTop:'20px',margin:'7px'}} onClick={(e)=> {
        e.preventDefault();
        deleteRecord(p)}
        }> 
         Delete this record 
      </button> 
     </a>
        </VerticalTimelineElement> 
        
      })
    }
    </div>
    </VerticalTimeline> 

    <div className="btn-historycard">

          <div>
        <button onClick={() => navigate(-1)} className='back-btn btn-timeline'>Back</button>
          </div>
      <div>
        <Link to={`/history/adddetails?id=${id}`}>
        <button className='add-btn btn-timeline'>Add record</button>
        </Link>
      </div>
    </div>
      </div>
  )
}

export default HistoryCard