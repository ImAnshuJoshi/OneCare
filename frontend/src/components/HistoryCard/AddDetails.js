import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./AddDetails.css";

function AddDetails() {
  const { user, dispatch } = useContext(AuthContext);

  const [patient, setPatient] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const patientId = id;
  useEffect(() => {
    const getuser = async () => {
      const { data: response } = await axios.get(
        `http://localhost:3000/api/users/getuser/${id}`
      );
      // console.log(response);
      setPatient(response);
      return response;
    };
    getuser();
  }, []);

  const [selectedImage, setSelectedImage] = useState();
  const [diseasename, setDiseasename] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [medicines, setMedicines] = useState([]);
  const [desc, setDesc] = useState("");
  const [checkdate, setCheckdate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("diseasename", diseasename);
    form.append("weight", weight);
    form.append("height", height);
    form.append("desc", desc);
    form.append("checkdate", checkdate);
    form.append("patientId", patientId);
    form.append("image", selectedImage);
    // console.log(form);
    // const res= axios.post(`http://localhost:3000/api/record/`,form);
    const res = await fetch(`http://localhost:3000/api/record/`, {
      method: "POST", 
      headers:{
        "Access-Control-Allow-Origin":true,
      },
      body: form,
    });
    console.log("hi res object");
    console.log(res)
  };
  return (
    <div className="AddDetails">
      <div className="data">
        {/* <Link to={`/history?id=${id}`}> */}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="DiseaseName"
            onChange={(e) => {
              setDiseasename(e.target.value);
            }}
          />
          <input
            type="text"
            className="input"
            placeholder="Weight"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
          <input
            type="text"
            className="input"
            placeholder="Height"
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
          <input
            type="text"
            className="input"
            placeholder="Medicines"
            onChange={(e) => {
              setMedicines(e.target.value);
            }}
          />
          <input
            type="text"
            className="input"
            placeholder="Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <input
            type="date"
            className="input"
            placeholder="Enter the date of checkup"
            onChange={(e) => {
              setCheckdate(e.target.value);
            }}
          />
          <div className="pres">
            <p>Upload Prescription</p>
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
              </div>
            )}
            <br />

            <br />
            <input
              type="file"
              name="image"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
              encType="multipart/form-data"
            />
            <button
              onClick={(e) => {
                setSelectedImage(null);
              }}
            >
              Remove
            </button>
          </div>

          <button type="submit">Add Record</button>
        </form>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default AddDetails;
